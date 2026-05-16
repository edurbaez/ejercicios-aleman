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
- **Modo examen** — quiz de 10 preguntas aleatorias del nivel activo con puntuación final, sin posibilidad de repasar la regla durante el test.
- **Orden aleatorio en repaso rápido** — opción para barajar los tips en vez de seguir el orden de la lista.
