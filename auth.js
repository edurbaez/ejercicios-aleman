/* auth.js — módulo de autenticación compartido para todas las páginas */
(function () {
  window.sb = supabase.createClient(SUPA_URL, SUPA_KEY);
  window.currentUser = null;
  let _otpEmail = '';
  let _cachedToken = null;

  // --- Push notifications helpers ---
  function _urlBase64ToUint8Array(b64) {
    const pad = '='.repeat((4 - b64.length % 4) % 4);
    const base64 = (b64 + pad).replace(/-/g, '+').replace(/_/g, '/');
    const raw = atob(base64);
    return new Uint8Array([...raw].map(c => c.charCodeAt(0)));
  }

  async function _renderNotifSection() {
    const el = document.getElementById('notif-section');
    if (!el) return;

    if (!('serviceWorker' in navigator) || !('PushManager' in window) || !window.VAPID_PUBLIC_KEY) {
      el.style.display = 'none';
      return;
    }

    let reg;
    try { reg = await navigator.serviceWorker.ready; } catch { el.style.display = 'none'; return; }

    const perm = Notification.permission;
    const sub = await reg.pushManager.getSubscription();
    const isEnabled = perm === 'granted' && !!sub;

    let settings = { interval_hours: 1, window_start: 8, window_end: 20 };
    if (isEnabled && window.getAuthToken()) {
      try {
        const r = await fetch('/api/push-subscribe', {
          headers: { Authorization: `Bearer ${window.getAuthToken()}` }
        });
        if (r.ok) { const d = await r.json(); if (d.subscription) Object.assign(settings, d.subscription); }
      } catch {}
    }

    window._notifInterval = settings.interval_hours;
    const intervals = [1, 2, 3, 4, 6];

    const intervalBtns = intervals.map(h => {
      const active = settings.interval_hours === h;
      return `<button onclick="window._setNotifInterval(${h})" id="notif-i-${h}"
        style="padding:4px 10px;border-radius:4px;border:1px solid ${active ? '#1976D2' : '#ddd'};
               background:${active ? '#1976D2' : '#fff'};color:${active ? '#fff' : '#333'};
               font-size:12px;cursor:pointer;">${h}h</button>`;
    }).join('');

    el.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:13px;font-weight:600;color:#333;">🔔 Recordatorios</span>
        <label style="display:flex;align-items:center;gap:6px;cursor:pointer;user-select:none;">
          <input type="checkbox" id="notif-toggle" ${isEnabled ? 'checked' : ''}
            onchange="window.toggleNotifications(this.checked)"
            style="width:16px;height:16px;cursor:pointer;">
          <span id="notif-status-label"
            style="font-size:12px;color:${isEnabled ? '#2e7d32' : '#999'};">
            ${isEnabled ? 'Activados' : 'Desactivados'}
          </span>
        </label>
      </div>
      <div id="notif-settings" style="display:${isEnabled ? 'block' : 'none'};">
        <div style="margin-bottom:10px;">
          <div style="font-size:11px;color:#666;letter-spacing:.5px;margin-bottom:6px;">CADA</div>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">${intervalBtns}</div>
        </div>
        <div style="display:flex;gap:16px;margin-bottom:12px;">
          <div>
            <div style="font-size:11px;color:#666;letter-spacing:.5px;margin-bottom:4px;">DESDE</div>
            <div style="display:flex;align-items:center;gap:4px;">
              <input type="number" id="notif-start" min="0" max="23" value="${settings.window_start}"
                style="width:52px;padding:5px;border:1px solid #ddd;border-radius:4px;font-size:14px;text-align:center;">
              <span style="font-size:11px;color:#999;">h</span>
            </div>
          </div>
          <div>
            <div style="font-size:11px;color:#666;letter-spacing:.5px;margin-bottom:4px;">HASTA</div>
            <div style="display:flex;align-items:center;gap:4px;">
              <input type="number" id="notif-end" min="1" max="24" value="${settings.window_end}"
                style="width:52px;padding:5px;border:1px solid #ddd;border-radius:4px;font-size:14px;text-align:center;">
              <span style="font-size:11px;color:#999;">h</span>
            </div>
          </div>
        </div>
        <button onclick="window.saveNotifSettings()" id="notif-save-btn"
          style="width:100%;padding:8px;background:#1976D2;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:13px;">
          Guardar preferencias
        </button>
      </div>
    `;
  }

  window._setNotifInterval = function (h) {
    window._notifInterval = h;
    [1, 2, 3, 4, 6].forEach(i => {
      const b = document.getElementById(`notif-i-${i}`);
      if (!b) return;
      const active = i === h;
      b.style.background = active ? '#1976D2' : '#fff';
      b.style.color = active ? '#fff' : '#333';
      b.style.borderColor = active ? '#1976D2' : '#ddd';
    });
  };

  async function _pushSubscribeOnServer(pushSub) {
    const start = parseInt(document.getElementById('notif-start')?.value ?? '8');
    const end   = parseInt(document.getElementById('notif-end')?.value   ?? '20');
    await fetch('/api/push-subscribe', {
      method: 'POST',
      headers: { Authorization: `Bearer ${window.getAuthToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subscription: pushSub.toJSON(),
        interval_hours: window._notifInterval || 1,
        window_start: start,
        window_end: end,
        utc_offset_minutes: -new Date().getTimezoneOffset(),
      }),
    });
  }

  window.toggleNotifications = async function (enable) {
    if (!window.VAPID_PUBLIC_KEY) return;
    let reg;
    try { reg = await navigator.serviceWorker.ready; } catch { return; }

    if (!enable) {
      const existing = await reg.pushManager.getSubscription();
      if (existing) await existing.unsubscribe();
      await fetch('/api/push-subscribe', {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${window.getAuthToken()}` },
      });
      const label = document.getElementById('notif-status-label');
      if (label) { label.textContent = 'Desactivados'; label.style.color = '#999'; }
      const s = document.getElementById('notif-settings');
      if (s) s.style.display = 'none';
      return;
    }

    const perm = await Notification.requestPermission();
    if (perm !== 'granted') {
      alert('Permiso de notificaciones denegado. Actívalo en la configuración del navegador.');
      const cb = document.getElementById('notif-toggle');
      if (cb) cb.checked = false;
      return;
    }

    try {
      const pushSub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: _urlBase64ToUint8Array(window.VAPID_PUBLIC_KEY),
      });
      await _pushSubscribeOnServer(pushSub);
      const label = document.getElementById('notif-status-label');
      if (label) { label.textContent = 'Activados'; label.style.color = '#2e7d32'; }
      const s = document.getElementById('notif-settings');
      if (s) s.style.display = 'block';
    } catch (err) {
      alert('Error al activar notificaciones: ' + err.message);
      const cb = document.getElementById('notif-toggle');
      if (cb) cb.checked = false;
    }
  };

  window.saveNotifSettings = async function () {
    let reg;
    try { reg = await navigator.serviceWorker.ready; } catch { return; }
    const pushSub = await reg.pushManager.getSubscription();
    if (!pushSub) return;

    const btn = document.getElementById('notif-save-btn');
    if (btn) { btn.disabled = true; btn.textContent = 'Guardando...'; }

    try {
      await _pushSubscribeOnServer(pushSub);
      if (btn) {
        btn.textContent = '✓ Guardado';
        setTimeout(() => { btn.textContent = 'Guardar preferencias'; btn.disabled = false; }, 2000);
      }
    } catch {
      if (btn) { btn.disabled = false; btn.textContent = 'Guardar preferencias'; }
    }
  };

  function _injectModal() {
    if (document.getElementById('auth-modal')) return;
    const el = document.createElement('div');
    el.id = 'auth-modal';
    el.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;';
    el.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:24px;min-width:280px;max-width:340px;width:90%;box-shadow:0 8px 32px rgba(0,0,0,.2);">
        <h3 style="margin:0 0 16px;color:#222">Iniciar sesión</h3>
        <button onclick="window.signInWithGoogle()" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px;background:#fff;">
          <svg width="18" height="18" viewBox="0 0 48 48" style="flex-shrink:0"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
          Continuar con Google
        </button>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
          <div style="flex:1;height:1px;background:#e0e0e0;"></div>
          <span style="font-size:12px;color:#999;">o</span>
          <div style="flex:1;height:1px;background:#e0e0e0;"></div>
        </div>
        <div id="auth-email-step">
          <input id="auth-email" type="email" placeholder="tu@email.com" style="width:100%;padding:9px 10px;border:1px solid #ccc;border-radius:6px;margin-bottom:12px;box-sizing:border-box;font-size:15px;">
          <div style="display:flex;gap:8px;">
            <button id="auth-send-btn" onclick="window.sendOtp()" style="flex:1;padding:9px;background:#1976D2;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Enviar código</button>
            <button onclick="window.closeAuthModal()" style="padding:9px 14px;border:1px solid #ccc;border-radius:6px;cursor:pointer;font-size:14px;">Cancelar</button>
          </div>
        </div>
        <div id="auth-otp-step" style="display:none">
          <p id="auth-otp-label" style="margin:0 0 12px;font-size:13px;color:#555;"></p>
          <input id="auth-otp" type="text" placeholder="Código de 6 dígitos" maxlength="6" style="width:100%;padding:9px 10px;border:1px solid #ccc;border-radius:6px;margin-bottom:12px;box-sizing:border-box;letter-spacing:6px;font-size:20px;text-align:center;">
          <div style="display:flex;gap:8px;">
            <button id="auth-verify-btn" onclick="window.verifyOtp()" style="flex:1;padding:9px;background:#1976D2;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Verificar</button>
            <button onclick="window.closeAuthModal()" style="padding:9px 14px;border:1px solid #ccc;border-radius:6px;cursor:pointer;font-size:14px;">Cancelar</button>
          </div>
        </div>
      </div>`;
    document.body.appendChild(el);
  }

  window.openAuthModal = function () {
    _injectModal();
    document.getElementById('auth-modal').style.display = 'flex';
    document.getElementById('auth-email-step').style.display = 'block';
    document.getElementById('auth-otp-step').style.display = 'none';
    document.getElementById('auth-email').value = '';
  };

  window.closeAuthModal = function () {
    const m = document.getElementById('auth-modal');
    if (m) m.style.display = 'none';
  };

  window.sendOtp = async function () {
    const email = document.getElementById('auth-email').value.trim();
    if (!email) return;
    const btn = document.getElementById('auth-send-btn');
    btn.disabled = true; btn.textContent = 'Enviando...';
    const { error } = await window.sb.auth.signInWithOtp({ email });
    btn.disabled = false; btn.textContent = 'Enviar código';
    if (error) { alert('Error: ' + error.message); return; }
    _otpEmail = email;
    document.getElementById('auth-email-step').style.display = 'none';
    document.getElementById('auth-otp-step').style.display = 'block';
    document.getElementById('auth-otp-label').textContent = 'Código enviado a ' + email;
    document.getElementById('auth-otp').value = '';
    document.getElementById('auth-otp').focus();
  };

  window.verifyOtp = async function () {
    const token = document.getElementById('auth-otp').value.trim();
    if (!token) return;
    const btn = document.getElementById('auth-verify-btn');
    btn.disabled = true; btn.textContent = 'Verificando...';
    const { error } = await window.sb.auth.verifyOtp({ email: _otpEmail, token, type: 'email' });
    btn.disabled = false; btn.textContent = 'Verificar';
    if (error) { alert('Código incorrecto o expirado'); return; }
    window.closeAuthModal();
  };

  window.signInWithGoogle = async function () {
    await window.sb.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.href }
    });
  };

  window.logout = async function () {
    await window.sb.auth.signOut();
  };

  async function _getAccessProfile() {
    if (!window.currentUser) return null;
    const { data } = await window.sb.from('profiles').select('role, status, access_expires_at').eq('id', window.currentUser.id).maybeSingle();
    return data;
  }

  // See supabase/migrations/009_access_control.sql `is_access_valid()` — same rule, client-side.
  // A missing profile row (should not happen — handle_new_user() always creates one) fails open,
  // matching the fail-open convention of api/_lib.js's checkAccess().
  function _isAccessValid(profile) {
    if (!profile) return true;
    return profile.status !== 'blocked'
      && (!profile.access_expires_at || new Date(profile.access_expires_at) > new Date());
  }

  function _injectBlockedModal() {
    if (document.getElementById('access-blocked-modal')) return;
    const el = document.createElement('div');
    el.id = 'access-blocked-modal';
    el.style.cssText = 'display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:10000;align-items:center;justify-content:center;';
    el.innerHTML = `
      <div style="background:#fff;border-radius:12px;padding:28px;min-width:280px;max-width:360px;width:90%;box-shadow:0 8px 32px rgba(0,0,0,.3);text-align:center;">
        <h3 id="access-blocked-title" style="margin:0 0 12px;color:#c62828;">Acceso restringido</h3>
        <p id="access-blocked-msg" style="margin:0 0 18px;color:#444;font-size:14px;line-height:1.5;"></p>
        <button onclick="window.logout()" style="padding:9px 16px;background:#455a64;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Cerrar sesión</button>
      </div>`;
    document.body.appendChild(el);
  }

  window.showAccessBlockedModal = function (reason, expiresAt) {
    _injectBlockedModal();
    const msgEl = document.getElementById('access-blocked-msg');
    msgEl.textContent = reason === 'blocked'
      ? 'Tu acceso fue restringido por un administrador. Contacta al administrador si crees que es un error.'
      : 'Tu periodo de acceso terminó' + (expiresAt ? ' el ' + new Date(expiresAt).toLocaleDateString() : '') + '. Contacta al administrador para reactivarlo.';
    document.getElementById('access-blocked-modal').style.display = 'flex';
  };

  window.hideAccessBlockedModal = function () {
    const m = document.getElementById('access-blocked-modal');
    if (m) m.style.display = 'none';
  };

  const ADMIN_LINKS = [
    { id: 'nav-dashboard-link', href: '/admin/', text: 'Dashboard →', color: '#1976D2' },
    { id: 'nav-marketing-link', href: '/marketing/', text: 'Marketing →', color: '#6A1B9A' },
    { id: 'nav-chatvoz2-link', href: '/chatvoz2/', text: 'Chat de Voz 2 →', color: '#1565C0' },
    { id: 'nav-finanzas-link', href: '/finance/finanzas-dashboard.html', text: 'Dashboard Financiero →', color: '#0F172A' },
    { id: 'nav-teacher-link', href: '/teacher/', text: 'Clases →', color: '#00695C' }
  ];

  const NAV_ITEMS = [
    { href: 'plan.html', label: 'Plan 30 días', bodyId: 'page-plan' },
    { type: 'submenu', label: 'Vocabulario ▸', items: [
        { href: 'A1.html', label: 'A1', bodyId: 'page-a1' },
        { href: 'A2.html', label: 'A2', bodyId: 'page-a2' },
        { href: 'B1.html', label: 'B1', bodyId: 'page-b1' },
        { href: 'B2.html', label: 'B2', bodyId: 'page-b2' },
        { href: 'C1.html', label: 'C1', bodyId: 'page-c1' },
        { href: 'C2.html', label: 'C2', bodyId: 'page-c2' },
    ] },
    { href: 'gramatica.html', label: 'Gramática', bodyId: 'page-gram' },
    { href: 'lectura veloz.html', label: 'Entrenamiento de lectura', bodyId: 'page-lv' },
    { href: 'escritura.html', label: 'Escritura', bodyId: 'page-esc' },
    { href: 'chat-reformulaciones.html', label: 'Reformulaciones', bodyId: 'page-cr' },
    { href: 'kasus.html', label: 'Kasus-Trainer', bodyId: 'page-kas' },
    { href: 'chat-voz.html', label: 'Chat de Voz', bodyId: 'page-cv' },
    { href: 'mundliche.html', label: 'Mündliche Prüfung', bodyId: 'page-mp' },
    { href: 'diccionario.html', label: 'Diccionario', bodyId: 'page-dic' },
    { href: 'corrector.html', label: 'Corrector', bodyId: 'page-cor' },
  ];

  function _renderNavMenu() {
    const menu = document.querySelector('.nav-dropdown-menu');
    if (!menu) return;
    const bodyId = document.body.id;
    let anyActive = false;

    NAV_ITEMS.forEach(function (item) {
      if (item.type === 'submenu') {
        const wrap = document.createElement('div');
        wrap.className = 'nav-submenu';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-submenu-btn';
        btn.textContent = item.label;
        btn.onclick = function (e) {
          this.closest('.nav-submenu').classList.toggle('open');
          e.stopPropagation();
        };
        const sub = document.createElement('div');
        sub.className = 'nav-submenu-menu';
        item.items.forEach(function (subItem) {
          const a = document.createElement('a');
          a.href = subItem.href;
          a.textContent = subItem.label;
          if (subItem.bodyId === bodyId) {
            a.classList.add('active');
            btn.classList.add('active');
            anyActive = true;
          }
          sub.appendChild(a);
        });
        wrap.appendChild(btn);
        wrap.appendChild(sub);
        menu.appendChild(wrap);
      } else {
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.label;
        if (item.bodyId === bodyId) {
          a.classList.add('active');
          anyActive = true;
        }
        menu.appendChild(a);
      }
    });

    if (anyActive) {
      const menuBtn = document.querySelector('.nav-menu-btn');
      if (menuBtn) menuBtn.classList.add('active');
    }
  }

  function _toggleAdminOnlyEls(show) {
    document.querySelectorAll('[data-admin-only]').forEach(function (el) {
      el.style.display = show ? '' : 'none';
    });
  }

  function _removeDashboardLink() {
    ADMIN_LINKS.forEach(function (l) {
      const el = document.getElementById(l.id);
      if (el) el.remove();
    });
    _toggleAdminOnlyEls(false);
  }

  function _addDashboardLink() {
    _toggleAdminOnlyEls(true);
    if (document.getElementById('nav-dashboard-link')) return;
    const menu = document.querySelector('.nav-dropdown-menu');
    if (!menu) return;
    ADMIN_LINKS.forEach(function (l) {
      const a = document.createElement('a');
      a.id = l.id;
      a.href = l.href;
      a.textContent = l.text;
      a.style.cssText = 'font-weight:600;color:' + l.color + ';';
      menu.appendChild(a);
    });
  }

  window.updateAuthUI = async function () {
    const btn = document.getElementById('auth-btn');
    if (!btn) return;
    if (window.currentUser) {
      const meta = window.currentUser.user_metadata || {};
      const name = (meta.full_name || meta.name || window.currentUser.email).split(/[\s@]/)[0];
      btn.textContent = name;
      btn.title = 'Ver mi progreso';
      btn.onclick = window.openStatsPanel;
      const profile = await _getAccessProfile();
      const role = profile ? profile.role : null;
      if (role === 'admin') _addDashboardLink();
      // Admins are never gated, even if their own row somehow had a stale status/expiry.
      if (role !== 'admin' && profile && !_isAccessValid(profile)) {
        window.logEvent('auth', 'access_blocked_attempt', { status: profile.status, expires_at: profile.access_expires_at });
        window.showAccessBlockedModal(profile.status === 'blocked' ? 'blocked' : 'expired', profile.access_expires_at);
      } else {
        window.hideAccessBlockedModal();
      }
    } else {
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
      btn.title = 'Iniciar sesión';
      btn.onclick = window.openAuthModal;
      _removeDashboardLink();
      window.hideAccessBlockedModal();
    }
  };

  window.closeStatsPanel = function () {
    const p = document.getElementById('stats-panel');
    if (p) p.style.display = 'none';
  };

  window.openStatsPanel = async function () {
    if (!window.currentUser) { window.openAuthModal(); return; }
    await _flushEvents();

    let panel = document.getElementById('stats-panel');
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'stats-panel';
      panel.style.cssText = 'display:none;position:fixed;top:0;right:0;height:100%;width:320px;max-width:92vw;background:#fff;box-shadow:-4px 0 28px rgba(0,0,0,.18);z-index:9998;overflow-y:auto;padding:24px 20px 32px;box-sizing:border-box;';
      panel.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;">
          <h3 style="margin:0;font-size:17px;color:#222;">Mi progreso</h3>
          <button onclick="window.closeStatsPanel()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#666;line-height:1;">✕</button>
        </div>
        <div id="stats-user-info" style="margin-bottom:18px;padding-bottom:14px;border-bottom:1px solid #eee;font-size:13px;color:#555;"></div>
        <div id="stats-content" style="font-size:14px;color:#333;"></div>
        <div id="notif-section" style="margin-top:20px;padding-top:16px;border-top:1px solid #eee;"></div>
        <div style="margin-top:16px;padding-top:16px;border-top:1px solid #eee;">
          <button onclick="window.logout();window.closeStatsPanel();" style="width:100%;padding:9px;background:#f44336;color:#fff;border:none;border-radius:6px;cursor:pointer;font-size:14px;">Cerrar sesión</button>
        </div>`;
      document.body.appendChild(panel);
    }

    panel.style.display = 'block';

    const meta = window.currentUser.user_metadata || {};
    const name = meta.full_name || meta.name || '';
    document.getElementById('stats-user-info').innerHTML =
      `<strong>${name || window.currentUser.email}</strong><br>${name ? window.currentUser.email : ''}`;

    const content = document.getElementById('stats-content');
    content.innerHTML = '<p style="color:#999;font-size:13px;">Cargando estadísticas…</p>';

    const token = window.getAuthToken();
    let data, examData = [];
    try {
      const [evRes, exRes] = await Promise.all([
        fetch(
          `${SUPA_URL}/rest/v1/usage_events?select=event_type,app,payload,created_at&user_id=eq.${window.currentUser.id}&event_type=in.(quiz_session_end,auto_session_end,audio_sent,session_start,lookup,text_evaluated,photo_evaluated,kasus_answered,revision,sprint_end,comp_completed,quiz_completed)&order=created_at.asc&limit=10000`,
          { headers: { apikey: SUPA_KEY, Authorization: `Bearer ${token}` } }
        ),
        window.sb.from('exam_results').select('created_at,level,score,total').order('created_at', { ascending: false }).limit(20)
      ]);
      if (!evRes.ok) throw new Error(await evRes.text());
      data = await evRes.json();
      examData = exRes.data || [];
    } catch (err) {
      content.innerHTML = '<p style="color:#e53935;">Error al cargar estadísticas.</p>';
      return;
    }

    const quizSessions = data.filter(e => e.event_type === 'quiz_session_end');
    const totalWords   = quizSessions.reduce((s, e) => s + (e.payload?.total || 0), 0);
    const totalCorrect = quizSessions.reduce((s, e) => s + (e.payload?.correct || 0), 0);
    const pct          = totalWords > 0 ? Math.round(totalCorrect / totalWords * 100) : null;
    const lookups  = data.filter(e => e.event_type === 'lookup').length;
    const audios   = data.filter(e => e.event_type === 'audio_sent').length;
    const sessions = data.filter(e => e.event_type === 'session_start').length;
    const escrituras = data.filter(e => e.event_type === 'text_evaluated' || e.event_type === 'photo_evaluated');
    const totalEscrituras = escrituras.length;

    const localDay = e => new Date(e.created_at).toLocaleDateString('sv-SE');

    // Today (local date)
    const todayStr     = new Date().toLocaleDateString('sv-SE');
    const todayQuiz    = quizSessions.filter(e => localDay(e) === todayStr);
    const todayWords   = todayQuiz.reduce((s, e) => s + (e.payload?.total || 0), 0);
    const todayCorrect = todayQuiz.reduce((s, e) => s + (e.payload?.correct || 0), 0);
    const todayPct     = todayWords > 0 ? Math.round(todayCorrect / todayWords * 100) : null;
    const todayAudios  = data.filter(e => e.event_type === 'audio_sent' && localDay(e) === todayStr).length;

    // Last 30 days array (oldest → newest)
    const days30 = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days30.push(d.toLocaleDateString('sv-SE'));
    }
    const countByDay  = Object.fromEntries(days30.map(d => [d, 0]));
    const audiosByDay = Object.fromEntries(days30.map(d => [d, 0]));
    quizSessions.forEach(e => {
      const day = localDay(e);
      if (countByDay[day] !== undefined) countByDay[day] += e.payload?.total || 0;
    });
    data.filter(e => e.event_type === 'audio_sent').forEach(e => {
      const day = localDay(e);
      if (audiosByDay[day] !== undefined) audiosByDay[day]++;
      if (countByDay[day] !== undefined) countByDay[day]++;
    });
    const counts   = days30.map(d => countByDay[d]);
    const maxCount = Math.max(...counts, 1);

    // Activity per day for streak: quiz + escritura + kasus + revisión + audio + sprint + comprensión + gramática
    const activityByDay = Object.fromEntries(days30.map(d => [d, 0]));
    quizSessions.forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    escrituras.forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'kasus_answered').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'revision').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'audio_sent').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'sprint_end').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'comp_completed').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'auto_session_end').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    data.filter(e => e.event_type === 'quiz_completed').forEach(e => {
      const day = localDay(e);
      if (activityByDay[day] !== undefined) activityByDay[day]++;
    });
    const activityCounts = days30.map(d => activityByDay[d]);

    // Streak: consecutive days with any activity, ending on the last active day
    let streak = 0;
    let si = activityCounts.length - 1;
    while (si >= 0 && activityCounts[si] === 0) si--; // skip trailing empty days
    while (si >= 0 && activityCounts[si] > 0) { streak++; si--; }

    function row(label, value) {
      return `<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #f0f0f0;">
        <span style="color:#555;">${label}</span>
        <strong>${value}</strong>
      </div>`;
    }

    // Exam stats
    let examHtml;
    if (examData.length === 0) {
      examHtml = '<div style="color:#aaa;font-size:13px;padding:6px 0;">Sin exámenes completados.</div>';
    } else {
      const examAvg = Math.round(examData.reduce((s, e) => s + e.score / e.total, 0) / examData.length * 100);
      const examRows = examData.slice(0, 5).map(e => {
        const p = Math.round(e.score / e.total * 100);
        const col = p >= 80 ? '#2e7d32' : p >= 60 ? '#e65100' : '#c62828';
        const d = new Date(e.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        return `<div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f0f0f0;font-size:13px;">
          <span style="color:#555;">${d} · <strong>${e.level}</strong></span>
          <strong style="color:${col}">${e.score}/${e.total}</strong>
        </div>`;
      }).join('');
      examHtml = row('Total completados', examData.length) +
        row('Promedio', examAvg + '%') +
        `<div style="margin-top:10px;"><div style="font-size:11px;color:#999;letter-spacing:.5px;margin-bottom:5px;">ÚLTIMOS 5</div>${examRows}</div>`;
    }

    const bars = days30.map((day, i) => {
      const count    = counts[i];
      const audDay   = audiosByDay[day];
      const hasAct   = activityByDay[day] > 0;
      const hPct     = Math.round(count / maxCount * 100);
      const isToday  = day === todayStr;
      const bg       = isToday ? '#1976D2' : hasAct ? '#90CAF9' : '#e8e8e8';
      const label    = day.slice(5).replace('-', '/'); // MM/DD
      const tip      = `${label}\n📝 ${count} palabra${count !== 1 ? 's' : ''}\n🎙 ${audDay} audio${audDay !== 1 ? 's' : ''}`;
      return `<div title="${tip}"
        style="flex:1;height:70px;display:flex;flex-direction:column;justify-content:flex-end;cursor:default;">
        <div style="width:100%;height:${Math.max(hPct,hasAct?5:2)}%;background:${bg};border-radius:2px 2px 0 0;min-height:${hasAct?'3px':'2px'};"></div>
      </div>`;
    }).join('');

    content.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;color:#1565C0;letter-spacing:.5px;margin-bottom:6px;">HOY</div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;padding:12px 10px;background:#E3F2FD;border-radius:8px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#1976D2;line-height:1;">${todayWords}</div>
            <div style="font-size:11px;color:#555;margin-top:4px;">palabra${todayWords !== 1 ? 's' : ''}</div>
            <div style="font-size:11px;color:#1565C0;margin-top:2px;">${todayPct !== null ? `${todayPct}% ✓` : '—'}</div>
          </div>
          <div style="flex:1;padding:12px 10px;background:#E8F5E9;border-radius:8px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#388E3C;line-height:1;">${todayAudios}</div>
            <div style="font-size:11px;color:#555;margin-top:4px;">audio${todayAudios !== 1 ? 's' : ''}</div>
            <div style="font-size:11px;color:#2E7D32;margin-top:2px;">enviado${todayAudios !== 1 ? 's' : ''}</div>
          </div>
        </div>
      </div> 
      ${streak > 1 ? `<div style="text-align:center;margin-bottom:14px;font-size:13px;color:#E65100;font-weight:600;">🔥 ${streak} día${streak !== 1 ? 's' : ''} seguido${streak !== 1 ? 's' : ''}</div>` : ''}
      <div style="margin-bottom:20px;">
        <div style="font-size:11px;font-weight:600;color:#999;letter-spacing:.5px;margin-bottom:8px;">ÚLTIMOS 30 DÍAS</div>
        <div style="display:flex;align-items:flex-end;gap:1px;width:100%;">
          ${bars}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:10px;color:#bbb;margin-top:3px;">
          <span>${days30[0].slice(5).replace('-','/')}</span><span>hoy</span>
        </div>
      </div>
      <div style="font-size:11px;font-weight:600;color:#999;letter-spacing:.5px;margin-bottom:4px;">TODO EL TIEMPO</div>
      ${row('Palabras respondidas', totalWords > 0 ? `${totalWords} (${pct}% ✓)` : '—')}
      ${row('Búsquedas en diccionario', lookups || '—')}
      ${row('Audios enviados (Chat)', audios || '—')}
      ${row('Sesiones de estudio', sessions || '—')}
      ${row('Ejercicios de escritura', totalEscrituras || '—')}
      <div style="font-size:11px;font-weight:600;color:#E65100;letter-spacing:.5px;margin:16px 0 4px;">EXÁMENES DE GRAMÁTICA</div>
      ${examHtml}
    `;

    _renderNotifSection();
  };

  window.getAuthToken = function () {
    return _cachedToken;
  };

  let _eventQueue = [];
  let _flushTimer = null;

  async function _flushEvents() {
    if (!_eventQueue.length || !window.currentUser) return;
    const batch = _eventQueue.splice(0);
    try {
      const { error } = await window.sb.from('usage_events').insert(
        batch.map(e => ({ user_id: window.currentUser.id, ...e }))
      );
      if (error) throw error;
    } catch {
      _eventQueue.unshift(...batch);
    }
  }

  function _scheduleFlush() {
    if (_flushTimer) return;
    _flushTimer = setTimeout(() => { _flushTimer = null; _flushEvents(); }, 30000);
  }

  window.addEventListener('pagehide', () => _flushEvents());

  window.logEvent = function (app, eventType, payload) {
    if (!window.currentUser) return;
    _eventQueue.push({ app, event_type: eventType, payload: payload || {} });
    _scheduleFlush();
  };

  // Apps that consume OpenAI Whisper STT; their 'audio_sent' events share a single 60min/day cap.
  window.VOICE_STT_APPS = ['mundliche', 'chat-voz', 'chatvoz2', 'chat-reformulaciones'];

  // --- Daily active-time tracking (per app), local-first ---
  // Each calendar day gets its own localStorage record, updated every 15s
  // while the tab is visible and a user is signed in — zero DB calls during
  // the day. On sign-in/page-load/tab-refocus, any record whose day isn't
  // today is synced (1 RPC call each, additive across devices) and removed
  // locally. Body id → canonical appId, matching ids used elsewhere
  // (admin/index.html's APP_NAMES, logEvent).
  const _DT_BODY_APP = {
    'page-b1': 'b1', 'page-b2': 'b2', 'page-a1': 'a1', 'page-a2': 'a2', 'page-c1': 'c1', 'page-c2': 'c2',
    'page-gram': 'gramatica', 'page-lv': 'lectura-veloz', 'page-esc': 'escritura',
    'page-cr': 'chat-reformulaciones', 'page-kas': 'kasus', 'page-cv': 'chat-voz', 'page-cv2': 'chatvoz2',
    'page-mp': 'mundliche', 'page-dic': 'diccionario', 'page-cor': 'corrector', 'page-plan': 'plan',
    'page-home': 'home',
  };
  const DT_PREFIX = 'ejaleman_daily_time_';
  const DT_TICK_MS = 15000;
  let _dtLastTick = null;

  function _dtToday() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  function _dtAppId() {
    const bodyId = document.body && document.body.id;
    if (bodyId && _DT_BODY_APP[bodyId]) return _DT_BODY_APP[bodyId];
    // Fallback for pages with no mapped body id (admin/teacher/marketing/chatvoz2).
    const seg = location.pathname.split('/').filter(Boolean);
    if (!seg.length) return 'home';
    if (seg[0] === 'marketing') return seg[1] ? `marketing-${seg[1].replace('.html', '')}` : 'marketing';
    return seg[seg.length - 1].replace(/\.html$/, '') || seg[0];
  }

  function _dtKey(date) { return DT_PREFIX + date; }

  function _dtLoadApps(date) {
    try { return JSON.parse(localStorage.getItem(_dtKey(date))) || {}; } catch { return {}; }
  }

  function _dtSaveApps(date, apps) {
    try { localStorage.setItem(_dtKey(date), JSON.stringify(apps)); } catch {}
  }

  async function _dtSyncStaleDays() {
    if (!window.currentUser) return;
    const todayKey = _dtKey(_dtToday());
    for (const key of Object.keys(localStorage)) {
      if (!key.startsWith(DT_PREFIX) || key === todayKey) continue;
      let apps;
      try { apps = JSON.parse(localStorage.getItem(key)); } catch { apps = null; }
      if (!apps || !Object.keys(apps).length) { localStorage.removeItem(key); continue; }
      try {
        const { error } = await window.sb.rpc('upsert_daily_usage_time', { p_date: key.slice(DT_PREFIX.length), p_apps: apps });
        if (error) throw error;
        localStorage.removeItem(key);
      } catch {
        // Keep it local; retried on the next sign-in/load. Lost only if the
        // user never reopens the app again (accepted tradeoff).
      }
    }
  }

  function _dtTick() {
    if (!window.currentUser || document.visibilityState !== 'visible') { _dtLastTick = null; return; }
    const now = Date.now();
    if (_dtLastTick == null) { _dtLastTick = now; return; }
    const delta = Math.min(now - _dtLastTick, DT_TICK_MS * 2);
    _dtLastTick = now;
    if (delta <= 0) return;
    const today = _dtToday();
    const apps = _dtLoadApps(today);
    const appId = _dtAppId();
    apps[appId] = (apps[appId] || 0) + delta;
    _dtSaveApps(today, apps);
  }

  function _dtInit() {
    setInterval(_dtTick, DT_TICK_MS);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') { _dtLastTick = Date.now(); _dtSyncStaleDays(); }
      else _dtTick();
    });
    window.addEventListener('pagehide', _dtTick);
  }

  window.sb.auth.onAuthStateChange(async function (event, session) {
    _cachedToken = session?.access_token || null;
    window.currentUser = session ? session.user : null;
    window.updateAuthUI();
    _dtSyncStaleDays();
    if (event === 'SIGNED_IN' && typeof window.onAuthSignedIn === 'function') {
      await window.onAuthSignedIn();
    }
    if (event === 'SIGNED_OUT' && typeof window.onAuthSignedOut === 'function') {
      window.onAuthSignedOut();
    }
  });

  window.sb.auth.getSession().then(function (result) {
    const session = result.data.session;
    _cachedToken = session?.access_token || null;
    window.currentUser = session ? session.user : null;
    window.updateAuthUI();
    _dtSyncStaleDays();
    if (window.currentUser && typeof window.onAuthSignedIn === 'function') {
      window.onAuthSignedIn();
    }
    if (!window.currentUser) {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.openAuthModal);
      } else {
        window.openAuthModal();
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _injectModal);
  } else {
    _injectModal();
  }

  document.addEventListener('DOMContentLoaded', function () {
    _renderNavMenu();
    window.updateAuthUI();
    _dtInit();
    if (window.currentUser && typeof window.onAuthSignedIn === 'function') {
      window.onAuthSignedIn();
    }
  });
})();

