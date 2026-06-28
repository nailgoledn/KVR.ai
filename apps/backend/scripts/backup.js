const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');

// ==========================
// CONFIG
// ==========================
const PROJECT_PATH = path.resolve(__dirname, '..');

// auto detect USB (Windows)
function detectUSB() {
  const drives = ['D', 'E', 'F', 'G', 'H'];

  for (const d of drives) {
    const p = `${d}:\\KVRAT_BACKUPS`;
    if (fs.existsSync(`${d}:\\`)) {
      return p;
    }
  }

  return null;
}

const USB_PATH = detectUSB();

// ==========================
// UTILS
// ==========================
function time() {
  return new Date().toISOString().replace(/:/g, '-');
}

function ensure(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// ==========================
// BACKUP ENGINE
// ==========================
function backup() {
  if (!USB_PATH) {
    console.log('❌ USB not found!');
    return;
  }

  ensure(USB_PATH);

  const fileName = `backup_${time()}.zip`;
  const filePath = path.join(USB_PATH, fileName);

  const output = fs.createWriteStream(filePath);
  const archive = archiver('zip', { zlib: { level: 9 } });

  output.on('close', () => {
    console.log('✅ Backup done:', fileName);
    console.log('📦 Size:', archive.pointer(), 'bytes');
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(output);

  archive.glob('**/*', {
    cwd: PROJECT_PATH,
    ignore: [
      'node_modules/**',
      'dist/**',
      'backups/**',
      '*.zip'
    ]
  });

  archive.finalize();
}

// ==========================
// LIST BACKUPS
// ==========================
function listBackups() {
  if (!USB_PATH || !fs.existsSync(USB_PATH)) return [];

  return fs.readdirSync(USB_PATH)
    .filter(f => f.endsWith('.zip'))
    .sort()
    .reverse();
}

// ==========================
// ROLLBACK (REAL)
// ==========================
function rollback() {
  const backups = listBackups();

  if (backups.length === 0) {
    console.log('❌ No backups found');
    return;
  }

  const latest = backups[0];
  const filePath = path.join(USB_PATH, latest);

  console.log('↩️ Restoring backup:', latest);

  // فك الضغط داخل المشروع (requires PowerShell)
  try {
    execSync(`powershell Expand-Archive -Path "${filePath}" -DestinationPath "${PROJECT_PATH}" -Force`);
    console.log('✅ Restore completed');
  } catch (err) {
    console.log('❌ Restore failed:', err.message);
  }
}

// ==========================
// AUTO BACKUP AI SYSTEM
// ==========================
function startAutoBackup() {
  console.log('🧠 KVRAT Auto Backup AI Running...');

  backup();

  setInterval(() => {
    console.log('⏱️ Auto backup triggered...');
    backup();
  }, 10 * 60 * 1000);
}

// ==========================
// RUN MODE
// ==========================
const mode = process.argv[2];

if (mode === 'rollback') {
  rollback();
} else {
  startAutoBackup();
}