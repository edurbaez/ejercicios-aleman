# Posibles mejoras — gramatica.html / gramatica.js

> Última actualización: 2026-05-16

---

## Implementadas ✅

| # | Mejora | Notas |
|---|--------|-------|
| 1 | Explicaciones extendidas | 60 reglas (A1–C2) con 4-6 oraciones cada una |
| 2 | Búsqueda de reglas | Filtra en tiempo real en todos los niveles; badge de nivel en resultados |
| 3 | Favoritos | Botón ☆/★ por regla, persistido en `localStorage`; vista "★ Favs" en la barra de niveles |
| 4 | Progreso de lectura | Contador `N/10` en cada pill de nivel; punto naranja en reglas ya abiertas |
| 5 | Quiz por regla | Botón "Practicar" — muestra el español, 4 opciones, feedback con color |
| 6 | Repaso rápido | Overlay con los tips del nivel activo, barra de progreso, navegación Anterior/Siguiente |
| 7 | Compartir enlace | Botón "Copiar enlace" genera `gramatica.html#b2-07`; la URL abre y expande esa regla |
| 8 | Navegación por teclado | `←`/`→` niveles · `↑`/`↓` reglas · `F` favorito · `Esc` cierra repaso |

---

## Pendientes (requieren servicio adicional)

| # | Mejora | Dependencia |
|---|--------|-------------|
| 9 | Audio TTS por ejemplo | `/api/tts` (ya existe) — botón 🔊 junto a cada frase alemana |
| 10 | Ejercicios generados por IA | `/api/chat` — genera fill-in-the-blank a partir de la regla activa |

---

## Ideas de mejora futura (sin servicios)

- **Tabla de declinaciones interactiva** — reemplazar los ejemplos de casos por una tabla der/die/das/Pl con la celda activa resaltada al pasar el cursor. Requiere añadir un campo `tabla[]` a las reglas relevantes en `GRAMMAR_DATA`.
- **Estadísticas de quiz** — guardar en `localStorage` el historial de aciertos/errores por regla y mostrar un mini-indicador de dominio (% correcto) junto al título.
- **Orden aleatorio en repaso rápido** — opción para barajar los tips en vez de seguir el orden de la lista.

---

## Modo Examen ✅

Quiz cerrado de 10 preguntas generadas por IA. Toma 5 reglas aleatorias del nivel activo, llama a `/api/chat` con `max_tokens: 2000`, y presenta las preguntas sin feedback hasta el final. La pantalla de resultados muestra puntuación, correcciones y permite abrir el acordeón en las reglas falladas. Archivos modificados: `gramatica.html`, `gramatica.js`, `styles.css`, `api/chat.js`.

---

## Resultados de examen en Supabase — Plan por fases

> Estado: Fase 1 ✅ · Fase 2 ✅ · Fase 3 ✅  
> Objetivo: persistir cada examen completado, mostrarlo en las estadísticas del usuario y en el dashboard del admin.

---

### Tabla nueva: `exam_results`

```sql
create table exam_results (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users not null,
  created_at  timestamptz default now() not null,
  level       text not null,               -- 'A1'…'C2'
  score       int  not null,               -- correctas (0-10)
  total       int  not null default 10,
  rules       text[] not null,             -- ids de las 5 reglas usadas
  answers     jsonb not null               -- array de { enunciado, respuesta_correcta, user_answer, is_correct }
);

-- RLS: cada usuario solo lee/inserta sus propios registros
alter table exam_results enable row level security;
create policy "own rows" on exam_results
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
```

---



### Fase 1 ✅ — Crear tabla e insertar al terminar el examen

> Archivos: SQL en Supabase dashboard · `gramatica.js`

**Qué se hace:**
1. Ejecutar el SQL de creación de tabla en el dashboard de Supabase.
2. Al mostrar los resultados en `showExamResults()`, insertar una fila en `exam_results` usando `window.sb` (cliente Supabase ya disponible desde `auth.js`).
3. Inserción silenciosa — si falla (sin sesión, error de red) no interrumpe al usuario.

**Datos que se insertan:**
```js
{
  user_id: (from jwt),   // RLS lo pone automático con auth.uid()
  level: currentLevel,
  score: correct,
  total: examQuestions.length,
  rules: examSelectedRules.map(r => r.id),
  answers: items.map(it => ({
    enunciado: it.q.enunciado,
    respuesta_correcta: it.q.respuesta_correcta,
    user_answer: it.userAnswer,
    is_correct: it.isCorrect
  }))
}
```

---

### Fase 2 ✅ — Estadísticas del usuario (panel de stats)

> Archivos: `auth.js` (función `openStatsPanel`)

**Qué se añade al panel de stats existente:**
- Nueva sección "Exámenes" debajo de las tarjetas HOY.
- Tarjeta con: total de exámenes realizados, promedio de puntuación (%), mejor racha de niveles.
- Mini-tabla con los últimos 5 exámenes: fecha · nivel · puntuación.

**Query:**
```js
const { data } = await window.sb
  .from('exam_results')
  .select('created_at, level, score, total')
  .order('created_at', { ascending: false })
  .limit(20);
```

---

### Fase 3 ✅ — Dashboard del admin

> Archivos: `admin/index.html`

**Qué se añade:**
1. Nueva tarjeta de resumen: "Total exámenes completados" (conteo global).
2. Tabla de exámenes recientes: usuario · fecha · nivel · puntuación — con paginación.
3. Gráfico de barras: promedio de puntuación por nivel (A1…C2) para ver dónde los estudiantes tienen más dificultades.
4. En la vista por usuario (click en la tabla de usuarios): sección "Exámenes" con historial completo del usuario seleccionado.

**Queries admin** (usa `SUPABASE_SERVICE_ROLE_KEY` vía `/api/admin-*` o RLS admin):
```sql
-- resumen global
select level, avg(score::float/total) as avg_pct, count(*) as total
from exam_results group by level order by level;

-- últimos exámenes (con email del usuario)
select er.*, au.email
from exam_results er
join auth.users au on au.id = er.user_id
order by er.created_at desc limit 50;
```

---

### Resumen de fases

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Tabla SQL + inserción al terminar examen | ✅ |
| 2 | Sección "Exámenes" en el panel de stats del usuario | ✅ |
| 3 | Métricas de exámenes en el dashboard admin | ✅ |
