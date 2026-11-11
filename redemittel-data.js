// Banco de Redemittel (fórmulas fijas) por nivel CEFR y Teil del examen oral.
// Mismo espíritu que grammar-data.js: un global reutilizable, aquí sin fragmentar
// en varios archivos porque solo B1 y C1 están poblados — si crece a más niveles,
// replicar el patrón shim de grammar-data.js. Las claves de Teil deben coincidir con
// LEVEL_SPECS[level].teile[].id de mundliche.html (en C1, 'feedback-geben' = Stellung nehmen).
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
    C1: {
        'vortrag': [
            { label: 'Einstieg und Thema', frases: ['In meinem Vortrag befasse ich mich mit der Frage, inwiefern …', 'Kaum ein Thema wird derzeit so kontrovers diskutiert wie …', 'Ich möchte heute auf ein Thema eingehen, das uns alle betrifft: …'] },
            { label: 'Gliederung ankündigen', frases: ['Mein Vortrag gliedert sich in drei Teile.', 'Zunächst werde ich …, anschließend … und abschließend …', 'Im ersten Teil gehe ich auf … ein.'] },
            { label: 'Überleitungen', frases: ['Damit komme ich zum nächsten Punkt: …', 'Lassen Sie mich nun auf … eingehen.', 'Nachdem ich … dargestellt habe, möchte ich nun …'] },
            { label: 'Argumentieren und veranschaulichen', frases: ['Ein gewichtiges Argument für … ist, dass …', 'Dies lässt sich am Beispiel … veranschaulichen.', 'Hinzu kommt, dass …', 'Nicht zu unterschätzen ist dabei …'] },
            { label: 'Vergleich mit dem Heimatland', frases: ['In meinem Heimatland stellt sich die Lage etwas anders dar: …', 'Während hierzulande …, ist es in … üblich, dass …'] },
            { label: 'Fazit und Schluss', frases: ['Zusammenfassend lässt sich sagen, dass …', 'Abschließend möchte ich festhalten, dass …', 'Meines Erachtens überwiegen die Vorteile, sofern …', 'Ich danke Ihnen für Ihre Aufmerksamkeit und freue mich auf Ihre Fragen.'] },
        ],
        'diskussion': [
            { label: 'Position beziehen', frases: ['Ich vertrete die Auffassung, dass …', 'Ich stehe auf dem Standpunkt, dass …', 'Für mich steht außer Frage, dass …'] },
            { label: 'Zustimmen mit Einschränkung', frases: ['Da gebe ich Ihnen grundsätzlich recht, allerdings …', 'Das ist durchaus ein berechtigter Einwand, dennoch …', 'Dem kann ich nur bedingt zustimmen.'] },
            { label: 'Widersprechen', frases: ['Da muss ich Ihnen widersprechen: …', 'Das sehe ich grundlegend anders.', 'Ihr Argument greift meiner Meinung nach zu kurz, weil …'] },
            { label: 'Nachfragen und präzisieren', frases: ['Könnten Sie das näher erläutern?', 'Verstehe ich Sie richtig, dass …?', 'Worauf ich hinauswill, ist Folgendes: …'] },
            { label: 'Das Wort ergreifen', frases: ['Darf ich kurz einhaken?', 'Wenn ich da kurz einwerfen darf: …', 'Lassen Sie mich bitte ausreden.'] },
            { label: 'Annäherung und Abschluss', frases: ['Wir sind uns zumindest darin einig, dass …', 'Vielleicht ließe sich ein Mittelweg finden, indem …', 'Letztlich hängt es davon ab, ob …'] },
        ],
        'feedback-geben': [
            { label: 'Aussage oder Daten aufgreifen', frases: ['Die Aussage, dass …, halte ich für …', 'Aus der Grafik geht hervor, dass …', 'Auffällig ist, dass …'] },
            { label: 'Bewerten', frases: ['Das überrascht mich insofern, als …', 'Diese These ist mir zu pauschal.', 'Das trifft nur bedingt zu, denn …'] },
            { label: 'Begründen und abwägen', frases: ['Dafür spricht vor allem, dass …', 'Dagegen lässt sich einwenden, dass …', 'Das hängt nicht zuletzt damit zusammen, dass …'] },
            { label: 'Fazit', frases: ['Unterm Strich bin ich der Ansicht, dass …', 'Alles in allem halte ich … für …'] },
        ],
    },
};
