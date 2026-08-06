// ─── State ────────────────────────────────────────────────────────────────────
let currentLevel = 'A1';
let openRuleId = null;
let searchQuery = '';
let showFavsOnly = false;
let reviewItems = [];
let reviewIndex = 0;

// Rules that map directly to a Kasus-Trainer case
const KASUS_LINKS = {
  'a1-06': 'Akkusativ',
  'a2-03': 'Dativ',
  'a2-04': 'Akkusativ',
  'a2-05': 'Dativ',
  'a2-06': 'Todos',
  'b1-03': 'Todos',
  'b1-04': 'Genitiv',
  'b1-05': 'Todos',
  'b1-07': 'Akkusativ',
};

// Exam state
let examQuestions = [];
let examAnswers = [];
let examCurrentIndex = 0;
let examSelectedRules = [];
let examTotalExpected = 0;
let examIsMixed = false;

// ─── Flashcard state ──────────────────────────────────────────────────────────
let fcRules = [];
let fcIndex = 0;
let fcFlipped = false;
let fcTouchStartX = 0;
let fcTouchStartY = 0;

// ─── Quiz session state ───────────────────────────────────────────────────────
let quizSession = null;
let ordenarSelected = [];

// ─── Persistence helpers ──────────────────────────────────────────────────────
function getFavs() { try { return JSON.parse(localStorage.getItem('gram_favs') || '[]'); } catch(e) { return []; } }
function saveFavs(arr) { localStorage.setItem('gram_favs', JSON.stringify(arr)); }
function getRead() { try { return JSON.parse(localStorage.getItem('gram_read') || '{}'); } catch(e) { return {}; } }
function markRead(id) { const r = getRead(); r[id] = true; localStorage.setItem('gram_read', JSON.stringify(r)); syncToSupabase(); }
function isFav(id) { return getFavs().includes(id); }

function saveLastPosition(level, ruleId) {
  localStorage.setItem('gram_last_level', level);
  localStorage.setItem('gram_last_rule', ruleId || '');
}

function loadLastPosition() {
  const level = localStorage.getItem('gram_last_level');
  const validLevel = LEVELS.includes(level) ? level : 'A1';
  const ruleId = localStorage.getItem('gram_last_rule');
  const validRule = ruleId && GRAMMAR_DATA[validLevel].some(r => r.id === ruleId) ? ruleId : null;
  return { level: validLevel, ruleId: validRule };
}

function toggleFav(id, e) {
  e.stopPropagation();
  const favs = getFavs();
  const idx = favs.indexOf(id);
  if (idx === -1) favs.push(id); else favs.splice(idx, 1);
  saveFavs(favs);
  syncToSupabase();
  renderAll();
}

// ─── SRS (SM-2) ───────────────────────────────────────────────────────────────
function getSRS() { try { return JSON.parse(localStorage.getItem('gram_srs') || '{}'); } catch(e) { return {}; } }
function saveSRS(d) { localStorage.setItem('gram_srs', JSON.stringify(d)); }
function getSRSEntry(id) { return getSRS()[id] || { interval: 1, ease: 2.5, reps: 0, due: null }; }
function isDue(id) { const e = getSRSEntry(id); return !!(e.due && new Date(e.due) <= new Date()); }
function countDue() {
  let n = 0;
  for (const lvl of LEVELS) for (const r of GRAMMAR_DATA[lvl]) if (isDue(r.id)) n++;
  return n;
}
function srsNextLabel(id) {
  const e = getSRSEntry(id);
  if (!e.due) return null;
  const days = Math.round((new Date(e.due) - new Date()) / 86400000);
  if (days <= 0) return 'Repaso pendiente';
  if (days === 1) return 'Repaso en 1 día';
  return 'Repaso en ' + days + ' días';
}
function updateSRSEntry(id, rating) {
  const srs = getSRS();
  const e = srs[id] || { interval: 1, ease: 2.5, reps: 0, due: null };
  if (rating >= 3) {
    if (e.reps < 1) e.interval = 1;
    else if (e.reps < 2) e.interval = 6;
    else e.interval = Math.max(1, Math.round(e.interval * e.ease));
    e.ease = Math.max(1.3, Math.min(2.5, e.ease + 0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02)));
    e.reps++;
  } else {
    e.reps = 0;
    e.interval = 1;
    e.ease = Math.max(1.3, e.ease - 0.2);
  }
  const due = new Date();
  due.setDate(due.getDate() + e.interval);
  e.due = due.toISOString();
  srs[id] = e;
  saveSRS(srs);
  syncToSupabase();
}

function rateSRS(id, rating) {
  updateSRSEntry(id, rating);
  const labels = { 1: '✗ No lo sé', 2: '~ Difícil', 4: '✓ Bien', 5: '★ Fácil' };
  const next = srsNextLabel(id);
  showToast(labels[rating] + (next ? ' · ' + next : ''));
  renderAll();
}

function openSrsReview() {
  const due = [];
  for (const lvl of LEVELS) {
    for (const r of GRAMMAR_DATA[lvl]) {
      if (isDue(r.id)) due.push(Object.assign({}, r, { _level: lvl }));
    }
  }
  if (due.length === 0) { showToast('No hay reglas pendientes de repaso.'); return; }
  reviewItems = due;
  reviewIndex = 0;
  document.getElementById('gram-review-overlay').style.display = '';
  renderReviewCard();
}

function updateSrsBadge() {
  const btn = document.getElementById('srs-btn');
  if (!btn) return;
  const due = countDue();
  btn.textContent = due > 0 ? '🔁 SRS (' + due + ')' : '🔁 SRS Repaso';
  btn.classList.toggle('srs-due', due > 0);
}

// ─── Supabase sync ────────────────────────────────────────────────────────────
function syncToSupabase() {
  if (!window.sb || !window.currentUser) return;
  const payload = { favs: getFavs(), read: getRead(), srs: getSRS() };
  window.sb.from('grammar_state').upsert(
    { user_id: window.currentUser.id, data: payload, updated_at: new Date().toISOString() },
    { onConflict: 'user_id' }
  ).then(function(res) {
    if (res.error) console.warn('[grammar_state]', res.error.message);
  });
}

async function loadFromSupabase() {
  if (!window.sb || !window.currentUser) return;
  try {
    const { data, error } = await window.sb.from('grammar_state')
      .select('data').eq('user_id', window.currentUser.id).single();
    if (error || !data) return;
    const remote = data.data || {};
    if (Array.isArray(remote.favs)) {
      saveFavs([...new Set([...getFavs(), ...remote.favs])]);
    }
    if (remote.read && typeof remote.read === 'object') {
      localStorage.setItem('gram_read', JSON.stringify(Object.assign({}, remote.read, getRead())));
    }
    if (remote.srs && typeof remote.srs === 'object') {
      const local = getSRS();
      const merged = Object.assign({}, remote.srs);
      Object.keys(local).forEach(function(id) {
        if (!merged[id] || (local[id].due && (!merged[id].due || local[id].due > merged[id].due))) {
          merged[id] = local[id];
        }
      });
      saveSRS(merged);
    }
    renderAll();
  } catch(e) { /* silent */ }
}

window.onAuthSignedIn = loadFromSupabase;

// ─── Hash routing ─────────────────────────────────────────────────────────────
function parseHash() {
  const h = location.hash.replace('#', '');
  const lvlMatch = LEVELS.find(l => l.toLowerCase() === h.toLowerCase());
  if (lvlMatch) return { level: lvlMatch, ruleId: null };
  for (const lvl of LEVELS) {
    const rule = GRAMMAR_DATA[lvl].find(r => r.id === h);
    if (rule) return { level: lvl, ruleId: rule.id };
  }
  return loadLastPosition();
}

function setLevel(level, pushState = true) {
  currentLevel = level;
  openRuleId = null;
  showFavsOnly = false;
  const btn = document.getElementById('fav-filter-btn');
  if (btn) btn.classList.remove('active');
  if (pushState) history.pushState(null, '', '#' + level.toLowerCase());
  saveLastPosition(level, null);
  renderAll();
}

// ─── Search ───────────────────────────────────────────────────────────────────
function onSearch(val) {
  searchQuery = val.trim().toLowerCase();
  document.getElementById('gram-search-clear').classList.toggle('visible', searchQuery.length > 0);
  document.getElementById('gram-level-bar').style.display = searchQuery ? 'none' : '';
  document.getElementById('gram-toolbar').style.display = searchQuery ? 'none' : '';
  document.getElementById('gram-search-label').style.display = searchQuery ? '' : 'none';
  renderAll();
}

function clearSearch() {
  document.getElementById('gram-search').value = '';
  onSearch('');
}

