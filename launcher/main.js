
const path = require('path');
const { app, BrowserWindow, ipcMain } = require('electron');
const controller = require('./controller');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 650,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.loadFile('ui.html');
}

app.whenReady().then(createWindow);

ipcMain.on('start-backend', () => controller.startBackend());
ipcMain.on('start-frontend', () => controller.startFrontend());
ipcMain.on('stop-all', () => controller.stopAll());
