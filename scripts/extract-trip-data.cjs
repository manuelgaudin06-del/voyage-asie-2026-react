const fs = require('fs');

const source = fs.readFileSync('public/program.html', 'utf8');

function extractConst(name) {
  const match = new RegExp(`const\\s+${name}\\s*=\\s*`).exec(source);
  if (!match) throw new Error(`Missing ${name}`);

  const start = match.index + match[0].length;
  const nextConst = source.indexOf('\n    const ', start);
  const nextFunction = source.indexOf('\n    function ', start);
  const nextMarker = [nextConst, nextFunction].filter((index) => index > start).sort((a, b) => a - b)[0];
  if (!nextMarker) throw new Error(`Unterminated ${name}`);

  let block = source.slice(start, nextMarker).trim();
  if (block.endsWith(';')) block = block.slice(0, -1).trim();
  return block;
}

const names = [
  'PLACES',
  'PLACE_TYPES',
  'TYPE_PHOTO_FALLBACK',
  'TRANSPORT_MODES',
  'TRANSPORT_LEGS',
  'CITY_COORDS',
  'DAILY_PHOTO_TIPS',
  'CITY_COLORS',
];

let output = [
  '// Generated from public/program.html.',
  '// Keep this module small and replace it with hand-owned data files during the full migration.',
  '',
].join('\n');

for (const name of names) {
  output += `export const ${name} = ${extractConst(name)};\n\n`;
}

output += "export const COUNTRY_FR = { korea: 'Corée du Sud', japan: 'Japon', thailand: 'Thaïlande' };\n";
output += "export const COUNTRY_HEX = { korea: '#b04a32', japan: '#3e6550', thailand: '#7e4a85' };\n";
output += "export const COUNTRY_ORDER = ['korea', 'japan', 'thailand'];\n";

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/tripData.js', output, 'utf8');
console.log(`wrote src/data/tripData.js (${output.length} bytes)`);