function getSearchResults() {
  const results = [];
  for (const lvl of LEVELS) {
    for (const rule of GRAMMAR_DATA[lvl]) {
      const haystack = [rule.titulo, rule.subtitulo, rule.explicacion, rule.tip,
        rule.regla_base || '', rule.excepciones || '',
        ...rule.ejemplos.map(e => e.de + ' ' + e.es)].join(' ').toLowerCase();
      if (haystack.includes(searchQuery)) results.push(Object.assign({}, rule, { _level: lvl }));
    }
  }
  return results;
}

// ─── Favorites filter ─────────────────────────────────────────────────────────
function toggleFavFilter() {
  showFavsOnly = !showFavsOnly;
  const btn = document.getElementById('fav-filter-btn');
  btn.classList.toggle('active', showFavsOnly);
  renderAll();
}

// ─── Progress ─────────────────────────────────────────────────────────────────
function getLevelProgress(lvl) {
  const read = getRead();
  const total = GRAMMAR_DATA[lvl].length;
  const done = GRAMMAR_DATA[lvl].filter(r => read[r.id]).length;
  return { done, total };
}

// ─── Render ───────────────────────────────────────────────────────────────────
function renderAll() {
  if (searchQuery) {
    renderSearchResults();
  } else {
    renderLevelTabs();
    renderRuleList();
  }
  updateSrsBadge();
}

function levelProgressRing(done, total) {
  var r = 9, circ = 2 * Math.PI * r;
  var filled = (done / total) * circ;
  var trackColor = 'rgba(128,128,128,0.25)';
  return '<svg class="gram-ring" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="' + r + '" fill="none" stroke="' + trackColor + '" stroke-width="2.5"/>' +
    (done > 0
      ? '<circle cx="12" cy="12" r="' + r + '" fill="none" stroke="currentColor" stroke-width="2.5"' +
        ' stroke-dasharray="' + filled.toFixed(1) + ' ' + circ.toFixed(1) + '"' +
        ' transform="rotate(-90 12 12)"/>'
      : '') +
    '<text x="12" y="16" text-anchor="middle" font-size="7" fill="currentColor">' + done + '/' + total + '</text>' +
    '</svg>';
}

function renderLevelTabs() {
  const bar = document.getElementById('gram-level-bar');
  const favsActive = showFavsOnly;
  bar.innerHTML = LEVELS.map(lvl => {
    const { done, total } = getLevelProgress(lvl);
    const ring = levelProgressRing(done, total);
    return '<button class="gram-level-btn' + (lvl === currentLevel && !favsActive ? ' active' : '') +
      '" onclick="setLevel(\'' + lvl + '\')">' + lvl + ring + '</button>';
  }).join('') +
  '<button class="gram-level-btn' + (favsActive ? ' active' : '') + '" id="fav-level-btn" onclick="toggleFavFilter()">&#9733; Favs</button>' +
  '<button class="gram-level-btn exam-level-btn" id="exam-start-btn" onclick="startExam()">&#128221; Examen</button>' +
  '<button class="gram-level-btn exam-mixed-btn" id="exam-mixed-btn" onclick="startMixedExam()">&#127922; Mixto</button>' +
  '<button class="gram-level-btn fc-level-btn" onclick="openFlashcards()">&#127183; Flashcards</button>' +
  '<button class="gram-level-btn history-level-btn" onclick="openHistory()">&#128202; Historial</button>';
  document.getElementById('gram-toolbar').style.display = '';
}

function getRulesToShow() {
  if (showFavsOnly) {
    const favs = getFavs();
    const all = [];
    for (const lvl of LEVELS) {
      GRAMMAR_DATA[lvl].forEach(r => {
        if (favs.includes(r.id)) all.push(Object.assign({}, r, { _level: lvl }));
      });
    }
    return all;
  }
  return GRAMMAR_DATA[currentLevel].map(r => Object.assign({}, r, { _level: currentLevel }));
}

function renderRuleList() {
  const rules = getRulesToShow();
  const container = document.getElementById('gram-rules');
  if (rules.length === 0) {
    container.innerHTML = '<div class="gram-empty">No hay reglas favoritas todavía. Haz clic en ☆ para guardar.</div>';
    return;
  }
  const read = getRead();
  container.innerHTML = rules.map(function(rule, i) { return renderRuleCard(rule, i, read, false); }).join('');
}

function renderSearchResults() {
  const results = getSearchResults();
  const label = document.getElementById('gram-search-label');
  const container = document.getElementById('gram-rules');
  if (results.length === 0) {
    label.textContent = 'Sin resultados.';
    container.innerHTML = '<div class="gram-empty">No se encontraron reglas con ese término.</div>';
    return;
  }
  label.textContent = results.length + ' resultado' + (results.length !== 1 ? 's' : '') + ' en todos los niveles';
  const read = getRead();
  container.innerHTML = results.map(function(rule, i) { return renderRuleCard(rule, i, read, true); }).join('');
}

