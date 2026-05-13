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

## Costos por servicio

> Precios de OpenAI vigentes a mayo 2026. Los costos de Vercel y Supabase son $0 dentro del free tier para el volumen de uso actual.

### Tabla resumen

| Servicio | Costo por acción | Costo estimado / sesión activa | ¿Gratis con fallback? |
|----------|-----------------|-------------------------------|----------------------|
| **TTS OpenAI** (`tts-1`) | $0.000120 / palabra (~8 chars × $0.015/1K chars) | $0.006–$0.012 por sesión de 100 palabras¹ | Sí — TTS del navegador si no hay sesión |
| **SRS SM-2** | $0.00 | $0.00 | N/A — solo IndexedDB |
| **Frases en contexto** | $0.000145 / clic² | $0.00 (demanda del usuario) | No — requiere login |
| **Kasus-Trainer** | $0.000145 / ejercicio² | $0.003–$0.015 por sesión (20–100 ejercicios) | No — requiere login |

¹ La caché en memoria reduce el costo real: palabras repetidas en la misma sesión no generan llamada a la API.  
² GPT-4o-mini: $0.150/M tokens input + $0.600/M tokens output. Estimado: ~150 tokens input + ~200 tokens output por llamada = $0.0000225 + $0.000120 ≈ $0.000145.

### Desglose por proveedor

| Proveedor | Servicio afectado | Modelo / recurso | Precio unitario |
|-----------|------------------|-----------------|----------------|
| OpenAI | TTS (palabras B1/B2) | `tts-1` | $0.015 / 1 000 caracteres |
| OpenAI | Frases en contexto | `gpt-4o-mini` | $0.150 / 1M tokens input · $0.600 / 1M output |
| OpenAI | Kasus-Trainer | `gpt-4o-mini` | $0.150 / 1M tokens input · $0.600 / 1M output |
| OpenAI | Chat de voz (existente) | `gpt-4o-mini` + `whisper-1` | $0.006 / min audio |
| OpenAI | Corrector (existente) | `gpt-4o` vision | ~$0.01 / imagen |
| OpenAI | Diccionario (existente) | `gpt-4o-mini` | ~$0.000030 / búsqueda |
| Vercel | Serverless functions | Hobby plan | Gratis hasta 100K invocaciones/día |
| Supabase | Auth + DB | Free tier | Gratis hasta 500 MB DB |
| IndexedDB | SRS, listas personales | Navegador del usuario | $0.00 |

### Escenario de uso real (1 usuario activo)

| Actividad | Llamadas API / día estimadas | Costo / día |
|-----------|------------------------------|-------------|
| 200 palabras en modo Auto (B2/B1) con TTS OpenAI, 30% cache hit | ~140 llamadas TTS | ~$0.017 |
| 10 clics "Ver frases" | 10 llamadas chat | ~$0.0015 |
| 30 ejercicios Kasus-Trainer | 30 llamadas chat | ~$0.0044 |
| 5 búsquedas diccionario | 5 llamadas chat | ~$0.00015 |
| 10 min Chat de Voz | ~20 llamadas chat + whisper | ~$0.062 |
| **Total estimado / día / usuario activo** | | **~$0.085** |
| **Total estimado / mes / usuario activo** | | **~$2.55** |

> El gasto dominante es el Chat de Voz (Whisper + GPT). El TTS nuevo es el segundo mayor si se usa modo Auto intensivamente. El SRS y los ajustes de interfaz no agregan ningún costo.

---

## Próximas ideas (sin implementar aún)

| # | Servicio | Esfuerzo | Impacto |
|---|----------|----------|---------|
| 5 | Historial de conversaciones (chat-voz) | Medio | Medio |
| 6 | Listening Comprehension (diálogos con TTS) | Alto | Alto |
| 7 | Estadísticas avanzadas (mapa de calor, top errores) | Medio | Medio |
| 8 | YouTube → RSVP (transcript extractor) | Medio | Medio |
| 9 | Push notifications de repaso diario | Alto | Bajo-medio |
