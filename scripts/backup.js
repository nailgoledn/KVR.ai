const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

// 🔥 عدل هنا حسب مكان مشروعك والفلاشة
const PROJECT_PATH = path.resolve(__dirname, '..');
const USB_PATH = 'E:\\KVRAT_BACKUPS'; // ← غيّر حرف الفلاشة لو مختلف

const date = new Date().toISOString().split('T')[0];
const outputFile = path.join(USB_PATH, `KVRAT_BACKUP_${date}.zip`);

function createBackup() {
  if (!fs.existsSync(USB_PATH)) {
    fs.mkdirSync(USB_PATH, { recursive: true });
  }

  const output = fs.createWriteStream(outputFile);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log(`✅ Backup Done: ${archive.pointer()} bytes`);
    console.log(`📦 File saved at: ${outputFile}`);
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  // 🔥 استثناءات (عشان ما يضخمش الحجم)
  archive.glob('**/*', {
    cwd: PROJECT_PATH,
    ignore: [
      'node_modules/**',
      '.git/**',
      'dist/**',
      '.next/**',
      '*.zip'
    ]
  });

  archive.finalize();
}

createBackup();