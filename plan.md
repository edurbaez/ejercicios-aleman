# Plan de mejoras — Base de datos Supabase

> Análisis realizado: 2026-05-14  
> Implementado: 2026-05-14  
> Proyecto: `mzitpnacjcjpokmiqwtd`

---

## Estado de implementación

| # | Cambio | Estado | Archivos afectados |
|---|--------|--------|--------------------|
| 1 | Fusionar `user_preferences` → `user_data` | ✅ Hecho | DB + `chat-voz.html` |
| 2 | Índice compuesto `usage_events(user_id, created_at DESC)` | ✅ Hecho | Solo DB |
| 3 | Índice único en `diccionario_cache(palabra)` | ✅ Hecho | Solo DB |
| 4 | TTL 90 días en `usage_events` (pg_cron) | ✅ Hecho | Solo DB |
| 5 | Trigger rollup `usage_events` → `daily_stats` | ✅ Hecho | Solo DB |
| 6 | Sincronizar `profiles.email` via trigger (en lugar de eliminar) | ✅ Hecho | Solo DB |
| 7 | Endurecer RLS `diccionario_cache` INSERT | ✅ Hecho | Solo DB |
| 8 | Política admin READ en `user_data` | ✅ Hecho | Solo DB |
| 9 | `created_at` en `user_data` | ✅ Hecho | Solo DB |

---

## Cambio pendiente: TTL 90 días en `usage_events`

### Paso 1 — Habilitar `pg_cron` en el dashboard de Supabase

1. Ir a **[supabase.com/dashboard](https://supabase.com/dashboard)** → tu proyecto
2. Menú izquierdo: **Database** → **Extensions**
3. Buscar `pg_cron` en el buscador
4. Activar el toggle → confirmar

### Paso 2 — Ejecutar en el SQL Editor (una sola vez, después de activar la extensión)

```sql
-- Función de limpieza
CREATE OR REPLACE FUNCTION purge_old_events()
RETURNS void LANGUAGE sql AS $$
  DELETE FROM usage_events
  WHERE created_at < now() - INTERVAL '90 days';
$$;

-- Programar ejecución diaria a las 3 AM UTC
SELECT cron.schedule(
  'purge-usage-events',
  '0 3 * * *',
  'SELECT purge_old_events()'
);
```

### Verificar que quedó programado

```sql
SELECT jobname, schedule, command, active FROM cron.job;
```

---

## Resumen de qué cambió en la DB

### Tablas modificadas

**`user_data`** — se agregaron 3 columnas:
- `cv_rol text DEFAULT ''` — rol del usuario en chat-voz (ex `user_preferences`)
- `cv_contexto text DEFAULT ''` — contexto personalizado (ex `user_preferences`)
- `created_at timestamptz DEFAULT now()` — fecha de registro

**`diccionario_cache`** — nueva RLS:
- INSERT requiere usuario autenticado (antes era público)

### Tablas eliminadas
- `user_preferences` — datos migrados a `user_data`

### Índices creados
- `idx_usage_user_created` en `usage_events(user_id, created_at DESC)`
- `idx_diccionario_palabra` en `diccionario_cache(palabra)` (UNIQUE)

### Triggers creados
- `trg_update_daily_stats` — al insertar en `usage_events`, hace upsert en `daily_stats` automáticamente
- `on_auth_user_email_updated` — mantiene `profiles.email` sincronizado si el usuario cambia su email en Auth

### Políticas RLS nuevas
- `admin reads all user_data` en `user_data` (SELECT para rol admin)

### Código modificado
- `chat-voz.html` — `loadPreferences()` y `persistPreferences()` apuntan a `user_data` en vez de `user_preferences`
