// onboarding.js — guided tour for first-time visitors on index.html.
// Shows a welcome step with level selection, then spotlights the key areas.
// Runs once (localStorage flag); relaunchable via the "?" button or window.startOnboarding().

(function () {
  const DONE_KEY = 'onboarding_done_v1';
  const LEVEL_KEY = 'onboarding_level';

  const LEVEL_PAGES = {
    a1: 'A1.html', a2: 'A2.html', b1: 'B1.html',
    b2: 'B2.html', c1: 'C1.html', c2: 'C2.html',
  };

  let stepIndex = 0;
  let overlay = null;
  let spotlight = null;
  let tooltip = null;

  function chosenLevel() { return localStorage.getItem(LEVEL_KEY) || 'a1'; }

  function steps() {
    return [
      {
        target: null,
        title: '👋 ¡Willkommen!',
        html: `
          <p style="margin:0 0 14px">Esta app reúne todo lo que necesitas para aprender alemán: vocabulario, gramática, conversación y un plan de estudio. Te lo mostramos en 30 segundos.</p>
          <p style="margin:0 0 10px;font-weight:600">¿Cuál es tu nivel actual?</p>
          <div id="ob-levels" style="display:flex;flex-wrap:wrap;gap:8px">
            ${Object.keys(LEVEL_PAGES).map(l =>
              `<button data-level="${l}" style="padding:8px 14px;border:1.5px solid #1565C0;background:${l === chosenLevel() ? '#1565C0' : 'transparent'};color:${l === chosenLevel() ? '#fff' : '#1565C0'};border-radius:8px;cursor:pointer;font-weight:700;font-size:14px">${l.toUpperCase()}</button>`
            ).join('')}
          </div>
          <p style="margin:10px 0 0;font-size:12px;color:#888">Si no lo sabes, empieza por A1 — siempre puedes cambiar.</p>`,
      },
      {
        target: () => document.querySelector(`a[href="${LEVEL_PAGES[chosenLevel()]}"]`),
        title: `📗 Tu punto de partida: Vocabulario ${chosenLevel().toUpperCase()}`,
        html: `<p style="margin:0">Quiz de 500 palabras de tu nivel con audio, repaso inteligente (SRS) y frases de ejemplo generadas por IA. 10 minutos al día son suficientes.</p>`,
      },
      {
        target: () => document.querySelector('a[href="plan.html"]'),
        title: '📅 Plan de 30 días',
        html: `<p style="margin:0">¿No sabes por dónde seguir? El plan te dice qué practicar cada día: vocabulario, gramática y conversación, adaptado a tu nivel.</p>`,
      },
      {
        target: () => document.getElementById('navDropdown'),
        title: '🧭 Todas las herramientas',
        html: `<p style="margin:0">Desde <strong>Menú ▾</strong> accedes al resto: diccionario, corrector de textos, chat de voz con IA, entrenamiento de lectura y más.</p>`,
      },
      {
        target: () => document.getElementById('auth-btn'),
        title: '👤 Crea tu cuenta (gratis)',
        html: `<p style="margin:0">Con sesión iniciada guardas tu progreso, racha diaria y listas personales en la nube — sincronizado entre todos tus dispositivos.</p>`,
      },
      {
        target: null,
        title: '🚀 ¡Listo!',
        html: `<p style="margin:0 0 14px">Eso es todo. Puedes volver a ver este tour con el botón <strong>?</strong> abajo a la izquierda.</p>`,
        finalStep: true,
      },
    ];
  }

  function ensureDom() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.id = 'ob-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:2000;';
    spotlight = document.createElement('div');
    spotlight.style.cssText = 'position:absolute;border-radius:12px;box-shadow:0 0 0 9999px rgba(0,0,0,.6);transition:all .25s ease;pointer-events:none;';
    tooltip = document.createElement('div');
    tooltip.style.cssText = 'position:absolute;background:#fff;color:#222;border-radius:14px;padding:20px 22px;width:min(92vw,380px);box-shadow:0 10px 40px rgba(0,0,0,.35);font-size:14px;line-height:1.55;';
    overlay.appendChild(spotlight);
    overlay.appendChild(tooltip);
    document.body.appendChild(overlay);
    const reposition = () => { if (overlay.style.display !== 'none') positionElements(); };
    window.addEventListener('resize', reposition);
    window.addEventListener('scroll', reposition, { passive: true });
  }

  function endTour() {
    localStorage.setItem(DONE_KEY, '1');
    if (overlay) overlay.style.display = 'none';
  }

  function currentTarget() {
    const step = steps()[stepIndex];
    return step.target ? step.target() : null;
  }

  function positionElements() {
    const targetEl = currentTarget();
    if (targetEl) {
      const r = targetEl.getBoundingClientRect();
      const pad = 8;
      spotlight.style.left = (r.left - pad) + 'px';
      spotlight.style.top = (r.top - pad) + 'px';
      spotlight.style.width = (r.width + pad * 2) + 'px';
      spotlight.style.height = (r.height + pad * 2) + 'px';
    } else {
      spotlight.style.left = '50%';
      spotlight.style.top = '50%';
      spotlight.style.width = '0';
      spotlight.style.height = '0';
    }
    const tw = tooltip.offsetWidth, th = tooltip.offsetHeight;
    const vw = window.innerWidth, vh = window.innerHeight;
    let left, top;
    if (targetEl) {
      const r = targetEl.getBoundingClientRect();
      left = Math.min(Math.max(12, r.left + r.width / 2 - tw / 2), vw - tw - 12);
      top = r.bottom + 20 + th < vh ? r.bottom + 20 : Math.max(12, r.top - th - 20);
    } else {
      left = (vw - tw) / 2;
      top = (vh - th) / 2;
    }
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.visibility = 'visible';
  }

  function renderStep() {
    const all = steps();
    const step = all[stepIndex];
    const isLast = stepIndex === all.length - 1;

    const targetEl = step.target ? step.target() : null;
    if (targetEl) targetEl.scrollIntoView({ block: 'center', behavior: 'auto' });

    const progress = `${stepIndex + 1}/${all.length}`;
    tooltip.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px">
        <strong style="font-size:16px">${step.title}</strong>
        <span style="font-size:12px;color:#999;margin-left:12px">${progress}</span>
      </div>
      ${step.html}
      <div style="display:flex;gap:10px;justify-content:flex-end;margin-top:18px;align-items:center">
        <button id="ob-skip" style="background:none;border:none;color:#999;cursor:pointer;font-size:13px">Saltar</button>
        ${step.finalStep
          ? `<button id="ob-go" style="padding:9px 18px;background:#fff;color:#1565C0;border:1.5px solid #1565C0;border-radius:8px;cursor:pointer;font-weight:700;font-size:14px">Explorar</button>
             <button id="ob-next" style="padding:9px 18px;background:#1565C0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:14px">Ir a mi nivel →</button>`
          : `<button id="ob-next" style="padding:9px 18px;background:#1565C0;color:#fff;border:none;border-radius:8px;cursor:pointer;font-weight:700;font-size:14px">${stepIndex === 0 ? 'Empezar' : 'Siguiente'} →</button>`}
      </div>`;

    // Position tooltip relative to spotlight (below if room, else above; centered if no target)
    tooltip.style.visibility = 'hidden';
    tooltip.style.left = '0';
    tooltip.style.top = '0';
    requestAnimationFrame(positionElements);

    tooltip.querySelector('#ob-skip').onclick = endTour;
    tooltip.querySelector('#ob-next').onclick = () => {
      if (step.finalStep) {
        endTour();
        window.location.href = LEVEL_PAGES[chosenLevel()];
        return;
      }
      stepIndex++;
      renderStep();
    };
    const goBtn = tooltip.querySelector('#ob-go');
    if (goBtn) goBtn.onclick = endTour;

    const levelsBox = tooltip.querySelector('#ob-levels');
    if (levelsBox) {
      levelsBox.querySelectorAll('button[data-level]').forEach(btn => {
        btn.onclick = () => {
          localStorage.setItem(LEVEL_KEY, btn.dataset.level);
          levelsBox.querySelectorAll('button').forEach(b => {
            const active = b === btn;
            b.style.background = active ? '#1565C0' : 'transparent';
            b.style.color = active ? '#fff' : '#1565C0';
          });
        };
      });
    }
  }

  function startOnboarding() {
    ensureDom();
    stepIndex = 0;
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    renderStep();
  }
  window.startOnboarding = startOnboarding;

  function mountHelpButton() {
    if (document.getElementById('ob-help-btn')) return;
    const btn = document.createElement('button');
    btn.id = 'ob-help-btn';
    btn.textContent = '?';
    btn.title = 'Ver tour de bienvenida';
    btn.setAttribute('aria-label', 'Ver tour de bienvenida');
    btn.style.cssText = 'position:fixed;bottom:20px;left:20px;width:44px;height:44px;border-radius:50%;border:none;background:#1565C0;color:#fff;font-size:20px;font-weight:700;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.25);z-index:50;';
    btn.addEventListener('click', startOnboarding);
    document.body.appendChild(btn);
  }

  function init() {
    mountHelpButton();
    if (!localStorage.getItem(DONE_KEY)) setTimeout(startOnboarding, 600);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
