const State = {
    mode: 'foto',
    type: 'tarea',
    imageBase64: null,
    mimeType: null,
    lastResult: null,
    history: [],
};

// --- Dark mode ---
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode_cor', document.body.classList.contains('dark') ? '1' : '');
}

// --- Mode tabs (foto / texto) ---
document.querySelectorAll('.cor-mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.cor-mode-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        State.mode = tab.dataset.mode;
        document.getElementById('uploadArea').style.display = State.mode === 'foto' ? 'flex' : 'none';
        document.getElementById('textArea').style.display = State.mode === 'texto' ? 'block' : 'none';
        hideError();
        updateRevisarBtn();
    });
});

function updateRevisarBtn() {
    const ready = State.mode === 'foto'
        ? !!State.imageBase64
        : document.getElementById('textInput').value.trim().length >= 5;
    document.getElementById('revisarBtn').disabled = !ready;
}

document.getElementById('textInput').addEventListener('input', e => {
    document.getElementById('charCount').textContent = e.target.value.length;
    updateRevisarBtn();
});

// --- Type selector ---
document.querySelectorAll('.cor-type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.cor-type-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        State.type = btn.dataset.type;
    });
});

// --- File inputs ---
document.getElementById('fileInput').addEventListener('change', e => handleFile(e.target.files[0]));
document.getElementById('cameraInput').addEventListener('change', e => handleFile(e.target.files[0]));

// --- Drag & drop ---
const uploadArea = document.getElementById('uploadArea');
uploadArea.addEventListener('dragover', e => { e.preventDefault(); uploadArea.classList.add('cor-drag-over'); });
uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('cor-drag-over'));
uploadArea.addEventListener('drop', e => {
    e.preventDefault();
    uploadArea.classList.remove('cor-drag-over');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
});

document.getElementById('removeBtn').addEventListener('click', clearImage);

async function handleFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
        showError('Formato no compatible. Usa JPG, PNG o WebP.');
        return;
    }
    if (file.size > 15 * 1024 * 1024) {
        showError('La imagen supera los 15 MB. Usa una imagen más pequeña.');
        return;
    }

    hideError();
    try {
        const { dataUrl, base64 } = await compressImage(file);
        State.imageBase64 = base64;
        State.mimeType = 'image/jpeg';

        document.getElementById('previewImg').src = dataUrl;
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('previewWrap').style.display = 'flex';
        document.getElementById('revisarBtn').disabled = false;
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('resultado').innerHTML = '';
    } catch {
        showError('No se pudo procesar la imagen. Usa JPG, PNG o WebP.');
    }
}

// Downscale + re-encode as JPEG so the base64 payload stays well under
// Vercel's 4.5 MB body limit (raw base64 of a 5 MB photo would exceed it).
const MAX_DIMENSION = 1600;
async function compressImage(file) {
    const url = URL.createObjectURL(file);
    try {
        const img = await new Promise((resolve, reject) => {
            const im = new Image();
            im.onload = () => resolve(im);
            im.onerror = () => reject(new Error('decode failed'));
            im.src = url;
        });
        const scale = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        return { dataUrl, base64: dataUrl.split(',')[1] };
    } finally {
        URL.revokeObjectURL(url);
    }
}

function clearImage() {
    State.imageBase64 = null;
    State.mimeType = null;
    document.getElementById('previewImg').src = '';
    document.getElementById('uploadPlaceholder').style.display = 'flex';
    document.getElementById('previewWrap').style.display = 'none';
    document.getElementById('revisarBtn').disabled = true;
    document.getElementById('fileInput').value = '';
    document.getElementById('cameraInput').value = '';
    hideError();
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('resultado').innerHTML = '';
}

// --- API call ---
const TEXT_PROMPTS = {
    tarea: 'Eres un profesor de alemán experto. Analiza la tarea escrita en alemán que envía el usuario. Identifica todos los errores gramaticales, ortográficos y de estilo.',
    carta: 'Eres un experto en redacción formal e informal en alemán. Analiza la carta que envía el usuario. Revisa estructura, fórmulas epistolares, registro y gramática.',
    frases: 'Eres un corrector nativo de alemán. Analiza cada frase del texto del usuario por separado. Indica si cada frase es gramaticalmente correcta y natural para un hablante nativo.',
};

const TEXT_JSON_SPEC = `Responde ÚNICAMENTE con un objeto JSON válido con esta estructura exacta:
{
  "puntuacion": <número entero del 1 al 10>,
  "resumen": "<resumen breve en español>",
  "errores": [
    {
      "fragmento_original": "<texto con el error>",
      "correccion": "<texto corregido>",
      "explicacion": "<explicación en español>",
      "categoria": "<ortografía|declinación|conjugación|orden de palabras|registro|puntuación|vocabulario>"
    }
  ],
  "texto_corregido": "<el texto completo corregido en alemán>",
  "observaciones_generales": "<observaciones finales en español>"
}
Si no hay errores, usa "errores": []. No incluyas texto ni markdown fuera del JSON.`;

