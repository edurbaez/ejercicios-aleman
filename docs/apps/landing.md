# Landing & public pages

Detail doc split out of the root `CLAUDE.md` (which keeps a one-line index entry per file). Keep this file in sync per the root Maintenance rule.

## Active Files rows

| File | Purpose |
|------|---------|
| `index.html` | Landing page principal: muestra todas las apps como tarjetas. Navbar con dropdown. Auth via `auth.js`. SEO: meta description, canonical, Open Graph y Twitter card apuntando a `https://ejercicios-aleman.vercel.app/`. Footer con link a `privacidad.html`. |
| `privacidad.html` | Política de privacidad, pública (sin login, no carga `auth.js`/`config.js` a propósito — evita el modal de login automático en una página que un visitante sin cuenta puede querer leer antes de registrarse). Standalone, sin navbar/dropdown compartido; solo un link "← Volver a Inicio". Cubre qué datos se recogen (cuenta, progreso, textos/imágenes de tareas, audio de voz, tiempo de uso, dispositivo/sesión activa de `active_sessions`, reportes de feedback), con quién se comparten (OpenAI, DeepSeek, Supabase, Vercel), retención y derechos del usuario. Enlazada desde el footer de `index.html`. |
