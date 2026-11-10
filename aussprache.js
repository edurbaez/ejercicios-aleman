(function () {
  'use strict';

  const RULES = window.AUSSPRACHE;
  const CATS = window.AUSSPRACHE_CATEGORIAS;
  const filtersEl = document.getElementById('au-filters');
  const listEl = document.getElementById('au-list');
  const warnEl = document.getElementById('au-tts-warn');
  const hasTTS = 'speechSynthesis' in window;
  let deVoice = null;
  let current = 'todas';

  window.toggleDarkMode = function () {
    document.body.classList.toggle('dark');
    window.ThemePref.set(document.body.classList.contains('dark'));
  };

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function plain(word) { return word.replace(/[[\]]/g, ''); }

  // "schr[ei]ben" → "schr" + <mark>ei</mark> + "ben"
  function wordNode(word) {
    const span = el('span', 'au-word');
    word.split(/(\[[^\]]+\])/).forEach(part => {
      if (!part) return;
      if (part[0] === '[') span.appendChild(el('mark', null, part.slice(1, -1)));
      else span.appendChild(document.createTextNode(part));
    });
    return span;
  }

  function pickVoice() {
    const voices = speechSynthesis.getVoices();
    deVoice = voices.find(v => v.lang === 'de-DE') || voices.find(v => /^de/i.test(v.lang)) || null;
    // Voices load async; an empty list just means they are not ready yet.
    if (voices.length && !deVoice) {
      warnEl.textContent = 'Tu navegador no tiene una voz alemana instalada: el audio puede sonar con acento de otro idioma. Instala una voz «Deutsch» en los ajustes de voz del sistema.';
      warnEl.hidden = false;
    } else {
      warnEl.hidden = true;
    }
  }

  function speak(text) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'de-DE';
    if (deVoice) u.voice = deVoice;
    u.rate = 0.85;
    speechSynthesis.speak(u);
  }

  function renderFilters() {
    [{ id: 'todas', label: 'Todas' }].concat(CATS).forEach(c => {
      const b = el('button', 'au-chip', c.label);
      b.type = 'button';
      b.dataset.cat = c.id;
      b.setAttribute('aria-pressed', String(c.id === current));
      filtersEl.appendChild(b);
    });
  }

  function renderCard(rule) {
    const card = el('article', 'au-card');
    card.id = 'au-' + rule.id;

    const head = el('h3', 'au-rule');
    head.append(el('span', 'au-graf', rule.grafia), el('span', 'au-arrow', '→'), el('span', 'au-sound', '«' + rule.suenaComo + '»'));
    card.append(head, el('p', 'au-expl', rule.explicacion));

    const ul = el('ul', 'au-examples');
    rule.ejemplos.forEach(ex => {
      const li = el('li', 'au-ex');
      if (hasTTS) {
        const play = el('button', 'au-play', '🔊');
        play.type = 'button';
        play.dataset.say = plain(ex.palabra);
        play.setAttribute('aria-label', 'Escuchar ' + plain(ex.palabra));
        li.appendChild(play);
      }
      const line = el('span', 'au-line');
      line.append(wordNode(ex.palabra), el('span', 'au-eq', '='), el('span', 'au-approx', ex.aproximacion));
      li.append(line, el('span', 'au-tr', ex.traduccion));
      ul.appendChild(li);
    });
    card.appendChild(ul);
    return card;
  }

  function renderList() {
    listEl.textContent = '';
    CATS.filter(c => current === 'todas' || c.id === current).forEach(c => {
      const section = el('section', 'au-section');
      section.appendChild(el('h2', 'au-cat', c.label));
      RULES.filter(r => r.categoria === c.id).forEach(r => section.appendChild(renderCard(r)));
      listEl.appendChild(section);
    });
  }

  filtersEl.addEventListener('click', e => {
    const b = e.target.closest('.au-chip');
    if (!b) return;
    current = b.dataset.cat;
    filtersEl.querySelectorAll('.au-chip').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    renderList();
  });

  listEl.addEventListener('click', e => {
    const b = e.target.closest('.au-play');
    if (b) speak(b.dataset.say);
  });

  window.ThemePref.apply();
  renderFilters();
  renderList();

  if (hasTTS) {
    pickVoice();
    speechSynthesis.addEventListener('voiceschanged', pickVoice);
  } else {
    warnEl.textContent = 'Este navegador no permite reproducir audio de voz.';
    warnEl.hidden = false;
  }
})();
