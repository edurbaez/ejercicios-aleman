// Reports German words that appear in more than one CEFR level's Data{LEVEL}.json.
// Usage: node scripts/find-duplicate-words.js
const fs = require('fs');
const path = require('path');

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

function normalize(word) {
  return word.trim().toLowerCase();
}

// word (normalized) -> [{ level, category, original }]
const index = new Map();

for (const level of LEVELS) {
  const file = path.join(__dirname, '..', `Data${level}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  for (const [category, lists] of Object.entries(data)) {
    if (!lists || !Array.isArray(lists.de)) continue;
    for (const word of lists.de) {
      const key = normalize(word);
      if (!index.has(key)) index.set(key, []);
      index.get(key).push({ level, category, original: word });
    }
  }
}

const duplicates = [...index.entries()]
  .filter(([, occurrences]) => new Set(occurrences.map(o => o.level)).size > 1)
  .sort((a, b) => a[0].localeCompare(b[0]));

if (duplicates.length === 0) {
  console.log('No duplicate words found across levels.');
} else {
  console.log(`${duplicates.length} words appear in more than one level:\n`);
  for (const [key, occurrences] of duplicates) {
    const where = occurrences.map(o => `${o.level}/${o.category} ("${o.original}")`).join(', ');
    console.log(`- ${key}: ${where}`);
  }
}
