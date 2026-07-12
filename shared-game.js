// shared-game.js — lógica compartida entre palabrasB2.html y B1.html
// Define window.APP_CONFIG antes de cargar este script:
//   { appId, dataFile, limitKey, darkKey, swFile, syncId, accent }

(function () {
  const CFG       = window.APP_CONFIG || {};
  const APP       = CFG.appId    || 'b2';
  const DATA_FILE = CFG.dataFile  || 'DATA.json';
  const LIMIT_KEY = CFG.limitKey  || 'b2_palabras_limite';
  const DARK_KEY  = CFG.darkKey   || 'darkMode_b2';
  const SW_FILE   = CFG.swFile    || '/sw.js';
  const SYNC_ID   = CFG.syncId    || ('recordatorio-aleman-' + APP);
  const ACCENT    = CFG.accent    || '#1976D2';

  let DATA = {};

  const State = {
    activeSets:       new Set(),
    es:               [],
    de:               [],
    vistos:           [],
    erroresSet:       new Set(),
    modoAuto:         true,
    modoDual:         false,
    dualFlip:         false,
    timerStarted:     false,
    timerId:          null,
    seconds:          0,
    winnummer:        100,
    quizTotal:        0,
    quizCorrect:      0,
    quizBatchTotal:   0,
    quizBatchCorrect: 0,
    sessionStartedAt: null,
    currentIndex:     null,
    optionIdxs:       [],
    modoInverso:      false,
    palabrasContadas: 0,
    palabrasLimite:   parseInt(localStorage.getItem(LIMIT_KEY) || '100', 10),
    selectionLock:    false,
    roundToken:       0,
    modoSRS:          false,
  };

  const $ = id => document.getElementById(id);

  function safeText(el, txt) {
    if (!el) return;
    el.textContent = txt ?? '';
  }

  function escapeHtml(s) {
    return String(s)
      .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;').replaceAll("'", '&#039;');
  }

  function shuffleUniqueIndexes(length, count, forcedIndex = null) {
    const set = new Set();
    while (set.size < count) set.add(Math.floor(Math.random() * length));
    const arr = [...set];
    if (forcedIndex !== null) arr[Math.floor(Math.random() * count)] = forcedIndex;
    return arr;
  }

  function nextUnseenIndex() {
    if (!State.de.length) return 0;

    // SRS mode: only pick from due words
    if (State.modoSRS) {
      const due = srsDueIndices();
      if (due.length === 0) {
        State.modoSRS = false;
        updateSRSBtnUI();
        showToast('SRS completado — todas las palabras revisadas');
        // Fall through to normal mode
      } else {
        const pick = due[Math.floor(Math.random() * due.length)];
        State.vistos.push(pick);
        return pick;
      }
    }

    if (State.vistos.length >= State.de.length - 3) State.vistos = [];
    let tries = 0;
    let idx = Math.floor(Math.random() * State.de.length);
    while (State.vistos.includes(idx) && tries < 20) {
      idx = Math.floor(Math.random() * State.de.length);
      tries++;
    }
    State.vistos.push(idx);
    return idx;
  }

  function renderLista(esArr, deArr) {
    const table = $('lista');
    if (!table) return;
    const pairs = [];
    for (let i = 0; i < Math.min(esArr.length, deArr.length); i++) pairs.push([deArr[i], esArr[i]]);
    pairs.sort((a, b) => String(a[0]).localeCompare(String(b[0])));
    table.innerHTML = `<thead><tr><th>alemán</th><th>español</th></tr></thead>
      <tbody>${pairs.map(p => `<tr><td>${escapeHtml(p[0])}</td><td>${escapeHtml(p[1])}</td></tr>`).join('')}</tbody>`;
  }

  /* ── Sets ──────────────────────────────────────────── */

  function toggleSet(key) {
    if (!DATA[key]) return;
    if (State.activeSets.has(key)) {
      State.activeSets.delete(key);
    } else {
      const wasEmpty = State.activeSets.size === 0;
      State.activeSets.add(key);
      if (wasEmpty) {
        State.sessionStartedAt = Date.now();
        window.logEvent(APP, 'session_start', { app: APP, sets_active: [key] });
      }
    }
    updateSetButtonsUI();
    reloadActiveData();
  }
  window.toggleSet = toggleSet;

  function reloadActiveData() {
    if (State.activeSets.size === 0) {
      State.es = []; State.de = []; State.vistos = [];
      State.erroresSet.clear(); State.currentIndex = null; State.optionIdxs = [];
      safeText($('palabra'), 'Seleccione al menos una lista');
      safeText($('p1'), 'Seleccione al menos una lista');
      safeText($('p2'), '-');
      ['op1', 'op2', 'op3', 'op4'].forEach(id => safeText($(id), '-'));
      const table = $('lista');
      if (table) table.innerHTML = `<thead><tr><th>alemán</th><th>español</th></tr></thead>
        <tbody><tr><td colspan="2" style="text-align:center;color:#999;">Seleccione listas para ver el contenido</td></tr></tbody>`;
      if ($('aciertos')) safeText($('aciertos'), '0');
      if ($('errores'))  safeText($('errores'),  '0');
      stopTimer(); State.timerStarted = false; State.seconds = 0;
      if ($('tiempo')) safeText($('tiempo'), '00:00');
      return;
    }
    const combinedEs = [], combinedDe = [];
    State.activeSets.forEach(k => {
      if (DATA[k]) { combinedEs.push(...DATA[k].es); combinedDe.push(...DATA[k].de); }
    });
    State.es = combinedEs; State.de = combinedDe;
    State.vistos = []; State.erroresSet.clear(); State.currentIndex = null; State.optionIdxs = [];
    if ($('aciertos')) safeText($('aciertos'), '0');
    if ($('errores'))  safeText($('errores'),  '0');
    stopTimer(); State.timerStarted = false; State.seconds = 0;
    if ($('tiempo')) safeText($('tiempo'), '00:00');
    renderLista(State.es, State.de);
    renderRepeatNext();
    renderSelectionNext();
    updateSRSBtnUI();
  }

  function updateSetButtonsUI() {
    const bar = $('sets-bar');
    if (bar) bar.querySelectorAll('button').forEach(btn =>
      btn.classList.toggle('btn-active', State.activeSets.has(btn.textContent)));
    const lpBar = $('lp-sets-bar');
    if (lpBar) lpBar.querySelectorAll('button[data-personal-key]').forEach(btn =>
      btn.classList.toggle('btn-active', State.activeSets.has(btn.dataset.personalKey)));
  }

  function mountSetButtons() {
    const app = document.querySelector('.app');
    if (!app) return;
    let container = $('sets-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'sets-container';
      container.style.marginBottom = '20px';
      const desc = document.createElement('div');
      desc.className = 'lista-info';
      desc.innerHTML = '<strong>Seleccione una o más listas:</strong> Los botones en rojo indican listas activas';
      container.appendChild(desc);
      setTimeout(() => { desc.style.display = 'none'; }, 3000);
      const bar = document.createElement('div');
      bar.id = 'sets-bar'; bar.className = 'panel';
      container.appendChild(bar);
      app.prepend(container);
    }
    const bar = $('sets-bar');
    bar.innerHTML = '';
    Object.keys(DATA).forEach(k => {
      if (k.startsWith('mis: ')) return;
      const btn = document.createElement('button');
      btn.className = 'btn'; btn.textContent = k;
      btn.addEventListener('click', () => toggleSet(k));
      bar.appendChild(btn);
    });
    updateSetButtonsUI();
  }

  function mountSectionTabs() {
    const app = document.querySelector('.app');
    const sections = {
      juego:      $('seleccion-multiple'),
      repeticion: $('repeticion-palabras'),
      lista:      document.querySelector('.table-container'),
    };
    if (!app || !sections.juego || !sections.repeticion || !sections.lista) return;
    if ($('section-tabs')) return;

    const tabs = document.createElement('div');
    tabs.id = 'section-tabs';
    tabs.className = 'panel section-tabs';
    tabs.innerHTML = `
      <button class="btn" data-tab="juego">🎮 Juego</button>
      <button class="btn" data-tab="repeticion">🔁 Repetición</button>
      <button class="btn" data-tab="lista">📋 Lista de palabras</button>
    `;
    sections.juego.parentNode.insertBefore(tabs, sections.juego);

    const STORAGE_KEY = 'section_tab_' + APP;
    let currentTab = null;

    function updateListaHeight() {
      if (currentTab !== 'lista') return;
      const rect = sections.lista.getBoundingClientRect();
      const bottomPadding = 20;
      const h = window.innerHeight - rect.top - bottomPadding;
      sections.lista.style.maxHeight = Math.max(h, 150) + 'px';
    }

    function showTab(name) {
      currentTab = name;
      Object.entries(sections).forEach(([key, el]) => {
        el.style.display = key === name ? '' : 'none';
      });
      tabs.querySelectorAll('button[data-tab]').forEach(btn =>
        btn.classList.toggle('btn-active', btn.dataset.tab === name));
      localStorage.setItem(STORAGE_KEY, name);
      updateListaHeight();
    }
    tabs.querySelectorAll('button[data-tab]').forEach(btn =>
      btn.addEventListener('click', () => showTab(btn.dataset.tab)));

    window.addEventListener('resize', updateListaHeight);
    if (window.ResizeObserver) {
      new ResizeObserver(updateListaHeight).observe(app);
    }

    showTab(localStorage.getItem(STORAGE_KEY) || 'juego');
  }

  /* ── Selección múltiple ────────────────────────────── */

  function renderSelectionNext() {
    if (!State.es.length || !State.de.length) {
      safeText($('palabra'), 'Seleccione al menos una lista');
      ['op1', 'op2', 'op3', 'op4'].forEach(id => safeText($(id), '-'));
      return;
    }
    State.selectionLock = false;
    State.roundToken++;
    const idx = nextUnseenIndex();
    State.currentIndex = idx;
    State.optionIdxs = shuffleUniqueIndexes(State.de.length, 4, idx);
    safeText($('palabra'), State.modoInverso ? State.de[idx] : State.es[idx]);
    ['op1', 'op2', 'op3', 'op4'].forEach((id, slot) => {
      const el = $(id);
      if (!el) return;
      const wi = State.optionIdxs[slot];
      el.textContent = State.modoInverso ? State.es[wi] : State.de[wi];
      el.dataset.wordIndex = String(wi);
      el.dataset.roundToken = String(State.roundToken);
    });
  }

  function markOptionsBackground(color) {
    const cont = document.querySelector('#seleccion-multiple .options-grid') || document.querySelector('.options-grid');
    if (!cont) return;
    cont.style.background = color;
    setTimeout(() => (cont.style.background = ''), 200);
  }

  function handleSelectionPick(chosenWordIndex, token) {
    if (State.currentIndex === null || State.selectionLock) return;
    if (String(token) !== String(State.roundToken)) return;
    State.selectionLock = true;
    if (!State.timerStarted) startTimer();
    const correct = chosenWordIndex === State.currentIndex;
    const wordDe = State.de[State.currentIndex];
    State.quizTotal++;
    State.quizBatchTotal++;
    if (correct) { State.quizCorrect++; State.quizBatchCorrect++; }
    if (State.quizBatchTotal >= 5) {
      window.logEvent(APP, 'quiz_session_end', {
        total:   State.quizBatchTotal,
        correct: State.quizBatchCorrect,
        errors:  State.quizBatchTotal - State.quizBatchCorrect,
      });
      State.quizBatchTotal = 0;
      State.quizBatchCorrect = 0;
    }
    updateSRSCard(wordDe, correct);
    if (correct) {
      markOptionsBackground('green');
      const acEl = $('aciertos');
      if (acEl) acEl.textContent = String(parseInt(acEl.textContent || '0', 10) + 1);
    } else {
      markOptionsBackground('red');
      if (!State.erroresSet.has(State.currentIndex)) {
        State.erroresSet.add(State.currentIndex);
        const erEl = $('errores');
        if (erEl) erEl.textContent = String(parseInt(erEl.textContent || '0', 10) + 1);
      }
    }
    renderSelectionNext();
    updateSRSBtnUI();
  }

  function bindSelectionEvents() {
    const cont = document.querySelector('#seleccion-multiple .options-grid') || document.querySelector('.options-grid');
    if (!cont || cont.dataset.bound === '1') return;
    cont.dataset.bound = '1';
    cont.addEventListener('click', e => {
      const opt = e.target.closest('#op1,#op2,#op3,#op4,.option');
      if (!opt) return;
      const chosen = parseInt(opt.dataset.wordIndex, 10);
      if (Number.isNaN(chosen)) return;
      handleSelectionPick(chosen, opt.dataset.roundToken);
    });
  }

  /* ── Timer ─────────────────────────────────────────── */

  function startTimer() {
    if (State.timerId) return;
    State.timerStarted = true;
    State.timerId = setInterval(() => {
      const ac = parseInt(($('aciertos')?.textContent || '0'), 10);
      if (ac >= State.winnummer) { stopTimer(); return; }
      State.seconds++;
      const m = Math.floor(State.seconds / 60), s = State.seconds % 60;
      safeText($('tiempo'), String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'));
    }, 1000);
  }

  function stopTimer() {
    if (State.timerId) clearInterval(State.timerId);
    State.timerId = null;
  }

  /* ── TTS navegador ─────────────────────────────────── */

  async function speakOnce(text, lang) {
    if (!text) return;
    return new Promise(resolve => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang; u.onend = resolve; u.onerror = resolve;
      speechSynthesis.speak(u);
    });
  }

  /* ── Repetición TTS ────────────────────────────────── */

  function renderRepeatNext() {
    if (!State.es.length || !State.de.length) {
      safeText($('p1'), 'Seleccione al menos una lista');
      safeText($('p2'), '-');
      return;
    }
    const idx = nextUnseenIndex();
    safeText($('p1'), State.es[idx]);
    safeText($('p2'), State.de[idx]);
  }

  async function speakLoop() {
    if (!State.modoAuto) {
      await speakOnce($('p2')?.textContent || '', 'de');
      return;
    }
    while (State.modoAuto) {
      if (!State.modoDual) {
        await speakOnce($('p2')?.textContent || '', 'de');
        incrementPalabraCounter();
        if (State.palabrasContadas >= State.palabrasLimite) { stopAutoByLimit(); return; }
        await wait(500); renderRepeatNext(); continue;
      }
      if (!State.dualFlip) {
        await speakOnce($('p1')?.textContent || '', 'es');
        State.dualFlip = true;
      } else {
        await speakOnce($('p2')?.textContent || '', 'de');
        State.dualFlip = false;
        incrementPalabraCounter();
        if (State.palabrasContadas >= State.palabrasLimite) { stopAutoByLimit(); return; }
        await wait(500); renderRepeatNext();
      }
      await wait(300);
    }
  }

  function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

  function updateCounterDisplay() {
    const span = $('palabra-counter');
    if (!span) return;
    span.textContent = String(State.palabrasContadas).padStart(3, '0') + '/' + String(State.palabrasLimite).padStart(3, '0');
  }

  function incrementPalabraCounter() { State.palabrasContadas++; updateCounterDisplay(); }

  function stopAutoByLimit() {
    window.logEvent(APP, 'auto_session_end', { words_played: State.palabrasContadas });
    State.modoAuto = false;
    const btnAuto = $('auto');
    if (btnAuto) { btnAuto.textContent = 'Auto: OFF'; btnAuto.className = 'btn btn-danger'; }
    releaseWakeLock();
  }

  function bindCounterDblClick() {
    const span = $('palabra-counter');
    if (!span) return;
    updateCounterDisplay();
    span.addEventListener('dblclick', () => {
      const nuevo = prompt('Límite de palabras (número):', State.palabrasLimite);
      if (nuevo === null) return;
      const val = parseInt(nuevo, 10);
      if (!isNaN(val) && val > 0) {
        State.palabrasLimite = val;
        localStorage.setItem(LIMIT_KEY, val);
        updateCounterDisplay();
      }
    });
  }

  /* ── Wake Lock ─────────────────────────────────────── */

  let wakeLock = null;

  async function requestWakeLock() {
    if (!('wakeLock' in navigator)) return;
    try { wakeLock = await navigator.wakeLock.request('screen'); } catch {}
  }

  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release(); wakeLock = null; }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && State.modoAuto && !wakeLock) requestWakeLock();
  });

  function bindRepeatControls() {
    const btnAuto = $('auto'), btnDual = $('dual'), btnLeer = $('leer');

    if (btnAuto) {
      btnAuto.addEventListener('click', () => {
        State.modoAuto = !State.modoAuto;
        btnAuto.textContent = State.modoAuto ? 'Auto: ON' : 'Auto: OFF';
        btnAuto.className = State.modoAuto ? 'btn btn-secondary' : 'btn btn-danger';
        window.logEvent(APP, 'mode_change', { mode: 'auto', active: State.modoAuto });
        if (State.modoAuto) {
          State.palabrasContadas = 0; updateCounterDisplay(); requestWakeLock();
        } else {
          window.logEvent(APP, 'auto_session_end', { words_played: State.palabrasContadas });
          releaseWakeLock();
        }
      });
    }
    if (btnDual) {
      btnDual.addEventListener('click', () => {
        State.modoDual = !State.modoDual; State.dualFlip = false;
        btnDual.textContent = State.modoDual ? 'ES-DE' : 'DE';
        btnDual.className = State.modoDual ? 'btn btn-secondary' : 'btn btn-danger';
      });
    }
    if (btnLeer) {
      btnLeer.addEventListener('click', async () => {
        if (speechSynthesis.speaking) speechSynthesis.cancel();
        if (State.modoAuto) {
          requestWakeLock(); speakLoop();
        } else {
          const wordDe = $('p2')?.textContent || '';
          if (State.modoDual) {
            await speakOnce(wordDe, 'de');
            await speakOnce($('p1')?.textContent || '', 'es');
          } else {
            await speakOnce(wordDe, 'de');
          }
        }
      });
    }
  }

  /* ── Utilidades ────────────────────────────────────── */

  function showToast(msg) {
    const div = document.createElement('div');
    div.textContent = msg;
    Object.assign(div.style, {
      fontSize: '18px', position: 'fixed', top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)', backgroundColor: 'rgba(0,0,0,0.82)',
      color: 'white', padding: '24px 40px', borderRadius: '8px', zIndex: '1000',
      textAlign: 'center', maxWidth: '80vw'
    });
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1500);
  }

  function copiarErrores() {
    if (State.erroresSet.size === 0) { showToast('Sin errores en esta sesión'); return; }
    const lines = [...State.erroresSet].map(i => `${State.es[i]} — ${State.de[i]}`).join('\n');
    navigator.clipboard.writeText(lines)
      .then(() => showToast(`✓ ${State.erroresSet.size} errores copiados`))
      .catch(() => showToast('No se pudo acceder al portapapeles'));
  }
  window.copiarErrores = copiarErrores;

  /* ── SRS (Repetición Espaciada SM-2) ────────────────── */

  const SRS_DB_NAME = 'srs-db-' + APP;
  const SRS_STORE   = 'cards';
  let _srsDb = null;
  const _srsCache = new Map(); // word_de → { word, ease, interval, reps, due }

  function openSRSDB() {
    if (_srsDb) return Promise.resolve(_srsDb);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(SRS_DB_NAME, 1);
      req.onupgradeneeded = e => e.target.result.createObjectStore(SRS_STORE, { keyPath: 'word' });
      req.onsuccess = e => { _srsDb = e.target.result; resolve(_srsDb); };
      req.onerror = () => reject(req.error);
    });
  }

  async function loadSRSCache() {
    try {
      const db = await openSRSDB();
      const cards = await new Promise(resolve => {
        const req = db.transaction(SRS_STORE).objectStore(SRS_STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
      _srsCache.clear();
      cards.forEach(c => _srsCache.set(c.word, c));
    } catch {}
    _syncSRSFromSupabase();
  }

  async function _syncSRSFromSupabase() {
    try {
      const { data: { user } } = await window.sb.auth.getUser();
      if (!user) return;
      const { data, error } = await window.sb
        .from('srs_progress')
        .select('word, ease, interval, reps, due')
        .eq('user_id', user.id)
        .eq('app_id', APP);
      if (error || !data?.length) return;
      const db = await openSRSDB();
      const tx = db.transaction(SRS_STORE, 'readwrite');
      const store = tx.objectStore(SRS_STORE);
      for (const row of data) {
        const local = _srsCache.get(row.word);
        if (!local || row.due > local.due) {
          const card = { word: row.word, ease: Number(row.ease), interval: row.interval, reps: row.reps, due: row.due };
          _srsCache.set(row.word, card);
          store.put(card);
        }
      }
    } catch {}
  }

  async function updateSRSCard(word, correct) {
    const now  = Date.now();
    const card = _srsCache.get(word) || { word, ease: 2.5, interval: 1, reps: 0, due: now };
    if (correct) {
      card.reps++;
      if (card.reps === 1)      card.interval = 1;
      else if (card.reps === 2) card.interval = 6;
      else                      card.interval = Math.round(card.interval * card.ease);
    } else {
      card.reps = 0;
      card.interval = 1;
      card.ease = Math.max(1.3, card.ease - 0.2);
    }
    card.due = now + card.interval * 86_400_000;
    _srsCache.set(word, card);
    try {
      const db = await openSRSDB();
      const tx = db.transaction(SRS_STORE, 'readwrite');
      tx.objectStore(SRS_STORE).put(card);
    } catch {}
    _syncSRSCardToSupabase(card);
  }

  async function _syncSRSCardToSupabase(card) {
    try {
      const { data: { user } } = await window.sb.auth.getUser();
      if (!user) return;
      await window.sb.from('srs_progress').upsert({
        user_id: user.id,
        app_id: APP,
        word: card.word,
        ease: card.ease,
        interval: card.interval,
        reps: card.reps,
        due: card.due,
      }, { onConflict: 'user_id,app_id,word' });
    } catch {}
  }

  function srsDueIndices() {
    const now = Date.now();
    const due = [];
    for (let i = 0; i < State.de.length; i++) {
      const card = _srsCache.get(State.de[i]);
      if (!card || card.due <= now) due.push(i);
    }
    return due;
  }

  function updateSRSBtnUI() {
    const btn = $('btn-srs');
    if (!btn) return;
    const due = srsDueIndices();
    if (State.modoSRS) {
      btn.textContent = `SRS ON (${due.length} pendientes)`;
      btn.style.background = '#388E3C';
      btn.style.borderColor = '#2E7D32';
    } else {
      btn.textContent = due.length > 0 ? `SRS Repaso (${due.length})` : 'SRS Repaso';
      btn.style.background = '';
      btn.style.borderColor = '';
    }
  }

  function montarBotonSRS() {
    if ($('btn-srs')) { updateSRSBtnUI(); return; }
    const footer = _getOrCreateFooterSRS();
    const btn = document.createElement('button');
    btn.id = 'btn-srs';
    btn.className = 'btn';
    btn.addEventListener('click', () => {
      if (!State.de.length) { showToast('Selecciona una lista primero'); return; }
      State.modoSRS = !State.modoSRS;
      if (State.modoSRS) {
        const due = srsDueIndices();
        if (due.length === 0) {
          State.modoSRS = false;
          updateSRSBtnUI();
          showToast('No hay palabras para repasar hoy');
          return;
        }
        showToast(`SRS activado — ${due.length} palabras pendientes`);
      } else {
        showToast('SRS desactivado');
      }
      updateSRSBtnUI();
      renderSelectionNext();
    });
    footer.appendChild(btn);
    updateSRSBtnUI();
  }

  /* ── Frases en contexto ─────────────────────────────── */

  function _getOrCreateFooterSRS() {
    let footer = document.querySelector('#seleccion-multiple .footer-srs');
    if (footer) return footer;
    footer = document.createElement('div');
    footer.className = 'footer-srs';
    footer.style.cssText = 'text-align:center;margin-top:8px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;';
    const section = $('seleccion-multiple');
    if (section) section.appendChild(footer);
    return footer;
  }

  function montarBotonFrases() {
    if ($('btn-frases')) return;
    const footer = _getOrCreateFooterSRS();
    const btn = document.createElement('button');
    btn.id = 'btn-frases';
    btn.className = 'btn';
    btn.textContent = 'Ver frases';
    btn.style.cssText = `background:#5C6BC0;border-color:#3949AB;`;
    btn.addEventListener('click', abrirFrasesModal);
    footer.appendChild(btn);
  }

  async function abrirFrasesModal() {
    if (State.currentIndex === null || !State.de.length) {
      showToast('Selecciona una lista primero');
      return;
    }
    const wordDe = State.de[State.currentIndex];
    const wordEs = State.es[State.currentIndex];

    let overlay = $('frases-modal-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'frases-modal-overlay';
      overlay.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:500;align-items:center;justify-content:center;';
      overlay.innerHTML = `
        <div style="background:var(--card-bg,#fff);color:var(--text,#333);border-radius:14px;padding:24px;width:min(90vw,520px);max-height:80vh;overflow-y:auto;box-shadow:0 8px 32px rgba(0,0,0,0.25);">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <h3 id="frases-modal-title" style="margin:0;font-size:18px;color:#5C6BC0;"></h3>
            <button id="frases-modal-close" style="background:none;border:none;font-size:20px;cursor:pointer;color:var(--text,#333);">✕</button>
          </div>
          <div id="frases-modal-body" style="font-size:15px;line-height:1.7;"></div>
        </div>`;
      overlay.addEventListener('click', e => { if (e.target === overlay) overlay.style.display = 'none'; });
      document.body.appendChild(overlay);
      $('frases-modal-close').addEventListener('click', () => { overlay.style.display = 'none'; });
    }

    $('frases-modal-title').textContent = `"${wordDe}" — ${wordEs}`;
    $('frases-modal-body').innerHTML = '<em style="color:#999;">Generando frases…</em>';
    overlay.style.display = 'flex';

    try {
      const token = typeof window.getAuthToken === 'function' ? await window.getAuthToken() : null;
      if (!token) {
        $('frases-modal-body').innerHTML = '<em style="color:#c62828;">Inicia sesión para usar esta función.</em>';
        return;
      }
      const level = APP === 'b1' ? 'B1' : 'B2';
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          system: `Eres un profesor de alemán. Genera exactamente 3 oraciones de ejemplo de nivel ${level} usando la palabra "${wordDe}" (${wordEs} en español). Devuelve SOLO JSON sin texto adicional: {"oraciones":[{"de":"…","es":"…"}]}`,
          messages: [{ role: 'user', content: `Genera 3 oraciones con "${wordDe}".` }],
        }),
      });
      const raw = await resp.text();
      let data;
      try { data = JSON.parse(raw); } catch { throw new Error(raw.slice(0, 200)); }
      if (!resp.ok) throw new Error(data.error || 'Error de API');

      let parsed;
      try { parsed = JSON.parse(data.reply); } catch { throw new Error('Respuesta inesperada'); }

      const oraciones = parsed.oraciones || [];
      if (!oraciones.length) {
        $('frases-modal-body').innerHTML = '<em style="color:#999;">No se pudieron generar frases.</em>';
        return;
      }
      $('frases-modal-body').innerHTML = oraciones.map((o, i) => `
        <div style="margin-bottom:14px;padding:12px 14px;background:rgba(92,107,192,0.08);border-left:3px solid #5C6BC0;border-radius:4px;">
          <div style="font-weight:bold;margin-bottom:4px;">${i + 1}. ${escapeHtml(o.de)}</div>
          <div style="font-size:13px;opacity:0.65;">${escapeHtml(o.es)}</div>
        </div>`).join('');
    } catch (err) {
      $('frases-modal-body').innerHTML = `<em style="color:#c62828;">Error: ${escapeHtml(String(err.message || err))}</em>`;
    }
  }

  /* ── Listas personales (IndexedDB) ────────────────── */

  const LP_DB = 'listas-personales', LP_STORE = 'listas', LP_SYS_STORE = 'sys-cache';
  const SYS_CACHE_TTL = 5 * 60 * 1000;
  let _lpDb = null;

  function abrirDBListasP() {
    if (_lpDb) return Promise.resolve(_lpDb);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(LP_DB, 2);
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(LP_STORE))
          db.createObjectStore(LP_STORE, { keyPath: 'id' });
        if (!db.objectStoreNames.contains(LP_SYS_STORE))
          db.createObjectStore(LP_SYS_STORE, { keyPath: 'key' });
      };
      req.onsuccess = e => { _lpDb = e.target.result; resolve(_lpDb); };
      req.onerror = () => reject(req.error);
    });
  }

  async function guardarListaP(lista) {
    if (!lista.supabase_id) lista.supabase_id = crypto.randomUUID();
    const db = await abrirDBListasP();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(LP_STORE, 'readwrite');
      tx.objectStore(LP_STORE).put(lista);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
    _syncListaToSupabase(lista);
  }

  async function cargarListasP() {
    try {
      const db = await abrirDBListasP();
      return new Promise(resolve => {
        const req = db.transaction(LP_STORE).objectStore(LP_STORE).getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => resolve([]);
      });
    } catch { return []; }
  }

  async function eliminarListaP(id) {
    const listas = await cargarListasP();
    const supabaseId = listas.find(l => l.id === id)?.supabase_id;
    const db = await abrirDBListasP();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(LP_STORE, 'readwrite');
      tx.objectStore(LP_STORE).delete(id);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
    if (supabaseId) _deleteListaFromSupabase(supabaseId);
  }

  async function _syncListaToSupabase(lista) {
    try {
      const { data: { user } } = await window.sb.auth.getUser();
      if (!user) return;
      await window.sb.from('word_lists').upsert({
        id: lista.supabase_id,
        user_id: user.id,
        app_id: 'shared',
        name: lista.nombre,
        is_system: false,
        words: { de: lista.de, es: lista.es },
      }, { onConflict: 'id' });
    } catch {}
  }

  async function _deleteListaFromSupabase(supabaseId) {
    try {
      const { data: { user } } = await window.sb.auth.getUser();
      if (!user) return;
      await window.sb.from('word_lists').delete().eq('id', supabaseId);
    } catch {}
  }

  async function _syncPersonalListsFromSupabase() {
    try {
      const { data: { user } } = await window.sb.auth.getUser();
      if (!user) return;
      const localListas = await cargarListasP();

      // Upload local lists that have no supabase_id yet (created before this feature)
      const orphans = localListas.filter(l => !l.supabase_id);
      for (const lista of orphans) {
        lista.supabase_id = crypto.randomUUID();
        const db = await abrirDBListasP();
        const tx = db.transaction(LP_STORE, 'readwrite');
        tx.objectStore(LP_STORE).put(lista);
        await _syncListaToSupabase(lista);
      }

      // Download lists from Supabase that aren't in local IndexedDB
      const { data, error } = await window.sb
        .from('word_lists')
        .select('id, name, words')
        .eq('user_id', user.id)
        .eq('is_system', false);
      if (error || !data?.length) return;

      const refreshedLocal = await cargarListasP();
      const localBySupaId = new Map(refreshedLocal.filter(l => l.supabase_id).map(l => [l.supabase_id, l]));
      const db = await abrirDBListasP();
      let added = false;
      for (const row of data) {
        if (!localBySupaId.has(row.id)) {
          const lista = { id: Date.now() + Math.random(), supabase_id: row.id, nombre: row.name, de: row.words.de, es: row.words.es };
          const tx = db.transaction(LP_STORE, 'readwrite');
          tx.objectStore(LP_STORE).put(lista);
          DATA['mis: ' + lista.nombre] = { es: lista.es, de: lista.de };
          added = true;
        }
      }
      if (added) { mountSetButtons(); await refreshMisListas(); }
    } catch {}
  }

  async function loadSystemLists(appId) {
    // 1. IndexedDB cache (fast path)
    try {
      const db = await abrirDBListasP();
      const entry = await new Promise(resolve => {
        const req = db.transaction(LP_SYS_STORE).objectStore(LP_SYS_STORE).get('lists-' + appId);
        req.onsuccess = () => resolve(req.result); req.onerror = () => resolve(null);
      });
      if (entry && Date.now() - entry.cached_at < SYS_CACHE_TTL) return entry.lists;
    } catch {}

    // 2. Supabase
    try {
      const { data, error } = await window.sb
        .from('word_lists')
        .select('name, words')
        .eq('app_id', appId)
        .eq('is_system', true);
      if (!error && data?.length) {
        const lists = {};
        data.forEach(r => { lists[r.name] = r.words; });
        try {
          const db = await abrirDBListasP();
          const tx = db.transaction(LP_SYS_STORE, 'readwrite');
          tx.objectStore(LP_SYS_STORE).put({ key: 'lists-' + appId, lists, cached_at: Date.now() });
        } catch {}
        return lists;
      }
    } catch {}

    // 3. Fallback: original JSON file
    const r = await fetch(DATA_FILE);
    return r.json();
  }

  function parsearPalabras(str) { return str.split(',').map(w => w.trim()).filter(w => w.length > 0); }

  async function traducirPalabra(palabra, src, tgt) {
    try {
      const r = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(palabra)}&langpair=${src}|${tgt}`);
      const json = await r.json();
      return json.responseData?.translatedText || palabra;
    } catch { return palabra; }
  }

  async function inyectarListasPersonales() {
    const listas = await cargarListasP();
    listas.forEach(l => { DATA['mis: ' + l.nombre] = { es: l.es, de: l.de }; });
    // Background sync: pull any lists created on other devices
    _syncPersonalListsFromSupabase();
  }

  async function guardarNuevaLista() {
    const nombre = document.getElementById('lp-nombre').value.trim();
    const esRaw  = document.getElementById('lp-es').value.trim();
    const deRaw  = document.getElementById('lp-de').value.trim();
    const status = document.getElementById('lp-status');
    if (!nombre) { status.textContent = 'Escribe un nombre para la lista.'; return; }
    if (!esRaw && !deRaw) { status.textContent = 'Escribe al menos una columna de palabras.'; return; }
    const btnGuardar = document.getElementById('lp-guardar');
    btnGuardar.disabled = true; status.textContent = '';
    let esArr = esRaw ? parsearPalabras(esRaw) : [];
    let deArr = deRaw ? parsearPalabras(deRaw) : [];
    if (esArr.length > 0 && deArr.length === 0) {
      for (let i = 0; i < esArr.length; i++) {
        status.textContent = `Traduciendo ES→DE ${i + 1}/${esArr.length}...`;
        deArr.push(await traducirPalabra(esArr[i], 'es', 'de'));
      }
    } else if (deArr.length > 0 && esArr.length === 0) {
      for (let i = 0; i < deArr.length; i++) {
        status.textContent = `Traduciendo DE→ES ${i + 1}/${deArr.length}...`;
        esArr.push(await traducirPalabra(deArr[i], 'de', 'es'));
      }
    } else if (esArr.length !== deArr.length) {
      status.textContent = `Diferente cantidad de palabras (${esArr.length} ES vs ${deArr.length} DE).`;
      btnGuardar.disabled = false; return;
    }
    const lista = { id: Date.now(), nombre, es: esArr, de: deArr };
    await guardarListaP(lista);
    DATA['mis: ' + nombre] = { es: esArr, de: deArr };
    mountSetButtons();
    document.getElementById('lp-nombre').value = '';
    document.getElementById('lp-es').value = '';
    document.getElementById('lp-de').value = '';
    status.textContent = `"${nombre}" guardada — ${esArr.length} palabras.`;
    btnGuardar.disabled = false;
    refreshMisListas();
  }
  window.guardarNuevaLista = guardarNuevaLista;

  async function refreshMisListas() {
    const container = document.getElementById('lp-lista-guardadas');
    const setsBar   = document.getElementById('lp-sets-bar');
    const listas    = await cargarListasP();
    if (setsBar) {
      setsBar.innerHTML = '';
      if (listas.length === 0) {
        setsBar.innerHTML = '<em style="color:#999;font-size:13px;">Sin listas guardadas.</em>';
      } else {
        listas.forEach(l => {
          const key = 'mis: ' + l.nombre;
          const btn = document.createElement('button');
          btn.className = 'btn' + (State.activeSets.has(key) ? ' btn-active' : '');
          btn.textContent = l.nombre; btn.style.borderStyle = 'dashed';
          btn.title = `${l.es.length} palabras`; btn.dataset.personalKey = key;
          btn.addEventListener('click', () => {
            toggleSet(key);
            btn.className = 'btn' + (State.activeSets.has(key) ? ' btn-active' : '');
          });
          setsBar.appendChild(btn);
        });
      }
    }
    if (!container) return;
    if (listas.length === 0) { container.innerHTML = ''; return; }
    container.innerHTML = '';
    listas.forEach(l => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:8px;margin-bottom:6px;';
      const btnCopiar = document.createElement('button');
      btnCopiar.textContent = 'Copiar';
      btnCopiar.style.cssText = 'padding:3px 9px;border:1px solid #888;color:#555;background:none;border-radius:5px;cursor:pointer;font-size:12px;';
      btnCopiar.addEventListener('click', () => {
        navigator.clipboard.writeText(`${l.nombre} (${l.es.length} palabras)\nES: ${l.es.join(', ')}\nDE: ${l.de.join(', ')}`)
          .then(() => { btnCopiar.textContent = '✓ Copiado'; setTimeout(() => { btnCopiar.textContent = 'Copiar'; }, 1500); })
          .catch(() => showToast('No se pudo acceder al portapapeles'));
      });
      const btnEliminar = document.createElement('button');
      btnEliminar.textContent = 'Eliminar';
      btnEliminar.style.cssText = 'padding:3px 9px;border:1px solid #e53935;color:#e53935;background:none;border-radius:5px;cursor:pointer;font-size:12px;';
      btnEliminar.addEventListener('click', () => eliminarListaPersonal(l.id));
      const label = document.createElement('span');
      label.style.cssText = 'flex:1;font-size:14px;';
      label.innerHTML = `<strong>${l.nombre}</strong> <span style="color:#999">(${l.es.length} palabras)</span>`;
      row.appendChild(label); row.appendChild(btnCopiar); row.appendChild(btnEliminar);
      container.appendChild(row);
    });
  }

  async function eliminarListaPersonal(id) {
    const listas = await cargarListasP();
    const lista = listas.find(l => l.id === id);
    if (lista) { State.activeSets.delete('mis: ' + lista.nombre); delete DATA['mis: ' + lista.nombre]; }
    await eliminarListaP(id);
    mountSetButtons(); reloadActiveData(); refreshMisListas();
    showToast('Lista eliminada');
  }

  function montarPanelMisListas() {
    if (document.getElementById('mis-listas-panel')) { refreshMisListas(); return; }
    const app = document.querySelector('.app');
    if (!app) return;
    const panel = document.createElement('div');
    panel.id = 'mis-listas-panel'; panel.style.cssText = 'margin-bottom:20px;';
    panel.innerHTML = `
      <div style="cursor:pointer;padding:8px 12px;border:1px solid #ccc;border-radius:8px;font-size:14px;display:flex;align-items:center;justify-content:space-between;user-select:none;" id="lp-toggle">
        <strong>Mis Listas</strong><span id="lp-arrow">▶</span>
      </div>
      <div id="lp-body" style="display:none;padding:12px;border:1px solid #ccc;border-top:none;border-radius:0 0 8px 8px;">
        <div id="lp-sets-bar" style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;"></div>
        <hr style="border:none;border-top:1px solid #eee;margin:0 0 12px 0;">
        <details style="margin-bottom:8px;">
          <summary style="cursor:pointer;font-size:13px;color:#555;user-select:none;">+ Nueva lista</summary>
          <div style="margin-top:10px;">
            <input id="lp-nombre" type="text" placeholder="Nombre de la lista" style="width:100%;padding:7px 9px;border:1px solid #ccc;border-radius:6px;margin-bottom:8px;box-sizing:border-box;font-size:14px;">
            <input id="lp-es" type="text" placeholder="Español: hola, gracias, casa, ..." style="width:100%;padding:7px 9px;border:1px solid #ccc;border-radius:6px;margin-bottom:8px;box-sizing:border-box;font-size:14px;">
            <input id="lp-de" type="text" placeholder="Alemán: Hallo, danke, Haus, ... (opcional, se auto-traduce)" style="width:100%;padding:7px 9px;border:1px solid #ccc;border-radius:6px;margin-bottom:8px;box-sizing:border-box;font-size:14px;">
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <button id="lp-guardar" onclick="guardarNuevaLista()" style="padding:7px 18px;background:${ACCENT};color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Guardar lista</button>
              <span id="lp-status" style="font-size:13px;color:#555;"></span>
            </div>
          </div>
        </details>
        <div id="lp-lista-guardadas"><em style="color:#999;font-size:13px;">Cargando...</em></div>
      </div>`;
    panel.querySelector('#lp-toggle').addEventListener('click', () => {
      const body = document.getElementById('lp-body');
      const arrow = document.getElementById('lp-arrow');
      const open = body.style.display === 'none';
      body.style.display = open ? 'block' : 'none';
      arrow.textContent = open ? '▼' : '▶';
    });
    const setsContainer = document.getElementById('sets-container');
    if (setsContainer) setsContainer.insertAdjacentElement('afterend', panel);
    else app.prepend(panel);

    // Show/hide "Nueva lista" based on auth state
    const _updateNewListVisibility = (user) => {
      const details = document.querySelector('#lp-body details');
      if (details) details.style.display = user ? '' : 'none';
    };
    window.sb.auth.getUser().then(({ data: { user } }) => _updateNewListVisibility(user));
    window.sb.auth.onAuthStateChange((_, session) => {
      _updateNewListVisibility(session?.user ?? null);
      if (session?.user) _syncPersonalListsFromSupabase();
    });

    refreshMisListas();
  }

  /* ── Init ──────────────────────────────────────────── */

  async function initUnifiedApp() {
    await Promise.all([inyectarListasPersonales(), loadSRSCache()]);
    mountSetButtons();
    mountSectionTabs();
    montarPanelMisListas();
    bindSelectionEvents();
    bindRepeatControls();
    bindCounterDblClick();
    montarBotonSRS();
    montarBotonFrases();

    const filterInput = document.getElementById('filter-lista');
    if (filterInput) {
      filterInput.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        document.querySelectorAll('#lista tbody tr').forEach(row => {
          row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
        });
      });
    }

    safeText($('palabra'), 'Seleccione al menos una lista');
    safeText($('p1'), 'Seleccione al menos una lista');
    safeText($('p2'), '-');
    ['op1', 'op2', 'op3', 'op4'].forEach(id => safeText($(id), '-'));
    const table = $('lista');
    if (table) table.innerHTML = `<thead><tr><th>alemán</th><th>español</th></tr></thead>
      <tbody><tr><td colspan="2" style="text-align:center;color:#999;padding:20px;">Seleccione listas para ver el contenido</td></tr></tbody>`;
  }

  function toggleModoInverso() {
    State.modoInverso = !State.modoInverso;
    const btn = $('btn-inverso');
    if (btn) btn.textContent = State.modoInverso ? 'DE → ES' : 'ES → DE';
    renderSelectionNext();
  }
  window.toggleModoInverso = toggleModoInverso;

  const _moonSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
  const _sunSVG  = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.getElementById('darkModeBtn').innerHTML = isDark ? _sunSVG : _moonSVG;
    localStorage.setItem(DARK_KEY, isDark);
  }
  window.toggleDarkMode = toggleDarkMode;

  function marcarUsoHoy(appKey) {
    const req = indexedDB.open('sw-usage', 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore('meta', { keyPath: 'key' });
    req.onsuccess = e => {
      const tx = e.target.result.transaction('meta', 'readwrite');
      tx.objectStore('meta').put({ key: 'lastUsed-' + appKey, value: new Date().toDateString() });
    };
  }

  /* ── Bootstrap (se ejecuta al cargar el script) ────── */

  if (localStorage.getItem(DARK_KEY) === 'true') {
    document.body.classList.add('dark');
    const btn = document.getElementById('darkModeBtn');
    if (btn) btn.innerHTML = _sunSVG;
  }

  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const map = { '1': 'op1', '2': 'op2', '3': 'op3', '4': 'op4' };
    if (map[e.key]) {
      const el = $(map[e.key]);
      if (!el || el.textContent === '-' || !el.dataset.wordIndex) return;
      handleSelectionPick(parseInt(el.dataset.wordIndex, 10), el.dataset.roundToken);
    }
  });

  bindSelectionEvents();
  renderSelectionNext();

  window.addEventListener('pagehide', () => {
    if (!State.sessionStartedAt) return;
    const duration_sec = Math.round((Date.now() - State.sessionStartedAt) / 1000);
    window.logEvent(APP, 'session_end', {
      duration_sec,
      sets_active: [...State.activeSets],
    });
    if (State.quizBatchTotal > 0) {
      window.logEvent(APP, 'quiz_session_end', {
        total:   State.quizBatchTotal,
        correct: State.quizBatchCorrect,
        errors:  State.quizBatchTotal - State.quizBatchCorrect,
      });
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    loadSystemLists(APP)
      .then(json => { DATA = json; initUnifiedApp(); })
      .catch(() => { document.body.innerHTML = `<p style="padding:2rem">Error cargando listas de vocabulario</p>`; });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(SW_FILE).then(async reg => {
      marcarUsoHoy(APP);
      if (!('periodicSync' in reg)) return;
      const perm = await Notification.requestPermission();
      if (perm !== 'granted') return;
      try { await reg.periodicSync.register(SYNC_ID, { minInterval: 60 * 60 * 1000 }); } catch {}
    });
  }
})();
