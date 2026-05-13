# Sugerencias de Nuevos Servicios

Ideas ordenadas por impacto estimado en el aprendizaje. Cada servicio es independiente y puede implementarse por separado.

---

## 1. TTS de alta calidad con OpenAI Audio (alta prioridad)

**Problema actual:** el TTS del navegador suena robótico y varía por sistema operativo.  
**Solución:** reemplazar `SpeechSynthesisUtterance` por llamadas a `POST /api/tts` → OpenAI `tts-1` (voces `alloy`, `nova`, `onyx`).

| Aspecto | Detalle |
|---------|---------|
| Nuevo endpoint | `api/tts.js` — recibe `{ text, voice }`, devuelve MP3 como stream |
| Afecta | `shared-game.js` (modo Auto/Dual), `chat-voz.html`, `lectura veloz.html` (blog view) |
| Costo aprox. | $0.015 / 1 000 caracteres (`tts-1`) |
| Rate limit | 30 req/min por usuario |
| Caché | Guardar audios frecuentes en Supabase Storage o IndexedDB (base64) para no repetir llamadas |

---

## 2. Repetición espaciada (SRS) basada en datos reales

**Problema actual:** las palabras se muestran al azar; las difíciles no aparecen más.  
**Solución:** implementar un algoritmo SRS ligero (SM-2 simplificado) usando los eventos ya guardados en `usage_events`.

| Aspecto | Detalle |
|---------|---------|
| Datos disponibles | `usage_events` ya registra respuestas correctas/incorrectas por palabra |
| Implementación | Calcular `next_review` por palabra en cliente; priorizar palabras vencidas en `nextUnseenIndex()` |
| UI | Botón "Modo Repaso" en el sets-bar que filtra solo palabras con revisión pendiente |
| Sin backend nuevo | Todo en `shared-game.js` + IndexedDB (no requiere API) |

---

## 3. Ejercicios de escritura con corrección automática

**Concepto:** el usuario ve una oración en español y la escribe en alemán; GPT evalúa si es correcta y explica errores.

| Aspecto | Detalle |
|---------|---------|
| Nuevo archivo | `escritura.html` + `escritura.js` |
| API | Reutiliza `api/chat.js` con prompt especializado |
| Flujo | Oración ES → input de texto → "Comprobar" → respuesta: ✅/❌ + explicación + versión correcta |
| Fuente de oraciones | Generadas por GPT a partir del vocabulario de `DATA.json` / `DataB1.json` según nivel |
| Diferencial | Más efectivo que quiz de selección múltiple para producción activa del idioma |

---

## 4. Entrenador de casos gramaticales (Kasus-Trainer)

**Problema:** el Akkusativ, Dativ y Genitiv son el mayor obstáculo en B1–B2.  
**Concepto:** ejercicios de rellena-el-hueco con artículos y adjetivos declinados.

| Aspecto | Detalle |
|---------|---------|
| Nuevo archivo | `kasus.html` (sin JS externo, todo inline) |
| Generación | GPT genera oraciones con un hueco (`___`) y 4 opciones de artículo/adjetivo |
| Categorías | Nominativ, Akkusativ, Dativ, Genitiv × definido/indefinido/sin artículo |
| Estadísticas | Guardar aciertos por caso en `usage_events` para identificar punto débil |
| Sin API extra | Reutiliza `api/chat.js` |

---

## 5. Generador de diálogos de escucha (Listening Comprehension)

**Concepto:** GPT genera un diálogo corto en alemán, el audio se reproduce (OpenAI TTS), y el usuario responde preguntas de comprensión.

| Aspecto | Detalle |
|---------|---------|
| Nuevo archivo | `escucha.html` |
| Flujo | Elegir tema + nivel → GPT genera diálogo JSON `{ lines[], questions[] }` → TTS reproduce cada línea → usuario responde preguntas de opción múltiple |
| APIs usadas | `api/chat.js` (generar diálogo) + `api/tts.js` (del punto 1, si se implementa) |
| Nivel de dificultad | A2–C1; el prompt incluye el nivel CEFR objetivo |

---

## 6. Historial y transcripciones de Chat de Voz

