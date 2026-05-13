# Servicios implementados

## ✅ 1. TTS de alta calidad con OpenAI Audio

**Estado:** Completado — 2026-05-13

| Aspecto | Detalle |
|---------|---------|
| Nuevo endpoint | `api/tts.js` — recibe `{ text, voice }`, devuelve MP3 (`audio/mpeg`) |
| Voz por defecto | `onyx` (alemán, masculino) |
| Rate limit | 30 req/min por usuario |
| Integración | `shared-game.js` · `speakOnce()` usa `/api/tts` cuando el usuario está logueado; fallback al TTS del navegador si no |
| Caché | `Map` en memoria por sesión — evita llamadas repetidas para la misma palabra |
| Afecta | Modo Auto, Dual y botón Leer en `palabrasB2.html` y `B1.html` |

---

## ✅ 2. Repetición espaciada (SRS SM-2)

**Estado:** Completado — 2026-05-13

| Aspecto | Detalle |
|---------|---------|
| Algoritmo | SM-2 simplificado: `ease` (2.5), `interval` (días), `reps`, `due` (timestamp) |
| Correcto | `reps++`; intervalo: 1 → 6 → `round(prev * ease)` |
| Incorrecto | `reps=0`, `interval=1`, `ease = max(1.3, ease−0.2)` |
| Persistencia | IndexedDB `srs-db-{appId}`, store `cards`, keyPath `word` |
| UI | Botón "SRS Repaso (N)" en sección Selección Múltiple; en modo SRS solo aparecen palabras vencidas |
| Sin API nueva | Todo en `shared-game.js` + IndexedDB |

---

## ✅ 3. Frases en contexto

**Estado:** Completado — 2026-05-13

| Aspecto | Detalle |
|---------|---------|
| UI | Botón "Ver frases" (índigo #5C6BC0) en sección Selección Múltiple |
| Flujo | Palabra activa → `POST /api/chat` → GPT genera 3 oraciones `{ de, es }` → modal |
| Nivel | B1 para `B1.html`, B2 para `palabrasB2.html` (via `APP_CONFIG.appId`) |
| Modal | Overlay reutilizable; cierra al hacer clic fuera o en ✕ |
| Auth | Requiere usuario logueado; muestra mensaje si no hay token |

---

## ✅ 4. Kasus-Trainer (`kasus.html`)

**Estado:** Completado — 2026-05-13

| Aspecto | Detalle |
|---------|---------|
| Nuevo archivo | `kasus.html` — todo el JS inline |
| Tema | Teal `#00796B` (`#page-kas` en `styles.css`) |
| Casos | Todos / Nominativ / Akkusativ / Dativ / Genitiv (selector por pestañas) |
| Ejercicio | GPT genera `{ frase, opciones[4], respuesta, caso, explicacion }` vía `/api/chat` |
| UI | Badge coloreado por caso, hueco `___` resaltado, grid de 4 opciones, feedback inmediato |
| Score | Aciertos + Errores + Racha (se resetea al fallar) |
| Atajos | Teclas 1–4 para elegir opción |
| Navbar | Añadido "Kasus-Trainer" al dropdown de todos los 6 HTML existentes |

---

## Archivos nuevos / modificados

| Archivo | Cambio |
|---------|--------|
| `api/tts.js` | Nuevo — endpoint TTS OpenAI con JWT + rate limit 30/min |
| `kasus.html` | Nuevo — Kasus-Trainer completo |
| `shared-game.js` | Modificado — SRS SM-2, TTS vía API, Frases en contexto |
| `styles.css` | Modificado — sección `#page-kas` (teal) |
| `palabrasB2.html` | Modificado — navbar: + Kasus-Trainer |
| `B1.html` | Modificado — navbar: + Kasus-Trainer |
| `lectura veloz.html` | Modificado — navbar: + Kasus-Trainer |
| `diccionario.html` | Modificado — navbar: + Kasus-Trainer |
| `chat-voz.html` | Modificado — navbar: + Kasus-Trainer |
| `corrector.html` | Modificado — navbar: + Kasus-Trainer |
| `CLAUDE.md` | Modificado — Active Files actualizado |

---

## Próximas ideas (sin implementar aún)

| # | Servicio | Esfuerzo | Impacto |
|---|----------|----------|---------|
| 5 | Historial de conversaciones (chat-voz) | Medio | Medio |
| 6 | Listening Comprehension (diálogos con TTS) | Alto | Alto |
| 7 | Estadísticas avanzadas (mapa de calor, top errores) | Medio | Medio |
| 8 | YouTube → RSVP (transcript extractor) | Medio | Medio |
| 9 | Push notifications de repaso diario | Alto | Bajo-medio |
