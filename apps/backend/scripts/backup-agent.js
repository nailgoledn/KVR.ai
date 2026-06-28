const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const BACKUP_SCRIPT = path.join(__dirname, "backup.js");

let backupRunning = false;
let lastBackupTime = 0;
let lastDetectedDrive = null;

function findKeyDrive() {
const drives = ["D", "E", "F", "G", "H", "I", "J", "K"];

for (const drive of drives) {
const keyPath = `${drive}:\\KVRAT_SECURITY\\key.bin`;

```
if (fs.existsSync(keyPath)) {
  return drive;
}
```

}

return null;
}

function runBackup(drive) {
if (backupRunning) {
return;
}

const now = Date.now();

// منع تكرار النسخ خلال 10 دقائق
if (now - lastBackupTime < 10 * 60 * 1000) {
return;
}

backupRunning = true;
lastBackupTime = now;

console.log("");
console.log("================================");
console.log(`[${new Date().toISOString()}]`);
console.log(`USB KEY FOUND ON ${drive}:`);
console.log("STARTING BACKUP...");
console.log("================================");

exec(`node "${BACKUP_SCRIPT}"`, (error, stdout, stderr) => {
backupRunning = false;

```
if (error) {
  console.log("BACKUP ERROR:");
  console.log(error.message);
  return;
}

if (stderr) {
  console.log(stderr);
}

console.log(stdout);
```

});
}

console.log("================================");
console.log("KVRAT BACKUP AGENT STARTED");
console.log("WAITING FOR USB KEY...");
console.log("================================");

setInterval(() => {
const drive = findKeyDrive();

// لا يوجد مفتاح
if (!drive) {
lastDetectedDrive = null;
return;
}

// مفتاح جديد تم توصيله
if (drive !== lastDetectedDrive) {
lastDetectedDrive = drive;

```
console.log(`USB KEY DETECTED ON ${drive}:`);

runBackup(drive);
```

}
}, 30000);