**Problema actual:** las conversaciones de `chat-voz.html` no se guardan.  
**Solución:** persistir conversaciones completas en Supabase con opción de revisarlas después.

| Aspecto | Detalle |
|---------|---------|
| Tabla nueva | `conversations(id, user_id, created_at, level, messages jsonb)` |
| UI en chat-voz | Botón "Guardar conversación" + panel lateral "Historial" |
| Vista de revisión | Mostrar turno a turno con transcript + respuesta IA; botón para escuchar el audio de cada turno (si se cacheó) |
| Utilidad pedagógica | El usuario puede releer y detectar sus propios errores recurrentes |

---

## 7. Generador de frases desde el vocabulario activo

**Concepto:** el usuario selecciona una o varias listas activas y pide a GPT que genere 5 oraciones ejemplo usando esas palabras en contexto real.

| Aspecto | Detalle |
|---------|---------|
| Integración | Botón "Ver en contexto" en `palabrasB2.html` y `B1.html` (panel lateral o modal) |
| API | `api/chat.js` con prompt: "Genera 5 oraciones de nivel B2 usando las palabras: [lista]" |
| Valor | Pasar de memorización aislada a comprensión en contexto |
| Implementación | ~50 líneas JS + estilos ya existentes; no requiere archivo nuevo |

---

## 8. Panel de estadísticas avanzado (admin / personal)

**Problema actual:** el stats panel muestra datos crudos; no identifica áreas débiles.  
**Mejoras sugeridas:**

| Mejora | Detalle |
|--------|---------|
| Mapa de calor semanal | Visualizar qué hora del día estudia más el usuario |
| Palabras más falladas | Top 10 palabras con mayor tasa de error (requiere registrar la palabra en `usage_events`) |
| Curva de retención | Gráfico de aciertos vs. días desde primera vez vista |
| Exportar CSV | Descargar historial de respuestas para análisis externo |

---

## 9. Integración con YouTube (Lectura Veloz)

**Concepto:** pegar un enlace de YouTube en alemán → extraer transcript via `youtube-transcript` (npm) → cargarlo directamente en el RSVP.

| Aspecto | Detalle |
|---------|---------|
| Nuevo endpoint | `api/transcript.js` — recibe URL, extrae subtítulos, devuelve texto plano |
| Afecta | `lectura veloz.html`: añadir input "URL de YouTube" junto al textarea |
| Librería | `youtube-transcript` (MIT, sin API key) o scraping del endpoint de subtítulos de YT |
| Limitación | Solo funciona si el video tiene subtítulos en alemán (automáticos o manuales) |

---

## 10. Notificaciones de repaso diario (PWA Push)

**Concepto:** recordatorio diario ("¿Has practicado hoy?") via Web Push si el usuario lleva más de 24 h sin actividad.

| Aspecto | Detalle |
|---------|---------|
| Implementación | Web Push API + VAPID keys; `sw.js` maneja el evento `push` |
| Backend | `api/push-notify.js` o cron de Vercel que consulta `usage_events` y manda push a usuarios inactivos |
| Opt-in | Modal de permiso en el primer arranque de la PWA |
| Librería | `web-push` (npm) para generar y enviar notificaciones VAPID |

---

## Resumen de prioridades

| # | Servicio | Esfuerzo | Impacto pedagógico |
|---|----------|----------|--------------------|
| 1 | TTS OpenAI | Medio | Alto — mejor pronunciación en todas las apps |
| 2 | SRS | Bajo | Alto — aprende más en menos tiempo |
| 3 | Escritura | Medio | Alto — producción activa del idioma |
| 4 | Kasus-Trainer | Bajo | Alto — punto débil frecuente en B1/B2 |
| 7 | Frases en contexto | Muy bajo | Medio — contexto inmediato, mínimo esfuerzo |
| 6 | Historial chat | Medio | Medio — revisión y reflexión |
| 5 | Listening | Alto | Alto — comprensión auditiva |
| 8 | Stats avanzado | Medio | Medio — motivación y diagnóstico |
| 9 | YouTube → RSVP | Medio | Medio — contenido auténtico |
| 10 | Push notifications | Alto | Bajo-medio — hábito diario |
