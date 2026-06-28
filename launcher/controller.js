const path = require('path');
const { exec } = require('child_process');

const projectRoot = path.resolve(__dirname, '..');

function startBackend() {
  const backendDir = path.join(projectRoot, 'apps', 'backend');
  exec(
    `start powershell -NoExit -Command "cd '${backendDir}'; npm run start:dev"`,
  );
}

function startFrontend() {
  const frontendDir = path.join(projectRoot, 'apps', 'kvrat-landing');
  exec(
    `start powershell -NoExit -Command "cd '${frontendDir}'; npm run dev"`,
  );
}

function stopAll() {
  exec('taskkill /F /IM node.exe');
}

module.exports = {
  startBackend,
  startFrontend,
  stopAll,
};