function esc(s) { return String(s).replace(/'/g, '&#39;').replace(/"/g, '&quot;'); }

function renderTabla(tabla) {
  if (!tabla) return '';
  var hdr = '<tr>' + tabla.headers.map(function(h) { return '<th>' + h + '</th>'; }).join('') + '</tr>';
  var body = tabla.rows.map(function(row) {
    return '<tr>' + row.map(function(c) { return '<td>' + c + '</td>'; }).join('') + '</tr>';
  }).join('');
  return '<table class="gram-tabla"><thead>' + hdr + '</thead><tbody>' + body + '</tbody></table>';
}

function toggleExplicacion(ruleId) {
  var el = document.getElementById('exp-' + ruleId);
  var btn = document.getElementById('exp-btn-' + ruleId);
  if (!el || !btn) return;
  var isOpen = el.classList.toggle('open');
  btn.textContent = isOpen ? '▲ Leer menos' : '▼ Leer más';
}

function speakDe(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'de-DE';
  u.rate = 0.9;
  window.speechSynthesis.speak(u);
}

function renderRuleCard(rule, i, read, showLevel) {
  const isOpen = openRuleId === rule.id;
  const favMark = isFav(rule.id) ? '&#9733;' : '&#9734;';
  const favTitle = isFav(rule.id) ? 'Quitar favorito' : 'Guardar favorito';
  const favClass = isFav(rule.id) ? ' active' : '';
  const readClass = read[rule.id] ? ' read' : '';
  const badge = showLevel ? '<span class="gram-result-level">' + rule._level + '</span>' : '';
  const ejemplosHtml = rule.ejemplos.map(function(ej) {
    const escaped = ej.de.replace(/'/g, '&#39;');
    return '<div class="gram-ejemplo">' +
      '<button class="gram-tts-btn" onclick="speakDe(\'' + escaped + '\')" title="Escuchar">&#128266;</button>' +
      '<span class="gram-ej-de">' + ej.de + '</span>' +
      '<span class="gram-ej-arrow">&rarr;</span><span class="gram-ej-es">' + ej.es + '</span></div>';
  }).join('');
  return '<div class="gram-rule-card' + (isOpen ? ' open' : '') + readClass + '" id="rule-' + rule.id + '">' +
    '<button class="gram-rule-header" onclick="toggleRule(\'' + rule.id + '\')">' +
    '<span class="gram-rule-num">' + (i + 1) + '</span>' +
    '<div class="gram-rule-read-dot"></div>' +
    '<span class="gram-rule-titles">' +
    '<span class="gram-rule-title">' + rule.titulo + badge + '</span>' +
    '<span class="gram-rule-subtitle">' + rule.subtitulo + '</span>' +
    '<span class="gram-rule-readtime">~' + Math.ceil(rule.explicacion.split(' ').length / 200) + ' min · 3 ej.</span>' +
    '</span>' +
    '<button class="gram-fav-btn' + favClass + '" onclick="toggleFav(\'' + esc(rule.id) + '\',event)" title="' + favTitle + '">' + favMark + '</button>' +
    '<span class="gram-rule-chevron">' + (isOpen ? '&#9650;' : '&#9660;') + '</span>' +
    '</button>' +
    '<div class="gram-rule-body">' +
    (rule.regla_base ? '<div class="gram-regla-base"><span class="gram-regla-base-icon">📌</span>' + rule.regla_base + '</div>' : '') +
    (rule.tabla ? renderTabla(rule.tabla) : '') +
    (rule.excepciones ? '<div class="gram-excepcion"><span class="gram-excepcion-icon">⚠️</span><span>' + rule.excepciones + '</span></div>' : '') +
    '<button id="exp-btn-' + rule.id + '" class="gram-exp-toggle" onclick="toggleExplicacion(\'' + esc(rule.id) + '\')">▼ Leer más</button>' +
    '<p class="gram-rule-explicacion" id="exp-' + rule.id + '">' + rule.explicacion + '</p>' +
    '<div class="gram-ejemplos">' + ejemplosHtml + '</div>' +
    '<div class="gram-tip"><span class="gram-tip-icon">💡</span><span>' + rule.tip + '</span></div>' +
    '<div class="gram-quiz-wrap" id="quiz-' + rule.id + '">' +
    '<div class="gram-quiz-actions">' +
    '<button class="gram-quiz-btn" onclick="startQuiz(\'' + rule.id + '\')">&#127919; Practicar</button>' +
    '<button class="gram-quiz-btn" onclick="copyRuleLink(\'' + rule.id + '\')">&#128279; Copiar enlace</button>' +
    (KASUS_LINKS[rule.id]
      ? '<a class="gram-quiz-btn gram-kasus-link" href="kasus.html?caso=' + KASUS_LINKS[rule.id] + '" target="_blank">&#127919; Ver en Kasus-Trainer</a>'
      : '') +
    '</div></div>' +
    (isOpen
      ? '<div class="gram-srs-section">' +
        '<span class="gram-srs-label">&#127997; ¿Cuánto lo dominas?</span>' +
        '<div class="gram-srs-btns">' +
        '<button class="gram-srs-btn no" onclick="rateSRS(\'' + esc(rule.id) + '\',1)">✗ No lo sé</button>' +
        '<button class="gram-srs-btn hard" onclick="rateSRS(\'' + esc(rule.id) + '\',2)">~ Difícil</button>' +
        '<button class="gram-srs-btn ok" onclick="rateSRS(\'' + esc(rule.id) + '\',4)">✓ Bien</button>' +
        '<button class="gram-srs-btn easy" onclick="rateSRS(\'' + esc(rule.id) + '\',5)">★ Fácil</button>' +
        '</div>' +
        (srsNextLabel(rule.id) ? '<span class="gram-srs-next">' + srsNextLabel(rule.id) + '</span>' : '') +
        '</div>'
      : '') +
    '</div></div>';
}

function toggleRule(id) {
  openRuleId = openRuleId === id ? null : id;
  if (openRuleId) markRead(id);
  saveLastPosition(currentLevel, openRuleId);
  renderAll();
  if (openRuleId) {
    var el = document.getElementById('rule-' + openRuleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

// ─── Quiz ─────────────────────────────────────────────────────────────────────
const ARTICLE_SET = new Set(['der','die','das','den','dem','des','ein','eine','einen','einem','einer','eines','kein','keine','keinen','keinem','keiner','keines']);

function detectArticle(sentence) {
  const words = sentence.split(/\s+/);
  for (let i = 0; i < words.length; i++) {
    const clean = words[i].replace(/[.,!?]$/, '').toLowerCase();
    if (ARTICLE_SET.has(clean)) return { idx: i, clean };
  }
  return null;
}

function getDailyScore() {
  try {
    const d = JSON.parse(localStorage.getItem('gram_daily') || '{}');
    return d.date === new Date().toDateString() ? (d.score || 0) : 0;
  } catch(e) { return 0; }
}

function incrementDailyScore() {
  try {
    const today = new Date().toDateString();
    const d = JSON.parse(localStorage.getItem('gram_daily') || '{}');
    const score = (d.date === today ? d.score : 0) + 1;
    localStorage.setItem('gram_daily', JSON.stringify({ date: today, score }));
  } catch(e) {}
  updateDailyDisplay();
}

function updateDailyDisplay() {
  const el = document.getElementById('gram-daily-score');
  if (!el) return;
  const n = getDailyScore();
  el.textContent = 'Hoy: ' + n + ' ✓';
  el.style.display = n > 0 ? '' : 'none';
}

function safeAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function buildQOpcion(rule, ex, type) {
  const lvl = LEVELS.find(l => GRAMMAR_DATA[l].some(r => r.id === rule.id));
  let pool = [];
  GRAMMAR_DATA[lvl].forEach(r => { if (r.id !== rule.id) r.ejemplos.forEach(e => pool.push(e)); });
  pool = [...rule.ejemplos.filter(e => e !== ex), ...pool].sort(() => Math.random() - 0.5);
  const dist = pool.slice(0, 3);
  if (type === 'opcion_multiple') {
    return { type, example: ex, correct: ex.de, options: [ex.de, ...dist.map(d => d.de)].sort(() => Math.random() - 0.5) };
  }
  return { type, example: ex, correct: ex.es, options: [ex.es, ...dist.map(d => d.es)].sort(() => Math.random() - 0.5) };
}

function buildQOrdenar(ex) {
  const raw = ex.de.replace(/[.!?,]$/, '');
  const words = raw.split(/\s+/);
  if (words.length < 3 || words.length > 8) return null;
  let shuffled = words.slice().sort(() => Math.random() - 0.5);
  let tries = 0;
  while (shuffled.join(' ') === words.join(' ') && ++tries < 10) shuffled.sort(() => Math.random() - 0.5);
  return { type: 'ordenar', example: ex, words: shuffled, correct: words.join(' ') };
}

function buildQArticulo(ex) {
  const art = detectArticle(ex.de);
  if (!art) return null;
  const parts = ex.de.split(/\s+/);
  parts[art.idx] = '___';
  const pool = [...ARTICLE_SET].filter(a => a !== art.clean).sort(() => Math.random() - 0.5);
  return { type: 'articulo', example: ex, sentence: parts.join(' '), correct: art.clean, options: [art.clean, ...pool.slice(0, 3)].sort(() => Math.random() - 0.5) };
}

function buildQuizQuestions(rule) {
  const exs = rule.ejemplos.slice().sort(() => Math.random() - 0.5);
  const pool = Array.from({ length: PRACTICE_EXERCISE_COUNT }, (_, i) => exs[i % exs.length]);
  const used = new Set();
  return pool.map(ex => {
    const typeOrder = ['opcion_multiple', 'identificar', 'ordenar', 'articulo'].sort(() => Math.random() - 0.5);
    for (const t of typeOrder) {
      if (used.has(t)) continue;
      let q = null;
      if (t === 'opcion_multiple' || t === 'identificar') q = buildQOpcion(rule, ex, t);
      else if (t === 'ordenar') q = buildQOrdenar(ex);
      else if (t === 'articulo') q = buildQArticulo(ex);
      if (q) { used.add(t); return q; }
    }
    return buildQOpcion(rule, ex, used.has('opcion_multiple') ? 'identificar' : 'opcion_multiple');
  });
}

async function startQuiz(ruleId) {
  let rule = null;
  let level = null;
  for (const lvl of LEVELS) {
    rule = GRAMMAR_DATA[lvl].find(r => r.id === ruleId);
    if (rule) { level = lvl; break; }
  }
  if (!rule || !rule.ejemplos.length) return;

  const wrap = document.getElementById('quiz-' + ruleId);
  wrap.innerHTML = '<div class="gram-quiz-loading">Generando práctica…</div>';

  let practicaEjs;
  try {
    practicaEjs = await getPracticeSentences(rule, level);
  } catch(e) {
    practicaEjs = rule.ejemplos;
  }

  const practiceRule = Object.assign({}, rule, { ejemplos: practicaEjs });
  quizSession = { ruleId, rule, questions: buildQuizQuestions(practiceRule), currentIndex: 0, results: [] };
  ordenarSelected = [];
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const { ruleId, questions, currentIndex } = quizSession;
  const q = questions[currentIndex];
  const wrap = document.getElementById('quiz-' + ruleId);
  const pct = (currentIndex / questions.length * 100).toFixed(0);

  let bodyHtml = '';
  if (q.type === 'opcion_multiple') {
    const opts = q.options.map(o =>
      '<button class="gram-quiz-opt" data-val="' + safeAttr(o) + '" onclick="checkQuizAnswer(this.dataset.val)">' + o + '</button>'
    ).join('');
    bodyHtml = '<div class="gram-quiz-question"><small>¿Cómo se dice en alemán?</small>' + q.example.es + '</div>' +
      '<div class="gram-quiz-options">' + opts + '</div>';
  } else if (q.type === 'identificar') {
    const opts = q.options.map(o =>
      '<button class="gram-quiz-opt" data-val="' + safeAttr(o) + '" onclick="checkQuizAnswer(this.dataset.val)">' + o + '</button>'
    ).join('');
    bodyHtml = '<div class="gram-quiz-question"><small>¿Qué significa en español?</small>' + q.example.de + '</div>' +
      '<div class="gram-quiz-options">' + opts + '</div>';
  } else if (q.type === 'articulo') {
    const opts = q.options.map(o =>
      '<button class="gram-quiz-opt" data-val="' + safeAttr(o) + '" onclick="checkQuizAnswer(this.dataset.val)">' + o + '</button>'
    ).join('');
    bodyHtml = '<div class="gram-quiz-question"><small>Completa con el artículo correcto:</small>' + q.sentence + '</div>' +
      '<div class="gram-quiz-options gram-quiz-opts-4">' + opts + '</div>';
  } else if (q.type === 'ordenar') {
    const wordBtns = q.words.map((w, i) =>
      '<button class="gram-quiz-word" onclick="ordenarClick(this,' + i + ')">' + w + '</button>'
    ).join('');
    bodyHtml = '<div class="gram-quiz-question"><small>Ordena las palabras:</small>' +
      '<small class="gram-quiz-q-hint">' + q.example.es + '</small></div>' +
      '<div class="gram-quiz-ordenar-result" id="ordenar-result">' +
        '<span class="gram-quiz-ordenar-placeholder">Toca las palabras en orden…</span>' +
      '</div>' +
      '<div class="gram-quiz-ordenar-words" id="ordenar-words">' + wordBtns + '</div>' +
      '<button class="gram-quiz-btn primary" id="submit-ordenar" onclick="submitOrdenar()" disabled>Comprobar</button>';
  }

  wrap.innerHTML =
    '<div class="gram-quiz-progress">' +
      '<div class="gram-quiz-progress-track">' +
        '<div class="gram-quiz-progress-bar" style="width:' + pct + '%"></div>' +
      '</div>' +
      '<span class="gram-quiz-progress-label">' + (currentIndex + 1) + ' / ' + questions.length + '</span>' +
    '</div>' +
    bodyHtml +
    '<div class="gram-quiz-feedback" id="qfb-' + ruleId + '"></div>';
}

function checkQuizAnswer(chosen) {
  const { ruleId, questions, currentIndex, rule } = quizSession;
  const q = questions[currentIndex];
  const isCorrect = chosen === q.correct;

  document.querySelectorAll('#quiz-' + ruleId + ' .gram-quiz-opt, #submit-ordenar').forEach(b => { b.disabled = true; });
  document.querySelectorAll('#quiz-' + ruleId + ' .gram-quiz-opt').forEach(b => {
    if (b.dataset.val === q.correct) b.classList.add('correct');
    else if (b.dataset.val === chosen && !isCorrect) b.classList.add('wrong');
  });

  quizSession.results.push(isCorrect);
  if (isCorrect) incrementDailyScore();

  const isLast = currentIndex >= questions.length - 1;
  const fb = document.getElementById('qfb-' + ruleId);
  fb.innerHTML =
    (isCorrect ? '<span class="qfb-correct">✓ ¡Correcto!</span>' : '<span class="qfb-wrong">✗ Era: <strong>' + q.correct + '</strong></span>') +
    '<div class="qfb-tip">💡 ' + rule.tip + '</div>' +
    '<div class="gram-quiz-actions">' +
    (isLast
      ? '<button class="gram-quiz-btn primary" onclick="showQuizResult()">Ver resultado →</button>'
      : '<button class="gram-quiz-btn primary" onclick="nextQuizQuestion()">Siguiente →</button>') +
    '</div>';
  fb.classList.add('visible');
}

function nextQuizQuestion() {
  quizSession.currentIndex++;
  ordenarSelected = [];
  renderQuizQuestion();
}

function showQuizResult() {
  const { ruleId, results } = quizSession;
  const correct = results.filter(Boolean).length;
  const total = results.length;
  updateSRSEntry(ruleId, correct === total ? 4 : correct >= 2 ? 3 : 1);
  if (window.logEvent) window.logEvent('gramatica', 'quiz_completed', { rule_id: ruleId, correct, total });
  const stars = ['☆☆☆','★☆☆','★★☆','★★★'][correct] || '★★★';
  const rachaHtml = correct === total ? '<div class="gram-quiz-racha">⚡ ¡Racha perfecta!</div>' : '';
  document.getElementById('quiz-' + ruleId).innerHTML =
    rachaHtml +
    '<div class="gram-quiz-result">' +
      '<div class="gram-quiz-result-score">' + correct + ' / ' + total + '</div>' +
      '<div class="gram-quiz-result-stars">' + stars + '</div>' +
    '</div>' +
    '<div class="gram-quiz-actions">' +
      '<button class="gram-quiz-btn primary" onclick="startQuiz(\'' + ruleId + '\')">↺ Repetir</button>' +
      '<button class="gram-quiz-btn" onclick="resetQuiz(\'' + ruleId + '\')">Cerrar</button>' +
    '</div>';
}

function resetQuiz(ruleId) {
  quizSession = null;
  ordenarSelected = [];
  document.getElementById('quiz-' + ruleId).innerHTML =
    '<div class="gram-quiz-actions">' +
      '<button class="gram-quiz-btn" onclick="startQuiz(\'' + ruleId + '\')">&#127919; Practicar</button>' +
      '<button class="gram-quiz-btn" onclick="copyRuleLink(\'' + ruleId + '\')">&#128279; Copiar enlace</button>' +
      (KASUS_LINKS[ruleId]
        ? '<a class="gram-quiz-btn gram-kasus-link" href="kasus.html?caso=' + KASUS_LINKS[ruleId] + '" target="_blank">&#127919; Ver en Kasus-Trainer</a>'
        : '') +
    '</div>';
}

function ordenarClick(btn, idx) {
  if (btn.classList.contains('used')) {
    const pos = ordenarSelected.indexOf(idx);
    if (pos !== -1) { ordenarSelected.splice(pos, 1); btn.classList.remove('used'); }
  } else {
    ordenarSelected.push(idx);
    btn.classList.add('used');
  }
  updateOrdenarResult();
}

function updateOrdenarResult() {
  const q = quizSession.questions[quizSession.currentIndex];
  const el = document.getElementById('ordenar-result');
  const btn = document.getElementById('submit-ordenar');
  if (!el) return;
  const text = ordenarSelected.map(i => q.words[i]).join(' ');
  el.innerHTML = text
    ? '<span>' + text + '</span>'
    : '<span class="gram-quiz-ordenar-placeholder">Toca las palabras en orden…</span>';
  if (btn) btn.disabled = ordenarSelected.length !== q.words.length;
}

function submitOrdenar() {
  checkQuizAnswer(ordenarSelected.map(i => quizSession.questions[quizSession.currentIndex].words[i]).join(' '));
}

// ─── Share URL ─────────────────────────────────────────────────────────────────
function copyRuleLink(ruleId) {
  var url = location.origin + location.pathname + '#' + ruleId;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(function() { showToast('Enlace copiado'); });
  } else {
    var ta = document.createElement('textarea');
    ta.value = url; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); document.body.removeChild(ta);
    showToast('Enlace copiado');
  }
}

function showToast(msg) {
  var t = document.getElementById('gram-toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(function() { t.classList.remove('show'); }, 2200);
}

// ─── Quick Review ─────────────────────────────────────────────────────────────
function openReview() {
  var rules = getRulesToShow();
  if (rules.length === 0) { showToast('No hay reglas para repasar.'); return; }
  reviewItems = rules.slice();
  reviewIndex = 0;
  document.getElementById('gram-review-overlay').style.display = '';
  renderReviewCard();
}

function closeReview() {
  document.getElementById('gram-review-overlay').style.display = 'none';
}

function renderReviewCard() {
  var rule = reviewItems[reviewIndex];
  var total = reviewItems.length;
  var lvl = rule._level || currentLevel;
  document.getElementById('rv-meta').textContent = lvl + ' · Regla ' + (reviewIndex + 1) + ' de ' + total;
  document.getElementById('rv-title').textContent = rule.titulo;
  document.getElementById('rv-sub').textContent = rule.subtitulo;
  document.getElementById('rv-tip').textContent = rule.tip;
  document.getElementById('rv-counter').textContent = (reviewIndex + 1) + ' / ' + total;
  document.getElementById('rv-bar').style.width = (((reviewIndex + 1) / total) * 100) + '%';
  document.getElementById('rv-prev').disabled = reviewIndex === 0;
  document.getElementById('rv-next').disabled = reviewIndex === total - 1;
}

function reviewNav(dir) {
  reviewIndex = Math.max(0, Math.min(reviewItems.length - 1, reviewIndex + dir));
  renderReviewCard();
}

// ─── Keyboard navigation ──────────────────────────────────────────────────────
document.addEventListener('keydown', function(e) {
  var examQOverlay = document.getElementById('exam-question-overlay');
  if (examQOverlay && examQOverlay.style.display !== 'none') {
    if (e.key === 'Escape') examConfirmExit();
    return;
  }
  var examResOverlay = document.getElementById('exam-results-overlay');
  if (examResOverlay && examResOverlay.style.display !== 'none') {
    if (e.key === 'Escape') hideAllExamOverlays();
    return;
  }
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  var overlay = document.getElementById('gram-review-overlay');
  if (overlay && overlay.style.display !== 'none') {
    if (e.key === 'ArrowLeft') reviewNav(-1);
    if (e.key === 'ArrowRight') reviewNav(1);
    if (e.key === 'Escape') closeReview();
    return;
  }
  var lvlIdx = LEVELS.indexOf(currentLevel);
  if (e.key === 'ArrowLeft' && lvlIdx > 0 && !searchQuery) setLevel(LEVELS[lvlIdx - 1]);
  if (e.key === 'ArrowRight' && lvlIdx < LEVELS.length - 1 && !searchQuery) setLevel(LEVELS[lvlIdx + 1]);
  if ((e.key === 'ArrowUp' || e.key === 'ArrowDown') && !searchQuery) {
    e.preventDefault();
    var rules = getRulesToShow();
    var ids = rules.map(function(r) { return r.id; });
    var cur = ids.indexOf(openRuleId);
    var next;
    if (e.key === 'ArrowDown') next = cur === -1 ? 0 : Math.min(cur + 1, ids.length - 1);
    else next = cur <= 0 ? 0 : cur - 1;
    openRuleId = ids[next];
    markRead(openRuleId);
    renderAll();
    var el = document.getElementById('rule-' + openRuleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  if (e.key.toLowerCase() === 'f' && openRuleId) {
    var favs = getFavs();
    var idx = favs.indexOf(openRuleId);
    if (idx === -1) favs.push(openRuleId); else favs.splice(idx, 1);
    saveFavs(favs);
    renderAll();
    showToast(idx === -1 ? '★ Guardado en favoritos' : '☆ Eliminado de favoritos');
  }
});

// ─── Práctica con IA ─────────────────────────────────────────────────────────

const LEVEL_TOPICS = {
  A1: 'saludos, familia, números, colores, objetos cotidianos',
  A2: 'saludos, familia, números, colores, objetos cotidianos, compras, comida, tiempo libre, viajes simples, rutina diaria',
  B1: 'saludos, familia, compras, comida, tiempo libre, viajes, rutina, trabajo, estudios, opiniones, noticias simples, experiencias personales',
  B2: 'familia, trabajo, estudios, opiniones, noticias, cultura, argumentación, temas abstractos, medio ambiente, sociedad',
  C1: 'cultura, argumentación, temas abstractos, sociedad, ámbito académico, expresiones matizadas, debates complejos, política, economía',
  C2: 'ámbito académico, debates complejos, política, economía, literatura, filosofía, ironía, lenguaje idiomático avanzado, retórica',
};

const PRACTICE_EXERCISE_COUNT = 5;

const PRACTICE_SYSTEM_PROMPT =
  'Eres un profesor de alemán. Genera exactamente ' + PRACTICE_EXERCISE_COUNT + ' oraciones de práctica en JSON para una regla gramatical.\n' +
  'Responde ÚNICAMENTE con un array JSON válido: [{"de":"...","es":"..."},...]\n' +
  'Sin texto adicional ni bloques de código markdown.\n' +
  'Las oraciones deben ser distintas entre sí y distintas a los ejemplos ya usados en la explicación.\n' +
  'Usa vocabulario y temas apropiados al nivel CEFR indicado.';

function buildPracticePrompt(rule, level, extraUsed) {
  const topics = LEVEL_TOPICS[level] || LEVEL_TOPICS.A1;
  const existing = [...rule.ejemplos.map(e => e.de), ...(extraUsed || [])].join(' / ');
  return (
    'Nivel: ' + level + '\n' +
    'Regla: ' + rule.titulo + ' — ' + rule.subtitulo + '\n' +
    'Clave: ' + rule.tip + '\n' +
    'Temas disponibles: ' + topics + '\n' +
    'Ejemplos YA USADOS (no repetir): ' + existing + '\n\n' +
    'Genera ' + PRACTICE_EXERCISE_COUNT + ' oraciones nuevas que practiquen esta regla. Varía los temas entre sí.'
  );
}

// Fetches (from cache) or generates a set of practice sentences for a rule.
// Reuses sets already generated by other users before asking the AI for a new one,
// mirroring the reading_texts/user_reading_seen pattern in lectura veloz.html.
async function getPracticeSentences(rule, level) {
  if (!window.sb || !window.currentUser) throw new Error('no_auth');

  const { data: existingSets, error: setsErr } = await window.sb
    .from('grammar_practice_exercises')
    .select('id, oraciones')
    .eq('rule_id', rule.id);
  if (setsErr) throw new Error('db_error');

  const { data: seen, error: seenErr } = await window.sb
    .from('user_grammar_practice_seen')
    .select('exercise_id')
    .eq('user_id', window.currentUser.id);
  if (seenErr) throw new Error('db_error');

  const seenIds = new Set((seen || []).map(r => r.exercise_id));
  const unseen = (existingSets || []).filter(s => !seenIds.has(s.id));

  let chosen;
  if (unseen.length > 0) {
    chosen = unseen[Math.floor(Math.random() * unseen.length)];
  } else {
    const extraUsed = (existingSets || []).flatMap(s => (s.oraciones || []).map(o => o.de));
    chosen = await generatePracticeSet(rule, level, extraUsed);
  }

  await window.sb.from('user_grammar_practice_seen').upsert(
    { user_id: window.currentUser.id, exercise_id: chosen.id },
    { onConflict: 'user_id,exercise_id' }
  );

  return chosen.oraciones;
}

async function generatePracticeSet(rule, level, extraUsed) {
  const token = typeof window.getAuthToken === 'function' ? await window.getAuthToken() : null;
  if (!token) throw new Error('no_auth');

  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({
      action: 'generate-practice',
      ruleId: rule.id,
      level: level,
      system: PRACTICE_SYSTEM_PROMPT,
      prompt: buildPracticePrompt(rule, level, extraUsed)
    })
  });

  const raw = await resp.text();
  let data;
  try { data = JSON.parse(raw); } catch(e) { throw new Error('server_error'); }
  if (!resp.ok) {
    if (resp.status === 429) throw new Error('rate_limit');
    throw new Error(data.error || 'api_error');
  }
  if (!data.exercise || !Array.isArray(data.exercise.oraciones) || data.exercise.oraciones.length === 0) {
    throw new Error('empty_response');
  }
  return data.exercise;
}

// ─── Modo Examen ──────────────────────────────────────────────────────────────
const EXAM_RULES_COUNT = 5;
const EXAM_MIXED_RULES_PER_LEVEL = 2;

const EXAM_SYSTEM_PROMPT =
  'Eres un profesor de alemán. Genera exactamente 2 ejercicios de gramática alemana en JSON para la regla indicada.\n\n' +
  'TIPO "completar":\n' +
  '  instruccion: frase corta en español que indica qué escribir.\n' +
  '    Ejemplos: "Escribe el artículo en Akkusativ." / "Conjuga el verbo en Präsens (ich)."\n' +
  '  enunciado: frase alemana con UN solo hueco marcado como ___\n' +
  '  respuesta_correcta: la única forma correcta del hueco (minúscula si no es nombre propio)\n\n' +
  'TIPO "elegir":\n' +
  '  instruccion: frase corta en español sobre lo que se evalúa.\n' +
  '  enunciado: la frase o contexto en alemán (sin las opciones)\n' +
  '  opciones: array de 4 strings que difieren SOLO en el aspecto gramatical evaluado\n' +
  '  respuesta_correcta: exactamente una de las opciones, con la misma grafía\n\n' +
  'TIPO "detectar_error":\n' +
  '  instruccion: "Corrige el error gramatical." (en español)\n' +
  '  enunciado: frase alemana con UN solo error gramatical\n' +
  '  respuesta_correcta: solo la forma correcta de la palabra errónea (no toda la frase)\n\n' +
  'TIPO "transformar":\n' +
  '  instruccion: instrucción clara en español (ej. "Transforma al Perfekt." / "Pon en plural.")\n' +
  '  enunciado: la frase alemana base\n' +
  '  respuesta_correcta: solo el fragmento transformado clave\n\n' +
  'TIPO "ordenar":\n' +
  '  instruccion: "Escribe las palabras en el orden correcto."\n' +
  '  enunciado: palabras desordenadas separadas por / (ej. "ins / gehe / ich / Kino")\n' +
  '  respuesta_correcta: la frase completa correcta\n\n' +
  'PARA TODOS:\n' +
  '  explicacion: 2-3 frases explicando POR QUÉ esa es la respuesta correcta.\n' +
  '  regla_id: el id de la regla evaluada.\n\n' +
  'Campos obligatorios: tipo, instruccion, enunciado, respuesta_correcta, explicacion, regla_id.\n' +
  'Para "elegir": incluye también opciones.\n' +
  'Usa tipos variados — los 2 ejercicios deben ser de tipos distintos si es posible.\n\n' +
  'Responde ÚNICAMENTE con un array JSON válido. Sin texto adicional ni bloques de código markdown.';

function pickRandomRules(level, count) {
  const rules = GRAMMAR_DATA[level];
  return [...rules].sort(function() { return Math.random() - 0.5; }).slice(0, count);
}

function buildExamPromptForRule(rule) {
  var ejemplos = rule.ejemplos.slice(0, 2).map(function(e) {
    return '     • ' + e.de + ' → ' + e.es;
  }).join('\n');
  return 'Genera 2 ejercicios sobre esta regla:\n\n' +
    '[regla_id: ' + rule.id + '] ' + rule.titulo + ' — ' + rule.subtitulo + '\n' +
    'Clave: ' + rule.tip + '\n' +
    'Ejemplos:\n' + ejemplos;
}

function findRuleById(id) {
  var levels = Object.keys(GRAMMAR_DATA);
  for (var i = 0; i < levels.length; i++) {
    var rules = GRAMMAR_DATA[levels[i]];
    for (var j = 0; j < rules.length; j++) {
      if (rules[j].id === id) return rules[j];
    }
  }
  return null;
}

function hideAllExamOverlays() {
  ['exam-loading-overlay', 'exam-question-overlay', 'exam-results-overlay'].forEach(function(id) {
    document.getElementById(id).style.display = 'none';
  });
}

function examRepeat() {
  if (examIsMixed) { startMixedExam(); } else { startExam(); }
}

async function startExam() {
  examIsMixed = false;
  examSelectedRules = pickRandomRules(currentLevel, EXAM_RULES_COUNT);
  startExamWithRules();
}

async function startMixedExam() {
  examIsMixed = true;
  var levels = ['A1', 'A2', 'B1', 'B2'];
  examSelectedRules = [];
  levels.forEach(function(lvl) {
    var rules = GRAMMAR_DATA[lvl] || [];
    var shuffled = [...rules].sort(function() { return Math.random() - 0.5; });
    examSelectedRules = examSelectedRules.concat(shuffled.slice(0, EXAM_MIXED_RULES_PER_LEVEL));
  });
  startExamWithRules();
}

async function startExamWithRules() {
  hideAllExamOverlays();
  examQuestions = [];
  examAnswers = [];
  examCurrentIndex = 0;
  examTotalExpected = examSelectedRules.length * 2;

  const rulesList = document.getElementById('exam-rules-list');
  rulesList.innerHTML = examSelectedRules.map(function(r) {
    return '<li>' + r.titulo + '</li>';
  }).join('');
  document.getElementById('exam-loading-error').style.display = 'none';
  document.getElementById('exam-loading-spinner').style.display = '';
  document.getElementById('exam-retry-btn').style.display = 'none';
  document.getElementById('exam-loading-overlay').style.display = 'flex';

  try {
    var firstBatch = await fetchRuleQuestions(examSelectedRules[0]);
    examQuestions[0] = firstBatch[0] || null;
    examQuestions[1] = firstBatch[1] || null;

    hideAllExamOverlays();
    renderExamQuestion(0);
    document.getElementById('exam-question-overlay').style.display = 'flex';

    // Fetch remaining rules in parallel, updating slots as they arrive
    examSelectedRules.slice(1).forEach(function(rule, idx) {
      var ruleIdx = idx + 1;
      var baseIdx = ruleIdx * 2;
      examQuestions[baseIdx] = { _state: 'loading' };
      examQuestions[baseIdx + 1] = { _state: 'loading' };

      fetchRuleQuestions(rule).then(function(batch) {
        examQuestions[baseIdx] = batch[0] || null;
        examQuestions[baseIdx + 1] = batch[1] || null;
        if (examCurrentIndex === baseIdx || examCurrentIndex === baseIdx + 1) {
          renderExamQuestion(examCurrentIndex);
        }
      }).catch(function() {
        examQuestions[baseIdx] = { _state: 'error', ruleIdx: ruleIdx };
        examQuestions[baseIdx + 1] = { _state: 'error', ruleIdx: ruleIdx };
        if (examCurrentIndex === baseIdx || examCurrentIndex === baseIdx + 1) {
          renderExamQuestion(examCurrentIndex);
        }
      });
    });

  } catch(err) {
    document.getElementById('exam-loading-spinner').style.display = 'none';
    var errEl = document.getElementById('exam-loading-error');
    if (err.message === 'no_auth') {
      errEl.textContent = 'Inicia sesión para usar el modo examen.';
    } else if (err.message === 'rate_limit') {
      errEl.textContent = 'Límite de peticiones alcanzado, espera un momento.';
    } else {
      errEl.textContent = 'No se pudo generar el examen. Intenta de nuevo.';
    }
    errEl.style.display = '';
    document.getElementById('exam-retry-btn').style.display = '';
  }
}

async function retryRuleBatch(ruleIdx) {
  var baseIdx = ruleIdx * 2;
  examQuestions[baseIdx] = { _state: 'loading' };
  examQuestions[baseIdx + 1] = { _state: 'loading' };
  if (examCurrentIndex === baseIdx || examCurrentIndex === baseIdx + 1) {
    renderExamQuestion(examCurrentIndex);
  }
  try {
    var batch = await fetchRuleQuestions(examSelectedRules[ruleIdx]);
    examQuestions[baseIdx] = batch[0] || null;
    examQuestions[baseIdx + 1] = batch[1] || null;
  } catch(e) {
    examQuestions[baseIdx] = { _state: 'error', ruleIdx: ruleIdx };
    examQuestions[baseIdx + 1] = { _state: 'error', ruleIdx: ruleIdx };
  }
  if (examCurrentIndex === baseIdx || examCurrentIndex === baseIdx + 1) {
    renderExamQuestion(examCurrentIndex);
  }
}

function renderExamQuestion(index) {
  examCurrentIndex = index;
  var q = examQuestions[index];
  var total = examTotalExpected;
  document.getElementById('exam-q-counter').textContent = 'Pregunta ' + (index + 1) + ' / ' + total;
  document.getElementById('exam-progress-bar').style.width = ((index / total) * 100) + '%';
  document.getElementById('exam-next-btn').style.display = 'none';

  if (!q || q._state === 'loading') {
    document.getElementById('exam-q-body').innerHTML =
      '<div class="exam-q-pending"><div class="exam-spinner exam-spinner-sm"></div>' +
      '<p>Cargando pregunta…</p></div>';
    return;
  }

  if (q._state === 'error') {
    var ri = q.ruleIdx;
    document.getElementById('exam-q-body').innerHTML =
      '<div class="exam-q-pending exam-q-error">' +
      '<p>No se pudo cargar esta pregunta.</p>' +
      '<button class="exam-action-btn" onclick="retryRuleBatch(' + ri + ')">↺ Reintentar</button>' +
      '</div>';
    return;
  }

  var html = (q.instruccion ? '<p class="exam-instruccion">' + esc(q.instruccion) + '</p>' : '') +
    '<p class="exam-enunciado">' + esc(q.enunciado) + '</p>';

  if (q.tipo === 'elegir') {
    html += '<div class="exam-options">' +
      (q.opciones || []).map(function(op) {
        return '<button class="exam-option-btn" onclick="selectExamOption(this,\'' + esc(op) + '\')">' + esc(op) + '</button>';
      }).join('') + '</div>';
  } else {
    html += '<div class="exam-input-wrap">' +
      '<input id="exam-input" class="exam-input" type="text" placeholder="Escribe la respuesta…" autocomplete="off" ' +
      'onkeydown="if(event.key===\'Enter\')submitExamInput()">' +
      '<button class="exam-submit-btn" onclick="submitExamInput()">→</button>' +
      '</div>';
  }

  html += '<div id="exam-feedback" class="exam-feedback" style="display:none"></div>';
  document.getElementById('exam-q-body').innerHTML = html;

  if (q.tipo !== 'elegir') {
    setTimeout(function() {
      var inp = document.getElementById('exam-input');
      if (inp) inp.focus();
    }, 50);
  }
}

function showExamFeedback(isCorrect, q) {
  var fb = document.getElementById('exam-feedback');
  if (!fb) return;
  fb.className = 'exam-feedback ' + (isCorrect ? 'correct' : 'wrong');
  var expText = q.explicacion ? '<span class="exam-fb-exp">' + esc(q.explicacion) + '</span>' : '';
  fb.innerHTML =
    '<span class="exam-fb-icon">' + (isCorrect ? '✓' : '✗') + '</span>' +
    '<div class="exam-fb-text">' +
    (isCorrect
      ? '<strong>Correcto</strong>'
      : 'Incorrecto — la respuesta era <strong>' + esc(q.respuesta_correcta) + '</strong>') +
    (expText ? '<br>' + expText : '') +
    '</div>';
  fb.style.display = 'flex';

  var isLast = examCurrentIndex >= examTotalExpected - 1;
  var nextBtn = document.getElementById('exam-next-btn');
  nextBtn.textContent = isLast ? 'Ver resultados' : 'Siguiente →';
  nextBtn.style.display = '';
}

function selectExamOption(btn, value) {
  if (btn.classList.contains('selected')) return;
  var q = examQuestions[examCurrentIndex];
  var isCorrect = value.trim().toLowerCase() === (q.respuesta_correcta || '').trim().toLowerCase();

  document.querySelectorAll('.exam-option-btn').forEach(function(b) {
    b.disabled = true;
    if (b.textContent.trim().toLowerCase() === (q.respuesta_correcta || '').trim().toLowerCase()) {
      b.classList.add('exam-opt-correct');
    }
  });
  btn.classList.add('selected', isCorrect ? 'exam-opt-correct' : 'exam-opt-wrong');
  examAnswers[examCurrentIndex] = value;
  showExamFeedback(isCorrect, q);
}

function submitExamInput() {
  var inp = document.getElementById('exam-input');
  if (!inp) return;
  var val = inp.value.trim();
  if (!val) return;
  inp.disabled = true;
  var submitBtn = document.querySelector('.exam-submit-btn');
  if (submitBtn) submitBtn.disabled = true;
  var q = examQuestions[examCurrentIndex];
  var isCorrect = val.toLowerCase() === (q.respuesta_correcta || '').trim().toLowerCase();
  examAnswers[examCurrentIndex] = val;
  showExamFeedback(isCorrect, q);
}

function examNext() {
  if (examCurrentIndex < examTotalExpected - 1) {
    renderExamQuestion(examCurrentIndex + 1);
  } else {
    showExamResults();
  }
}

function showExamResults() {
  hideAllExamOverlays();
  var total = examTotalExpected;
  var correct = 0;
  var items = [];
  for (var i = 0; i < total; i++) {
    var q = examQuestions[i];
    if (!q || q._state) {
      items.push({ q: { enunciado: '—', respuesta_correcta: '—', regla_id: null }, userAnswer: '', isCorrect: false });
      continue;
    }
    var userAnswer = (examAnswers[i] || '').trim().toLowerCase();
    var correctAnswer = (q.respuesta_correcta || '').trim().toLowerCase();
    var isCorrect = userAnswer === correctAnswer;
    if (isCorrect) correct++;
    items.push({ q: q, userAnswer: examAnswers[i] || '', isCorrect: isCorrect });
  }

  var pct = Math.round((correct / total) * 100);
  var emoji = pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '📚';
  var levelLabel = examIsMixed ? 'Mixto A1–B2' : 'Nivel ' + currentLevel;
  var rulesLabel = examSelectedRules.length + ' reglas';

  var html = '<h2 class="exam-score">' + emoji + ' ' + correct + ' / ' + total + '</h2>' +
    '<p class="exam-score-sub">' + levelLabel + ' · ' + rulesLabel + ' · ' + pct + '%</p>' +
    '<div class="exam-results-list">';
  items.forEach(function(item) {
    html += '<div class="exam-result-item ' + (item.isCorrect ? 'correct' : 'wrong') + '">' +
      '<span class="exam-result-icon">' + (item.isCorrect ? '✅' : '❌') + '</span>' +
      '<div class="exam-result-detail">' +
      '<p class="exam-result-q">' + esc(item.q.enunciado) + '</p>';
    if (!item.isCorrect && item.q.respuesta_correcta !== '—') {
      html += '<p class="exam-result-answer">Tu respuesta: <em>' + esc(item.userAnswer || '—') + '</em></p>' +
        '<p class="exam-result-answer exam-result-correct">Correcta: <strong>' + esc(item.q.respuesta_correcta) + '</strong></p>';
    }
    if (item.q.explicacion) {
      html += '<p class="exam-result-exp">' + esc(item.q.explicacion) + '</p>';
    }
    html += '</div></div>';
  });
  html += '</div>';

  // Rule summary for failed rules (3.3)
  var rulePerf = {};
  items.forEach(function(item) {
    var rid = item.q.regla_id;
    if (!rid) return;
    if (!rulePerf[rid]) rulePerf[rid] = { total: 0, correct: 0 };
    rulePerf[rid].total++;
    if (item.isCorrect) rulePerf[rid].correct++;
  });
  var failedRuleIds = Object.keys(rulePerf).filter(function(rid) {
    return rulePerf[rid].correct < rulePerf[rid].total;
  });
  if (failedRuleIds.length > 0) {
    html += '<div class="exam-rule-summary"><p class="exam-rule-summary-title">📖 Reglas a repasar:</p><ul>';
    failedRuleIds.forEach(function(rid) {
      var perf = rulePerf[rid];
      var rule = findRuleById(rid);
      var title = rule ? rule.titulo : rid;
      html += '<li>' + esc(title) + ' — ' + perf.correct + '/' + perf.total +
        ' <a href="#' + rid + '" class="exam-rule-link" onclick="examGoToRule(\'' + esc(rid) + '\');return false;">→ Ver regla</a></li>';
    });
    html += '</ul></div>';
  }

  // SRS auto-update (3.6)
  var srsUpdatedCount = 0;
  Object.keys(rulePerf).forEach(function(rid) {
    var perf = rulePerf[rid];
    var rating = perf.correct === perf.total ? 4 : (perf.correct > 0 ? 2 : 1);
    updateSRSEntry(rid, rating);
    if (rating <= 2) srsUpdatedCount++;
  });
  if (srsUpdatedCount > 0) {
    html += '<p class="exam-srs-note">✓ SRS actualizado — ' + srsUpdatedCount + ' regla' +
      (srsUpdatedCount > 1 ? 's' : '') + ' programada' + (srsUpdatedCount > 1 ? 's' : '') + ' para repaso.</p>';
  }

  document.getElementById('exam-results-body').innerHTML = html;

  var failedCount = items.filter(function(it) { return !it.isCorrect && it.q.regla_id; }).length;
  document.getElementById('exam-show-failed-btn').style.display = failedCount > 0 ? '' : 'none';
  document.getElementById('exam-results-overlay').style.display = 'flex';

  if (window.sb && window.currentUser) {
    window.sb.from('exam_results').insert({
      user_id: window.currentUser.id,
      level: examIsMixed ? 'MIXED' : currentLevel,
      score: correct,
      total: total,
      rules: examSelectedRules.map(function(r) { return r.id; }),
      answers: items.map(function(it) {
        return {
          enunciado: it.q.enunciado,
          respuesta_correcta: it.q.respuesta_correcta,
          user_answer: it.userAnswer,
          is_correct: it.isCorrect
        };
      })
    }).then(function(res) {
      if (res.error) console.warn('[exam_results] insert failed:', res.error.message);
    });
  }
}

function examGoToRule(ruleId) {
  hideAllExamOverlays();
  var levelKey = ruleId.replace(/-.*$/, '').toUpperCase();
  if (GRAMMAR_DATA[levelKey]) setLevel(levelKey, false);
  openRuleId = ruleId;
  renderAll();
  setTimeout(function() {
    var el = document.getElementById('rule-' + ruleId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 80);
}

function examShowFailedRules() {
  var items = [];
  for (var i = 0; i < examTotalExpected; i++) {
    var q = examQuestions[i];
    if (!q || q._state) continue;
    var isCorrect = (examAnswers[i] || '').trim().toLowerCase() === (q.respuesta_correcta || '').trim().toLowerCase();
    items.push({ reglaId: q.regla_id, isCorrect: isCorrect });
  }
  var failedIds = items
    .filter(function(it) { return !it.isCorrect && it.reglaId; })
    .map(function(it) { return it.reglaId; });
  if (failedIds.length === 0) return;
  examGoToRule(failedIds[0]);
}

function examConfirmExit() {
  if (confirm('¿Salir del examen? Se perderá el progreso.')) hideAllExamOverlays();
}

async function fetchRuleQuestions(rule) {
  const token = typeof window.getAuthToken === 'function' ? await window.getAuthToken() : null;
  if (!token) throw new Error('no_auth');

  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({
      system: EXAM_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: buildExamPromptForRule(rule) }],
      max_tokens: 700
    })
  });

  const raw = await resp.text();
  let data;
  try { data = JSON.parse(raw); } catch(e) { throw new Error('server_error'); }
  if (!resp.ok) {
    if (resp.status === 429) throw new Error('rate_limit');
    throw new Error(data.error || 'api_error');
  }

  const reply = data.reply || '';
  let questions;
  try {
    questions = JSON.parse(reply);
  } catch(e) {
    const mdMatch = reply.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (mdMatch) {
      try { questions = JSON.parse(mdMatch[1].trim()); } catch(e2) { throw new Error('json_error'); }
    } else {
      const arrMatch = reply.match(/\[[\s\S]*\]/);
      if (arrMatch) {
        try { questions = JSON.parse(arrMatch[0]); } catch(e2) { throw new Error('json_error'); }
      } else {
        throw new Error('json_error');
      }
    }
  }

  if (!Array.isArray(questions) || questions.length === 0) throw new Error('empty_response');
  return questions;
}

// ─── Flashcard mode ──────────────────────────────────────────────────────────
function openFlashcards() {
  fcRules = showFavsOnly
    ? (function() {
        var favs = getFavs(), all = [];
        for (var l of LEVELS) GRAMMAR_DATA[l].forEach(function(r) { if (favs.includes(r.id)) all.push(r); });
        return all;
      })()
    : GRAMMAR_DATA[currentLevel].slice();
  if (fcRules.length === 0) { showToast('No hay reglas para mostrar.'); return; }
  fcIndex = 0;
  fcFlipped = false;
  renderFlashcard();
  document.getElementById('fc-overlay').style.display = 'flex';
}

function closeFlashcards() {
  document.getElementById('fc-overlay').style.display = 'none';
}

function renderFlashcard() {
  var rule = fcRules[fcIndex];
  if (!rule) return;
  var card = document.getElementById('fc-card');
  card.classList.toggle('flipped', fcFlipped);

  var readTimeMin = Math.ceil(rule.explicacion.split(' ').length / 200);
  var frontHtml =
    '<span class="fc-front-num">Regla ' + (fcIndex + 1) + ' de ' + fcRules.length + '</span>' +
    '<span class="fc-front-title">' + rule.titulo + '</span>' +
    '<span class="fc-front-sub">' + rule.subtitulo + '</span>' +
    (rule.regla_base ? '<div class="fc-front-base">' + rule.regla_base + '</div>' : '') +
    '<div class="fc-front-tip">💡 ' + rule.tip + '</div>';

  var backExamples = rule.ejemplos.slice(0, 3).map(function(ej) {
    return '<div class="fc-back-ej"><strong>' + ej.de + '</strong> → ' + ej.es + '</div>';
  }).join('');

  var backHtml =
    '<span class="fc-back-title">' + rule.titulo + '</span>' +
    (rule.regla_base ? '<div class="gram-regla-base" style="font-size:13px;margin-bottom:8px"><span class="gram-regla-base-icon">📌</span>' + rule.regla_base + '</div>' : '') +
    (rule.tabla ? renderTabla(rule.tabla) : '') +
    (rule.excepciones ? '<div class="gram-excepcion" style="font-size:12px;margin-bottom:8px"><span class="gram-excepcion-icon">⚠️</span><span>' + rule.excepciones + '</span></div>' : '') +
    '<p class="fc-back-exp">' + rule.explicacion + '</p>' +
    '<div class="fc-back-examples">' + backExamples + '</div>' +
    '<span style="font-size:11px;opacity:0.4;margin-top:8px">~' + readTimeMin + ' min</span>';

  document.getElementById('fc-front').innerHTML = frontHtml;
  document.getElementById('fc-back').innerHTML = backHtml;
  document.getElementById('fc-counter').textContent = (fcIndex + 1) + ' / ' + fcRules.length;
  document.getElementById('fc-hint').textContent = fcFlipped ? 'Toca para ocultar' : 'Toca para ver';
  document.getElementById('fc-prev').disabled = fcIndex === 0;
  document.getElementById('fc-next').textContent = fcIndex === fcRules.length - 1 ? '✓ Fin' : 'Siguiente →';
}

function flipCard() {
  fcFlipped = !fcFlipped;
  document.getElementById('fc-card').classList.toggle('flipped', fcFlipped);
  document.getElementById('fc-hint').textContent = fcFlipped ? 'Toca para ocultar' : 'Toca para ver';
}

function flashcardNav(dir) {
  var next = fcIndex + dir;
  if (next < 0 || next >= fcRules.length) {
    if (dir > 0 && next >= fcRules.length) closeFlashcards();
    return;
  }
  fcIndex = next;
  fcFlipped = false;
  renderFlashcard();
}

(function initFlashcardKeys() {
  document.addEventListener('keydown', function(e) {
    if (document.getElementById('fc-overlay').style.display === 'none') return;
    if (e.key === 'ArrowRight') flashcardNav(1);
    else if (e.key === 'ArrowLeft') flashcardNav(-1);
    else if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipCard(); }
    else if (e.key === 'Escape') closeFlashcards();
  });
  document.getElementById('fc-overlay').addEventListener('touchstart', function(e) {
    fcTouchStartX = e.touches[0].clientX;
    fcTouchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.getElementById('fc-overlay').addEventListener('touchend', function(e) {
    if (e.target.closest('.fc-modal') === null) return;
    var dx = e.changedTouches[0].clientX - fcTouchStartX;
    var dy = e.changedTouches[0].clientY - fcTouchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      flashcardNav(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
})();

// ─── Exam history ─────────────────────────────────────────────────────────────
async function openHistory() {
  document.getElementById('history-overlay').style.display = 'flex';
  var body = document.getElementById('history-body');
  body.innerHTML = '<div class="history-empty">Cargando…</div>';

  if (!window.sb || !window.currentUser) {
    body.innerHTML = '<div class="history-empty">Inicia sesión para ver tu historial.</div>';
    return;
  }

  var res = await window.sb.from('exam_results')
    .select('level,score,total,created_at')
    .eq('user_id', window.currentUser.id)
    .order('created_at', { ascending: false })
    .limit(5);

  if (res.error || !res.data || res.data.length === 0) {
    body.innerHTML = '<div class="history-empty">No hay exámenes registrados todavía.</div>';
    return;
  }

  body.innerHTML = res.data.map(function(row) {
    var pct = row.total > 0 ? Math.round((row.score / row.total) * 100) : 0;
    var date = new Date(row.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
    return '<div class="history-row">' +
      '<span class="history-row-level">' + row.level + '</span>' +
      '<span class="history-row-score">' + row.score + ' / ' + row.total + ' <span style="opacity:0.5;font-size:13px">(' + pct + '%)</span></span>' +
      '<span class="history-row-date">' + date + '</span>' +
      '</div>';
  }).join('');
}

function closeHistory() {
  document.getElementById('history-overlay').style.display = 'none';
}

// ─── Dark mode ────────────────────────────────────────────────────────────────
var _moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
var _sunSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function toggleGramDark() {
  document.body.classList.toggle('dark');
  var isDark = document.body.classList.contains('dark');
  document.getElementById('darkModeBtn').innerHTML = isDark ? _sunSVG : _moonSVG;
  localStorage.setItem('darkMode_gram', isDark);
}

// ─── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('popstate', function() {
  var parsed = parseHash();
  currentLevel = parsed.level;
  openRuleId = parsed.ruleId;
  if (parsed.ruleId) markRead(parsed.ruleId);
  renderAll();
  if (parsed.ruleId) {
    setTimeout(function() {
      var el = document.getElementById('rule-' + parsed.ruleId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  if (localStorage.getItem('darkMode_gram') !== 'false') {
    document.body.classList.add('dark');
    document.getElementById('darkModeBtn').innerHTML = _sunSVG;
  }
  var parsed = parseHash();
  currentLevel = parsed.level;
  openRuleId = parsed.ruleId;
  if (parsed.ruleId) markRead(parsed.ruleId);
  renderAll();
  updateDailyDisplay();
  if (parsed.ruleId) {
    setTimeout(function() {
      var el = document.getElementById('rule-' + parsed.ruleId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 80);
  }
});
