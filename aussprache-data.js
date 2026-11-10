// Pronunciation rules for aussprache.html. In `palabra`, [brackets] mark the letters the rule is about
// (highlighted on screen, stripped before TTS). `aproximacion` uses Spanish spelling: doubled vowel = long vowel,
// accent mark = stressed syllable, "j" = Spanish j (softer in ich/h), "sch" = "sh".
window.AUSSPRACHE_CATEGORIAS = [
  { id: 'vocales', label: 'Vocales y diptongos' },
  { id: 'umlaute', label: 'Umlaute' },
  { id: 'consonantes', label: 'Consonantes' },
  { id: 'finales', label: 'Final de palabra' },
];

window.AUSSPRACHE = [
  // ── Vocales y diptongos ──
  {
    id: 'ei', categoria: 'vocales', grafia: 'ei / ai', suenaComo: 'ai',
    explicacion: 'El diptongo «ei» nunca se lee «e-i»: suena «ai», como en «baile». Truco para no confundirlo con «ie»: en «ei» se pronuncian las dos letras como «ai»; en «ie» solo suena una «i» larga.',
    ejemplos: [
      { palabra: 'schr[ei]ben', aproximacion: 'schraiben', traduccion: 'escribir' },
      { palabra: 'm[ei]n', aproximacion: 'main', traduccion: 'mi' },
      { palabra: 'Z[ei]t', aproximacion: 'tsait', traduccion: 'tiempo' },
      { palabra: 'Fr[ei]tag', aproximacion: 'fráitak', traduccion: 'viernes' },
    ],
  },
  {
    id: 'ie', categoria: 'vocales', grafia: 'ie', suenaComo: 'ii (i larga)',
    explicacion: '«ie» es una sola «i» larga; la «e» no se pronuncia, solo indica que la «i» se alarga.',
    ejemplos: [
      { palabra: 'L[ie]be', aproximacion: 'líibe', traduccion: 'amor' },
      { palabra: 'sp[ie]len', aproximacion: 'schpíilen', traduccion: 'jugar' },
      { palabra: 'Br[ie]f', aproximacion: 'briif', traduccion: 'carta' },
      { palabra: 's[ie]ben', aproximacion: 'síiben', traduccion: 'siete' },
    ],
  },
  {
    id: 'eu', categoria: 'vocales', grafia: 'eu / äu', suenaComo: 'oi',
    explicacion: '«eu» y «äu» suenan igual: «oi», como en «hoy».',
    ejemplos: [
      { palabra: 'h[eu]te', aproximacion: 'jóite', traduccion: 'hoy' },
      { palabra: 'D[eu]tsch', aproximacion: 'doitsch', traduccion: 'alemán' },
      { palabra: 'Fr[eu]nd', aproximacion: 'froint', traduccion: 'amigo' },
      { palabra: 'H[äu]ser', aproximacion: 'jóiser', traduccion: 'casas' },
    ],
  },
  {
    id: 'au', categoria: 'vocales', grafia: 'au', suenaComo: 'au',
    explicacion: 'Igual que en español: «au», como en «causa».',
    ejemplos: [
      { palabra: 'H[au]s', aproximacion: 'jaus', traduccion: 'casa' },
      { palabra: 'Fr[au]', aproximacion: 'frau', traduccion: 'mujer / señora' },
      { palabra: 'k[au]fen', aproximacion: 'káufen', traduccion: 'comprar' },
    ],
  },
  {
    id: 'larga', categoria: 'vocales', grafia: 'aa / ee / oo · vocal + h', suenaComo: 'vocal larga',
    explicacion: 'Una vocal doble o seguida de «h» se alarga: se mantiene el doble de tiempo. La «h» detrás de una vocal no suena. Alargar o no cambia el significado.',
    ejemplos: [
      { palabra: 'B[oo]t', aproximacion: 'boot', traduccion: 'barco' },
      { palabra: 'S[oh]n', aproximacion: 'soon', traduccion: 'hijo' },
      { palabra: 'f[ah]ren', aproximacion: 'fáaren', traduccion: 'conducir / ir' },
      { palabra: 'T[ee]', aproximacion: 'tee', traduccion: 'té' },
    ],
  },
  {
    id: 'corta', categoria: 'vocales', grafia: 'vocal + consonante doble', suenaComo: 'vocal corta',
    explicacion: 'Una consonante doble (tt, mm, nn, ss…) indica que la vocal anterior es corta y seca. La consonante doble se pronuncia como una sola. Compara «Miete» (míite, alquiler) con «Mitte» (míte, centro).',
    ejemplos: [
      { palabra: 'Be[tt]', aproximacion: 'bet', traduccion: 'cama' },
      { palabra: 'Mi[tt]e', aproximacion: 'míte', traduccion: 'centro' },
      { palabra: 'ko[mm]en', aproximacion: 'kómen', traduccion: 'venir' },
      { palabra: 'Ma[nn]', aproximacion: 'man', traduccion: 'hombre' },
    ],
  },

  // ── Umlaute ──
  {
    id: 'ae', categoria: 'umlaute', grafia: 'ä', suenaComo: 'e (abierta)',
    explicacion: '«ä» suena prácticamente como la «e» española, un poco más abierta.',
    ejemplos: [
      { palabra: 'M[ä]dchen', aproximacion: 'médjen', traduccion: 'chica' },
      { palabra: 'K[ä]se', aproximacion: 'kéese', traduccion: 'queso' },
      { palabra: '[Ä]pfel', aproximacion: 'épfel', traduccion: 'manzanas' },
    ],
  },
  {
    id: 'oe', categoria: 'umlaute', grafia: 'ö', suenaComo: 'e con labios de o',
    explicacion: 'No existe en español. Di «e» y, sin mover la lengua, redondea los labios como para decir «o».',
    ejemplos: [
      { palabra: 'sch[ö]n', aproximacion: 'schöön', traduccion: 'bonito' },
      { palabra: 'h[ö]ren', aproximacion: 'jöören', traduccion: 'oír' },
      { palabra: 'K[ö]ln', aproximacion: 'köln', traduccion: 'Colonia' },
    ],
  },
  {
    id: 'ue', categoria: 'umlaute', grafia: 'ü / y', suenaComo: 'i con labios de u',
    explicacion: 'Tampoco existe en español. Di «i» y redondea los labios como para decir «u», sin mover la lengua. La «y» en palabras de origen griego suena igual.',
    ejemplos: [
      { palabra: 'm[ü]de', aproximacion: 'müüde', traduccion: 'cansado' },
      { palabra: 'T[ü]r', aproximacion: 'tüür', traduccion: 'puerta' },
      { palabra: 'f[ü]nf', aproximacion: 'fünf', traduccion: 'cinco' },
      { palabra: 'Ph[y]sik', aproximacion: 'füsíik', traduccion: 'física' },
    ],
  },

  // ── Consonantes ──
  {
    id: 'sch', categoria: 'consonantes', grafia: 'sch', suenaComo: 'sh',
    explicacion: 'Como cuando pides silencio: «shhh». Es un solo sonido, no «s» + «ch».',
    ejemplos: [
      { palabra: '[Sch]ule', aproximacion: 'schúule', traduccion: 'escuela' },
      { palabra: 'Ti[sch]', aproximacion: 'tisch', traduccion: 'mesa' },
      { palabra: '[sch]nell', aproximacion: 'schnel', traduccion: 'rápido' },
    ],
  },
  {
    id: 'sp-st', categoria: 'consonantes', grafia: 'sp- / st- (inicio)', suenaComo: 'schp / scht',
    explicacion: 'Al inicio de una palabra o de una parte de palabra compuesta, la «s» de «sp» y «st» suena «sch». En medio o al final de la palabra suena «s» normal (Fenster = fénster).',
    ejemplos: [
      { palabra: '[Sp]ort', aproximacion: 'schport', traduccion: 'deporte' },
      { palabra: '[St]raße', aproximacion: 'schtráase', traduccion: 'calle' },
      { palabra: 'ver[st]ehen', aproximacion: 'ferschtéen', traduccion: 'entender' },
      { palabra: 'Fen[st]er', aproximacion: 'fénster', traduccion: 'ventana' },
    ],
  },
  {
    id: 'ich-laut', categoria: 'consonantes', grafia: 'ch tras e, i, ä, ö, ü, ei, eu o consonante', suenaComo: 'j suave (Ich-Laut)',
    explicacion: 'Una «j» muy suave y sin rascar la garganta: coloca la lengua como para decir «i» y sopla. Parecido a la «y» de «hierba» susurrada.',
    ejemplos: [
      { palabra: 'i[ch]', aproximacion: 'ij', traduccion: 'yo' },
      { palabra: 'Mil[ch]', aproximacion: 'milj', traduccion: 'leche' },
      { palabra: 'spre[ch]en', aproximacion: 'schpréjen', traduccion: 'hablar' },
    ],
  },
  {
    id: 'ach-laut', categoria: 'consonantes', grafia: 'ch tras a, o, u, au', suenaComo: 'j (Ach-Laut)',
    explicacion: 'Después de a, o, u y au la «ch» suena como la «j» española de «jamón», raspando atrás en la garganta.',
    ejemplos: [
      { palabra: 'Bu[ch]', aproximacion: 'buuj', traduccion: 'libro' },
      { palabra: 'a[ch]t', aproximacion: 'ajt', traduccion: 'ocho' },
      { palabra: 'Na[ch]t', aproximacion: 'najt', traduccion: 'noche' },
      { palabra: 'au[ch]', aproximacion: 'auj', traduccion: 'también' },
    ],
  },
  {
    id: 'chs', categoria: 'consonantes', grafia: 'chs', suenaComo: 'ks',
    explicacion: '«chs» suena como la «x» de «taxi».',
    ejemplos: [
      { palabra: 'se[chs]', aproximacion: 'seks', traduccion: 'seis' },
      { palabra: 'wa[chs]en', aproximacion: 'váksen', traduccion: 'crecer' },
      { palabra: 'Fu[chs]', aproximacion: 'fuks', traduccion: 'zorro' },
    ],
  },
  {
    id: 'h', categoria: 'consonantes', grafia: 'h', suenaComo: 'j suave / muda',
    explicacion: 'Al inicio de palabra o sílaba la «h» se aspira: una «j» muy suave, solo aire. Detrás de una vocal no suena; solo alarga esa vocal.',
    ejemplos: [
      { palabra: '[H]und', aproximacion: 'junt', traduccion: 'perro' },
      { palabra: '[H]err', aproximacion: 'jer', traduccion: 'señor' },
      { palabra: 'ge[h]en', aproximacion: 'guéen', traduccion: 'ir' },
      { palabra: 'Schu[h]', aproximacion: 'schuu', traduccion: 'zapato' },
    ],
  },
  {
    id: 'g', categoria: 'consonantes', grafia: 'g', suenaComo: 'g de «gato»',
    explicacion: 'La «g» siempre suena como en «gato», también delante de e/i: nunca como la «j» española de «gente».',
    ejemplos: [
      { palabra: '[G]eld', aproximacion: 'guelt', traduccion: 'dinero' },
      { palabra: '[g]ern', aproximacion: 'guern', traduccion: 'con gusto' },
      { palabra: '[G]ift', aproximacion: 'guift', traduccion: 'veneno' },
    ],
  },
  {
    id: 'j', categoria: 'consonantes', grafia: 'j', suenaComo: 'y',
    explicacion: 'La «j» alemana suena como la «y» de «yo», nunca como la «j» española.',
    ejemplos: [
      { palabra: '[J]a', aproximacion: 'ya', traduccion: 'sí' },
      { palabra: '[j]ung', aproximacion: 'yung', traduccion: 'joven' },
      { palabra: '[J]ahr', aproximacion: 'yaar', traduccion: 'año' },
    ],
  },
  {
    id: 'w', categoria: 'consonantes', grafia: 'w', suenaComo: 'v (dientes sobre el labio)',
    explicacion: 'La «w» es la «v» del inglés o del francés: apoya los dientes de arriba en el labio inferior y haz vibrar. No es la «b» española.',
    ejemplos: [
      { palabra: '[W]asser', aproximacion: 'váser', traduccion: 'agua' },
      { palabra: '[w]ie', aproximacion: 'vii', traduccion: 'cómo' },
      { palabra: '[W]ohnung', aproximacion: 'vóonung', traduccion: 'piso' },
    ],
  },
  {
    id: 'v', categoria: 'consonantes', grafia: 'v', suenaComo: 'f',
    explicacion: 'En palabras alemanas la «v» suena «f». En palabras de origen extranjero suena como la «w» alemana (Vase, Klavier, Universität).',
    ejemplos: [
      { palabra: '[v]iel', aproximacion: 'fiil', traduccion: 'mucho' },
      { palabra: '[V]ogel', aproximacion: 'fóoguel', traduccion: 'pájaro' },
      { palabra: '[v]ergessen', aproximacion: 'ferguésen', traduccion: 'olvidar' },
    ],
  },
  {
    id: 'z', categoria: 'consonantes', grafia: 'z / tz', suenaComo: 'ts',
    explicacion: 'La «z» y la «tz» suenan «ts», como en «tsunami». Nunca como la «z» española.',
    ejemplos: [
      { palabra: '[z]ehn', aproximacion: 'tseen', traduccion: 'diez' },
      { palabra: 'Ka[tz]e', aproximacion: 'kátse', traduccion: 'gato' },
      { palabra: '[Z]ug', aproximacion: 'tsuuk', traduccion: 'tren' },
    ],
  },
  {
    id: 's', categoria: 'consonantes', grafia: 's + vocal', suenaComo: 's sonora (zumbido)',
    explicacion: 'Delante de vocal la «s» vibra, como el zumbido de una abeja «zzz» (la «z» del inglés «zoo»). En otras posiciones es una «s» normal.',
    ejemplos: [
      { palabra: '[S]onne', aproximacion: 'sóne', traduccion: 'sol' },
      { palabra: 'Ro[s]e', aproximacion: 'róose', traduccion: 'rosa' },
      { palabra: '[s]ieben', aproximacion: 'síiben', traduccion: 'siete' },
    ],
  },
  {
    id: 'ss', categoria: 'consonantes', grafia: 'ß / ss', suenaComo: 's (fuerte)',
    explicacion: '«ß» y «ss» suenan como una «s» española, sin vibrar. Se escribe «ß» después de vocal larga o diptongo, y «ss» después de vocal corta.',
    ejemplos: [
      { palabra: 'hei[ß]en', aproximacion: 'jáisen', traduccion: 'llamarse' },
      { palabra: 'Fu[ß]', aproximacion: 'fuus', traduccion: 'pie' },
      { palabra: 'Wa[ss]er', aproximacion: 'váser', traduccion: 'agua' },
    ],
  },
  {
    id: 'qu', categoria: 'consonantes', grafia: 'qu', suenaComo: 'kv',
    explicacion: '«qu» suena «k» + «v» (la v alemana, con dientes sobre el labio). La «u» no es muda como en español.',
    ejemplos: [
      { palabra: '[Qu]ark', aproximacion: 'kvark', traduccion: 'requesón' },
      { palabra: 'be[qu]em', aproximacion: 'bekvéem', traduccion: 'cómodo' },
    ],
  },
  {
    id: 'pf', categoria: 'consonantes', grafia: 'pf', suenaComo: 'p + f juntas',
    explicacion: 'Se pronuncian las dos: cierra los labios para la «p» y suéltala directamente en una «f».',
    ejemplos: [
      { palabra: '[Pf]erd', aproximacion: 'pfeert', traduccion: 'caballo' },
      { palabra: 'A[pf]el', aproximacion: 'ápfel', traduccion: 'manzana' },
      { palabra: 'Ko[pf]', aproximacion: 'kopf', traduccion: 'cabeza' },
    ],
  },
  {
    id: 'ng', categoria: 'consonantes', grafia: 'ng', suenaComo: 'n nasal (sin «g»)',
    explicacion: 'Es un solo sonido nasal, como la «n» de «tengo» pero sin llegar a pronunciar la «g». En «singen» no se dice «sin-guen».',
    ejemplos: [
      { palabra: 'si[ng]en', aproximacion: 'síng-en', traduccion: 'cantar' },
      { palabra: 'la[ng]', aproximacion: 'lang', traduccion: 'largo' },
      { palabra: 'Zeitu[ng]', aproximacion: 'tsáitung', traduccion: 'periódico' },
    ],
  },
  {
    id: 'r', categoria: 'consonantes', grafia: 'r', suenaComo: 'r gutural',
    explicacion: 'La «r» alemana se pronuncia atrás, en la garganta, como un carraspeo suave (similar a la «r» francesa). Nunca vibra con la punta de la lengua.',
    ejemplos: [
      { palabra: '[R]ot', aproximacion: 'root', traduccion: 'rojo' },
      { palabra: '[R]adio', aproximacion: 'ráadio', traduccion: 'radio' },
      { palabra: 'g[r]oß', aproximacion: 'groos', traduccion: 'grande' },
    ],
  },
  {
    id: 'th-ph', categoria: 'consonantes', grafia: 'th / ph', suenaComo: 't / f',
    explicacion: 'En palabras de origen griego, «th» suena «t» y «ph» suena «f».',
    ejemplos: [
      { palabra: '[Th]ema', aproximacion: 'téema', traduccion: 'tema' },
      { palabra: '[Th]eater', aproximacion: 'teáata', traduccion: 'teatro' },
      { palabra: '[Ph]ilosophie', aproximacion: 'filosofíi', traduccion: 'filosofía' },
    ],
  },
  {
    id: 'tion', categoria: 'consonantes', grafia: '-tion', suenaComo: 'tsióon',
    explicacion: 'La terminación «-tion» suena «tsióon», con la «o» larga y acentuada.',
    ejemplos: [
      { palabra: 'Informa[tion]', aproximacion: 'informatsióon', traduccion: 'información' },
      { palabra: 'Na[tion]', aproximacion: 'natsióon', traduccion: 'nación' },
    ],
  },

  // ── Final de palabra ──
  {
    id: 'er', categoria: 'finales', grafia: '-er / -r final', suenaComo: 'a',
    explicacion: 'La terminación «-er» no se pronuncia con «r»: suena como una «a» breve. Una «r» final después de vocal larga también se convierte en una «a» suave.',
    ejemplos: [
      { palabra: 'Lehr[er]', aproximacion: 'léera', traduccion: 'profesor' },
      { palabra: 'Kind[er]', aproximacion: 'kínda', traduccion: 'niños' },
      { palabra: 'ab[er]', aproximacion: 'áaba', traduccion: 'pero' },
      { palabra: 'hie[r]', aproximacion: 'jíia', traduccion: 'aquí' },
    ],
  },
  {
    id: 'endurecimiento', categoria: 'finales', grafia: 'b / d / g final', suenaComo: 'p / t / k',
    explicacion: 'Al final de una palabra o sílaba, b, d y g se endurecen: suenan p, t y k (Auslautverhärtung).',
    ejemplos: [
      { palabra: 'Hun[d]', aproximacion: 'junt', traduccion: 'perro' },
      { palabra: 'Ta[g]', aproximacion: 'taak', traduccion: 'día' },
      { palabra: 'gel[b]', aproximacion: 'guelp', traduccion: 'amarillo' },
      { palabra: 'Aben[d]', aproximacion: 'áabent', traduccion: 'tarde / noche' },
    ],
  },
  {
    id: 'ig', categoria: 'finales', grafia: '-ig final', suenaComo: 'ij',
    explicacion: 'La terminación «-ig» suena «ij», con la «j» suave del Ich-Laut. Si le sigue una vocal (richtige), vuelve a sonar «g».',
    ejemplos: [
      { palabra: 'richt[ig]', aproximacion: 'ríjtij', traduccion: 'correcto' },
      { palabra: 'Kön[ig]', aproximacion: 'köönij', traduccion: 'rey' },
      { palabra: 'zwanz[ig]', aproximacion: 'tsvántsij', traduccion: 'veinte' },
    ],
  },
  {
    id: 'en', categoria: 'finales', grafia: '-en átona', suenaComo: 'n (casi sin e)',
    explicacion: 'En la terminación «-en» sin acento la «e» casi desaparece, sobre todo al hablar rápido: «haben» suena «jáabn».',
    ejemplos: [
      { palabra: 'hab[en]', aproximacion: 'jáabn', traduccion: 'tener' },
      { palabra: 'mach[en]', aproximacion: 'májn', traduccion: 'hacer' },
      { palabra: 'sag[en]', aproximacion: 'sáagn', traduccion: 'decir' },
    ],
  },
];
