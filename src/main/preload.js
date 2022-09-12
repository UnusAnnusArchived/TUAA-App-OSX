const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    closeWindow() {
      ipcRenderer.send('close-window');
    },
    minimizeWindow() {
      ipcRenderer.send('minimize-window');
    },
    toggleFullScreen() {
      ipcRenderer.send('toggle-fullscreen');
    },
    getFullscreenStatus() {
      return new Promise((resolve) => {
        ipcRenderer.send('get-fullscreen-status');
        ipcRenderer.once('get-fullscreen-status', (evt, ...args) => {
          resolve([evt, args]);
        });
      });
    },
    getColor(color) {
      return new Promise((resolve) => {
        ipcRenderer.send('get-color', color);
        ipcRenderer.once('get-color', (evt, ...args) => {
          resolve([evt, args]);
        });
      });
    },
    quitApp() {
      ipcRenderer.send('quit-app');
    },
    on(channel, func) {
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    },
    once(channel, func) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    },
  },
});
