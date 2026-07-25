// Cron endpoint: keeps vocabulary fresh by generating current German expressions
// (colloquial usage, media, tech, modern everyday life) and appending them to a
// system word_lists row named "nuevas" for one CEFR level per invocation.
// The quiz apps pick the list up automatically: shared-game.js loads system lists
// from Supabase before falling back to the static Data{LEVEL}.json files.
//
// Auth: Authorization: Bearer <CRON_SECRET> (same pattern as push-notify.js).
// Level: body/query `level` (a1–c2); if absent, rotates one level per day so the
// whole catalog refreshes every 6 days with a single daily cron job.

import { fetchWithRetry } from './_lib.js';

const SUPA_URL = 'https://mzitpnacjcjpokmiqwtd.supabase.co';

const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'];
const LIST_NAME = 'nuevas';
const BATCH_SIZE = 15;
const MAX_LIST_SIZE = 150; // keep only the most recent expressions
const EXCLUDE_CHAR_CAP = 6000;

const LEVEL_DESC = {
    a1: 'A1 (absolute beginner): very simple everyday words and short fixed phrases.',
    a2: 'A2 (elementary): daily routines, shopping, transport, simple conversations.',
    b1: 'B1 (intermediate): travel, work, health, media, expressing opinions.',
    b2: 'B2 (upper-intermediate): politics, economy, culture, idiomatic expressions.',
    c1: 'C1 (advanced): academic and professional registers, sophisticated collocations.',
    c2: 'C2 (mastery): literary language, subtle nuances, rare idioms, specialist terms.',
};

function normalize(w) {
    return String(w).toLowerCase().replace(/^(der|die|das)\s+/i, '').trim();
}

function supaFetch(path, options = {}) {
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    return fetch(`${SUPA_URL}/rest/v1/${path}`, {
        ...options,
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            ...(options.headers || {}),
        },
    });
}

async function generateExpressions(level, excludeList) {
    const excludeStr = excludeList.length
        ? `\n\nDo NOT include any of these (already in the app):\n${excludeList.join(', ').slice(0, EXCLUDE_CHAR_CAP)}`
        : '';

    const prompt = `Generate ${BATCH_SIZE} German expressions that are CURRENT and actively used in Germany today (${new Date().getFullYear()}): modern colloquial phrases, expressions from media and social networks, workplace and tech vocabulary, Anglicisms accepted in German, and recent idioms.

Target CEFR level: ${level.toUpperCase()} — ${LEVEL_DESC[level]}

Rules:
- Every entry must be appropriate for a ${level.toUpperCase()} learner
- Prefer multi-word expressions and phrases over single words
- Spanish translations must be natural, not literal
- Nouns must include their article (der/die/das)${excludeStr}

Return ONLY this JSON:
{ "de": [exactly ${BATCH_SIZE} strings], "es": [exactly ${BATCH_SIZE} strings] }`;

    const res = await fetchWithRetry('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            temperature: 0.7,
            max_tokens: 2048,
            response_format: { type: 'json_object' },
            messages: [
                { role: 'system', content: 'You are a German teacher living in Germany, up to date with how the language is actually used today. Return ONLY valid JSON.' },
                { role: 'user', content: prompt },
            ],
        }),
    });
    const json = await res.json();
    if (json.error) throw new Error(`OpenAI: ${json.error.message}`);
    const data = JSON.parse(json.choices[0].message.content);
    if (!Array.isArray(data.de) || !Array.isArray(data.es)) throw new Error('Malformed generation result');
    const n = Math.min(data.de.length, data.es.length);
    return { de: data.de.slice(0, n), es: data.es.slice(0, n) };
}

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const secret = process.env.CRON_SECRET;
    const provided = (req.headers.authorization || '').replace('Bearer ', '');
    if (!secret || provided !== secret) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!process.env.OPENAI_API_KEY || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        return res.status(500).json({ error: 'Missing env vars' });
    }

    let level = (req.body?.level || req.query?.level || '').toLowerCase();
    if (!LEVELS.includes(level)) {
        level = LEVELS[Math.floor(Date.now() / 86_400_000) % LEVELS.length];
    }

    try {
        const r = await supaFetch(`word_lists?app_id=eq.${level}&is_system=eq.true&select=id,name,words`);
        if (!r.ok) return res.status(500).json({ error: 'DB error reading word_lists' });
        const lists = await r.json();

        const existing = new Set();
        for (const row of lists) {
            (row.words?.de || []).forEach(w => existing.add(normalize(w)));
        }

        const gen = await generateExpressions(level, [...existing]);

        const fresh = { de: [], es: [] };
        for (let i = 0; i < gen.de.length; i++) {
            if (!existing.has(normalize(gen.de[i]))) {
                fresh.de.push(gen.de[i]);
                fresh.es.push(gen.es[i]);
            }
        }

        if (fresh.de.length === 0) {
            return res.status(200).json({ level, added: 0, total: null, note: 'all generated expressions were duplicates' });
        }

        const current = lists.find(l => l.name === LIST_NAME);
        // Newest expressions first, capped so the list stays reviewable
        const merged = {
            de: [...fresh.de, ...(current?.words?.de || [])].slice(0, MAX_LIST_SIZE),
            es: [...fresh.es, ...(current?.words?.es || [])].slice(0, MAX_LIST_SIZE),
        };

        let w;
        if (current) {
            w = await supaFetch(`word_lists?id=eq.${current.id}`, {
                method: 'PATCH',
                headers: { Prefer: 'return=minimal' },
                body: JSON.stringify({ words: merged }),
            });
        } else {
            w = await supaFetch('word_lists', {
                method: 'POST',
                headers: { Prefer: 'return=minimal' },
                body: JSON.stringify({
                    app_id: level,
                    name: LIST_NAME,
                    is_system: true,
                    user_id: null,
                    words: merged,
                }),
            });
        }
        if (!w.ok) {
            const body = await w.text();
            return res.status(500).json({ error: `DB write failed: ${body.slice(0, 200)}` });
        }

        return res.status(200).json({ level, added: fresh.de.length, total: merged.de.length });
    } catch (err) {
        return res.status(500).json({ error: String(err.message || err) });
    }
}
