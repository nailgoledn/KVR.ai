const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('kvratAPI', {
  startBackend: () => ipcRenderer.send('start-backend'),
  startFrontend: () => ipcRenderer.send('start-frontend'),
  stopAll: () => ipcRenderer.send('stop-all'),
});
