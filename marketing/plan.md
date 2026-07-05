# Plan: Mejoras de Marketing

**Objetivo:** convertir `/marketing/` de documento estático + generador suelto en un sistema completo: **idea → pieza → publicación → resultado**.

## Reglas obligatorias (no negociables)

1. **Revisar compatibilidad antes de tocar código.** Identificar qué otros archivos importan/usan lo que se modifica antes de proceder.
2. **Actualizar este plan al terminar cada sesión.** Marcar con `[x]` y anotar cambios relevantes al diseño si los hubo.
3. **Actualizar `CLAUDE.md` y `README.md`** cuando se agregue un archivo activo al proyecto.

## Contexto existente

- `marketing/index.html` — estrategia (SWOT, segmentos, pitch, canales, KPIs estáticos, roadmap). Admin-only.
- `marketing/contenido.html` — generador de carruseles IG: ideas/chat vía `/api/deepseek-chat`, slides 1080×1350 → PNG con html2canvas, fondo IA opcional vía `/api/image` (`gpt-image-1-mini`).
- Nav compartida entre páginas marketing: `.nav-tabs` en el header (añadir pestaña nueva en **todas** las páginas al crear una).

**Convención de sesiones:** cada sesión es un bloque de trabajo autocontenido que termina con commit + docs actualizadas. Marcar `[x]` al cerrar cada una.

**Restricción:** plan Hobby de Vercel = máx 12 funciones serverless (actualmente 11/12). Ninguna propuesta debe añadir funciones nuevas; reutilizar `/api/deepseek-chat` y acceso directo a Supabase con RLS admin.

---

## Propuesta 1 — Pipeline de contenido (historial + calendario editorial) ⭐ PRIORITARIA

**Objetivo:** persistir cada pieza generada y planificar su publicación. Es la base de las propuestas 2, 3 y 5.

### Nueva tabla Supabase: `marketing_posts`
| Columna | Tipo | Descripción |
|---------|------|-------------|
| `id` | uuid PK | `crypto.randomUUID()` |
| `kind` | text | `carrusel` \| `reel` \| `testimonio` \| `email` |
| `tema` | text | Brief / tema de la pieza |
| `nivel` | text | A1–C2 |
| `contenido` | jsonb | Slides / guion / cuerpo según `kind` |
| `caption` | text | Caption + hashtags |
| `estado` | text | `idea` \| `generado` \| `publicado` |
| `publish_date` | date | Fecha planificada/real de publicación (nullable) |
| `created_at` / `updated_at` | timestamptz | Auto |

RLS: solo usuarios con `profiles.role = 'admin'` pueden leer/escribir.

- [ ] **Sesión 1.1 — Persistencia.** Migración `004_marketing_posts.sql` (tabla + RLS admin) aplicada en Supabase. `contenido.html` guarda automáticamente cada carrusel generado (estado `generado`) y las ideas elegidas del chat (estado `idea`). Sin función serverless nueva: escribe directo con el cliente Supabase (RLS protege).
- [ ] **Sesión 1.2 — Historial.** Pestaña "📚 Historial" en `contenido.html`: listado con filtros (estado/nivel/kind), acciones por pieza: recargar en el generador, duplicar, borrar, re-exportar PNGs, cambiar estado. Aviso de "tema similar ya generado" al crear una pieza nueva.
- [ ] **Sesión 1.3 — Calendario editorial.** Nueva página `marketing/calendario.html` (misma nav-tabs): vista mensual, asignar piezas a fechas (`publish_date`), marcar como publicado, vista "esta semana" con pendientes. Añadir pestaña a los headers de todas las páginas marketing.

---

## Propuesta 2 — KPIs reales

**Objetivo:** reemplazar los KPIs estáticos de la estrategia por métricas reales desde las tablas de eventos que ya alimenta `logEvent()`.