async function revisar() {
    const text = document.getElementById('textInput').value.trim();
    if (State.mode === 'foto' && !State.imageBase64) return;
    if (State.mode === 'texto' && text.length < 5) return;

    hideError();
    setSpinner(true);
    document.getElementById('revisarBtn').disabled = true;
    document.getElementById('resultado').style.display = 'none';

    try {
        const token = await window.getAuthToken?.();
        if (!token) {
            window.openAuthModal?.();
            throw new Error('Inicia sesión para usar el corrector.');
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };
        const signal = AbortSignal.timeout(60_000);

        let data;
        if (State.mode === 'foto') {
            const resp = await fetch('/api/vision', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    image_base64: State.imageBase64,
                    mime_type: State.mimeType,
                    type: State.type,
                }),
                signal,
            });
            data = await parseJsonResponse(resp);
        } else {
            const resp = await fetch('/api/chat', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    system: `${TEXT_PROMPTS[State.type]}\n\n${TEXT_JSON_SPEC}`,
                    messages: [{ role: 'user', content: text }],
                    max_tokens: 2500,
                }),
                signal,
            });
            const payload = await parseJsonResponse(resp);
            const cleaned = String(payload.reply || '')
                .replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/, '').trim();
            try { data = JSON.parse(cleaned); }
            catch { throw new Error('La IA devolvió una respuesta no estructurada. Inténtalo de nuevo.'); }
        }

        State.lastResult = data;
        renderResult(data);
        saveToHistory(data, State.mode === 'texto' ? text : null);
        window.logEvent?.('corrector', 'revision', { type: State.type, mode: State.mode, errors: data.errores?.length ?? 0 });
    } catch (e) {
        showError(e.name === 'TimeoutError' ? 'La revisión tardó demasiado. Inténtalo de nuevo.' : e.message);
    } finally {
        setSpinner(false);
        updateRevisarBtn();
    }
}

async function parseJsonResponse(resp) {
    const raw = await resp.text();
    let data;
    try { data = JSON.parse(raw); }
    catch { throw new Error(`Respuesta inesperada del servidor: ${raw.slice(0, 120)}`); }
    if (!resp.ok) throw new Error(data.error || 'Error del servidor');
    return data;
}

// --- Render result ---
const CATEGORY_COLORS = {
    'ortografía':        '#e53935',
    'declinación':       '#8e24aa',
    'conjugación':       '#1e88e5',
    'orden de palabras': '#00897b',
    'registro':          '#f4511e',
    'puntuación':        '#6d4c41',
    'vocabulario':       '#43a047',
};

function renderResult(data) {
    const el = document.getElementById('resultado');

    const score      = Number.isFinite(+data.puntuacion) ? +data.puntuacion : null;
    const scoreColor = score === null ? '#666' : score >= 8 ? '#43a047' : score >= 5 ? '#f9a825' : '#e53935';
    const errCount   = Array.isArray(data.errores) ? data.errores.length : 0;

    let errorsHtml = '';
    if (errCount === 0) {
        errorsHtml = '<p class="cor-no-errors">Sin errores encontrados</p>';
    } else {
        errorsHtml = (data.errores || []).map((err, i) => {
            const color = CATEGORY_COLORS[err.categoria] || '#666';
            return `
            <div class="cor-error-card">
                <div class="cor-error-header">
                    <span class="cor-error-num">${i + 1}</span>
                    <span class="cor-error-cat" style="background:${color}20;color:${color};border-color:${color}40">${escHtml(err.categoria || '')}</span>
                </div>
                <div class="cor-error-diff">
                    <span class="cor-original">${escHtml(err.fragmento_original || '')}</span>
                    <span class="cor-arrow">→</span>
                    <span class="cor-corrected">${escHtml(err.correccion || '')}</span>
                </div>
                <p class="cor-error-exp">${escHtml(err.explicacion || '')}</p>
            </div>`;
        }).join('');
    }

    el.innerHTML = `
        <div class="cor-result">
            <div class="cor-result-top">
                <div class="cor-score" style="color:${scoreColor};border-color:${scoreColor}">
                    <span class="cor-score-num">${score ?? '–'}</span>
                    <span class="cor-score-den">/10</span>
                </div>
                <div class="cor-result-summary">
                    <p class="cor-summary-text">${escHtml(data.resumen || '')}</p>
                    <p class="cor-error-count">${errCount === 0 ? 'Sin errores' : errCount === 1 ? '1 error encontrado' : `${errCount} errores encontrados`}</p>
                </div>
            </div>

            ${errCount > 0 ? `<h3 class="cor-section-title">Errores</h3>` : ''}
            <div class="cor-errors-list">${errorsHtml}</div>

            ${data.texto_corregido ? `
            <div class="cor-texto-corregido">
                <h3 class="cor-section-title">Texto corregido</h3>
                <p class="cor-corrected-text">${escHtml(data.texto_corregido)}</p>
                <button class="cor-btn cor-btn-outline cor-copy-btn" id="copyTextBtn" onclick="copiarTextoCorregido()">Copiar texto corregido</button>
            </div>` : ''}

            ${data.observaciones_generales ? `
            <div class="cor-observaciones">
                <h3 class="cor-section-title">Observaciones generales</h3>
                <p>${escHtml(data.observaciones_generales)}</p>
            </div>` : ''}

            <div class="cor-copy-row">
                <button class="cor-btn cor-btn-outline cor-copy-btn" id="copyBtn" onclick="copiarResultado()">Copiar correcciones</button>
            </div>
        </div>`;

    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// --- Copy result ---
function copiarResultado() {
    const data = State.lastResult;
    if (!data) return;

    const lines = [];
    lines.push(`Puntuación: ${data.puntuacion}/10`);
    lines.push(`Resumen: ${data.resumen}`);

    if (Array.isArray(data.errores) && data.errores.length > 0) {
        lines.push('');
        lines.push('Errores:');
        data.errores.forEach((err, i) => {
            lines.push(`${i + 1}. [${err.categoria}] ${err.fragmento_original} → ${err.correccion}`);
            lines.push(`   ${err.explicacion}`);
        });
    }

    if (data.texto_corregido) {
        lines.push('');
        lines.push(`Texto corregido: ${data.texto_corregido}`);
    }

    if (data.observaciones_generales) {
        lines.push('');
        lines.push(`Observaciones: ${data.observaciones_generales}`);
    }

    copyWithFeedback(lines.join('\n'), 'copyBtn');
}

function copiarTextoCorregido() {
    const text = State.lastResult?.texto_corregido;
    if (!text) return;
    copyWithFeedback(text, 'copyTextBtn');
}

function copyWithFeedback(text, btnId) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        const orig = btn.textContent;
        btn.textContent = '¡Copiado!';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2000);
    }).catch(() => showError('No se pudo copiar al portapapeles.'));
}

