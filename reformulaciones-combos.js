// Curated grammar-rule combos for chat-reformulaciones.html: each exercise
// forces applying every rule in `ruleIds` at once. Keyed by the level of the
// highest rule in the combo. `id` is always ruleIds joined with '+', which is
// also the key of the pregenerated bank in reformulaciones-combos-data.json.
// Only combos judged natural in chat-reformulaciones-combos-plan.md §6 belong
// here — the random mode picks from this list, never from arbitrary pairs.
// `guia` (optional) pins down the shape of the exercise for the generator; the
// pilot showed that without it multi-rule combos produce incoherent sentences.
window.REFORMULACIONES_COMBOS = {
    A1: [
        { ruleIds: ['a1-06', 'a1-10'], titulo: 'Acusativo + ein/kein',
          guia: 'Source: an affirmative sentence with a direct object in parentheses in nominative, e.g. "Ich habe (ein Hund)." Instruction: niega la frase con kein y pon el objeto en acusativo → "Ich habe keinen Hund." Mix masculine, feminine, neuter and plural objects.' },
        { ruleIds: ['a1-06', 'a1-12'], titulo: 'Acusativo + posesivos',
          guia: 'Source: a sentence whose direct object is given in parentheses in nominative with a possessive, e.g. "Ich suche (mein Schlüssel)." → "Ich suche meinen Schlüssel." Rotate possessives (mein, dein, sein, ihr, unser, euer, Ihr) and genders.' },
        { ruleIds: ['a1-20', 'a1-08'], titulo: 'Verbos separables + verbo en posición 2',
          guia: 'Source: the pieces of a sentence with the separable verb in infinitive in brackets and a time expression to put first, e.g. "[aufstehen] ich / um sieben Uhr / morgen" with instruction "Empieza por «Morgen» y conjuga el verbo separable" → "Morgen stehe ich um sieben Uhr auf." The sentence must NOT start with the subject, so V2 inversion is needed.' },
    ],
    A2: [
        { ruleIds: ['a1-20', 'a2-02'], titulo: 'Verbos separables + Perfekt' },
        { ruleIds: ['a1-14', 'a2-13'], titulo: 'Pronombres en dativo + verbos de dativo',
          guia: 'Source: a present-tense sentence where the dative object is a full noun phrase, instruction asks to replace it with a pronoun, e.g. "Ich helfe meiner Mutter." → "Ich helfe ihr." Use only dative verbs (helfen, danken, gefallen, gehören, antworten, gratulieren, schmecken, passen).' },
        { ruleIds: ['a2-21', 'a2-22'], titulo: 'deshalb/dann vs. weil/wenn/dass',
          guia: 'Source: a sentence already joined with deshalb/sonst/dann (position-1 connector, inverted word order); the Spanish instruction asks to rewrite it with the matching subordinate connector, e.g. "Ich bin krank, deshalb bleibe ich zu Hause." + "Reescríbela con weil" → "Ich bleibe zu Hause, weil ich krank bin." Also the reverse direction (weil/wenn clause → deshalb/dann). Both directions must appear, and the meaning must be preserved exactly. No parentheses: every word is already in its final form.' },
        { ruleIds: ['a1-06', 'a1-12', 'a2-04'], titulo: 'Acusativo + posesivo + für/ohne/gegen',
          guia: 'Source: a sentence with a gap in parentheses holding the SPANISH preposition and the German possessive + noun in nominative, e.g. "Ich kaufe ein Geschenk (para / mein Bruder)." → "Ich kaufe ein Geschenk für meinen Bruder." The student must pick the German preposition too. Use ONLY accusative prepositions (für = para, ohne = sin, gegen = contra, durch = por/a través de, um = alrededor de) — never dative ones such as mit, bei, von. Mix masculine nouns (which change) with feminine, neuter and plural ones (which do not), and never state the gender in the instruction. Every sentence must be something a person would really say.' },
        { ruleIds: ['a1-07', 'a1-20', 'a2-02'], titulo: 'W-Fragen + separables + Perfekt',
          guia: 'Source: an affirmative present-tense statement with a separable verb and an underlined-by-context element, instruction asks for the W-question about that element in Perfekt, e.g. "Er kommt um acht Uhr an. (Pregunta por la hora, en Perfekt)" → "Wann ist er angekommen?"' },
    ],
    B1: [
        { ruleIds: ['b1-06', 'b1-05'], titulo: 'Subordinadas + declinación de adjetivos',
          guia: 'Source: two main clauses; one contains an adjective given undeclined in parentheses inside a noun phrase, and the connector to use is named in the instruction, e.g. "Wir bleiben zu Hause. Draußen weht ein (kalt) Wind." + "Une con weil" → "Wir bleiben zu Hause, weil draußen ein kalter Wind weht." Rotate weil, obwohl, dass, wenn, bevor, nachdem, and definite/indefinite/zero article.' },
        { ruleIds: ['b1-03', 'b1-05'], titulo: 'Oraciones de relativo + declinación de adjetivos',
          guia: 'Source: two sentences about the same noun; the first gives it with an ATTRIBUTIVE adjective undeclined in parentheses, e.g. "Das ist der (neu) Lehrer. Ich habe ihm gestern geholfen." → "Das ist der neue Lehrer, dem ich gestern geholfen habe." The adjective must stay in front of the noun in the answer — never predicative after sein. Rotate the case of the relative pronoun (der/den/dem/die/das) and definite/indefinite/possessive articles.' },
        { ruleIds: ['b1-11', 'b1-06'], titulo: 'Plusquamperfekt + nachdem/als',
          guia: 'Source: two main clauses in Präteritum/Perfekt describing two past events in order, instruction asks to join them with nachdem (earlier event in Plusquamperfekt) — e.g. "Er aß zu Abend. Dann sah er fern." → "Nachdem er zu Abend gegessen hatte, sah er fern." Some items may use "als" with Plusquamperfekt for an event completed before.' },
        { ruleIds: ['b1-02', 'b1-06'], titulo: 'Konjunktiv II + condicionales con wenn',
          guia: 'Source: a real statement of fact in indicative, typically with a negation, e.g. "Ich habe keine Zeit, deshalb komme ich nicht mit." Instruction: formula la condición irreal con wenn → "Wenn ich Zeit hätte, würde ich mitkommen." The source must not contain würde/wäre/hätte/könnte.' },
        { ruleIds: ['b1-04', 'b1-20'], titulo: 'Genitivo + preposiciones de genitivo',
          guia: 'Source: a sentence expressing cause/concession/time with a weil/obwohl/während clause, instruction asks to replace it with the genitive preposition (wegen, trotz, während, innerhalb, außerhalb) + noun phrase, e.g. "Wir bleiben drinnen, weil es regnet (der Regen)." → "Wegen des Regens bleiben wir drinnen." Give the noun in nominative in parentheses.' },
        { ruleIds: ['b1-03', 'b1-06', 'b1-02'], titulo: 'Relativo + subordinada + Konjunktiv II',
          guia: 'Target shape: an unreal wenn-condition in Konjunktiv II whose clause contains a relative clause, e.g. "Wenn ich den Kurs besuchen könnte, den du mir empfohlen hast, würde ich schneller Deutsch lernen." Source: three indicative sentences stating the facts, e.g. "Du hast mir einen Kurs empfohlen. Ich kann ihn nicht besuchen. Deshalb lerne ich nicht schneller Deutsch." The source must not contain würde/wäre/hätte/könnte or any relative pronoun. Its last sentence must state the real consequence with deshalb, so the main clause of the answer is fully derivable from the source — never invent a consequence such as "wäre ich glücklich".' },
    ],
    B2: [
        { ruleIds: ['b2-05', 'b1-06'], titulo: 'Pasiva con modales + dass',
          guia: 'Source: an active sentence with a modal verb plus a reporting frame, e.g. "Der Chef sagt: Wir müssen den Bericht bis Freitag abgeben." Instruction: usa dass y pasa la frase a pasiva con el modal → "Der Chef sagt, dass der Bericht bis Freitag abgegeben werden muss." Rotate modals (müssen, können, sollen, dürfen).' },
        { ruleIds: ['b2-13', 'b1-05'], titulo: 'Relativo en genitivo + declinación de adjetivos',
          guia: 'Source: two sentences where the second has a possessive referring to a noun in the first, plus an adjective in parentheses, e.g. "Ich kenne einen Autor. Seine (neu) Bücher sind sehr erfolgreich." → "Ich kenne einen Autor, dessen neue Bücher sehr erfolgreich sind." Note that after dessen/deren the adjective takes strong endings.' },
        { ruleIds: ['b2-01', 'b1-13'], titulo: 'Konjunktiv I + preguntas indirectas',
          guia: 'Source: a reported direct question in quotes, e.g. "Die Journalistin fragte den Minister: „Haben Sie das Gesetz schon unterschrieben?“" Instruction: pásala a pregunta indirecta con Konjunktiv I → "Die Journalistin fragte den Minister, ob er das Gesetz schon unterschrieben habe." Mix ob-questions and W-questions (wann, warum, wie viel…), and use news-report register. The quoted direct question is a normal German question — it never starts with "ob".' },
        { ruleIds: ['b1-05', 'b2-13', 'b1-04'], titulo: 'Adjetivos + relativo en genitivo + genitivo',
          guia: 'Source: two sentences; the first has a "von + dative" phrase to turn into a genitive attribute with an attributive adjective in parentheses, the second has a possessive referring back to it, e.g. "Das ist das Haus von (unser alt) Nachbar. Sein Garten ist riesig." → "Das ist das Haus unseres alten Nachbarn, dessen Garten riesig ist." So the answer always contains a real genitive article/possessive + declined adjective (des alten, unserer neuen…) AND dessen/deren. Adjectives are always attributive, never predicative after sein.' },
    ],
};

Object.entries(window.REFORMULACIONES_COMBOS).forEach(([nivel, combos]) =>
    combos.forEach(c => { c.id = c.ruleIds.join('+'); c.nivel = nivel; })
);