- [ ] **Sesión 2.1 — Queries.** Definir y validar en Supabase las consultas: registros nuevos por semana, usuarios activos (7/30 días), eventos por app, retención simple (usuarios que vuelven ≥2 semanas). Documentar las queries en este plan. Si hace falta, crear vistas SQL (`005_marketing_views.sql`) para agregación eficiente.
- [ ] **Sesión 2.2 — Página Resultados.** Nueva página `marketing/resultados.html` (nav-tabs): tarjetas resumen + gráficos de barras (reutilizar patrón de chart del dashboard `/admin/`), selector de rango temporal.
- [ ] **Sesión 2.3 — Correlación con publicaciones.** Overlay de fechas de `marketing_posts` publicadas sobre la curva de registros/actividad; tabla "pieza → registros en los 3 días siguientes". Depende de Propuesta 1 (necesita `publish_date`).

---

## Propuesta 3 — Generador de guiones para Reels

**Objetivo:** mismo brief que un carrusel → guion de video corto de 30-60 s para grabar con el móvil. Reutiliza `/api/deepseek-chat`.

- [ ] **Sesión 3.1 — Motor.** En `contenido.html`, selector de formato "Carrusel | Reel". Formato Reel: DeepSeek devuelve JSON `{ hook, escenas: [{ visual, texto_hablado, texto_pantalla, segundos }], cta, caption, hashtags }`. Validación de duración total ≤ 60 s.
- [ ] **Sesión 3.2 — UI de guion.** Vista de guion: tabla de escenas con tiempos, modo teleprompter (texto grande con auto-scroll a velocidad configurable para leer mientras grabas), copiar guion completo.
- [ ] **Sesión 3.3 — Integración pipeline.** Guardar guiones como `kind: 'reel'` en `marketing_posts`; aparecen en historial y calendario. Depende de Propuesta 1.

---

## Propuesta 4 — Plantillas de testimonios

**Objetivo:** prueba social — slides de testimonios de alumnos reutilizando el renderizador HTML→PNG existente.

- [ ] **Sesión 4.1 — Plantilla base.** En `contenido.html` (o sección propia): formulario (cita, nombre/inicial, nivel alcanzado, logro concreto) → slide 1080×1350 con diseño de cita destacada + export PNG. Sin llamadas API.
- [ ] **Sesión 4.2 — Variantes.** 3 diseños alternativos (cita grande / antes-después / logro numérico), selector de tema de color, formato adicional 1080×1920 para Stories.
- [ ] **Sesión 4.3 — Banco de testimonios.** Guardar testimonios como `kind: 'testimonio'` en `marketing_posts`; listado reutilizable (un testimonio → regenerar en otro diseño/formato). Depende de Propuesta 1.

---

## Propuesta 5 — Generador de emails / newsletter

**Objetivo:** borradores de email para alumnos y leads (canal directo profesor-alumno). Reutiliza `/api/deepseek-chat`.

- [ ] **Sesión 5.1 — Motor.** Tipos de email: bienvenida a alumno nuevo, resumen semanal (palabra/regla de la semana — puede tomar contenido de `grammar-data.js` / `Data{NIVEL}.json`), promoción de capacitación (usar precios de la sección capacitación de la estrategia). DeepSeek → `{ asunto, cuerpo }` con 2 variantes de asunto.
- [ ] **Sesión 5.2 — Plantilla HTML.** Plantilla de email con branding (logo/colores), preview en iframe, botones copiar texto plano / copiar HTML (compatible con Gmail).
- [ ] **Sesión 5.3 — Integración pipeline.** Guardar como `kind: 'email'` en `marketing_posts` + historial de asuntos usados para no repetir. Depende de Propuesta 1.

---

## Orden de ejecución sugerido

```
Bloque A: 1.1 → 1.2 → 1.3          ← base de todo lo demás
Bloque B (tras 1.1, paralelizables entre sí):
   2.1 → 2.2 → 2.3
   3.1 → 3.2 → 3.3
   4.1 → 4.2 → 4.3
   5.1 → 5.2 → 5.3
```

Las sesiones x.1 y x.2 de las propuestas 3, 4 y 5 no dependen de la Propuesta 1 (solo las x.3); pueden adelantarse si se prefiere.

---

## Estado

| Propuesta | Sesiones completadas |
|-----------|----------------------|
| 1 — Pipeline de contenido | 0/3 |
| 2 — KPIs reales | 0/3 |
| 3 — Guiones de Reels | 0/3 |
| 4 — Testimonios | 0/3 |
| 5 — Emails / newsletter | 0/3 |
