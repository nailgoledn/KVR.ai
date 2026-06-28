const { spawn } = require("child_process");

let processes = {};

function startBackend() {
  processes.backend = spawn("npm", ["run", "start:dev"], {
    cwd: "C:\\k\\KVRAT\\apps\\backend",
    shell: true
  });
}

function startFrontend() {
  processes.frontend = spawn("npm", ["run", "dev"], {
    cwd: "C:\\k\\KVRAT\\apps\\kvrat_app",
    shell: true
  });
}

function stopAll() {
  Object.values(processes).forEach(p => p.kill());
  processes = {};
}

module.exports = {
  startBackend,
  startFrontend,
  stopAll
};