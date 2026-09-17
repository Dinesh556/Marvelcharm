const { app, BrowserWindow, screen, ipcMain, Tray, Menu, dialog, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

let win;
let tray;

const CONFIG_PATH = path.join(app.getPath('userData'), 'desk-charm-config.json');
const CUSTOM_DIR = path.join(app.getPath('userData'), 'custom-charms');
if (!fs.existsSync(CUSTOM_DIR)) fs.mkdirSync(CUSTOM_DIR, { recursive: true });

// ---------- Built-in Marvel & Classic Charms ----------
const CHARACTERS_DIR = path.join(__dirname, 'assets', 'characters');

const BUILT_IN_CHARMS = [
  // Marvel Heroes with unique signature strings and alternate realistic models
  {
    id: 'spiderman',
    name: 'Spider-Man',
    tagline: 'Web String',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'spiderman.svg'),
    altValue: path.join(CHARACTERS_DIR, 'spiderman_symbiote.svg'),
    altName: 'Symbiote Spider-Man',
    altTagline: 'Alien Black Suit',
    stringStyle: 'web',
    sound: 'web',
    width: 78,
  },
  {
    id: 'ironman',
    name: 'Iron Man',
    tagline: 'Arc Thruster Beam',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'ironman.svg'),
    altValue: path.join(CHARACTERS_DIR, 'ironman_stealth.svg'),
    altName: 'Stealth Iron Man',
    altTagline: 'Gunmetal Spec-Ops Armor',
    stringStyle: 'repulsor_beam',
    sound: 'repulsor',
    width: 78,
  },
  {
    id: 'thor',
    name: 'Thor',
    tagline: 'Lightning Arc',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'thor.svg'),
    altValue: path.join(CHARACTERS_DIR, 'thor_awakened.svg'),
    altName: 'Awakened Thor',
    altTagline: 'God of Thunder Ragnarok',
    stringStyle: 'lightning_arc',
    sound: 'lightning',
    width: 78,
  },
  {
    id: 'doctor_strange',
    name: 'Doctor Strange',
    tagline: 'Eldritch Mandala',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'doctor_strange.svg'),
    altValue: path.join(CHARACTERS_DIR, 'doctor_strange_supreme.svg'),
    altName: 'Strange Supreme',
    altTagline: 'Dark Eldritch Sorcerer',
    stringStyle: 'mystic_mandala',
    sound: 'mystic',
    width: 78,
  },
  {
    id: 'captain_america',
    name: 'Captain America',
    tagline: 'Tactical Cable',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'captain_america.svg'),
    altValue: path.join(CHARACTERS_DIR, 'captain_america_stealth.svg'),
    altName: 'Stealth Strike Cap',
    altTagline: 'Winter Soldier SHIELD Suit',
    stringStyle: 'tactical_cable',
    sound: 'shield',
    width: 78,
  },
  {
    id: 'deadpool',
    name: 'Deadpool',
    tagline: 'Comic Doodle Rope',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'deadpool.svg'),
    altValue: path.join(CHARACTERS_DIR, 'deadpool_xforce.svg'),
    altName: 'X-Force Deadpool',
    altTagline: 'Slate Tactical Spec-Ops',
    stringStyle: 'comic_doodle',
    sound: 'comic',
    width: 78,
  },
  {
    id: 'scarlet_witch',
    name: 'Scarlet Witch',
    tagline: 'Chaos Hex Mist',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'scarlet_witch.svg'),
    altValue: path.join(CHARACTERS_DIR, 'scarlet_witch_darkhold.svg'),
    altName: 'Darkhold Scarlet Witch',
    altTagline: 'Corrupted Obsidian Chaos',
    stringStyle: 'chaos_hex',
    sound: 'chaos',
    width: 78,
  },
  {
    id: 'black_panther',
    name: 'Black Panther',
    tagline: 'Kinetic Weave',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'black_panther.svg'),
    altValue: path.join(CHARACTERS_DIR, 'black_panther_gold.svg'),
    altName: 'Golden Jaguar Panther',
    altTagline: 'Killmonger Gold Habit',
    stringStyle: 'kinetic_weave',
    sound: 'kinetic',
    width: 78,
  },
  {
    id: 'hulk',
    name: 'Hulk',
    tagline: 'Gamma Chain',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'hulk.svg'),
    altValue: path.join(CHARACTERS_DIR, 'hulk_red.svg'),
    altName: 'Red Hulk',
    altTagline: 'Volcanic Thunderbolt Rage',
    stringStyle: 'gamma_chain',
    sound: 'smash',
    width: 82,
  },
  {
    id: 'groot',
    name: 'Groot',
    tagline: 'Living Flora Vine',
    category: 'marvel',
    type: 'image',
    value: path.join(CHARACTERS_DIR, 'groot.svg'),
    altValue: path.join(CHARACTERS_DIR, 'groot_battle.svg'),
    altName: 'Alpha Battle Groot',
    altTagline: 'Spiked Hardened Ironwood',
    stringStyle: 'living_vine',
    sound: 'vine',
    width: 78,
  },
];

