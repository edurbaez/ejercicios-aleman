// ── Supabase ───────────────────────────────────────────
const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';
const SUPA_KEY = 'sb_publishable_y9CSkHLB2haNPnzvP0-RUQ_OF5h3t4I';
const sb = supabase.createClient(SUPA_URL, SUPA_KEY);

async function supaGet(palabra) {
    try {
        const { data } = await sb
            .from("diccionario_cache")
            .select("*")
            .eq("id", palabra.toLowerCase())
            .maybeSingle();
        return data || null;
    } catch { return null; }
}

async function supaSet(palabra, info) {
    try {
        await sb.from("diccionario_cache").insert({
            id: palabra.toLowerCase(),
            _palabra: palabra,
            palabra,
            traduccion: info.traduccion || null,
            nivel: info.nivel || null,
            definicion: info.definicion || null,
            sinonimos: info.sinonimos || [],
            antonimo: info.antonimo || null,
        });
    } catch {}
}

// ── Dark mode ──────────────────────────────────────────
function toggleDarkMode() {
    const isDark = document.body.classList.toggle("dark");
    localStorage.setItem("darkMode_dic", isDark ? "1" : "0");
}
if (localStorage.getItem("darkMode_dic") === "1") document.body.classList.add("dark");

// ── Caché IndexedDB ────────────────────────────────────
const DB_NAME = "diccionario";
const DB_STORE = "palabras";
let _db = null;

function abrirDB() {
    if (_db) return Promise.resolve(_db);
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(DB_NAME, 1);
        req.onupgradeneeded = e => {
            e.target.result.createObjectStore(DB_STORE, { keyPath: "id" });
        };
        req.onsuccess = e => { _db = e.target.result; resolve(_db); };
        req.onerror = () => reject(req.error);
    });
}

async function cacheGet(palabra) {
    try {
        const db = await abrirDB();
        return new Promise(resolve => {
            const req = db.transaction(DB_STORE).objectStore(DB_STORE).get(palabra.toLowerCase());
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
        });
    } catch { return null; }
}

async function cacheSet(palabra, info) {
    try {
        const db = await abrirDB();
        return new Promise(resolve => {
            const store = db.transaction(DB_STORE, "readwrite").objectStore(DB_STORE);
            store.put({ id: palabra.toLowerCase(), _palabra: palabra, ...info });
            store.transaction.oncomplete = resolve;
        });
    } catch {}
}

async function cacheAll() {
    try {
        const db = await abrirDB();
        return new Promise(resolve => {
            const req = db.transaction(DB_STORE).objectStore(DB_STORE).getAll();
            req.onsuccess = () => {
                const map = {};
                (req.result || []).forEach(r => { map[r.id] = r; });
                resolve(map);
            };
            req.onerror = () => resolve({});
        });
    } catch { return {}; }
}

// ── Sugerencias ────────────────────────────────────────
const input = document.getElementById("input-palabra");
const divSug = document.getElementById("sugerencias");
let sugActivo = -1;

input.addEventListener("input", async () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { cerrarSugerencias(); return; }

    const cache = await cacheAll();
    const matches = Object.keys(cache)
        .filter(k => k.startsWith(q) && k !== q)
        .slice(0, 7);

    if (matches.length === 0) { cerrarSugerencias(); return; }

    divSug.innerHTML = matches.map((k, i) => {
        const nivel = cache[k].nivel || "";
        const original = cache[k]._palabra || k;
        return `<div class="sug-item" data-palabra="${original}" data-idx="${i}">
            <span>${original}</span>
            ${nivel ? `<span class="sug-nivel">${nivel}</span>` : ""}
        </div>`;
    }).join("");

    divSug.querySelectorAll(".sug-item").forEach(el => {
        el.addEventListener("mousedown", e => {
            e.preventDefault();
            seleccionarSugerencia(el.dataset.palabra);
        });
    });

    sugActivo = -1;
    divSug.style.display = "block";
});

input.addEventListener("keydown", e => {
    const items = divSug.querySelectorAll(".sug-item");
    if (divSug.style.display === "block" && items.length > 0) {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            sugActivo = Math.min(sugActivo + 1, items.length - 1);
            actualizarActivo(items);
            return;
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            sugActivo = Math.max(sugActivo - 1, -1);
            actualizarActivo(items);
            return;
        }
        if (e.key === "Enter" && sugActivo >= 0) {
            seleccionarSugerencia(items[sugActivo].dataset.palabra);
            return;
        }
    }
    if (e.key === "Escape") cerrarSugerencias();
    if (e.key === "Enter") buscar();
});

