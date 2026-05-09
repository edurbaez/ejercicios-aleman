const State = {
    type: 'tarea',
    imageBase64: null,
    mimeType: null,
    lastResult: null,
};

// --- Dark mode ---
function toggleDarkMode() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode_cor', document.body.classList.contains('dark') ? '1' : '');
}

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

function handleFile(file) {
    if (!file) return;

    const VALID = ['image/jpeg', 'image/png', 'image/webp'];
    if (!VALID.includes(file.type)) {
        showError('Formato no compatible. Usa JPG, PNG o WebP.');
        return;
    }
    if (file.size > 5 * 1024 * 1024) {
        showError('La imagen supera los 5 MB. Usa una imagen más pequeña.');
        return;
    }

    hideError();
    const reader = new FileReader();
    reader.onload = ev => {
        const dataUrl = ev.target.result;
        // dataUrl = "data:<mime>;base64,<data>"
        const [meta, b64] = dataUrl.split(',');
        State.imageBase64 = b64;
        State.mimeType = meta.replace('data:', '').replace(';base64', '');

        document.getElementById('previewImg').src = dataUrl;
        document.getElementById('uploadPlaceholder').style.display = 'none';
        document.getElementById('previewWrap').style.display = 'flex';
        document.getElementById('revisarBtn').disabled = false;
        document.getElementById('resultado').style.display = 'none';
        document.getElementById('resultado').innerHTML = '';
    };
    reader.readAsDataURL(file);
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
async function revisar() {
    if (!State.imageBase64) return;

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

        const resp = await fetch('/api/vision', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                image_base64: State.imageBase64,
                mime_type: State.mimeType,
                type: State.type,
            }),
        });

        const raw = await resp.text();
        let data;
        try { data = JSON.parse(raw); }
        catch { throw new Error(`Respuesta inesperada del servidor: ${raw.slice(0, 120)}`); }

        if (!resp.ok) throw new Error(data.error || 'Error del servidor');

        State.lastResult = data;
        renderResult(data);
    } catch (e) {
        showError(e.message);
    } finally {
        setSpinner(false);
        document.getElementById('revisarBtn').disabled = false;
    }
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

    const scoreColor = data.puntuacion >= 8 ? '#43a047' : data.puntuacion >= 5 ? '#f9a825' : '#e53935';
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
                    <span class="cor-error-cat" style="background:${color}20;color:${color};border-color:${color}40">${err.categoria || ''}</span>
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
                    <span class="cor-score-num">${data.puntuacion}</span>
                    <span class="cor-score-den">/10</span>
                </div>
                <div class="cor-result-summary">
                    <p class="cor-summary-text">${escHtml(data.resumen || '')}</p>
                    <p class="cor-error-count">${errCount === 0 ? 'Sin errores' : errCount === 1 ? '1 error encontrado' : `${errCount} errores encontrados`}</p>
                </div>
            </div>

            ${errCount > 0 ? `<h3 class="cor-section-title">Errores</h3>` : ''}
            <div class="cor-errors-list">${errorsHtml}</div>

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

    if (data.observaciones_generales) {
        lines.push('');
        lines.push(`Observaciones: ${data.observaciones_generales}`);
    }

    navigator.clipboard.writeText(lines.join('\n')).then(() => {
        const btn = document.getElementById('copyBtn');
        if (!btn) return;
        const orig = btn.textContent;
        btn.textContent = '¡Copiado!';
        btn.disabled = true;
        setTimeout(() => { btn.textContent = orig; btn.disabled = false; }, 2000);
    }).catch(() => showError('No se pudo copiar al portapapeles.'));
}

// --- UI helpers ---
function setSpinner(visible) {
    document.getElementById('spinner').style.display = visible ? 'block' : 'none';
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
        .replace(/"/g, '&quot;');
}

// --- Init ---
(function init() {
    if (localStorage.getItem('darkMode_cor') === '1') document.body.classList.add('dark');
})();