// --- History (IndexedDB) ---
const HIST_MAX = 20;

function histOpen() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open('corrector-db', 1);
        req.onupgradeneeded = () => req.result.createObjectStore('history', { keyPath: 'id', autoIncrement: true });
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

function histTx(db, mode, fn) {
    return new Promise((resolve, reject) => {
        const tx = db.transaction('history', mode);
        const result = fn(tx.objectStore('history'));
        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error);
    });
}

async function saveToHistory(data, sourceText) {
    try {
        const excerpt = (sourceText || data.resumen || '').slice(0, 90);
        const entry = { ts: Date.now(), mode: State.mode, type: State.type, excerpt, data };
        const db = await histOpen();
        await histTx(db, 'readwrite', st => st.add(entry));

        const all = await histGetAll(db);
        if (all.length > HIST_MAX) {
            const extra = all.slice(0, all.length - HIST_MAX);
            await histTx(db, 'readwrite', st => extra.forEach(e => st.delete(e.id)));
        }
        await renderHistory(db);
    } catch { /* history is best-effort; never block the result */ }
}

function histGetAll(db) {
    return new Promise((resolve, reject) => {
        const req = db.transaction('history', 'readonly').objectStore('history').getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
    });
}

async function renderHistory(db) {
    try {
        db = db || await histOpen();
        const all = (await histGetAll(db)).reverse();
        State.history = all;

        const wrap = document.getElementById('historial');
        const list = document.getElementById('historyList');
        if (all.length === 0) {
            wrap.style.display = 'none';
            list.innerHTML = '';
            return;
        }

        const TYPE_LABELS = { tarea: 'Tarea', carta: 'Carta', frases: 'Frases' };
        list.innerHTML = all.map(e => {
            const date = new Date(e.ts).toLocaleDateString('es', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
            const errs = Array.isArray(e.data?.errores) ? e.data.errores.length : 0;
            return `
            <button class="cor-history-item" data-id="${e.id}">
                <span class="cor-history-meta">${e.mode === 'texto' ? '✏️' : '📷'} ${TYPE_LABELS[e.type] || e.type} · ${date} · ${errs === 1 ? '1 error' : `${errs} errores`}</span>
                <span class="cor-history-excerpt">${escHtml(e.excerpt)}</span>
            </button>`;
        }).join('');

        list.querySelectorAll('.cor-history-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const entry = State.history.find(e => e.id === +btn.dataset.id);
                if (!entry) return;
                State.lastResult = entry.data;
                renderResult(entry.data);
            });
        });
        wrap.style.display = 'block';
    } catch { /* ignore */ }
}

document.getElementById('clearHistBtn').addEventListener('click', async () => {
    try {
        const db = await histOpen();
        await histTx(db, 'readwrite', st => st.clear());
        await renderHistory(db);
    } catch { /* ignore */ }
});

// --- UI helpers ---
function setSpinner(visible) {
    const el = document.getElementById('spinner');
    el.textContent = State.mode === 'texto' ? 'Analizando texto con IA...' : 'Analizando imagen con IA...';
    el.style.display = visible ? 'block' : 'none';
}

function showError(msg) {
    const el = document.getElementById('errorMsg');
    el.textContent = msg;
    el.style.display = 'block';
}

function hideError() {
    document.getElementById('errorMsg').style.display = 'none';
}

function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// --- Init ---
(function init() {
    if (localStorage.getItem('darkMode_cor') !== '') document.body.classList.add('dark');
    renderHistory();
})();