document.addEventListener("click", e => {
    if (!e.target.closest(".search-wrap")) cerrarSugerencias();
});

function actualizarActivo(items) {
    items.forEach((el, i) => el.classList.toggle("activo", i === sugActivo));
}

function cerrarSugerencias() {
    divSug.style.display = "none";
    sugActivo = -1;
}

function seleccionarSugerencia(palabra) {
    input.value = palabra;
    cerrarSugerencias();
    buscar();
}

// ── Búsqueda ───────────────────────────────────────────
async function buscar() {
    const palabra = input.value.trim();
    if (!palabra) return;
    cerrarSugerencias();

    const btn = document.getElementById("btn-buscar");
    const spinner = document.getElementById("spinner");
    const resultado = document.getElementById("resultado");
    const errorMsg = document.getElementById("error-msg");

    errorMsg.style.display = "none";
    resultado.style.display = "none";

    // 1. IndexedDB local
    const cached = await cacheGet(palabra);
    if (cached) {
        mostrarResultado(cached._palabra || palabra, cached);
        return;
    }

    btn.disabled = true;
    spinner.style.display = "block";

    // 2. Supabase compartida
    const remoto = await supaGet(palabra);
    if (remoto) {
        await cacheSet(palabra, remoto);
        btn.disabled = false;
        spinner.style.display = "none";
        mostrarResultado(remoto.palabra || palabra, remoto);
        return;
    }

    const system = `Eres un diccionario de alemán preciso. El usuario te dará una palabra en alemán.
Responde SIEMPRE con un JSON válido con exactamente estas claves:
{
  "traduccion": "traducción al español",
  "nivel": "A1|A2|B1|B2|C1|C2",
  "definicion": "definición en alemán, clara y concisa",
  "sinonimos": ["palabra1", "palabra2"],
  "antonimo": "antónimo en alemán o null si no tiene"
}
No incluyas nada fuera del JSON.`;

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                system,
                messages: [{ role: "user", content: palabra }]
            })
        });

        const rawText = await res.text();
        let data;
        try { data = JSON.parse(rawText); }
        catch { throw new Error(`Respuesta inválida del servidor: ${rawText.slice(0, 120)}`); }
        if (!res.ok || data.error) throw new Error(data.error || "Error del servidor");

        let info;
        try {
            const raw = data.reply.replace(/```json[\s\S]*?```|```/g, "").trim();
            info = JSON.parse(raw);
        } catch {
            throw new Error("La IA no devolvió JSON válido: " + (data.reply || "").slice(0, 120));
        }

        // 3. Guardar en ambos cachés
        await Promise.all([cacheSet(palabra, info), supaSet(palabra, info)]);
        mostrarResultado(palabra, info);

    } catch (e) {
        errorMsg.textContent = "Error: " + e.message;
        errorMsg.style.display = "block";
    } finally {
        btn.disabled = false;
        spinner.style.display = "none";
    }
}

// ── Render ─────────────────────────────────────────────
function mostrarResultado(palabra, info) {
    document.getElementById("r-palabra").textContent = palabra;
    document.getElementById("r-nivel").textContent = info.nivel || "";
    document.getElementById("r-traduccion").textContent = info.traduccion || "—";
    document.getElementById("r-definicion").textContent = info.definicion || "—";

    const sinEl = document.getElementById("r-sinonimos");
    const sins = Array.isArray(info.sinonimos) ? info.sinonimos : [];
    sinEl.innerHTML = sins.length > 0
        ? `<div class="chips">${sins.map(s => `<span class="chip">${s}</span>`).join("")}</div>`
        : `<span class="sin-datos">sin sinónimos</span>`;

    const rowAnt = document.getElementById("row-antonimo");
    const antEl = document.getElementById("r-antonimo");
    if (info.antonimo && info.antonimo !== "null") {
        antEl.textContent = info.antonimo;
        rowAnt.style.display = "flex";
    } else {
        rowAnt.style.display = "none";
    }

    document.getElementById("resultado").style.display = "block";
}