// ---------- Config load/save ----------
function loadConfig() {
  const defaultConfig = {
    customCharms: [],
    activeId: 'spiderman',
    soundEnabled: true,
    anchorPosition: 'right', // 'left' | 'center' | 'right'
    heroSkins: {},           // { [heroId]: 'default' | 'alt' }
  };

  if (fs.existsSync(CONFIG_PATH)) {
    try {
      const raw = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
      return {
        customCharms: raw.customCharms || [],
        activeId: raw.activeId || 'spiderman',
        soundEnabled: raw.soundEnabled !== undefined ? raw.soundEnabled : true,
        anchorPosition: raw.anchorPosition || 'right',
        heroSkins: raw.heroSkins || {},
      };
    } catch (e) {
      console.warn('Could not parse config, resetting.', e);
    }
  }
  return defaultConfig;
}

function saveConfig(config) {
  try {
    fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
  } catch (e) {
    console.error('Failed to save config:', e);
  }
}

let config = loadConfig();

function getEffectiveCharm(c) {
  if (!c) return null;
  const isAlt = (config.heroSkins && config.heroSkins[c.id] === 'alt') && !!c.altValue;
  return {
    ...c,
    activeSkin: isAlt ? 'alt' : 'default',
    value: isAlt ? c.altValue : c.value,
    originalValue: c.value,
    name: isAlt ? (c.altName || c.name) : c.name,
    originalName: c.name,
    tagline: isAlt ? (c.altTagline || c.tagline) : c.tagline,
    originalTagline: c.tagline,
  };
}

function getAllCharms() {
  return [...BUILT_IN_CHARMS.map(getEffectiveCharm), ...config.customCharms];
}

function getActiveCharm() {
  const raw = [...BUILT_IN_CHARMS, ...config.customCharms].find(c => c.id === config.activeId) || BUILT_IN_CHARMS[0];
  return getEffectiveCharm(raw);
}

function setActiveCharm(id) {
  config.activeId = id;
  saveConfig(config);
  if (win) {
    win.webContents.send('charm-changed', {
      charm: getActiveCharm(),
      settings: {
        soundEnabled: config.soundEnabled,
        anchorPosition: config.anchorPosition,
      }
    });
  }
  buildTrayMenu();
}

function toggleHeroSkin(heroId) {
  const id = heroId || config.activeId;
  if (!config.heroSkins) config.heroSkins = {};
  config.heroSkins[id] = config.heroSkins[id] === 'alt' ? 'default' : 'alt';
  saveConfig(config);
  const active = getActiveCharm();
  if (win) {
    win.webContents.send('charm-changed', {
      charm: active,
      settings: {
        soundEnabled: config.soundEnabled,
        anchorPosition: config.anchorPosition,
      }
    });
  }
  buildTrayMenu();
  return active;
}

function setHeroSkin(heroId, skin) {
  const id = heroId || config.activeId;
  if (!config.heroSkins) config.heroSkins = {};
  config.heroSkins[id] = skin === 'alt' ? 'alt' : 'default';
  saveConfig(config);
  const active = getActiveCharm();
  if (win) {
    win.webContents.send('charm-changed', {
      charm: active,
      settings: {
        soundEnabled: config.soundEnabled,
        anchorPosition: config.anchorPosition,
      }
    });
  }
  buildTrayMenu();
  return active;
}

function setAnchorPosition(pos) {
  config.anchorPosition = pos;
  saveConfig(config);
  if (win) {
    win.webContents.send('position-changed', pos);
  }
  buildTrayMenu();
}

function toggleSound() {
  config.soundEnabled = !config.soundEnabled;
  saveConfig(config);
  if (win) {
    win.webContents.send('sound-toggled', config.soundEnabled);
  }
  buildTrayMenu();
}

