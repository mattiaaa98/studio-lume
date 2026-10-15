
const fs = require('fs');
const path = require('path');

const salonId = process.env.PUBLIC_SALON_ID;

if (!salonId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(salonId)) {
  console.error('Errore: PUBLIC_SALON_ID mancante o non valido.');
  process.exit(1);
}

const sourcePath = path.join(__dirname, 'index.html');
const outputDir = path.join(__dirname, 'dist');
const outputPath = path.join(outputDir, 'index.html');

if (!fs.existsSync(sourcePath)) {
  console.error('Errore: index.html non trovato.');
  process.exit(1);
}

let html = fs.readFileSync(sourcePath, 'utf8');

if (!html.includes('__PUBLIC_SALON_ID__')) {
  console.error('Errore: placeholder __PUBLIC_SALON_ID__ non trovato in index.html.');
  process.exit(1);
}

html = html.replaceAll('__PUBLIC_SALON_ID__', salonId);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, html, 'utf8');

console.log('Build completata per il salone:', salonId);
