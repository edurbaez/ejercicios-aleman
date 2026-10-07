// Teacher-written guides injected into scripts/generate-reformulaciones.js'
// prompt, per level and per grammar rule id. A level listed here switches the
// generator to the guided prompt (fewer, harder exercises + review pass); rules
// without an entry in `reglas` still use the guided prompt minus the rule block.
window.REFORMULACIONES_GUIAS = {
  C1: {
    ejercicios: 5,
    minPalabras: 12,
    requisitos: [
      'The "source" has 18–30 words in formal register (press, academic, institutional texts) and contains at least one subordinate clause or an extended noun phrase.',
      'The transformation changes at least two things (word order, case/ending, verb form, connector). It is never solvable by adding or removing a single word.',
      'The source and solutions[0] are never identical or near-identical, and the source does not already contain the target structure.',
      'Each exercise uses a different pattern from the guide and a different topic (science, economy, politics, environment, culture, work, society, health, technology, education).',
      'Vocabulary is C1: no A2/B1 everyday topics (family, shopping, weather, holidays).',
    ],
    reglas: {
      'c1-01': {
        patrones: [
          'man kann + Inf. → lässt sich + Inf.',
          'Passiv mit können (kann … werden) → lässt sich + Inf.',
          'Adjektiv auf -bar (ist lösbar/erklärbar) → lässt sich + Inf.',
          'man kann nicht / es ist unmöglich, … zu → lässt sich nicht + Inf.',
          'Präteritum or Perfekt source → ließ sich / hat sich … lassen',
        ],
        direccion: 'alternative form → lassen + sich',
        evitar: 'Sources where lassen means "permitir/encargar" (Ich lasse das Auto reparieren). Pure Präsens main clauses only: at least two exercises must have the structure inside a subordinate clause (dass sich … lässt).',
        modelo: {
          source: 'Experten betonen, dass man die Folgen der neuen Steuerreform für kleine Betriebe derzeit kaum abschätzen kann.',
          instruction: 'Reescribe la subordinada con lassen + sich.',
          solution: 'Experten betonen, dass sich die Folgen der neuen Steuerreform für kleine Betriebe derzeit kaum abschätzen lassen.',
        },
      },
      'c1-02': {
        patrones: [
          'muss … werden (Passiv mit müssen) → ist … zu + Inf. (obligation)',
          'kann … werden / man kann → ist … zu + Inf. (possibility)',
          'man darf nicht / kann nicht → ist nicht zu + Inf.',
          'Adjektiv auf -bar/-lich (ist erkennbar) → ist zu + Inf.',
          'Präteritum: musste … werden → war … zu + Inf.',
        ],
        direccion: 'alternative form → sein + zu + Inf.',
        evitar: 'Mixing up with haben + zu (active obligation). Every solution must keep the original meaning (obligation vs. possibility); the explanation must say which one applies.',
        modelo: {
          source: 'Anträge auf finanzielle Förderung müssen spätestens bis Ende März schriftlich beim zuständigen Ministerium eingereicht werden.',
          instruction: 'Reescribe la frase con sein + zu + infinitivo.',
          solution: 'Anträge auf finanzielle Förderung sind spätestens bis Ende März schriftlich beim zuständigen Ministerium einzureichen.',
        },
      },
      'c1-03': {
        patrones: [
          'Relativsatz mit muss … werden → Gerundivum (die zu prüfenden Unterlagen)',
          'Relativsatz mit ist … zu + Inf. → Gerundivum',
          'Gerundivum mit Adverb/Ergänzung (die bis Freitag zu erledigenden Aufgaben)',
          'negiert: nicht zu unterschätzend (Relativsatz mit kann nicht unterschätzt werden)',
          'Gerundivum in Dativ or Genitiv (mit den zu erwartenden Kosten / wegen der zu …)',
        ],
        direccion: 'Relativsatz → Gerundivum',
        evitar: 'Wrong adjective endings in the solution. Separable verbs must place zu inside (die einzureichenden Formulare). Relative clauses that express mere possibility without obligation.',
        modelo: {
          source: 'Die Kosten, die in den kommenden Jahren von den Kommunen getragen werden müssen, sind bisher nicht seriös berechnet worden.',
          instruction: 'Sustituye la oración de relativo por un Gerundivum (zu + Partizip I).',
          solution: 'Die in den kommenden Jahren von den Kommunen zu tragenden Kosten sind bisher nicht seriös berechnet worden.',
        },
      },
      'c1-04': {
        patrones: [
          'Relativsatz im Passiv mit 2+ Ergänzungen (von + Agens, Zeit, Ort) → Partizip II-Attribut',
          'Relativsatz im Aktiv, Präsens → Partizip I-Attribut (die stetig steigenden Mieten)',
          'Relativsatz mit sein-Perfekt (die … gestiegen sind) → Partizip II-Attribut ohne Passiv',
          'Attribut in Dativ or Genitiv (in der … veröffentlichten Studie, trotz der …)',
          'Two Relativsätze in one sentence, both compressed',
        ],
        direccion: 'Relativsatz → erweitertes Partizipialattribut',
        evitar: 'The template "Das X, das von Y ge-Z wurde, ist …" with a single complement — it is B2. Never more than one exercise with the attribute in nominative subject position.',
        modelo: {
          source: 'In der Studie, die im vergangenen Herbst von einem internationalen Forscherteam veröffentlicht wurde, werden die Ursachen der Mieten analysiert, die seit Jahren stetig steigen.',
          instruction: 'Convierte las dos oraciones de relativo en atributos participiales extendidos.',
          solution: 'In der im vergangenen Herbst von einem internationalen Forscherteam veröffentlichten Studie werden die Ursachen der seit Jahren stetig steigenden Mieten analysiert.',
        },
      },
      'c1-05': {
        patrones: [
          'Es wäre möglich gewesen, dass … / er hatte die Möglichkeit, tat es aber nicht → hätte … können',
          'Es war seine Pflicht, … aber er tat es nicht → hätte … müssen/sollen',
          'Reproach in present form (Warum hast du nicht …?) → Du hättest … sollen',
          'Modal-Irrealis inside a Nebensatz (dass/obwohl … hätte … können: double infinitive + hätte before them)',
          'Passiv: hätte … werden können/müssen',
        ],
        direccion: 'factual statement about an unrealized option → Irrealis der Vergangenheit mit Modalverb',
        evitar: 'Plain wenn-Irrealis without a modal (that is B2). In Nebensatz exercises, the solution must use the order "hätte + Inf. + Modal" (…, dass er es hätte verhindern können).',
        modelo: {
          source: 'Die Regierung hatte die Möglichkeit, die Krise rechtzeitig zu verhindern, aber sie hat die Warnungen der Experten ignoriert.',
          instruction: 'Expresa la posibilidad no aprovechada con hätte + infinitivo + können.',
          solution: 'Die Regierung hätte die Krise rechtzeitig verhindern können, aber sie hat die Warnungen der Experten ignoriert.',
        },
      },
      'c1-06': {
        patrones: [
          'Präteritum mit Modalverb (musste … tun) → Perfekt mit Ersatzinfinitiv',
          'Präteritum mit lassen (ließ … reparieren) → hat … reparieren lassen',
          'sehen/hören + Inf. im Präteritum → Perfekt',
          'Ersatzinfinitiv in Nebensatz (weil/dass … hat … müssen: hat before the double infinitive)',
          'Plusquamperfekt or Futur with Ersatzinfinitiv (hatte … können / wird … müssen)',
        ],
        direccion: 'Präteritum → Perfekt (or Plusquamperfekt) with Ersatzinfinitiv',
        evitar: 'Modal verbs without a dependent infinitive (er hat es gekonnt is NOT Ersatzinfinitiv). At least two exercises must be Nebensatz with the aux before the double infinitive.',
        modelo: {
          source: 'Viele Betriebe schlossen ihre Filialen auf dem Land, weil sie die gestiegenen Energiekosten nicht mehr tragen konnten.',
          instruction: 'Pon la subordinada en Perfekt (cuidado con el orden del verbo).',
          solution: 'Viele Betriebe schlossen ihre Filialen auf dem Land, weil sie die gestiegenen Energiekosten nicht mehr haben tragen können.',
        },
      },
      'c1-07': {
        patrones: [
          'Man sagt / Es wird berichtet, dass … → soll',
          'Er behauptet, dass er … → will (with Infinitiv Perfekt when the claim is about the past)',
          'Es ist wahrscheinlich, dass … → dürfte',
          'Alles deutet darauf hin / logisch gesehen … → müsste',
          'Claims about the past → Modal + Infinitiv Perfekt (soll … gewesen sein)',
        ],
        direccion: 'explicit source/attitude expression → evidential modal',
        evitar: 'Sources where the modal keeps its basic meaning (obligation). Every instruction must name which nuance to express ("rumor", "afirmación del propio sujeto", "estimación").',
        modelo: {
          source: 'Der ehemalige Minister behauptet, dass er von den illegalen Zahlungen an die Partei nie etwas gewusst hat.',
          instruction: 'Expresa que es una afirmación del propio sujeto usando will.',
          solution: 'Der ehemalige Minister will von den illegalen Zahlungen an die Partei nie etwas gewusst haben.',
        },
      },
      'c1-08': {
        patrones: [
          'Direct imperative reported → indirekte Rede mit sollen (Konj. I: solle; Konj. II sollten for plural)',
          'Polite request (Bitte …!) reported → mögen/sollen in Konj. I',
          'Rumor in direct form → Konjunktiv I (sei, habe, werde) incl. Vergangenheit (sei … gewesen)',
          'Subject claims about own past → will + Perfekt (will … gesagt haben)',
          'Mixed: one report with statement + order in the same sentence',
        ],
        direccion: 'direkte Rede → indirekte Rede',
        evitar: 'Konjunktiv I forms identical to the indicative (sie haben → must switch to Konj. II hätten). Source must be in quotation marks with a clear introducing verb. Order exercises must quote a real imperative (verb-first: „Reichen Sie …!“, „Schließ …!“), never a modal statement like „Wir müssen …“ (that is reported with müsse, not solle). Rumors use a personal source (Ein Sprecher sagte: „…“), not „Es wird gesagt: …“.',
        modelo: {
          source: 'Die Ärztin sagte zu dem Patienten: „Verzichten Sie in den nächsten Wochen unbedingt auf Alkohol und schonen Sie sich!“',
          instruction: 'Pasa la orden a estilo indirecto.',
          solution: 'Die Ärztin sagte zu dem Patienten, er solle in den nächsten Wochen unbedingt auf Alkohol verzichten und sich schonen.',
        },
      },
      'c1-09': {
        patrones: [
          'Genitivattribut → Kompositum with Fugen-s (die Wahl des Bundestages → die Bundestagswahl)',
          'Präpositionalattribut → Kompositum (Beiträge zur Krankenversicherung → Krankenversicherungsbeiträge)',
          'Three-part compound with -en-/-e- Fuge',
          'Compound whose article differs from the first element (gender = head) — the source shows the first noun with a different gender',
          'Relativsatz describing purpose → compound (ein Raum, in dem man wartet → ein Warteraum, verb stem as first element)',
        ],
        direccion: 'noun phrase with attribute → Kompositum (whole sentence rewritten, with correct article/ending)',
        evitar: 'Isolated words: the compound must be embedded in a full sentence with case/article changes. Invented compounds that are not established German words: use only compounds common in German press (max. 3 elements, e.g. Krankenversicherungsbeitrag, Bundestagswahl, Arbeitsmarktpolitik), never chain 4+ nouns, and never drop a noun of the source.',
        modelo: {
          source: 'Die Beiträge für die gesetzliche Versicherung gegen Krankheit werden im kommenden Jahr für alle Arbeitnehmer deutlich erhöht.',
          instruction: 'Sustituye el grupo "Beiträge für die … Versicherung gegen Krankheit" por un compuesto.',
          solution: 'Die gesetzlichen Krankenversicherungsbeiträge werden im kommenden Jahr für alle Arbeitnehmer deutlich erhöht.',
        },
      },
      'c1-10': {
        patrones: [
          'Paraphrase → separable verb given in parentheses, Präsens main clause (prefix at the end)',
          'Paraphrase → inseparable verb in Perfekt (no ge-: hat verstanden, hat entkommen)',
          'Separable verb in Nebensatz or with zu (anzukündigen)',
          'Doppelpartikel (umfahren, übersetzen, durchsetzen): instruction specifies the meaning, student chooses separable vs. inseparable form',
          'Same base verb with two prefixes in one sentence (bekommen vs. ankommen)',
        ],
        direccion: 'paraphrase + verb in parentheses → correctly conjugated prefixed verb',
        evitar: 'The verb in parentheses MUST be an exact synonym of the expression it replaces in the source (davonlaufen → entkommen, präsentieren → vorstellen, verbreiten → bekanntgeben). Pick the prefixed verb first, then write the source with a paraphrase of that same meaning; never pair unrelated verbs. Instructions that just say "use the verb X" without tense/position difficulty: give the infinitive in parentheses and require Perfekt, Nebensatz or zu-Infinitiv.',
        modelo: {
          source: 'Der Fahrer ist der Polizei nach dem Unfall auf der Autobahn zunächst davongelaufen, wurde aber kurz darauf gefasst. (entkommen)',
          instruction: 'Sustituye "davongelaufen" por el verbo entre paréntesis en el mismo tiempo verbal.',
          solution: 'Der Fahrer ist der Polizei nach dem Unfall auf der Autobahn zunächst entkommen, wurde aber kurz darauf gefasst.',
        },
      },
      'c1-11': {
        patrones: [
          'eine beliebige Person / wer auch immer → irgendjemand (declined: irgendjemandem)',
          'an einem beliebigen Ort → irgendwo / irgendwohin',
          'auf welche Weise auch immer → irgendwie',
          'ein beliebiges + Nomen in Dativ/Akkusativ → irgendein (irgendeinem, irgendeine)',
          'zu einem unbestimmten Zeitpunkt → irgendwann; etwas Beliebiges → irgendetwas',
        ],
        direccion: 'explicit indefinite paraphrase → irgend- form',
        evitar: 'Exercises solvable by just prefixing "irgend" to an existing word (jemand → irgendjemand). The source must use a paraphrase, and at least two items require a declined irgendein-form.',
        modelo: {
          source: 'Offenbar hat eine nicht näher bekannte Person die vertraulichen Unterlagen an einen beliebigen Journalisten einer großen Zeitung weitergegeben.',
          instruction: 'Sustituye las expresiones de indeterminación por formas con irgend-.',
          solution: 'Offenbar hat irgendjemand die vertraulichen Unterlagen an irgendeinen Journalisten einer großen Zeitung weitergegeben.',
        },
      },
      'c1-12': {
        patrones: [
          'weil-Satz after the main clause with known cause → da-Satz in Vorfeld (main clause starts with the verb)',
          'Hauptsatz + denn → vorangestellter da-Satz',
          'aus + Nomen (aus Mangel an …) → da-Satz (verbalization)',
          'Hauptsatz + "allerdings/jedoch" comment → wobei-Satz (verb at the end)',
          'Two main clauses where the second relativizes the first → wobei',
        ],
        direccion: 'other causal/concessive form → da / wobei',
        evitar: 'Using da as an answer to "Warum?". wobei exercises must have a relativizing comment, not the main cause.',
        modelo: {
          source: 'Die Gemeinde konnte das neue Schwimmbad nicht bauen, denn die finanziellen Mittel waren nach der Sanierung der Schulen bereits aufgebraucht.',
          instruction: 'Reescribe la frase empezando con una subordinada con da.',
          solution: 'Da die finanziellen Mittel nach der Sanierung der Schulen bereits aufgebraucht waren, konnte die Gemeinde das neue Schwimmbad nicht bauen.',
        },
      },
      'c1-13': {
        patrones: [
          'durch + Nominalisierung → indem-Satz (verbalization)',
          'Two main clauses (method + result) → indem',
          'indem → dadurch, dass (emphatic, dadurch in the main clause)',
          'Result follows as consequence → , wodurch … (verb at end)',
          'Passiv in the main clause + indem (Die Kosten wurden gesenkt, indem …)',
        ],
        direccion: 'nominal / paratactic form → indem / dadurch, dass / wodurch',
        evitar: 'indem with a different subject than the action it explains when the result is ambiguous. The instruction must name the connector to use.',
        modelo: {
          source: 'Durch die konsequente Digitalisierung der Verwaltungsprozesse konnte die Stadt ihre Bearbeitungszeiten innerhalb eines Jahres halbieren.',
          instruction: 'Sustituye "durch + sustantivo" por una subordinada con indem.',
          solution: 'Die Stadt konnte ihre Bearbeitungszeiten innerhalb eines Jahres halbieren, indem sie die Verwaltungsprozesse konsequent digitalisierte.',
        },
      },
      'c1-14': {
        patrones: [
          'einfaches Verb → Funktionsverbgefüge (entscheiden → eine Entscheidung treffen)',
          'Funktionsverbgefüge im Passiv-Ersatz (wird berücksichtigt → findet Berücksichtigung / kommt zur Anwendung)',
          'Präpositionales FVG (zur Verfügung stellen, in Frage stellen, zum Abschluss bringen, in Kraft treten)',
          'FVG with change of complement (kritisieren + Akk → Kritik üben an + Dat)',
          'Reverse direction: FVG → einfaches Verb (once)',
        ],
        direccion: 'mostly simple verb → FVG; one exercise in reverse',
        evitar: 'Plain verb + object collocations that are NOT FVG (Pläne überprüfen, einen Einfluss untersuchen). Redundant or unidiomatic pairings (Unterstützung zur Verfügung stellen → use Unterstützung leisten; finden Berücksichtigung durch …): the FVG must be the standard one for that noun. The source must NOT already contain the FVG. The instruction gives the noun or FVG to use; the student must adapt case, article and preposition.',
        modelo: {
          source: 'Das Ministerium hat beschlossen, den Schulen ab dem kommenden Schuljahr zusätzliche Mittel für digitale Geräte bereitzustellen.',
          instruction: 'Sustituye "bereitstellen" por el Funktionsverbgefüge "zur Verfügung stellen".',
          solution: 'Das Ministerium hat beschlossen, den Schulen ab dem kommenden Schuljahr zusätzliche Mittel für digitale Geräte zur Verfügung zu stellen.',
        },
      },
      'c1-15': {
        patrones: [
          'Repeated prepositional phrase with a thing/idea → Pronominaladverb (über das Problem → darüber)',
          'Repeated prepositional phrase with a person → Präposition + Personalpronomen (über den Minister → über ihn)',
          'Pronominaladverb als Korrelat for a following dass/zu-Satz (sich darauf freuen, dass …)',
          'Two sentences joined with anaphoric dabei/dazu/dadurch',
          'Mixed: one thing + one person in the same sentence pair',
        ],
        direccion: 'repetitive text → cohesive text',
        evitar: 'Elliptical answers ("Ja, ich auch") — they are not exercises of this rule. Source always two sentences with an explicit repetition.',
        modelo: {
          source: 'Die Abgeordneten diskutierten stundenlang über den neuen Haushaltsentwurf. Über den neuen Haushaltsentwurf wird nächste Woche abgestimmt.',
          instruction: 'Evita la repetición en la segunda frase con un pronombre adverbial.',
          solution: 'Die Abgeordneten diskutierten stundenlang über den neuen Haushaltsentwurf. Darüber wird nächste Woche abgestimmt.',
        },
      },
      'c1-16': {
        patrones: [
          'sobald / gleich nachdem → Kaum + Plusquamperfekt (V1), als + Präteritum',
          'Neutral sentence with nie/selten in the Mittelfeld → Nie/Selten in Vorfeld with inversion',
          'nur wenn / erst dann, wenn → Erst wenn …, + Verb (main clause starts with verb)',
          'so … dass in final position → So + Adj. + Verb + Subjekt, dass …',
          'Adverbial or object to Vorfeld for emphasis with Passiv or Modalverb',
        ],
        direccion: 'neutral word order → stylistic inversion',
        evitar: 'Exercises solved by adding a single word (Wenn … → Erst wenn …). The source must require reordering both clauses.',
        modelo: {
          source: 'Gleich nachdem die Ergebnisse der Studie veröffentlicht worden waren, forderten mehrere Verbände eine Reform des Gesundheitssystems.',
          instruction: 'Reescribe con Kaum … als.',
          solution: 'Kaum waren die Ergebnisse der Studie veröffentlicht worden, als mehrere Verbände eine Reform des Gesundheitssystems forderten.',
        },
      },
      'c1-17': {
        patrones: [
          'dass-Satz in Vorfeld → es-Korrelat (Dass …, freut mich → Es freut mich, dass …)',
          'Subject at the end of an existential/Passiv sentence → Platzhalter-es in Vorfeld (Es wurden viele Fragen gestellt)',
          'Platzhalter-es removed when another element takes the Vorfeld (reverse)',
          'Unpersönliches Passiv (Es wird … gearbeitet)',
          'Fixed es-expressions (es eilig haben, es gut meinen, es schwer haben) with reordering — es must stay',
        ],
        direccion: 'both directions, alternating',
        evitar: 'es as a real pronoun replacing a neuter noun. Instruction must specify what goes into the Vorfeld.',
        modelo: {
          source: 'Dass so viele junge Menschen sich ehrenamtlich engagieren, überrascht die Organisatoren des Projekts immer wieder.',
          instruction: 'Empieza la frase con "es" como correlato.',
          solution: 'Es überrascht die Organisatoren des Projekts immer wieder, dass so viele junge Menschen sich ehrenamtlich engagieren.',
        },
      },
    },
  },
};
