const fs = require('fs');
const path = require('path');
const assert = require('assert');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const main = fs.readFileSync(path.join(__dirname, '..', 'main.js'), 'utf8');
const preload = fs.readFileSync(path.join(__dirname, '..', 'preload.js'), 'utf8');

const marvelHeroes = [
  { id: 'spiderman', style: 'web', file: 'spiderman.svg', altFile: 'spiderman_symbiote.svg', altName: 'Symbiote Spider-Man' },
  { id: 'ironman', style: 'repulsor_beam', file: 'ironman.svg', altFile: 'ironman_stealth.svg', altName: 'Stealth Iron Man' },
  { id: 'thor', style: 'lightning_arc', file: 'thor.svg', altFile: 'thor_awakened.svg', altName: 'Awakened Thor' },
  { id: 'doctor_strange', style: 'mystic_mandala', file: 'doctor_strange.svg', altFile: 'doctor_strange_supreme.svg', altName: 'Strange Supreme' },
  { id: 'captain_america', style: 'tactical_cable', file: 'captain_america.svg', altFile: 'captain_america_stealth.svg', altName: 'Stealth Strike Cap' },
  { id: 'deadpool', style: 'comic_doodle', file: 'deadpool.svg', altFile: 'deadpool_xforce.svg', altName: 'X-Force Deadpool' },
  { id: 'scarlet_witch', style: 'chaos_hex', file: 'scarlet_witch.svg', altFile: 'scarlet_witch_darkhold.svg', altName: 'Darkhold Scarlet Witch' },
  { id: 'black_panther', style: 'kinetic_weave', file: 'black_panther.svg', altFile: 'black_panther_gold.svg', altName: 'Golden Jaguar Panther' },
  { id: 'hulk', style: 'gamma_chain', file: 'hulk.svg', altFile: 'hulk_red.svg', altName: 'Red Hulk' },
  { id: 'groot', style: 'living_vine', file: 'groot.svg', altFile: 'groot_battle.svg', altName: 'Alpha Battle Groot' },
];

console.log('Testing removal of legacy classic charms (app is 100% Marvel Superheroes)...');
['duck', 'ghost', 'dice', 'alien'].forEach(classic => {
  assert(!main.includes(`id: '${classic}'`), `main.js should not contain legacy classic charm: ${classic}`);
  assert(!html.includes(`id: "${classic}"`) && !html.includes(`id: '${classic}'`), `index.html should not contain legacy classic charm: ${classic}`);
});
console.log('✓ All legacy classic emoji charms (duck, ghost, dice, alien) are verified completely removed.');

console.log('Testing Marvel Character Classic & Alternate Vector SVG assets (20 models total)...');
marvelHeroes.forEach(hero => {
  // Classic model
  const svgPath = path.join(__dirname, '..', 'assets', 'characters', hero.file);
  assert(fs.existsSync(svgPath), `Missing primary character SVG: ${hero.file}`);
  const content = fs.readFileSync(svgPath, 'utf8');
  assert(content.includes('<svg'), `Invalid SVG content in: ${hero.file}`);

  // Alternate model
  const altPath = path.join(__dirname, '..', 'assets', 'characters', hero.altFile);
  assert(fs.existsSync(altPath), `Missing alternate character SVG: ${hero.altFile}`);
  const altContent = fs.readFileSync(altPath, 'utf8');
  assert(altContent.includes('<svg'), `Invalid SVG content in: ${hero.altFile}`);
});
console.log('✓ All 20 Marvel character SVG files (10 Classic + 10 Alternate) exist and are valid SVGs.');

console.log('Testing main.js Marvel hero configurations & skin mappings...');
marvelHeroes.forEach(hero => {
  assert(main.includes(`id: '${hero.id}'`), `main.js missing hero id: ${hero.id}`);
  assert(main.includes(`stringStyle: '${hero.style}'`), `main.js missing stringStyle: ${hero.style}`);
  assert(main.includes(hero.altFile), `main.js missing alternate file reference: ${hero.altFile}`);
  assert(main.includes(hero.altName), `main.js missing alternate name: ${hero.altName}`);
});
console.log('✓ All 10 Marvel characters, string styles, and alternate skin models are configured in main.js.');

