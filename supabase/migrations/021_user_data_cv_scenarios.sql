-- user_data: adds cv_scenarios to sync chat-voz.html's custom roleplay scenarios
-- across devices. Shape:
--   { selected: '<scenario key>', custom: [ {key, icon, name, rol, contexto, mision, isCustom} ], deleted: ['<key>'] }
--
-- `custom` is merged by `key` (not replaced) on load, because these are scenarios the
-- student wrote: a plain remote-wins overwrite would silently delete one created on
-- another device. `deleted` is the tombstone list that makes a delete propagate instead
-- of being resurrected by that same merge. `selected` is last-write-wins — there a
-- single latest value is the right semantics.
--
-- The AI-generated personas (localStorage `cv_rol_cache_<key>`) stay local on purpose:
-- when absent the app already regenerates them via /api/chat, so syncing them would only
-- add row weight and a second conflict to resolve.

ALTER TABLE user_data ADD COLUMN IF NOT EXISTS cv_scenarios jsonb NOT NULL DEFAULT '{}'::jsonb;
