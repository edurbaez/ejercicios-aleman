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
    currentIndex:     null,
    optionIdxs:       [],
    modoInverso:      false,
    palabrasContadas: 0,
    palabrasLimite:   parseInt(localStorage.getItem(LIMIT_KEY) || '100', 10),
    selectionLock:    false,
    roundToken:       0
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
      if (wasEmpty) window.logEvent(APP, 'session_start', { app: APP });
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
    window.logEvent(APP, 'word_answered', { word_de: State.de[State.currentIndex], correct });
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

  function speakOnce(text, lang) {
    if (!text) return Promise.resolve();
    return new Promise(resolve => {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang; u.onend = resolve; u.onerror = resolve;
      speechSynthesis.speak(u);
    });
  }

  async function speakLoop() {
    if (!State.modoAuto) { await speakOnce($('p2')?.textContent || '', 'de'); return; }
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
        } else { releaseWakeLock(); }
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
          if (State.modoDual) {
            await speakOnce($('p2')?.textContent || '', 'de');
            await speakOnce($('p1')?.textContent || '', 'es');
          } else {
            await speakOnce($('p2')?.textContent || '', 'de');
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

  /* ── Listas personales (IndexedDB) ────────────────── */

  const LP_DB = 'listas-personales', LP_STORE = 'listas';
  let _lpDb = null;

  function abrirDBListasP() {
    if (_lpDb) return Promise.resolve(_lpDb);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(LP_DB, 1);
      req.onupgradeneeded = e => e.target.result.createObjectStore(LP_STORE, { keyPath: 'id' });
      req.onsuccess = e => { _lpDb = e.target.result; resolve(_lpDb); };
      req.onerror = () => reject(req.error);
    });
  }

  async function guardarListaP(lista) {
    const db = await abrirDBListasP();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(LP_STORE, 'readwrite');
      tx.objectStore(LP_STORE).put(lista);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
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
    const db = await abrirDBListasP();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(LP_STORE, 'readwrite');
      tx.objectStore(LP_STORE).delete(id);
      tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
    });
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
    refreshMisListas();
  }

  /* ── Init ──────────────────────────────────────────── */

  async function initUnifiedApp() {
    await inyectarListasPersonales();
    mountSetButtons();
    montarPanelMisListas();
    bindSelectionEvents();
    bindRepeatControls();
    bindCounterDblClick();

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

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    document.getElementById('darkModeBtn').textContent = isDark ? '☀️' : '🌙';
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
    if (btn) btn.textContent = '☀️';
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

  document.addEventListener('DOMContentLoaded', () => {
    fetch(DATA_FILE)
      .then(r => r.json())
      .then(json => { DATA = json; initUnifiedApp(); })
      .catch(() => { document.body.innerHTML = `<p style="padding:2rem">Error cargando ${DATA_FILE}</p>`; });
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
