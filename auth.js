/* auth.js — módulo de autenticación compartido para todas las páginas */
(function () {
  const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
  const SUPA_KEY = 'sb_publishable_y9CSkHLB2haNPnzvP0-RUQ_OF5h3t4I';
  window.sb = supabase.createClient(SUPA_URL, SUPA_KEY);
  window.currentUser = null;
  let _otpEmail = '';

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

  async function _getRole() {
    if (!window.currentUser) return null;
    const { data } = await window.sb.from('profiles').select('role').eq('id', window.currentUser.id).maybeSingle();
    return data ? data.role : null;
  }

  function _removeDashboardLink() {
    const existing = document.getElementById('nav-dashboard-link');
    if (existing) existing.remove();
  }

  function _addDashboardLink() {
    if (document.getElementById('nav-dashboard-link')) return;
    const menu = document.querySelector('.nav-dropdown-menu');
    if (!menu) return;
    const a = document.createElement('a');
    a.id = 'nav-dashboard-link';
    a.href = '/admin/';
    a.textContent = 'Dashboard →';
    a.style.cssText = 'font-weight:600;color:#1976D2;';
    menu.appendChild(a);
  }

  window.updateAuthUI = async function () {
    const btn = document.getElementById('auth-btn');
    if (!btn) return;
    if (window.currentUser) {
      const meta = window.currentUser.user_metadata || {};
      const name = (meta.full_name || meta.name || window.currentUser.email).split(/[\s@]/)[0];
      btn.textContent = name;
      btn.title = 'Cerrar sesión';
      btn.onclick = window.logout;
      const role = await _getRole();
      if (role === 'admin') _addDashboardLink();
    } else {
      btn.textContent = '👤';
      btn.title = 'Iniciar sesión';
      btn.onclick = window.openAuthModal;
      _removeDashboardLink();
    }
  };

  window.logEvent = async function (app, eventType, payload) {
    if (!window.currentUser) return;
    await window.sb.from('usage_events').insert({
      user_id: window.currentUser.id,
      app: app,
      event_type: eventType,
      payload: payload || {}
    });
  };

  window.sb.auth.onAuthStateChange(async function (event, session) {
    window.currentUser = session ? session.user : null;
    window.updateAuthUI();
    if (event === 'SIGNED_IN' && typeof window.onAuthSignedIn === 'function') {
      await window.onAuthSignedIn();
    }
    if (event === 'SIGNED_OUT' && typeof window.onAuthSignedOut === 'function') {
      window.onAuthSignedOut();
    }
  });

  window.sb.auth.getSession().then(function (result) {
    const session = result.data.session;
    window.currentUser = session ? session.user : null;
    window.updateAuthUI();
    if (window.currentUser && typeof window.onAuthSignedIn === 'function') {
      window.onAuthSignedIn();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _injectModal);
  } else {
    _injectModal();
  }
})();
