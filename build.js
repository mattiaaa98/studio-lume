const fs = require('fs');
const path = require('path');

const salonId = process.env.PUBLIC_SALON_ID;

if (!salonId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(salonId)) {
  console.error('Errore: PUBLIC_SALON_ID mancante o non valido.');
  process.exit(1);
}

const outputDir = path.join(__dirname, 'dist');
const files = [
  { source: 'index.html', output: 'index.html', replaceSalonId: true },
  { source: 'admin.html', output: 'admin.html', replaceSalonId: false },
];

fs.mkdirSync(outputDir, { recursive: true });

for (const file of files) {
  const sourcePath = path.join(__dirname, file.source);
  if (!fs.existsSync(sourcePath)) {
    console.error('Errore: file non trovato:', file.source);
    process.exit(1);
  }

  let content = fs.readFileSync(sourcePath, 'utf8');
  if (file.replaceSalonId) {
    if (!content.includes('__PUBLIC_SALON_ID__')) {
      console.error('Errore: placeholder __PUBLIC_SALON_ID__ non trovato in index.html.');
      process.exit(1);
    }
    content = content.replaceAll('__PUBLIC_SALON_ID__', salonId);
  }

  fs.writeFileSync(path.join(outputDir, file.output), content, 'utf8');
}

console.log('Build completata per il salone:', salonId, '(index.html + admin.html)');