// ---------- Add a custom charm (user's own image) ----------
async function addCustomCharm() {
  const result = await dialog.showOpenDialog(win, {
    title: 'Choose a charm image',
    filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'] }],
    properties: ['openFile'],
  });
  if (result.canceled || !result.filePaths.length) return;

  const srcPath = result.filePaths[0];
  const ext = path.extname(srcPath);
  const destName = `custom-${Date.now()}${ext}`;
  const destPath = path.join(CUSTOM_DIR, destName);
  fs.copyFileSync(srcPath, destPath);

  // Ask which string style fits the character
  const styleChoices = [
    'Web String (Spider-Man style)',
    'Repulsor Beam (Iron Man style)',
    'Lightning Arc (Thor style)',
    'Mystic Mandala (Doctor Strange style)',
    'Tactical Cable (Captain America style)',
    'Comic Doodle (Deadpool style)',
    'Chaos Hex (Scarlet Witch style)',
    'Kinetic Weave (Black Panther style)',
    'Gamma Chain (Hulk style)',
    'Living Vine (Groot style)',
    'Plain Thread',
    'Elastic Spring',
  ];

  const styleKeys = [
    'web',
    'repulsor_beam',
    'lightning_arc',
    'mystic_mandala',
    'tactical_cable',
    'comic_doodle',
    'chaos_hex',
    'kinetic_weave',
    'gamma_chain',
    'living_vine',
    'thread',
    'elastic',
  ];

  const styleChoice = await dialog.showMessageBox(win, {
    type: 'question',
    buttons: styleChoices,
    title: 'Pick a signature string style',
    message: 'What kind of string/effect should tether this charm?',
  });

  const stringStyle = styleKeys[styleChoice.response] || 'web';
  const baseName = path.basename(srcPath, ext);

  const newCharm = {
    id: `custom-${Date.now()}`,
    name: baseName,
    category: 'custom',
    type: 'image',
    value: destPath,
    stringStyle,
    width: 80,
  };

  config.customCharms.push(newCharm);
  saveConfig(config);
  setActiveCharm(newCharm.id);
}

function removeCustomCharm(id) {
  const charm = config.customCharms.find(c => c.id === id);
  if (charm && charm.type === 'image' && fs.existsSync(charm.value)) {
    try { fs.unlinkSync(charm.value); } catch (e) { /* ignore */ }
  }
  config.customCharms = config.customCharms.filter(c => c.id !== id);
  if (config.activeId === id) config.activeId = BUILT_IN_CHARMS[0].id;
  saveConfig(config);
  if (win) {
    win.webContents.send('charm-changed', {
      charm: getActiveCharm(),
      settings: {
        soundEnabled: config.soundEnabled,
        anchorPosition: config.anchorPosition,
      }
    });
  }
  buildTrayMenu();
}

// ---------- Tray Menu ----------
function buildTrayMenu() {
  if (!tray) return;

  const activeHero = getActiveCharm();
  const isAltActive = activeHero.activeSkin === 'alt';
  const hasAlt = !!activeHero.altValue;

  const marvelCharms = BUILT_IN_CHARMS.filter(c => c.category === 'marvel').map(c => {
    const isSelected = c.id === config.activeId;
    const skin = (config.heroSkins && config.heroSkins[c.id]) || 'default';
    const skinTag = skin === 'alt' ? ` [${c.altName || 'Alt'}]` : '';
    return {
      label: (isSelected ? '● ' : '   ') + c.name + skinTag + ` (${c.tagline})`,
      click: () => setActiveCharm(c.id),
    };
  });

  const customItems = config.customCharms.map(c => ({
    label: (c.id === config.activeId ? '● ' : '   ') + c.name + ` [${c.stringStyle}]`,
    click: () => setActiveCharm(c.id),
  }));

  const customRemoveItems = config.customCharms.map(c => ({
    label: `Remove "${c.name}"`,
    click: () => removeCustomCharm(c.id),
  }));

  const template = [
    { label: '★ Marvel Desk Charms ★', enabled: false },
    { type: 'separator' },
    ...marvelCharms,
    { type: 'separator' },
    {
      label: `Costume Skin: ${isAltActive ? (activeHero.altName || 'Alternate') : 'Classic'}`,
      submenu: [
        {
          label: `Classic Model (${activeHero.originalName || activeHero.name})`,
          type: 'radio',
          checked: !isAltActive,
          click: () => setHeroSkin(activeHero.id, 'default'),
        },
        {
          label: `Alternate Model (${activeHero.altName || 'Alternate Skin'})`,
          type: 'radio',
          checked: isAltActive,
          enabled: hasAlt,
          click: () => setHeroSkin(activeHero.id, 'alt'),
        },
      ],
    },
  ];

  if (customItems.length) {
    template.push({
      label: 'Custom Charms',
      submenu: customItems,
    });
  }

  template.push(
    { type: 'separator' },
    {
      label: 'Screen Position',
      submenu: [
        {
          label: 'Top-Right (Default)',
          type: 'radio',
          checked: config.anchorPosition === 'right',
          click: () => setAnchorPosition('right'),
        },
        {
          label: 'Top-Center',
          type: 'radio',
          checked: config.anchorPosition === 'center',
          click: () => setAnchorPosition('center'),
        },
        {
          label: 'Top-Left',
          type: 'radio',
          checked: config.anchorPosition === 'left',
          click: () => setAnchorPosition('left'),
        },
      ],
    },
    {
      label: 'Sound Effects',
      type: 'checkbox',
      checked: config.soundEnabled,
      click: toggleSound,
    },
    { type: 'separator' },
    { label: 'Add Custom Charm…', click: addCustomCharm }
  );

  if (customRemoveItems.length) {
    template.push({
      label: 'Remove Custom Charm',
      submenu: customRemoveItems,
    });
  }

  template.push(
    { type: 'separator' },
    { label: 'Quit Desk Charm', click: () => app.quit() }
  );

  tray.setContextMenu(Menu.buildFromTemplate(template));
}

