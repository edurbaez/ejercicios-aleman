# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A collection of standalone HTML files for language learning (primarily Spanish-German, with some Spanish-French). No build system, no dependencies, no package manager — open any `.html` file directly in a browser.

## File Descriptions

| File | Purpose |
|------|---------|
| `cursop.html` | Multiple-choice quiz: Spanish word shown, user picks the German translation from 4 options. Also has a "repetir" flashcard mode with TTS. |
| `frallin.html` | Full-featured flashcard app with Spanish-French vocabulary and Web Speech API TTS. |
| `fr_repetirspalabras.html` | Flashcard display for Spanish-French pairs with auto-play TTS mode. |
| `lectura veloz.html` | Speed-reading (RSVP) app: pastes text and flashes words one at a time at a configurable WPM. Saves texts to `localStorage`. |
| `selecionar palabra lista simple.html` | Paste German text → extracts unique German words with smart de-duplication (removes conjugated/declined variants ending in `-en`, `-er`). |
| `selecionar paas.html` | Simpler word separator/extractor tool. |
| `palabrasB2.html` | Polished vocabulary app with a stats panel, targeting B2-level German words. |
| `aaprima.html` + `aaprima.js` | Vocabulary learning app ("Aprende Alemán") with a more structured UI; JS is split into a companion file. |
| `aaaaaaaaprima.html` | Variant/prototype of the aaprima vocabulary app. |

## Architecture Patterns

All exercises share the same core pattern implemented inline in each HTML file:

- **Word data**: Parallel arrays `baseesp` (Spanish) and `basede`/`basefr` (German/French) defined as `const` at the top of the `<script>` block.
- **List segmentation**: `listaN(n)` slices the base arrays in chunks of 100 words, so buttons labeled `lst1`–`lst6` correspond to `baseesp.slice(0,100)`, `slice(100,200)`, etc.
- **Random word selection**: `getPalabra()` picks a random index while avoiding recently seen items via a `visto` array; resets when `visto.length == palabras.length - 3`.
- **TTS**: All files use the browser's `Web Speech API` (`SpeechSynthesisUtterance`). Language codes used: `"de"` for German, `"es"` for Spanish, `"fr"` for French.
- **Auto mode**: `auto` flag drives a TTS loop — `utterance.onend` triggers `setTimeout` → `mostrarPalabra()` + `leerTexto()` for continuous playback.
- **Dual mode**: `dual` flag alternates TTS between the target language and Spanish on each call using `manejoDual` boolean.

## Adding Vocabulary

To add words, append entries to both `baseesp` and `basede` (or `basefr`) arrays at matching indices. Each list button covers 100 entries; adding beyond 600 entries requires adding a new `listaN` button in the HTML.
