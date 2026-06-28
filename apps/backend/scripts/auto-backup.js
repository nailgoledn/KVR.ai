const fs = require("fs");
const path = require("path");
const archiver = require("archiver");
const crypto = require("crypto");
const { execSync } = require("child_process");

// =========================
// CONFIG
// =========================
const PROJECT_PATH = path.resolve(__dirname, "..");
const BACKUP_DIR = path.join(PROJECT_PATH, "backups");
const USB_DIR = "E:\\KVRAT_BACKUPS"; // غيره حسب جهازك

// =========================
// HELPERS
// =========================
function time() {
  return new Date().toISOString().replace(/:/g, "-");
}

// =========================
// SMART HASH (optimized)
// =========================
function getProjectHash() {
  const hash = crypto.createHash("md5");

  function walk(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const full = path.join(dir, file);

      if (
        full.includes("node_modules") ||
        full.includes("dist") ||
        full.includes("backups")
      ) continue;

      if (fs.lstatSync(full).isDirectory()) {
        walk(full);
      } else {
        hash.update(fs.readFileSync(full));
      }
    }
  }

  walk(PROJECT_PATH);
  return hash.digest("hex");
}

// =========================
// CHANGE DETECTOR
// =========================
function hasChanges() {
  const lockFile = path.join(BACKUP_DIR, "last.json");
  const current = getProjectHash();

  if (fs.existsSync(lockFile)) {
    const old = JSON.parse(fs.readFileSync(lockFile, "utf8"));
    if (old.hash === current) return false;
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  fs.writeFileSync(lockFile, JSON.stringify({ hash: current }));

  return true;
}

// =========================
// BACKUP ENGINE
// =========================
function backup() {
  if (!hasChanges()) {
    console.log("🟡 No changes → skip backup");
    return;
  }

  const fileName = `backup_${time()}.zip`;

  const targetPaths = [
    path.join(BACKUP_DIR, fileName),
    path.join(USB_DIR, fileName)
  ];

  targetPaths.forEach(dest => {
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    const output = fs.createWriteStream(dest);
    const archive = archiver("zip", { zlib: { level: 9 } });

    output.on("close", () => {
      console.log("✅ Backup created:", dest);
      console.log("📦 Size:", archive.pointer(), "bytes");
    });

    archive.pipe(output);

    archive.glob("**/*", {
      cwd: PROJECT_PATH,
      ignore: [
        "node_modules/**",
        "dist/**",
        "backups/**",
        "*.zip"
      ]
    });

    archive.finalize();
  });
}

// =========================
// SAFE ROLLBACK (IMPORTANT FIX)
// =========================
function rollback() {
  const files = fs.readdirSync(BACKUP_DIR)
    .filter(f => f.endsWith(".zip"))
    .sort()
    .reverse();

  if (!files.length) {
    console.log("❌ No backups found");
    return;
  }

  const latest = path.join(BACKUP_DIR, files[0]);

  console.log("⚠️ Restoring from:", latest);

  // استخراج داخل فولدر مؤقت (أمان)
  const tempDir = path.join(PROJECT_PATH, "_restore_tmp");

  fs.mkdirSync(tempDir, { recursive: true });

  execSync(
    `powershell Expand-Archive -Path "${latest}" -DestinationPath "${tempDir}" -Force`
  );

  console.log("✅ Extracted to temp folder");
  console.log("👉 Review files before replacing production");
}

// =========================
// AUTO SYSTEM
// =========================
function startAuto() {
  console.log("🧠 KVRAT AI Backup PRO STARTED");

  backup();

  setInterval(() => {
    console.log("⏱️ Auto backup triggered...");
    backup();
  }, 10 * 60 * 1000);
}

// =========================
// RUN
// =========================
const mode = process.argv[2];

if (mode === "rollback") rollback();
else startAuto();