function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'characters', 'spiderman.svg');
  let icon;
  try {
    icon = nativeImage.createFromPath(iconPath).resize({ width: 18, height: 18 });
  } catch (e) {
    icon = nativeImage.createEmpty();
  }
  tray = new Tray(icon.isEmpty() ? path.join(__dirname, 'assets', 'tray-icon.png') : icon);
  tray.setToolTip('Marvel Desk Charm — Right click to switch hero');
  buildTrayMenu();
}

// ---------- Window ----------
function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  win = new BrowserWindow({
    width: width,
    height: height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    movable: false,
    skipTaskbar: true,
    hasShadow: false,
    fullscreenable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setAlwaysOnTop(true, 'screen-saver');
  win.loadFile('index.html');
  win.setIgnoreMouseEvents(true, { forward: true });

  win.on('closed', () => {
    win = null;
  });
}

// ---------- Hit Testing & Mouse Event Management on Windows ----------
let hitAreas = [];
let isIgnoringMouse = true;
let isUserDragging = false;
let isDockOpen = false;

ipcMain.on('update-hit-bounds', (event, data) => {
  hitAreas = data.areas || [];
  isUserDragging = !!data.isDragging;
  isDockOpen = !!data.isDockOpen;
});

// Periodic native cursor poller (checks every 25ms via Win32 GetCursorPos)
setInterval(() => {
  if (!win || win.isDestroyed()) return;

  if (isUserDragging || isDockOpen) {
    if (isIgnoringMouse) {
      isIgnoringMouse = false;
      win.setIgnoreMouseEvents(false);
    }
    return;
  }

  const cursor = screen.getCursorScreenPoint();
  const bounds = win.getBounds();
  const relX = cursor.x - bounds.x;
  const relY = cursor.y - bounds.y;

  let isOver = false;
  for (const area of hitAreas) {
    if (area.type === 'circle') {
      const dist = Math.hypot(relX - area.x, relY - area.y);
      if (dist <= area.radius) {
        isOver = true;
        break;
      }
    } else if (area.type === 'rect') {
      if (
        relX >= area.x &&
        relX <= area.x + area.width &&
        relY >= area.y &&
        relY <= area.y + area.height
      ) {
        isOver = true;
        break;
      }
    }
  }

  if (isOver && isIgnoringMouse) {
    isIgnoringMouse = false;
    win.setIgnoreMouseEvents(false);
    win.webContents.send('cursor-entered', { x: relX, y: relY });
  } else if (!isOver && !isIgnoringMouse) {
    isIgnoringMouse = true;
    win.setIgnoreMouseEvents(true, { forward: true });
    win.webContents.send('cursor-left');
  }
}, 25);

// ---------- IPC Handlers ----------
ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
  if (win) {
    isIgnoringMouse = ignore;
    win.setIgnoreMouseEvents(ignore, options);
  }
});

ipcMain.handle('get-current-charm', () => ({
  charm: getActiveCharm(),
  settings: {
    soundEnabled: config.soundEnabled,
    anchorPosition: config.anchorPosition,
  },
}));

ipcMain.handle('get-all-charms', () => ({
  marvel: BUILT_IN_CHARMS.filter(c => c.category === 'marvel').map(getEffectiveCharm),
  custom: config.customCharms,
  activeId: config.activeId,
  soundEnabled: config.soundEnabled,
  anchorPosition: config.anchorPosition,
  heroSkins: config.heroSkins || {},
}));

ipcMain.handle('set-active-charm', (event, id) => {
  setActiveCharm(id);
  return getActiveCharm();
});

ipcMain.handle('toggle-hero-skin', (event, heroId) => {
  return toggleHeroSkin(heroId);
});

ipcMain.handle('set-hero-skin', (event, heroId, skin) => {
  return setHeroSkin(heroId, skin);
});

ipcMain.handle('toggle-sound', () => {
  toggleSound();
  return config.soundEnabled;
});

ipcMain.handle('set-anchor-position', (event, pos) => {
  setAnchorPosition(pos);
  return config.anchorPosition;
});

app.whenReady().then(() => {
  createWindow();
  createTray();

  app.setLoginItemSettings({
    openAtLogin: true,
    path: process.execPath,
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
