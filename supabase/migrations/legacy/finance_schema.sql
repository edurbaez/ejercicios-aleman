-- ============================================================
-- Dashboard Financiero — Esquema Supabase
-- Tablas ya creadas en producción con estos nombres exactos
-- ============================================================

-- ------------------------------------------------------------
-- 1. watchlist
--    Activos que el usuario quiere monitorear (crypto + índices)
-- ------------------------------------------------------------
create table watchlist (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users not null,
  symbol       text not null,           -- ej: 'bitcoin', 'SPX'
  asset_type   text not null,           -- 'crypto' | 'index'
  name         text not null,           -- ej: 'Bitcoin', 'S&P 500'
  created_at   timestamptz default now(),
  unique (user_id, symbol)
);
alter table watchlist enable row level security;
create policy "own rows" on watchlist using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 2. portfolio_positions
--    Cada compra registrada manualmente por el usuario
-- ------------------------------------------------------------
create table portfolio_positions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users not null,
  symbol       text not null,
  asset_type   text not null,           -- 'crypto' | 'index'
  name         text not null,
  qty          numeric not null,        -- cantidad de unidades
  buy_price    numeric not null,        -- precio de compra (USD)
  buy_date     date,
  created_at   timestamptz default now()
);
alter table portfolio_positions enable row level security;
create policy "own rows" on portfolio_positions using (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 3. price_alerts
--    Notificar cuando un activo supera o cae por debajo de
--    un precio objetivo
-- ------------------------------------------------------------
create table price_alerts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references auth.users not null,
  symbol         text not null,
  asset_type     text not null,
  name           text not null,
  condition      text not null,         -- 'above' | 'below'
  target_price   numeric not null,      -- precio objetivo (USD)
  active         boolean default true,
  triggered_at   timestamptz,           -- null si aún no se disparó
  created_at     timestamptz default now()
);
alter table price_alerts enable row level security;
create policy "own rows" on price_alerts using (auth.uid() = user_id);
