/**
 * Vocabulario Alemán - Lógica de la aplicación
 */

// ========================
// DATOS / DATASETS
// ========================
const DATA = {
    lista1: {
        de: [
            "Nachvollziehbar", "Ursprünglich", "Beziehungsweise", "Allerdings",
            "Zuverlässig", "Entscheidend", "Voraussetzung", "Herausforderung",
            "Zuständig", "Maßnahme", "Verantwortung", "Einerseits", "Andererseits",
            "Demzufolge", "Inzwischen", "Offensichtlich", "Selbstverständlich",
            "Vergleichsweise", "Angemessen", "Durchführen", "Obwohl", "Dennoch",
            "Somit", "Darüber hinaus", "Hinsichtlich", "Infolgedessen",
            "Weitgehend", "Unter anderem", "Beispielsweise", "Insgesamt",
            "Zunächst", "Schließlich", "Folglich", "Stattdessen", "Andernfalls",
            "Inwiefern", "Soweit", "Im Gegensatz dazu", "Zusammenfassend"
        ],
        es: [
            "Comprensible", "Originalmente", "Respectivamente", "Sin embargo",
            "Confiable", "Decisivo", "Requisito", "Desafío", "Responsable de",
            "Medida", "Responsabilidad", "Por un lado", "Por otro lado",
            "En consecuencia", "Mientras tanto", "Evidentemente", "Por supuesto",
            "Comparativamente", "Adecuado", "Llevar a cabo", "Aunque",
            "No obstante", "Por lo tanto", "Además", "Con respecto a",
            "Como consecuencia", "Más allá de eso", "En gran medida",
            "Entre otros", "Por ejemplo", "En total", "En primer lugar",
            "Finalmente", "Por consiguiente", "En lugar de eso", "De lo contrario",
            "En qué medida", "En la medida en que", "En contraste con ello",
            "En resumen"
        ]
    },

    lista2: {
        de: [
            "Berücksichtigen", "Darstellen", "Feststellen", "Beziehen auf",
            "Bewerten", "Erläutern", "Verdeutlichen", "Begründen", "Behaupten",
            "Überzeugen", "Erfordern", "Entstehen", "Vermeiden", "Fördern",
            "Beeinflussen", "Erreichen", "Scheitern", "Entwickeln", "Steigern",
            "Verringern", "Bedeutungsvoll", "Wesentlich", "Erheblich", "Nachhaltig",
            "Vielfältig", "Unverzichtbar", "Zweckmäßig", "Vorteilhaft",
            "Nachteilig", "Fragwürdig", "Überzeugend", "Kritisch", "Komplex",
            "Effektiv", "Effizient", "Glaubwürdig", "Relevant", "Dringend",
            "Erwartungsvoll", "Langfristig"
        ],
        es: [
            "Considerar", "Representar", "Determinar", "Referirse a", "Evaluar",
            "Explicar", "Aclarar", "Justificar", "Afirmar", "Convencer",
            "Requerir", "Surgir", "Evitar", "Fomentar", "Influir", "Alcanzar",
            "Fracasar", "Desarrollar", "Incrementar", "Reducir", "Significativo",
            "Esencial", "Considerable", "Sostenible", "Diverso", "Indispensable",
            "Adecuado", "Ventajoso", "Desventajoso", "Cuestionable", "Convincente",
            "Crítico", "Complejo", "Eficaz", "Eficiente", "Creíble", "Relevante",
            "Urgente", "Expectante", "A largo plazo"
        ]
    },

    adjpreposicion: {
        de: [
            "allergisch auf", "allergisch gegen", "angewiesen auf", "bekannt für",
            "dankbar für", "erstaunt über", "froh über", "geeignet für",
            "gewöhnt an", "glücklich über", "informiert über", "spezialisiert auf",
            "stolz auf", "traurig über", "überrascht über", "verantwortlich für",
            "verärgert über", "vorbereitet auf", "wichtig für", "zuständig für",
            "abhängig von", "alternativ zu", "arm an", "reich an", "ausgehend von",
            "begeistert von", "bereit zu", "beschäftigt mit", "beteiligt an",
            "betroffen von", "einverstanden mit", "entschlossen zu", "enttäuscht von",
            "erfahren in", "fähig zu", "interessiert an", "überrascht von",
            "überzeugt von", "unabhängig von", "verbunden mit", "verwandt mit",
            "vorsichtig mit", "vorsichtig bei", "zufrieden mit"
        ],
        es: [
            "alérgico a", "alérgico contra", "dependiente de", "conocido por",
            "agradecido por", "sorprendido por", "contento por", "apto para",
            "acostumbrado a", "feliz por", "informado sobre", "especializado en",
            "orgulloso de", "triste por", "sorprendido por", "responsable de",
            "molesto por", "preparado para", "importante para", "competente de",
            "dependiente de", "alternativa a", "pobre en", "rico en",
            "partiendo de", "entusiasmado por", "dispuesto a", "ocupado con",
            "implicado en", "afectado por", "de acuerdo con", "decidido a",
            "decepcionado por", "con experiencia en", "capaz de", "interesado en",
            "sorprendido por", "convencido de", "independiente de", "vinculado con",
            "emparentado con", "cuidadoso con", "satisfecho con"
        ]
    },

    nivelA: {
        de: [
            "Bescheid geben", "Auskunft geben", "zum Ausdruck bringen",
            "zum Ausdruck kommen", "eine Frage stellen", "eine Antwort geben",
            "jemanden auf dem Laufenden halten", "auf dem Laufenden sein",
            "im Blick haben", "im Zusammenhang stehen mit", "der Meinung sein",
            "eine Entscheidung treffen", "in Betracht ziehen", "in Betracht kommen",
            "infrage kommen", "einen Antrag stellen", "in Anspruch nehmen",
            "zur Verfügung stehen", "zur Verfügung stellen", "die Kosten übernehmen",
            "die Kosten tragen", "in Kontakt treten mit", "in Kontakt stehen mit",
            "Kontakt aufnehmen mit", "einen Vorschlag machen",
            "einen Vorschlag unterbreiten", "eine Vereinbarung treffen",
            "eine Verabredung treffen", "Vorbereitungen treffen",
            "eine Tätigkeit ausüben", "im Vordergrund stehen", "im Trend liegen",
            "einen Eindruck bekommen von", "Eindruck machen auf",
            "Einfluss nehmen auf", "Bezug nehmen auf", "Wert legen auf",
            "Wertschätzung genießen", "die Daumen drücken", "sich Hoffnung machen",
            "die Hoffnung aufgeben", "Vertrauen herstellen"
        ],
        es: [
            "avisar / informar", "dar información", "expresar", "expresarse",
            "hacer una pregunta", "dar una respuesta", "mantener a alguien informado",
            "estar al tanto", "tener en cuenta", "estar relacionado con",
            "opinar", "tomar una decisión", "considerar", "ser una opción",
            "entrar en consideración", "presentar una solicitud", "hacer uso de",
            "estar disponible", "poner a disposición", "asumir los costos",
            "correr con los gastos", "ponerse en contacto con", "estar en contacto",
            "contactar", "hacer una propuesta", "presentar una propuesta",
            "llegar a un acuerdo", "concertar una cita", "hacer preparativos",
            "ejercer una actividad", "estar en primer plano", "estar de moda",
            "formarse una impresión", "causar impresión", "influir",
            "hacer referencia", "dar importancia", "gozar de aprecio",
            "desear suerte", "tener esperanza", "perder la esperanza",
            "generar confianza"
        ]
    },

    nivelB: {
        de: [
            "einen Vorschlag machen", "einen Vorschlag unterbreiten",
            "eine Vereinbarung treffen", "eine Verabredung treffen",
            "Vorbereitungen treffen", "eine Tätigkeit ausüben", "im Vordergrund stehen",
            "im Trend liegen", "einen Eindruck bekommen von", "Eindruck machen auf",
            "Einfluss nehmen auf", "Bezug nehmen auf", "Wert legen auf",
            "Wertschätzung genießen", "die Daumen drücken", "sich Hoffnung machen",
            "die Hoffnung aufgeben", "Vertrauen herstellen", "zur Diskussion stellen",
            "zur Debatte stehen", "Stellung nehmen zu", "zur Sprache bringen",
            "zur Folge haben", "Berücksichtigung finden", "Beachtung schenken",
            "unter Druck stehen", "unter Druck setzen", "etwas im Griff haben",
            "etwas in den Griff bekommen", "in Ordnung bringen", "eine Prüfung bestehen",
            "durch eine Prüfung fallen", "eine Qualifikation mitbringen",
            "ein Profil anlegen", "Vorsorge treffen für", "im Wettbewerb stehen mit",
            "Widerstand leisten gegen", "Wirkung zeigen", "auf den Grund gehen"
        ],
        es: [
            "hacer una propuesta", "presentar una propuesta", "llegar a un acuerdo",
            "concertar una cita", "hacer preparativos", "ejercer una actividad",
            "estar en primer plano", "estar de moda", "formarse una impresión",
            "causar impresión", "influir", "hacer referencia", "dar importancia",
            "gozar de aprecio", "desear suerte", "tener esperanza",
            "perder la esperanza", "generar confianza", "poner en discusión",
            "estar en debate", "tomar postura", "sacar un tema a colación",
            "tener como consecuencia", "ser tomado en cuenta", "prestar atención",
            "estar bajo presión", "poner bajo presión", "tener bajo control",
            "lograr controlar", "arreglar", "aprobar un examen", "reprobar un examen",
            "aportar una cualificación", "crear un perfil", "tomar precauciones",
            "estar en competencia", "oponer resistencia", "tener efecto",
            "ir al fondo de la cuestión"
        ]
    }
};

