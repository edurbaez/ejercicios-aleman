# Plan — Dashboard Financiero

## Regla obligatoria
- Después de implementar cualquier cosa, actualiza el estado en este plan.

---

## Stack 

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML vanilla + JS (sin framework) |
| Backend | Vercel serverless functions |
| Base de datos | Supabase (tablas ya creadas) |
| Auth | `auth.js` + `config.js` del proyecto base |
| Gráficos | Lightweight Charts (TradingView, MIT) |
| Datos crypto | CoinGecko API (gratis, sin clave) |
| Datos índices | Twelve Data API (free tier, requiere clave) |

**Env vars nuevas en Vercel:**
- `TWELVE_DATA_API_KEY`

**Archivos del proyecto:**
- `finance/finanzas-dashboard.html` — app principal
- `finance/finanzas-dashboard.js` — lógica completa
- `finance/finanzas-styles.css` — estilos propios
- `finance/schema.sql` — esquema de base de datos (referencia)
- `api/finanzas-price.js` — proxy de precios (CoinGecko + Twelve Data)
- `api/finanzas-history.js` — histórico de precios para gráficos

---

## Bloque 1 — API de precios

### 1.1 `api/finanzas-price.js`
Endpoint unificado que recibe una lista de símbolos y devuelve precios actuales.

- Crypto: `GET https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true`
- Índices: `GET https://api.twelvedata.com/price?symbol=SPX,IXIC&apikey=...`
- Requiere JWT auth (mismo patrón que `api/chat.js`)
- Rate limit: 10 req/min por usuario
- Caché en memoria: 5 minutos (evita agotar el free tier de Twelve Data)

**Request:** `POST /api/finanzas-price`
```json
{ "crypto": ["bitcoin", "ethereum"], "indices": ["SPX", "IXIC"] }
```

**Response:**
```json
{
  "crypto":  { "bitcoin": { "usd": 65000, "usd_24h_change": 2.3 } },
  "indices": { "SPX": { "price": "5400.00", "change": 0.8 } }
}
```

**Estado:** ⬜ Pendiente

---

### 1.2 `api/finanzas-history.js`
Histórico de precios para los gráficos (últimos 30 días).

- Crypto: CoinGecko `/coins/{id}/market_chart?vs_currency=usd&days=30`
- Índices: Twelve Data `/time_series?symbol=SPX&interval=1day&outputsize=30`
- Caché en memoria: 30 minutos

**Request:** `POST /api/finanzas-history`
```json
{ "symbol": "bitcoin", "asset_type": "crypto" }
```

**Response:**
```json
{ "prices": [[timestamp, price], ...] }
```

**Estado:** ⬜ Pendiente

---

## Bloque 2 — Watchlist

Pantalla principal. Tarjetas por activo con precio en tiempo diferido.

### Funcionalidad
- Grid de tarjetas: nombre, precio actual (USD), cambio % 24h (verde/rojo)
- Sparkline de 7 días (Lightweight Charts)
- Buscador para añadir activos: busca en CoinGecko (crypto) o lista fija de índices
- Botón eliminar de watchlist
- Auto-refresh cada 5 minutos con countdown visible
- Persiste en Supabase (`watchlist`)

### Índices soportados (lista fija)
| Símbolo | Nombre |
|---------|--------|
| SPX | S&P 500 |
| IXIC | NASDAQ 100 |
| DJI | Dow Jones |
| GDAXI | DAX (Alemania) |
| FTSE | FTSE 100 (UK) |

**Estado:** ⬜ Pendiente

---

## Bloque 3 — Portfolio

Seguimiento de posiciones con P&L calculado al precio actual.

### Funcionalidad
- Formulario: añadir posición (símbolo, cantidad, precio compra, fecha opcional)
- Tabla de posiciones:
  - Activo | Cantidad | Precio compra | Precio actual | P&L € | P&L % | Valor total
- Cards de resumen:
  - Valor total de cartera
  - P&L total (€ y %)
  - Mejor posición / Peor posición
- Gráfico donut: distribución de cartera por activo
- Eliminar posición
- Persiste en Supabase (`portfolio_positions`)

**Estado:** ⬜ Pendiente

---

## Bloque 4 — Alertas de precio

Notificaciones cuando un activo cruza un precio objetivo.

### Funcionalidad
- Formulario: activo + condición (supera / cae por debajo) + precio objetivo
- Lista de alertas activas/disparadas
- Check automático en cada refresh (cada 5 min)
- Al dispararse: notificación visual (banner rojo/verde) + badge en el tab de Alertas
- Opcionalmente: Browser Notification API (requiere permiso del usuario)
- Marcar alerta como disparada en Supabase (`price_alerts.triggered_at`)
- Persiste en Supabase (`price_alerts`)

**Estado:** ⬜ Pendiente

---

## Bloque 5 — UI / Shell

### Layout
- Navbar mínima: título "Finanzas" + badge indicador de último update + auth + dark mode
- Tabs: **Watchlist** | **Portfolio** | **Alertas**
- Sin conexión con el proyecto de alemán (no aparece en su navbar ni en index.html)

### Estilos (`finance/finanzas-styles.css`)
- Variables propias: `--color-fin` (#0F172A navy oscuro), `--color-up` (#16A34A), `--color-down` (#DC2626)
- Tarjetas con sombra sutil, bordes redondeados
- Responsive: grid de 1 columna en móvil, 2-3 en desktop
- Dark mode con `body.dark`

**Estado:** ⬜ Pendiente

---

## Orden de implementación

| Prioridad | Bloque | Tarea | Estado |
|-----------|--------|-------|--------|
| 1 | API | `finanzas-price.js` — CoinGecko + Twelve Data + caché | ✅ |
| 2 | API | `finanzas-history.js` — histórico 30 días | ✅ |
| 3 | UI | Shell: navbar, tabs, dark mode, auth | ✅ |
| 4 | UI | Watchlist: tarjetas, buscador, auto-refresh | ✅ |
| 5 | UI | Portfolio: formulario, tabla, P&L, donut | ✅ |
| 6 | UI | Alertas: formulario, lista, check automático | ✅ |
| 7 | UI | Gráficos: histórico 30d por activo (modal) | ✅ |

---

## Estado general

| Bloque | Descripción | Estado |
|--------|-------------|--------|
| 1 — API precios | finanzas-price.js | ✅ Completo |
| 2 — API histórico | finanzas-history.js | ✅ Completo |
| 3 — Portfolio | Posiciones + P&L + donut | ✅ Completo |
| 4 — Watchlist | Tarjetas + buscador + auto-refresh | ✅ Completo |
| 5 — Alertas | Formulario + check automático | ✅ Completo |
| 6 — UI Shell | Navbar + tabs + estilos + gráficos | ✅ Completo |
