/* auth.js — módulo de autenticación compartido para todas las páginas */
(function () {
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
      btn.title = 'Ver mi progreso';
      btn.onclick = window.openStatsPanel;
      const role = await _getRole();
      if (role === 'admin') _addDashboardLink();
    } else {
      btn.textContent = '👤';
      btn.title = 'Iniciar sesión';
      btn.onclick = window.openAuthModal;
      _removeDashboardLink();
    }
  };

  window.closeStatsPanel = function () {
    const p = document.getElementById('stats-panel');
    if (p) p.style.display = 'none';
  };

  window.openStatsPanel = async function () {
    if (!window.currentUser) { window.openAuthModal(); return; }

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
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #eee;">
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

    const { data, error } = await window.sb
      .from('usage_events')
      .select('event_type,app,payload,created_at')
      .eq('user_id', window.currentUser.id);

    if (error || !data) {
      content.innerHTML = '<p style="color:#e53935;">Error al cargar estadísticas.</p>';
      return;
    }

    const words    = data.filter(e => e.event_type === 'word_answered');
    const correct  = words.filter(e => e.payload && e.payload.correct).length;
    const pct      = words.length > 0 ? Math.round(correct / words.length * 100) : null;
    const lookups  = data.filter(e => e.event_type === 'lookup').length;
    const audios   = data.filter(e => e.event_type === 'audio_sent').length;
    const sessions = data.filter(e => e.event_type === 'session_start').length;

    // Today (local date)
    const todayStr = new Date().toLocaleDateString('sv-SE'); // YYYY-MM-DD
    const todayWords   = words.filter(e => e.created_at && e.created_at.slice(0,10) === todayStr);
    const todayCorrect = todayWords.filter(e => e.payload && e.payload.correct).length;
    const todayPct     = todayWords.length > 0 ? Math.round(todayCorrect / todayWords.length * 100) : null;
    const todayAudios  = data.filter(e => e.event_type === 'audio_sent' && e.created_at && e.created_at.slice(0,10) === todayStr).length;

    // Last 30 days array (oldest → newest)
    const days30 = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days30.push(d.toLocaleDateString('sv-SE'));
    }
    const countByDay = Object.fromEntries(days30.map(d => [d, 0]));
    words.forEach(e => {
      const day = e.created_at && e.created_at.slice(0,10);
      if (day && countByDay[day] !== undefined) countByDay[day]++;
    });
    const counts  = days30.map(d => countByDay[d]);
    const maxCount = Math.max(...counts, 1);

    // Streak: consecutive days with at least 1 word, ending on the last active day
    let streak = 0;
    let si = counts.length - 1;
    while (si >= 0 && counts[si] === 0) si--; // skip trailing empty days
    while (si >= 0 && counts[si] > 0) { streak++; si--; }

    function row(label, value) {
      return `<div style="display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid #f0f0f0;">
        <span style="color:#555;">${label}</span>
        <strong>${value}</strong>
      </div>`;
    }

    const bars = days30.map((day, i) => {
      const count  = counts[i];
      const hPct   = Math.round(count / maxCount * 100);
      const isToday = day === todayStr;
      const bg     = isToday ? '#1976D2' : count > 0 ? '#90CAF9' : '#e8e8e8';
      const label  = day.slice(5).replace('-', '/'); // MM/DD
      return `<div title="${label}: ${count} palabras"
        style="flex:1;height:70px;display:flex;flex-direction:column;justify-content:flex-end;cursor:default;">
        <div style="width:100%;height:${Math.max(hPct,count>0?5:2)}%;background:${bg};border-radius:2px 2px 0 0;min-height:${count>0?'3px':'2px'};"></div>
      </div>`;
    }).join('');

    content.innerHTML = `
      <div style="margin-bottom:16px;">
        <div style="font-size:11px;font-weight:600;color:#1565C0;letter-spacing:.5px;margin-bottom:6px;">HOY</div>
        <div style="display:flex;gap:8px;">
          <div style="flex:1;padding:12px 10px;background:#E3F2FD;border-radius:8px;text-align:center;">
            <div style="font-size:32px;font-weight:700;color:#1976D2;line-height:1;">${todayWords.length}</div>
            <div style="font-size:11px;color:#555;margin-top:4px;">palabra${todayWords.length !== 1 ? 's' : ''}</div>
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
      ${row('Palabras respondidas', words.length > 0 ? `${words.length} (${pct}% ✓)` : '—')}
      ${row('Búsquedas en diccionario', lookups || '—')}
      ${row('Audios enviados (Chat)', audios || '—')}
      ${row('Sesiones de estudio', sessions || '—')}
    `;
  };

  window.getAuthToken = async function () {
    const { data } = await window.sb.auth.getSession();
    return data?.session?.access_token || null;
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
})();

