const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('deskCharm', {
  setIgnoreMouseEvents: (ignore, options) => {
    ipcRenderer.send('set-ignore-mouse-events', ignore, options);
  },
  updateHitBounds: (data) => {
    ipcRenderer.send('update-hit-bounds', data);
  },
  getCurrentCharm: () => ipcRenderer.invoke('get-current-charm'),
  getAllCharms: () => ipcRenderer.invoke('get-all-charms'),
  setActiveCharm: (id) => ipcRenderer.invoke('set-active-charm', id),
  toggleSound: () => ipcRenderer.invoke('toggle-sound'),
  setAnchorPosition: (pos) => ipcRenderer.invoke('set-anchor-position', pos),
  toggleHeroSkin: (heroId) => ipcRenderer.invoke('toggle-hero-skin', heroId),
  setHeroSkin: (heroId, skin) => ipcRenderer.invoke('set-hero-skin', heroId, skin),
  onCharmChanged: (callback) => {
    ipcRenderer.on('charm-changed', (event, data) => callback(data));
  },
  onPositionChanged: (callback) => {
    ipcRenderer.on('position-changed', (event, pos) => callback(pos));
  },
  onSoundToggled: (callback) => {
    ipcRenderer.on('sound-toggled', (event, enabled) => callback(enabled));
  },
  onCursorEntered: (callback) => {
    ipcRenderer.on('cursor-entered', (event, pos) => callback(pos));
  },
  onCursorLeft: (callback) => {
    ipcRenderer.on('cursor-left', () => callback());
  },
});
