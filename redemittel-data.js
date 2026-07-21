// Banco de Redemittel (fórmulas fijas) por nivel CEFR y Teil del examen oral.
// Mismo espíritu que grammar-data.js: un global reutilizable, aquí sin fragmentar
// en varios archivos porque solo B1 está poblado por ahora — si se amplía con
// contenido real para otros niveles, replicar el patrón shim de grammar-data.js.
window.REDEMITTEL = window.REDEMITTEL || {
    B1: {
        'gemeinsam-planen': [
            { label: 'Vorschläge machen', frases: ['Wie wäre es, wenn wir …?', 'Ich schlage vor, dass …', 'Wir könnten doch …', 'Was hältst du davon, wenn …?'] },
            { label: 'Zustimmen', frases: ['Das ist eine gute Idee!', 'Einverstanden, aber …', 'Da hast du recht.'] },
            { label: 'Widersprechen / Alternativen', frases: ['Ich weiß nicht, ob das eine gute Idee ist …', 'Da bin ich anderer Meinung, weil …', 'Vielleicht wäre es besser, wenn …'] },
            { label: 'Abschluss', frases: ['Also gut, dann machen wir es so.', 'Dann sind wir uns einig.'] },
        ],
        'praesentation': [
            { label: 'Einleitung (Folie 1)', frases: ['Ich möchte heute über … sprechen.', 'Das Thema meiner Präsentation ist …'] },
            { label: 'Erfahrungen (Folie 2)', frases: ['Ich habe die Erfahrung gemacht, dass …', 'Aus eigener Erfahrung kann ich sagen, …'] },
            { label: 'Heimatland (Folie 3)', frases: ['In meinem Heimatland ist es üblich, dass …', 'Bei uns in … ist das anders: …'] },
            { label: 'Vor-/Nachteile + Meinung (Folie 4)', frases: ['Ein Vorteil ist, dass …', 'Ein Nachteil ist, dass …', 'Meiner Meinung nach …'] },
            { label: 'Schluss (Folie 5)', frases: ['Zusammenfassend lässt sich sagen, dass …', 'Vielen Dank für eure Aufmerksamkeit!'] },
        ],
        'feedback-geben': [
            { label: 'Feedback geben', frases: ['Deine Präsentation hat mir gut gefallen, weil …', 'Besonders interessant fand ich …'] },
            { label: 'Fragen stellen', frases: ['Ich hätte noch eine Frage: …', 'Mich würde interessieren, ob …'] },
            { label: 'Auf Fragen antworten', frases: ['Danke für deine Frage.', 'Das ist eine gute Frage. Ich denke, …'] },
        ],
    },
};
