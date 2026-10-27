// timer.html — interval / pomodoro / countdown timer. Presets and user-added sounds live only
// in the device's IndexedDB; nothing is sent to a server.
(function () {
  const MAX_UPLOAD_BYTES = 1024 * 1024;
  const FALLBACK_SOUND = 'b:campana';
  const FALLBACK_TICK = 't:tick';

  const builtin = (prefix) => ([file, name]) => ({ id: prefix + file, name, source: 'builtin', url: '/sounds/' + file + '.mp3' });
  const BUILTIN_SOUNDS = [
    ['campana', 'Campana'], ['gong', 'Gong'], ['ding-dong', 'Ding-dong'], ['fanfarria', 'Fanfarria'],
    ['marimba', 'Marimba'], ['digital', 'Digital'], ['despertador', 'Despertador'],
    ['pitido', 'Pitido'], ['doble-pitido', 'Doble pitido'],
    ['tick-tick-tock', 'Tick tick tock'], ['tick-tock-tick', 'Tick tock tick'],
    ['tick-tock', 'Tick tock (reloj)'], ['tick-tick-tick-tock', 'Tick tick tick tock'],
  ].map(builtin('b:'));
  const TICK_SOUNDS = [
    ['tick', 'Tick'], ['tick-grave', 'Tick grave'], ['tick-agudo', 'Tick agudo'], ['tick-madera', 'Tick madera'],
  ].map(builtin('t:'));

  const TYPE_NAMES = { intervals: 'Intervalos', pomodoro: 'Pomodoro', countdown: 'Cuenta atrás' };
  const DEFAULT_CONFIG = {
    intervals: { prep: 10, work: 40, rest: 20, rounds: 8 },
    pomodoro: { focus: 25, short: 5, long: 15, longEvery: 4, cycles: 4 },
    countdown: { duration: 300, repeats: 1 },
  };
  const DEFAULT_SOUNDS = { work: 'b:doble-pitido', rest: 'b:ding-dong', end: 'b:despertador', tick: FALLBACK_TICK };

  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = () => (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2));

  // ── IndexedDB ─────────────────────────────────────────────
  let dbPromise = null;
  function db() {
    if (!dbPromise) {
      dbPromise = new Promise((resolve, reject) => {
        const req = indexedDB.open('timer-db', 1);
        req.onupgradeneeded = () => {
          req.result.createObjectStore('presets', { keyPath: 'id' });
          req.result.createObjectStore('sounds', { keyPath: 'id' });
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
      });
    }
    return dbPromise;
  }
  async function idb(store, mode, fn) {
    const d = await db();
    return new Promise((resolve, reject) => {
      const tx = d.transaction(store, mode);
      const req = fn(tx.objectStore(store));
      tx.oncomplete = () => resolve(req && req.result);
      tx.onerror = () => reject(tx.error);
    });
  }
  const idbAll = (store) => idb(store, 'readonly', (s) => s.getAll());
  const idbPut = (store, val) => idb(store, 'readwrite', (s) => s.put(val));
  const idbDel = (store, id) => idb(store, 'readwrite', (s) => s.delete(id));

  // ── State ─────────────────────────────────────────────────
  let presets = [];
  let customSounds = [];
  let editingId = null;
  let run = null;

  const allSounds = () => BUILTIN_SOUNDS.concat(TICK_SOUNDS, customSounds);
  const soundById = (id) => allSounds().find((s) => s.id === id) || BUILTIN_SOUNDS[0];
  // Presets saved before the tick was selectable have no `sounds.tick`.
  const tickOf = (p) => p.sounds.tick || FALLBACK_TICK;

  // ── Audio ─────────────────────────────────────────────────
  let ctx = null;
  let gain = null;
  const buffers = new Map();

  function volume() {
    try { const v = parseFloat(localStorage.getItem('timer_volume')); return isNaN(v) ? 1 : v; } catch (e) { return 1; }
  }

  // Must first run inside a user gesture (autoplay policy); later calls just resume.
  function ensureAudio() {
    if (!ctx) {
      // Without this, iOS mutes Web Audio when the ringer switch is off.
      try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
      ctx = new (window.AudioContext || window.webkitAudioContext)();
      gain = ctx.createGain();
      gain.gain.value = volume();
      gain.connect(ctx.destination);
    }
    if (ctx.state !== 'running') ctx.resume().catch(() => {});
  }

  async function getBuffer(key) {
    if (buffers.has(key)) return buffers.get(key);
    const p = (async () => {
      const s = soundById(key);
      const data = s.blob ? await s.blob.arrayBuffer() : await (await fetch(s.url)).arrayBuffer();
      return new Promise((resolve, reject) => ctx.decodeAudioData(data, resolve, reject));
    })();
    buffers.set(key, p);
    p.catch(() => buffers.delete(key));
    return p;
  }

  async function playSound(id) {
    ensureAudio();
    let buf;
    try { buf = await getBuffer(soundById(id).id); } catch (e) { buf = await getBuffer(FALLBACK_SOUND); }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(gain);
    src.start();
  }

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  // ── Phases ────────────────────────────────────────────────
  function buildPhases(p) {
    const c = p.config;
    const out = [];
    if (p.type === 'intervals') {
      if (c.prep > 0) out.push({ kind: 'prep', label: 'Preparados', secs: c.prep });
      for (let r = 1; r <= c.rounds; r++) {
        out.push({ kind: 'work', label: 'Trabajo', secs: c.work, round: r, of: c.rounds });
        if (r < c.rounds && c.rest > 0) out.push({ kind: 'rest', label: 'Descanso', secs: c.rest, round: r, of: c.rounds });
      }
    } else if (p.type === 'pomodoro') {
      for (let r = 1; r <= c.cycles; r++) {
        out.push({ kind: 'work', label: 'Foco', secs: c.focus * 60, round: r, of: c.cycles });
        if (r === c.cycles) break;
        const isLong = c.longEvery > 0 && r % c.longEvery === 0 && c.long > 0;
        if (isLong) out.push({ kind: 'rest', label: 'Descanso largo', secs: c.long * 60, round: r, of: c.cycles });
        else if (c.short > 0) out.push({ kind: 'rest', label: 'Descanso', secs: c.short * 60, round: r, of: c.cycles });
      }
    } else {
      for (let r = 1; r <= c.repeats; r++) out.push({ kind: 'work', label: 'Cuenta atrás', secs: c.duration, round: r, of: c.repeats });
    }
    return out.filter((ph) => ph.secs > 0);
  }

  // Sound played when `next` begins. A countdown has no work/rest, so every repeat ends with the final sound.
  function transitionSound(p, next) {
    if (p.type === 'countdown') return p.sounds.end;
    return next.kind === 'rest' ? p.sounds.rest : p.sounds.work;
  }

  function fmt(secs) {
    secs = Math.max(0, Math.round(secs));
    const h = Math.floor(secs / 3600), m = Math.floor((secs % 3600) / 60), s = secs % 60;
    const mm = String(m).padStart(2, '0'), ss = String(s).padStart(2, '0');
    return h ? h + ':' + mm + ':' + ss : mm + ':' + ss;
  }

  function summary(p) {
    const phases = buildPhases(p);
    const total = phases.reduce((a, ph) => a + ph.secs, 0);
    const c = p.config;
    let txt;
    if (p.type === 'intervals') txt = c.rounds + ' × ' + fmt(c.work) + (c.rest ? ' / ' + fmt(c.rest) : '');
    else if (p.type === 'pomodoro') txt = c.cycles + ' × ' + c.focus + ' min' + (c.short ? ' / ' + c.short + ' min' : '');
    else txt = fmt(c.duration) + (c.repeats > 1 ? ' × ' + c.repeats : '');
    return txt + ' · total ' + fmt(total);
  }

  // ── Views ─────────────────────────────────────────────────
  function showView(name) {
    ['list', 'editor', 'run'].forEach((v) => { $('tm-' + v + '-view').hidden = v !== name; });
    document.body.classList.toggle('tm-running', name === 'run');
    window.scrollTo(0, 0);
  }

  // Most recently used first; a never-used preset ranks by when it was created, so a new one shows on top.
  function sortPresets() {
    presets.sort((a, b) => (b.lastUsedAt || b.createdAt) - (a.lastUsedAt || a.createdAt));
  }

  function renderPresets() {
    const box = $('tm-presets');
    if (!presets.length) {
      box.innerHTML = '<p class="tm-empty">Todavía no hay alarmas. Crea la primera con «+ Nueva».</p>';
      return;
    }
    box.innerHTML = presets.map((p) => `
      <article class="tm-preset tm-card" data-id="${esc(p.id)}">
        <button class="tm-preset-main" type="button" data-act="start">
          <span class="tm-badge tm-badge-${p.type}">${TYPE_NAMES[p.type]}</span>
          <strong>${esc(p.name)}</strong>
          <span class="tm-hint">${esc(summary(p))}</span>
        </button>
        <div class="tm-preset-acts">
          <button type="button" class="tm-icon-btn" data-act="edit" aria-label="Editar">✏️</button>
          <button type="button" class="tm-icon-btn" data-act="delete" aria-label="Borrar">🗑️</button>
        </div>
      </article>`).join('');
  }

  $('tm-presets').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const p = presets.find((x) => x.id === btn.closest('.tm-preset').dataset.id);
    if (!p) return;
    if (btn.dataset.act === 'start') startRun(p);
    else if (btn.dataset.act === 'edit') openEditor(p);
    else if (btn.dataset.act === 'delete' && confirm('¿Borrar «' + p.name + '»?')) {
      await idbDel('presets', p.id);
      presets = presets.filter((x) => x.id !== p.id);
      renderPresets();
    }
  });

  // ── Editor ────────────────────────────────────────────────
  const form = $('tm-editor');

  form.querySelectorAll('.tm-dur').forEach((el) => {
    const hasHours = !!el.dataset.hours;
    // Without an hours field, minutes go above 59 (e.g. a 90-minute work block).
    const max = { h: 23, min: hasHours ? 59 : 180, s: 59 };
    el.innerHTML = (hasHours ? ['h'] : []).concat(['min', 's']).map((u) =>
      `<label><input type="number" min="0" max="${max[u]}" inputmode="numeric" data-unit="${u}"><span>${u}</span></label>`).join('');
  });
  function setDur(name, secs) {
    const el = form.querySelector('.tm-dur[data-name="' + name + '"]');
    const h = el.querySelector('[data-unit="h"]');
    if (h) { h.value = Math.floor(secs / 3600); secs %= 3600; }
    el.querySelector('[data-unit="min"]').value = Math.floor(secs / 60);
    el.querySelector('[data-unit="s"]').value = secs % 60;
  }
  function getDur(name) {
    const el = form.querySelector('.tm-dur[data-name="' + name + '"]');
    const n = (u) => { const i = el.querySelector('[data-unit="' + u + '"]'); return i ? Math.max(0, parseInt(i.value, 10) || 0) : 0; };
    return n('h') * 3600 + n('min') * 60 + n('s');
  }
  const numField = (name) => form.querySelector('[name="' + name + '"]');
  const intVal = (name, min) => Math.max(min, parseInt(numField(name).value, 10) || 0);
  const currentType = () => form.querySelector('[name="tm-type"]:checked').value;

  function fillSoundSelects(values) {
    const opts = (groupLabel, list) => list.length
      ? `<optgroup label="${groupLabel}">${list.map((s) => `<option value="${esc(s.id)}">${esc(s.name)}</option>`).join('')}</optgroup>` : '';
    const html = opts('Incluidos', BUILTIN_SOUNDS) + opts('Míos', customSounds);
    const tickHtml = opts('Pitidos', TICK_SOUNDS);
    form.querySelectorAll('.tm-sound-pick').forEach((row) => {
      const sel = row.querySelector('select');
      const isTick = row.dataset.slot === 'tick';
      const keep = values ? values[row.dataset.slot] : sel.value;
      sel.innerHTML = isTick ? tickHtml : html;
      sel.value = isTick ? (TICK_SOUNDS.some((s) => s.id === keep) ? keep : FALLBACK_TICK) : soundById(keep).id;
    });
  }

  function syncTypeFields() {
    const type = currentType();
    form.querySelectorAll('.tm-type-fields').forEach((el) => { el.hidden = el.dataset.type !== type; });
    const isCountdown = type === 'countdown';
    form.querySelectorAll('.tm-sound-pick[data-slot="work"], .tm-sound-pick[data-slot="rest"]').forEach((el) => { el.hidden = isCountdown; });
    form.querySelector('.tm-sound-pick[data-slot="tick"]').hidden = !$('tm-ed-countin').checked;
    form.querySelector('[data-label-for="work"]').textContent = type === 'pomodoro' ? 'Inicio de foco' : 'Inicio de trabajo';
    updateEditorSummary();
  }

  function readEditor() {
    const type = currentType();
    let config;
    if (type === 'intervals') config = { prep: getDur('prep'), work: Math.max(1, getDur('work')), rest: getDur('rest'), rounds: intVal('rounds', 1) };
    else if (type === 'pomodoro') config = { focus: intVal('focus', 1), short: intVal('short', 0), long: intVal('long', 0), longEvery: intVal('longEvery', 0), cycles: intVal('cycles', 1) };
    else config = { duration: Math.max(1, getDur('duration')), repeats: intVal('repeats', 1) };
    const sounds = {};
    form.querySelectorAll('.tm-sound-pick').forEach((row) => { sounds[row.dataset.slot] = row.querySelector('select').value; });
    return {
      name: $('tm-ed-name').value.trim() || TYPE_NAMES[type],
      type, config, sounds,
      countIn: $('tm-ed-countin').checked,
    };
  }

  function updateEditorSummary() {
    $('tm-ed-summary').textContent = 'Resumen: ' + summary(readEditor());
  }

  function openEditor(p) {
    editingId = p ? p.id : null;
    $('tm-editor-title').textContent = p ? 'Editar alarma' : 'Nueva alarma';
    const type = p ? p.type : 'intervals';
    $('tm-ed-name').value = p ? p.name : '';
    form.querySelector('[name="tm-type"][value="' + type + '"]').checked = true;
    // Every type's fields get a value so switching type while editing shows sensible defaults.
    const cfg = Object.assign({}, DEFAULT_CONFIG.intervals, DEFAULT_CONFIG.pomodoro, DEFAULT_CONFIG.countdown, p ? p.config : {});
    ['prep', 'work', 'rest', 'duration'].forEach((k) => setDur(k, cfg[k]));
    ['rounds', 'focus', 'short', 'long', 'longEvery', 'cycles', 'repeats'].forEach((k) => { numField(k).value = cfg[k]; });
    fillSoundSelects(p ? p.sounds : DEFAULT_SOUNDS);
    $('tm-ed-countin').checked = p ? p.countIn : true;
    syncTypeFields();
    showView('editor');
  }

  form.addEventListener('change', syncTypeFields);
  form.addEventListener('input', updateEditorSummary);
  form.querySelectorAll('.tm-sound-pick button').forEach((btn) => {
    btn.addEventListener('click', () => playSound(btn.parentElement.querySelector('select').value));
  });
  $('tm-ed-cancel').addEventListener('click', () => showView('list'));
  $('tm-new-btn').addEventListener('click', () => openEditor(null));

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = readEditor();
    const prev = presets.find((x) => x.id === editingId);
    const p = Object.assign({ id: editingId || uid(), createdAt: prev ? prev.createdAt : Date.now(), lastUsedAt: prev ? prev.lastUsedAt : undefined }, data, { updatedAt: Date.now() });
    await idbPut('presets', p);
    presets = prev ? presets.map((x) => (x.id === p.id ? p : x)) : presets.concat(p);
    sortPresets();
    renderPresets();
    showView('list');
  });

  // ── Run ───────────────────────────────────────────────────
  let wakeLock = null;
  async function requestWakeLock() {
    if (!('wakeLock' in navigator)) { $('tm-run-warn').hidden = false; return; }
    try { wakeLock = await navigator.wakeLock.request('screen'); } catch (e) {}
  }
  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release().catch(() => {}); wakeLock = null; }
  }

  const RING_LEN = 2 * Math.PI * 90;

  function startRun(p) {
    ensureAudio();
    const phases = buildPhases(p);
    if (!phases.length) return;
    // Decode up front so the first transition isn't delayed by fetch + decode.
    [p.sounds.work, p.sounds.rest, p.sounds.end].forEach((id) => getBuffer(soundById(id).id).catch(() => {}));
    if (p.countIn) getBuffer(tickOf(p)).catch(() => {});

    p.lastUsedAt = Date.now();
    idbPut('presets', p).catch(() => {});
    sortPresets();
    renderPresets();

    run = { preset: p, phases, idx: 0, endAt: Date.now() + phases[0].secs * 1000, pausedLeft: null, lastTick: null, done: false };
    $('tm-run-name').textContent = p.name;
    $('tm-run-done').hidden = true;
    document.querySelector('.tm-run-controls').hidden = false;
    document.querySelector('.tm-hold-hint').hidden = false;
    $('tm-run-pause').textContent = '❚❚ Pausa';
    showView('run');
    requestWakeLock();
    setupMediaSession(p);
    if (phases[0].kind === 'work' && p.type !== 'countdown') playSound(p.sounds.work);
    run.timer = setInterval(tick, 200);
    tick();
  }

  // Time is derived from absolute end timestamps, so a throttled or frozen tab catches up
  // correctly instead of drifting.
  function tick() {
    if (!run || run.done || run.pausedLeft !== null) return;
    const now = Date.now();
    let advanced = false;
    while (now >= run.endAt) {
      run.idx++;
      if (run.idx >= run.phases.length) { finish(); return; }
      run.endAt += run.phases[run.idx].secs * 1000;
      advanced = true;
    }
    if (advanced) {
      run.lastTick = null;
      playSound(transitionSound(run.preset, run.phases[run.idx]));
      vibrate([250, 100, 250]);
    }
    const left = Math.ceil((run.endAt - now) / 1000);
    if (run.preset.countIn && left <= 3 && left >= 1 && run.lastTick !== left && run.phases[run.idx].secs > 3) {
      run.lastTick = left;
      playSound(tickOf(run.preset)).catch(() => {});
    }
    renderRun(now);
  }

  function renderRun(now) {
    const ph = run.phases[run.idx];
    const leftMs = run.pausedLeft !== null ? run.pausedLeft : Math.max(0, run.endAt - now);
    $('tm-run-phase').textContent = ph.label;
    $('tm-run-time').textContent = fmt(Math.ceil(leftMs / 1000));
    $('tm-run-round').textContent = ph.of > 1 ? (ph.round + ' / ' + ph.of) : '';
    const frac = ph.secs ? leftMs / (ph.secs * 1000) : 0;
    $('tm-ring-bar').style.strokeDasharray = RING_LEN;
    $('tm-ring-bar').style.strokeDashoffset = RING_LEN * (1 - frac);
    document.body.dataset.phase = ph.kind;
    const next = run.phases[run.idx + 1];
    $('tm-run-next').textContent = next ? 'Siguiente: ' + next.label + ' · ' + fmt(next.secs) : 'Última fase';
    const totalLeft = leftMs / 1000 + run.phases.slice(run.idx + 1).reduce((a, x) => a + x.secs, 0);
    $('tm-run-total').textContent = 'Tiempo restante: ' + fmt(totalLeft);
    drawPip({ label: run.pausedLeft !== null ? 'En pausa' : ph.label, time: fmt(Math.ceil(leftMs / 1000)), round: ph.of > 1 ? ph.round + ' / ' + ph.of : '', frac });
  }

  function finish() {
    clearInterval(run.timer);
    run.done = true;
    $('tm-run-phase').textContent = '¡Terminado!';
    $('tm-run-time').textContent = '00:00';
    $('tm-run-round').textContent = '';
    $('tm-run-next').textContent = '';
    $('tm-run-total').textContent = '';
    $('tm-ring-bar').style.strokeDashoffset = RING_LEN;
    document.body.dataset.phase = 'done';
    document.querySelector('.tm-run-controls').hidden = true;
    document.querySelector('.tm-hold-hint').hidden = true;
    $('tm-run-done').hidden = false;
    playSound(run.preset.sounds.end);
    vibrate([600, 200, 600, 200, 600]);
    drawPip({ label: '¡Terminado!', time: '00:00', round: '', frac: 0 });
  }

  function closeRun() {
    if (!run) return;
    clearInterval(run.timer);
    run = null;
    closePip();
    clearMediaSession();
    releaseWakeLock();
    delete document.body.dataset.phase;
    showView('list');
  }

  function togglePause() {
    if (!run || run.done) return;
    ensureAudio();
    if (run.pausedLeft === null) {
      run.pausedLeft = Math.max(0, run.endAt - Date.now());
      $('tm-run-pause').textContent = '▶ Seguir';
    } else {
      run.endAt = Date.now() + run.pausedLeft;
      run.pausedLeft = null;
      $('tm-run-pause').textContent = '❚❚ Pausa';
    }
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = run.pausedLeft === null ? 'playing' : 'paused';
    renderRun(Date.now());
  }
  function skipPhase() {
    if (!run || run.done) return;
    if (run.pausedLeft !== null) togglePause();
    run.endAt = Date.now();
    tick();
  }
  $('tm-run-pause').addEventListener('click', togglePause);
  $('tm-run-skip').addEventListener('click', skipPhase);
  // Hold-to-stop instead of a confirm dialog: one second of continuous press, so a stray tap mid-workout does nothing.
  const HOLD_MS = 1000;
  const stopBtn = $('tm-run-stop');
  let holdTimer = null;
  function holdStart(e) {
    if (holdTimer || (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ')) return;
    e.preventDefault();
    stopBtn.style.setProperty('--hold-ms', HOLD_MS + 'ms');
    stopBtn.classList.add('holding');
    holdTimer = setTimeout(() => { holdCancel(); closeRun(); }, HOLD_MS);
  }
  function holdCancel() {
    clearTimeout(holdTimer);
    holdTimer = null;
    stopBtn.classList.remove('holding');
  }
  stopBtn.addEventListener('pointerdown', holdStart);
  stopBtn.addEventListener('keydown', holdStart);
  ['pointerup', 'pointerleave', 'pointercancel', 'keyup', 'blur'].forEach((ev) => stopBtn.addEventListener(ev, holdCancel));
  stopBtn.addEventListener('contextmenu', (e) => e.preventDefault());
  $('tm-run-dismiss').addEventListener('click', closeRun);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible' || !run) return;
    if (!run.done) requestWakeLock();
    ensureAudio();
    tick();
  });

  // ── Floating window (video Picture-in-Picture) ───────────
  // A PWA can't draw over other apps, but a <video> in PiP can: the timer is painted on a canvas
  // whose stream feeds a hidden video, and that video goes into the system's floating window.
  const pipCanvas = document.createElement('canvas');
  pipCanvas.width = pipCanvas.height = 320;
  const pipVideo = $('tm-pip-video');
  const pipSupported = !!(document.pictureInPictureEnabled && pipCanvas.captureStream && pipVideo.requestPictureInPicture);
  const isPipOpen = () => document.pictureInPictureElement === pipVideo;
  $('tm-run-pip').hidden = !pipSupported;

  function drawPip(f) {
    if (!pipVideo.srcObject) return;
    const c = pipCanvas.getContext('2d');
    const W = pipCanvas.width, mid = W / 2, r = mid - 22;
    const css = getComputedStyle(document.body);
    const v = (name) => css.getPropertyValue(name).trim();
    const font = (weight, size) => weight + ' ' + size + 'px "Source Sans 3", system-ui, sans-serif';
    c.fillStyle = v('--paper');
    c.fillRect(0, 0, W, W);
    c.lineWidth = 16;
    c.lineCap = 'round';
    c.strokeStyle = v('--paper-sunk');
    c.beginPath(); c.arc(mid, mid, r, 0, 2 * Math.PI); c.stroke();
    if (f.frac > 0) {
      c.strokeStyle = v('--tm-phase');
      c.beginPath(); c.arc(mid, mid, r, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * f.frac); c.stroke();
    }
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillStyle = v('--tm-phase');
    c.font = font(700, 26);
    c.fillText(f.label.toUpperCase(), mid, mid - 62);
    let size = 84;
    do { c.font = font(700, size); size -= 4; } while (c.measureText(f.time).width > W * 0.66);
    c.fillStyle = v('--ink');
    c.fillText(f.time, mid, mid + 4);
    if (f.round) {
      c.fillStyle = v('--ink-muted');
      c.font = font(600, 24);
      c.fillText(f.round, mid, mid + 66);
    }
  }

  async function togglePip() {
    if (!run) return;
    try {
      if (isPipOpen()) { await document.exitPictureInPicture(); return; }
      if (!pipVideo.srcObject) pipVideo.srcObject = pipCanvas.captureStream();
      if (run.done) drawPip({ label: '¡Terminado!', time: '00:00', round: '', frac: 0 });
      else renderRun(Date.now());
      await pipVideo.play();
      await pipVideo.requestPictureInPicture();
    } catch (e) {
      console.warn('[timer] PiP failed:', e);
    }
  }

  function closePip() {
    if (isPipOpen()) document.exitPictureInPicture().catch(() => {});
  }

  pipVideo.addEventListener('enterpictureinpicture', () => { $('tm-run-pip').textContent = '🗗 Cerrar ventana flotante'; });
  pipVideo.addEventListener('leavepictureinpicture', () => {
    $('tm-run-pip').textContent = '🗗 Ventana flotante';
    if (pipVideo.srcObject) pipVideo.srcObject.getTracks().forEach((t) => t.stop());
    pipVideo.srcObject = null;
  });
  $('tm-run-pip').addEventListener('click', togglePip);

  // The PiP window's play/pause and next buttons arrive as Media Session actions.
  function setupMediaSession(p) {
    if (!('mediaSession' in navigator)) return;
    const ms = navigator.mediaSession;
    if (window.MediaMetadata) ms.metadata = new MediaMetadata({ title: p.name, artist: 'Temporizador', artwork: [{ src: '/icon-timer.svg', sizes: '512x512', type: 'image/svg+xml' }] });
    const set = (action, fn) => { try { ms.setActionHandler(action, fn); } catch (e) {} };
    set('play', () => { if (run && run.pausedLeft !== null) togglePause(); });
    set('pause', () => { if (run && run.pausedLeft === null) togglePause(); });
    set('nexttrack', skipPhase);
    ms.playbackState = 'playing';
  }

  function clearMediaSession() {
    if (!('mediaSession' in navigator)) return;
    ['play', 'pause', 'nexttrack'].forEach((a) => { try { navigator.mediaSession.setActionHandler(a, null); } catch (e) {} });
    navigator.mediaSession.metadata = null;
    navigator.mediaSession.playbackState = 'none';
  }

  // ── Sounds panel ──────────────────────────────────────────
  function renderSoundList() {
    const row = (s, canDelete) => `
      <li data-id="${esc(s.id)}">
        <span>${esc(s.name)}</span>
        <button type="button" class="tm-icon-btn" data-act="play" aria-label="Probar">▶</button>
        ${canDelete ? '<button type="button" class="tm-icon-btn" data-act="delete" aria-label="Borrar">🗑️</button>' : ''}
      </li>`;
    const group = (title, list, canDelete) => list.length
      ? `<h3>${title}</h3><ul class="tm-sound-ul">${list.map((s) => row(s, canDelete)).join('')}</ul>` : '';
    $('tm-sound-list').innerHTML =
      group('Incluidos', BUILTIN_SOUNDS, false)
      + group('Pitidos 3-2-1', TICK_SOUNDS, false)
      + group('Míos (solo este dispositivo)', customSounds, true);
  }

  $('tm-sound-list').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const s = soundById(btn.closest('li').dataset.id);
    if (btn.dataset.act === 'play') { playSound(s.id); return; }
    if (!confirm('¿Borrar el sonido «' + s.name + '»?')) return;
    await idbDel('sounds', s.id);
    customSounds = customSounds.filter((x) => x.id !== s.id);
    buffers.delete(s.id);
    refreshSounds();
  });

  function refreshSounds() {
    renderSoundList();
    fillSoundSelects();
  }

  $('tm-volume').addEventListener('input', (e) => {
    const v = parseFloat(e.target.value);
    try { localStorage.setItem('timer_volume', v); } catch (err) {}
    if (gain) gain.gain.value = v;
  });
  $('tm-volume').addEventListener('change', () => playSound('b:pitido'));

  $('tm-upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = $('tm-up-status');
    const file = $('tm-up-file').files[0];
    const name = $('tm-up-name').value.trim();
    if (!file || !name) return;
    if (file.size > MAX_UPLOAD_BYTES) { status.textContent = 'El archivo supera 1 MB.'; return; }
    ensureAudio();
    try {
      const data = await file.arrayBuffer();
      await new Promise((resolve, reject) => ctx.decodeAudioData(data, resolve, reject));
    } catch (err) {
      status.textContent = 'No se pudo leer ese archivo de audio.';
      return;
    }
    const sound = { id: 'l:' + uid(), name, source: 'local', blob: file };
    await idbPut('sounds', sound);
    customSounds.push(sound);
    refreshSounds();
    e.target.reset();
    status.textContent = '✅ «' + name + '» añadido.';
  });

  // ── Boot ──────────────────────────────────────────────────
  (async function init() {
    $('tm-volume').value = volume();
    [presets, customSounds] = await Promise.all([idbAll('presets'), idbAll('sounds')]);
    let seeded = false;
    try { seeded = !!localStorage.getItem('timer_seeded'); } catch (e) {}
    if (!presets.length && !seeded) {
      presets = [
        { name: 'HIIT 40/20', type: 'intervals', config: DEFAULT_CONFIG.intervals },
        { name: 'Pomodoro', type: 'pomodoro', config: DEFAULT_CONFIG.pomodoro },
        { name: '5 minutos', type: 'countdown', config: DEFAULT_CONFIG.countdown },
      ].map((p, i) => Object.assign({ id: uid(), createdAt: Date.now() - i, updatedAt: Date.now(), sounds: DEFAULT_SOUNDS, countIn: true }, p));
      await Promise.all(presets.map((p) => idbPut('presets', p)));
      try { localStorage.setItem('timer_seeded', '1'); } catch (e) {}
    }
    sortPresets();
    renderPresets();
    refreshSounds();
  })();

  if ('serviceWorker' in navigator) {
    // Narrow scope so this worker doesn't replace the other apps' root-scoped workers.
    navigator.serviceWorker.register('/sw-timer.js', { scope: '/timer.html' }).catch(() => {});
  }
})();