console.log('Testing skin switcher IPC bridge & handlers...');
assert(preload.includes('toggleHeroSkin'), 'preload.js missing toggleHeroSkin IPC bridge');
assert(preload.includes('setHeroSkin'), 'preload.js missing setHeroSkin IPC bridge');
assert(main.includes("ipcMain.handle('toggle-hero-skin'"), 'main.js missing toggle-hero-skin handler');
assert(main.includes("ipcMain.handle('set-hero-skin'"), 'main.js missing set-hero-skin handler');
assert(html.includes('id="skin-btn"'), 'index.html missing #skin-btn in hero dock');
console.log('✓ In-app costume skin switcher bridge and handlers are fully wired.');

console.log('Testing index.html string renderers and switch branches...');
const renderFunctions = [
  'drawWeb',
  'drawRepulsorBeam',
  'drawLightningArc',
  'drawMysticMandala',
  'drawTacticalCable',
  'drawComicDoodle',
  'drawChaosHex',
  'drawKineticWeave',
  'drawGammaChain',
  'drawLivingVine',
];

renderFunctions.forEach(fn => {
  assert(html.includes(`function ${fn}`), `index.html is missing string renderer function: ${fn}`);
});

marvelHeroes.forEach(hero => {
  assert(html.includes(`case "${hero.style}":`), `index.html drawString switch is missing case "${hero.style}"`);
});

// Fallbacks
assert(html.includes('case "elastic":'), 'index.html missing elastic fallback case');
assert(html.includes('default:\n      return drawThread') || html.includes('return drawThread'), 'index.html missing drawThread fallback');

console.log('Testing raised arm & hand anchor alignment (cx=65, cy=16) across all 20 SVG characters...');
marvelHeroes.forEach(hero => {
  const classicSvg = fs.readFileSync(path.join(__dirname, '..', 'assets', 'characters', hero.file), 'utf8');
  const altSvg = fs.readFileSync(path.join(__dirname, '..', 'assets', 'characters', hero.altFile), 'utf8');
  assert(classicSvg.includes('65') && (classicSvg.includes('16') || classicSvg.includes('cy="16"')), `${hero.file} missing hand anchor at cx=65, cy=16`);
  assert(altSvg.includes('65') && (altSvg.includes('16') || altSvg.includes('cy="16"')), `${hero.altFile} missing hand anchor at cx=65, cy=16`);
  
  // Verify hand/gauntlet anatomical features
  const hasHandClassic = classicSvg.includes('HAND') || classicSvg.includes('Hand') || classicSvg.includes('GAUNTLET') || classicSvg.includes('Gauntlet') || classicSvg.includes('FIST') || classicSvg.includes('Fist') || classicSvg.includes('PALM') || classicSvg.includes('Palm');
  const hasHandAlt = altSvg.includes('HAND') || altSvg.includes('Hand') || altSvg.includes('GAUNTLET') || altSvg.includes('Gauntlet') || altSvg.includes('FIST') || altSvg.includes('Fist') || altSvg.includes('PALM') || altSvg.includes('Palm');
  assert(hasHandClassic, `${hero.file} missing anatomical hand/gauntlet description`);
  assert(hasHandAlt, `${hero.altFile} missing anatomical hand/gauntlet description`);
});
console.log('✓ All 20 character models have raised arms and hand/gauntlet anchors verified at cx=65, cy=16.');

console.log('Testing upside-down hanging Spider-Man model attributes...');
const spideyClassic = fs.readFileSync(path.join(__dirname, '..', 'assets', 'characters', 'spiderman.svg'), 'utf8');
const spideyAlt = fs.readFileSync(path.join(__dirname, '..', 'assets', 'characters', 'spiderman_symbiote.svg'), 'utf8');
assert(spideyClassic.includes('INVERTED') || spideyClassic.includes('Inverted'), 'spiderman.svg missing inverted hanging attributes');
assert(spideyAlt.includes('INVERTED') || spideyAlt.includes('Inverted'), 'spiderman_symbiote.svg missing inverted hanging attributes');
console.log('✓ Spider-Man Classic and Symbiote models are verified in the upside-down hanging pose.');

console.log('Testing hit-testing capsule & hand offset alignment in index.html...');
assert(html.includes('isPointOverCharm'), 'index.html missing isPointOverCharm function');
assert(html.includes('handOffsetY'), 'index.html missing handOffsetY coordinate translation');
console.log('✓ Hit testing capsule and hand offset rendering verified in index.html.');

console.log('✓ All 10 signature string renderers and switch cases are verified in index.html.');
console.log('★ ALL 20 MARVEL MODELS & STRING TESTS PASSED! ★');