// ========================
// ESTADO DE LA APP
// ========================
const State = {
    setKey: "lista1",
    es: [],
    de: [],
    vistos: [],
    erroresSet: new Set(),
    modoAuto: true,
    modoDual: false,
    dualFlip: false,
    timerStarted: false,
    timerId: null,
    seconds: 0,
    currentIndex: null,
    optionIdxs: [],
    selectionLock: false,
    roundToken: 0
};

// ========================
// HELPERS
// ========================
const $ = (id) => document.getElementById(id);

function safeText(el, txt) {
    if (!el) return;
    el.textContent = txt ?? "";
}

function escapeHtml(s) {
    return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffleUniqueIndexes(length, count, forcedIndex = null) {
    const set = new Set();
    while (set.size < count) {
        set.add(Math.floor(Math.random() * length));
    }
    const arr = [...set];

    if (forcedIndex !== null) {
        const pos = Math.floor(Math.random() * count);
        arr[pos] = forcedIndex;
    }
    return arr;
}

function nextUnseenIndex() {
    if (!State.de.length) return 0;

    // Reset cuando esté casi agotado
    if (State.vistos.length >= State.de.length - 3) {
        State.vistos = [];
    }

    let tries = 0;
    let idx = Math.floor(Math.random() * State.de.length);
    while (State.vistos.includes(idx) && tries < 20) {
        idx = Math.floor(Math.random() * State.de.length);
        tries++;
    }
    State.vistos.push(idx);
    return idx;
}

// ========================
// TIMER
// ========================
function startTimer() {
    if (State.timerId) return;

    State.timerStarted = true;
    State.timerId = setInterval(() => {
        const ac = parseInt(($("aciertos")?.textContent || "0"), 10);
        if (ac >= 50) {
            stopTimer();
            return;
        }

        State.seconds++;
        const m = Math.floor(State.seconds / 60);
        const s = State.seconds % 60;
        safeText($("tiempo"), String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0"));
    }, 1000);
}

function stopTimer() {
    if (State.timerId) {
        clearInterval(State.timerId);
        State.timerId = null;
    }
}

function resetTimer() {
    stopTimer();
    State.timerStarted = false;
    State.seconds = 0;
    safeText($("tiempo"), "00:00");
}

// ========================
// SELECCIÓN MÚLTIPLE
// ========================
function renderSelectionNext() {
    if (!State.es.length || !State.de.length) return;

    State.selectionLock = false;
    State.roundToken++;

    const idx = nextUnseenIndex();
    State.currentIndex = idx;
    State.optionIdxs = shuffleUniqueIndexes(State.de.length, 4, idx);

    safeText($("palabra"), State.es[idx]);

    const ids = ["op1", "op2", "op3", "op4"];
    ids.forEach((id, slot) => {
        const el = $(id);
        if (!el) return;

        const wordIndex = State.optionIdxs[slot];
        el.textContent = State.de[wordIndex];
        el.dataset.wordIndex = String(wordIndex);
        el.dataset.roundToken = String(State.roundToken);

        // Limpiar estados anteriores
        el.classList.remove("correct", "incorrect");
    });
}

function markOptionsBackground(color) {
    const cont = $("opciones");
    if (!cont) return;

    const prevColor = cont.style.background;
    cont.style.background = color;
    setTimeout(() => {
        cont.style.background = prevColor || "";
    }, 200);
}

function handleSelectionPick(chosenWordIndex, token) {
    if (State.currentIndex === null) return;

    // Evita doble conteo
    if (State.selectionLock) return;
    if (String(token) !== String(State.roundToken)) return;

    State.selectionLock = true;

    // Iniciar timer en primera respuesta
    if (!State.timerStarted) startTimer();

    const correct = chosenWordIndex === State.currentIndex;

    // Marcar visualmente la opción seleccionada
    const selectedEl = document.querySelector(`.option[data-word-index="${chosenWordIndex}"]`);

    if (correct) {
        if (selectedEl) selectedEl.classList.add("correct");
        markOptionsBackground("#4caf50");

        const acEl = $("aciertos");
        if (acEl) {
            acEl.textContent = String(parseInt(acEl.textContent || "0", 10) + 1);
        }
    } else {
        if (selectedEl) selectedEl.classList.add("incorrect");

        // Mostrar la respuesta correcta
        const correctEl = document.querySelector(`.option[data-word-index="${State.currentIndex}"]`);
        if (correctEl) correctEl.classList.add("correct");

        markOptionsBackground("#f44336");

        if (!State.erroresSet.has(State.currentIndex)) {
            State.erroresSet.add(State.currentIndex);

            const erEl = $("errores");
            if (erEl) {
                erEl.textContent = String(parseInt(erEl.textContent || "0", 10) + 1);
            }
        }
    }

    // Siguiente palabra después de delay
    setTimeout(renderSelectionNext, 800);
}

function bindSelectionEvents() {
    const cont = $("opciones");
    if (!cont) return;

    if (cont.dataset.bound === "1") return;
    cont.dataset.bound = "1";

    cont.addEventListener("click", (e) => {
        const opt = e.target.closest(".option");
        if (!opt) return;

        const chosen = parseInt(opt.dataset.wordIndex, 10);
        const token = opt.dataset.roundToken;

        if (Number.isNaN(chosen)) return;

        handleSelectionPick(chosen, token);
    });
}

// ========================
// REPETICIÓN ORAL
// ========================
function renderRepeatNext() {
    if (!State.es.length || !State.de.length) return;

    const idx = nextUnseenIndex();
    safeText($("p1"), State.es[idx]);
    safeText($("p2"), State.de[idx]);
}

function speakOnce(text, lang) {
    if (!text) return Promise.resolve();

    return new Promise((resolve) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        utterance.onend = resolve;
        utterance.onerror = resolve;
        speechSynthesis.speak(utterance);
    });
}

async function speakLoop() {
    while (State.modoAuto) {
        if (!State.modoDual) {
            await speakOnce($("p2")?.textContent || "", "de-DE");
            await wait(1500);
            renderRepeatNext();
            continue;
        }

        // Modo dual: alterna DE/ES
        if (!State.dualFlip) {
            await speakOnce($("p2")?.textContent || "", "de-DE");
            State.dualFlip = true;
        } else {
            await speakOnce($("p1")?.textContent || "", "es-ES");
            State.dualFlip = false;
            await wait(500);
            renderRepeatNext();
        }

        await wait(300);
    }
}

function bindRepeatControls() {
    const btnAuto = $("auto");
    const btnDual = $("dual");
    const btnLeer = $("leer");

    if (btnAuto) {
        btnAuto.addEventListener("click", () => {
            State.modoAuto = !State.modoAuto;
            btnAuto.textContent = State.modoAuto ? "Auto: ON" : "Auto: OFF";
            btnAuto.className = State.modoAuto ? "btn btn-secondary" : "btn btn-danger";

            if (State.modoAuto) {
                speakLoop();
            }
        });
    }

    if (btnDual) {
        btnDual.addEventListener("click", () => {
            State.modoDual = !State.modoDual;
            State.dualFlip = false;
            btnDual.textContent = State.modoDual ? "ES-DE" : "DE";
            btnDual.className = State.modoDual ? "btn btn-secondary" : "btn btn-danger";
        });
    }

    if (btnLeer) {
        btnLeer.addEventListener("click", async () => {
            // Si ya está hablando, cortar
            if (speechSynthesis.speaking) {
                speechSynthesis.cancel();
            }

            if (State.modoAuto) {
                speakLoop();
            } else {
                // One-shot
                if (State.modoDual) {
                    await speakOnce($("p2")?.textContent || "", "de-DE");
                    await speakOnce($("p1")?.textContent || "", "es-ES");
                } else {
                    await speakOnce($("p2")?.textContent || "", "de-DE");
                }
            }
        });
    }
}

// ========================
// LISTA DE PALABRAS
// ========================
function renderLista(esArr, deArr) {
    const table = $("lista");
    if (!table) return;

    const pairs = [];
    for (let i = 0; i < Math.min(esArr.length, deArr.length); i++) {
        pairs.push([deArr[i], esArr[i]]);
    }

    // Ordenar alfabéticamente por alemán
    pairs.sort((a, b) => String(a[0]).localeCompare(String(b[0])));

    table.innerHTML = `
        <thead>
            <tr>
                <th>Alemán</th>
                <th>Español</th>
            </tr>
        </thead>
        <tbody>
            ${pairs.map(p => `<tr><td>${escapeHtml(p[0])}</td><td>${escapeHtml(p[1])}</td></tr>`).join("")}
        </tbody>
    `;
}

// ========================
// SELECTOR DE LISTAS
// ========================
function setActiveSet(key) {
    if (!DATA[key]) return;

    State.setKey = key;
    State.es = [...DATA[key].es];
    State.de = [...DATA[key].de];

    // Reset de estado
    State.vistos = [];
    State.erroresSet.clear();
    State.currentIndex = null;
    State.optionIdxs = [];

    // Reset marcadores
    safeText($("aciertos"), "0");
    safeText($("errores"), "0");

    // Reset timer
    resetTimer();

    // Render
    renderLista(State.es, State.de);
    renderRepeatNext();
    renderSelectionNext();
}

function mountSetButtons() {
    const bar = $("sets-bar");
    if (!bar) return;

    bar.innerHTML = "";

    Object.keys(DATA).forEach((key) => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = key;
        btn.addEventListener("click", () => setActiveSet(key));
        bar.appendChild(btn);
    });
}

// ========================
// INICIALIZACIÓN
// ========================
function initApp() {
    mountSetButtons();
    bindSelectionEvents();
    bindRepeatControls();
    setActiveSet("lista1");
}

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", initApp);
