<div align="center">

# ⚡ Marvel Desk Charm

**An interactive, dangling desktop companion featuring 10 iconic Marvel superheroes with realistic 3D vector artwork, dual alternate costumes, and unique signature tether physics.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue.svg)](#)
[![Electron](https://img.shields.io/badge/Electron-31.0.0-47848F?logo=electron&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js&logoColor=white)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

*Hangs discreetly from the top of your screen, swings with realistic multi-segment Verlet rope physics, speaks classic comic quotes on click, and reacts to your mouse cursor with zero lag.*

---

</div>

## 🌟 Highlights

- **🎭 20 High-Definition Realistic Vector Models**: Every hero includes their **Classic** costume and a detailed **Alternate** model (e.g. Symbiote Spider-Man, Stealth Iron Man, Strange Supreme, Red Hulk).
- **🕸️ Strings Direct From Hand**: All signature tethers connect directly to the character's **hand, gauntlet, or palm** (no detached head loops or floating rings).
- **🕷️ Upside-Down Hanging Spider-Man**: Spider-Man (both Classic and Symbiote) hangs in his legendary **upside-down acrobatic pose**, clutching the web-line from the top with inverted physique and speech bubbles rendered below his inverted mask.
- **⚡ 10 Unique Signature Strings**: Not just a generic rope—Spider-Man swings on realistic braided web silk, Thor hangs from crackling procedural lightning, Doctor Strange tethers via spinning golden Tao mandalas, and Hulk dangles from a heavy radioactive gamma chain.
- **💬 Interactive Clickables & Speech Bubbles**: Left-click on any hanging character to trigger comic speech bubbles with memorable movie/comic quotes, thematic particle bursts, and procedural audio sound synthesis.
- **🪢 14-Node Verlet Rope Physics**: Grab and drag characters anywhere across your desktop with elastic spring tension, release with inertia for realistic pendulum swings, or flick them with momentum.
- **🎯 Dual-Capsule Click-Through Engine**: Custom background cursor hit-testing covers both the gripping hand anchor and the hanging body, keeping the transparent window click-through to desktop apps while responding immediately to cursor hover, clicks, and drags.
- **🎨 On-Screen Hero Dock & Tray Menu**: Right-click the character or click the system tray icon to switch heroes, toggle costume skins, change screen anchor positions, or toggle audio.
- **🖼️ Custom Charm Support**: Import any PNG, JPG, GIF, or SVG and pair it with your choice of any Marvel signature string style!

---

## 🦸 Marvel Heroes & Alternate Costumes Roster

| # | Superhero | Classic Model | Alternate Costume / Skin | Signature String Style | Hand Tether & Pose Details |
| :-: | :--- | :--- | :--- | :--- | :--- |
| **1** | **Spider-Man** | Red & Blue High-Tech Suit | **Symbiote Black Suit** | `web` | **Hangs Upside Down!** Braided silk webline shoots from raised gloved hand/wrist web-shooter |
| **2** | **Iron Man** | Mark LXXXV Red & Gold Armor | **Stealth Spec-Ops Armor** | `repulsor_beam` | High-energy repulsor plasma beam emanates directly from raised armored gauntlet palm |
| **3** | **Thor** | Asgardian Armor & Mjolnir | **Awakened God of Thunder** | `lightning_arc` | Crackling lightning bolt channels into raised gauntlet clutching Mjolnir / electrified fist |
| **4** | **Doctor Strange** | Master of the Mystic Arts | **Strange Supreme** | `mystic_mandala` | Arcane energy streamer channels into mystical Tao mudra hands casting magic mandalas |
| **5** | **Captain America** | Star-Spangled Avenger | **Stealth Strike Winter Suit** | `tactical_cable` | High-tensile braided steel cable gripped in tactical leather glove via carabiner clamp |
| **6** | **Deadpool** | Classic Crimson Merc | **X-Force Tactical Suit** | `comic_doodle` | Red & black gloved hand clutches playful comic doodle rope with floating hearts |
| **7** | **Scarlet Witch** | Westview Chaos Tiara | **Darkhold Corrupted** | `chaos_hex` | Twin undulating hex mist ribbons gather into slender fingertips glowing with ruby chaos magic |
| **8** | **Black Panther** | Vibranium Habit Violet | **Killmonger Golden Jaguar** | `kinetic_weave` | Vibranium nanotech kinetic energy weaves directly into clenched claw gauntlet |
| **9** | **Hulk** | Emerald Gamma Goliath | **Volcanic Red Hulk** | `gamma_chain` | Massive bulging fist clutches radioactive green gamma chain links |
| **10** | **Groot** | Flora Colossus Ivy | **Alpha Battle Crest** | `living_vine` | Living wood vine stem sprouts directly from raised branch-hand with blossoming leaves |

---

## 🎮 Interactive Controls

| Input | Action |
| :--- | :--- |
| **Left Click** on Character | Displays interactive speech bubble with iconic hero quotes, sound effect & particle burst |
| **Left Click & Drag** | Drags character around screen against multi-segment Verlet rope tension |
| **Drag & Release** | Flings character with momentum and natural pendulum swing inertia |
| **Right Click** on Character | Opens the in-place **Hero Switcher & Settings Dock** |
| **🎭 Alt Skin Button** | Instantly toggles between Classic and Alternate costume models |
| **🔊 SFX Button** | Toggles Web Audio procedural sound synthesis on/off |
| **📍 Pos Button** | Cycles anchor location between **Top-Right**, **Top-Center**, and **Top-Left** |
| **System Tray Icon** | Right-click taskbar tray to switch heroes, toggle skins, change screen position, add custom images, or quit |

---

## 🚀 Quick Start & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/marvel-desk-charm.git
cd marvel-desk-charm
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch the Application
```bash
npm start
```

---

## 🧪 Automated Testing

Verify all 20 character SVG models, string renderer functions, and IPC bindings:

```bash
npm test
```

Expected output:
```text
Testing Marvel Character Classic & Alternate Vector SVG assets (20 models total)...
✓ All 20 Marvel character SVG files (10 Classic + 10 Alternate) exist and are valid SVGs.
Testing main.js Marvel hero configurations & skin mappings...
✓ All 10 Marvel characters, string styles, and alternate skin models are configured in main.js.
Testing skin switcher IPC bridge & handlers...
✓ In-app costume skin switcher bridge and handlers are fully wired.
Testing index.html string renderers and switch branches...
✓ All 10 signature string renderers and switch cases are verified in index.html.
★ ALL 20 MARVEL MODELS & STRING TESTS PASSED! ★
```

---

## 📦 Building Standalone Windows Executable (.exe)

Compile a production standalone portable executable and an installer using Electron Builder:

```bash
npm run dist
```

After compilation finishes, your binaries will be in the `dist/` directory:
- **`dist/Marvel Desk Charm <version>.exe`**: Full Windows installer.
- **`dist/Marvel Desk Charm <version>-portable.exe`**: Zero-install standalone portable executable (runs directly from anywhere without installation).

---

## 📤 Step-by-Step Guide to Upload to GitHub

Follow these steps in your terminal (PowerShell or Bash) to push this project to your GitHub account:

### 1. Create a New Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new).
2. Set the repository name (e.g. `marvel-desk-charm`).
3. Set visibility to **Public** (or **Private**).
4. Do **NOT** check "Add a README" or ".gitignore" (we have already created them).
5. Click **Create repository**.

### 2. Initialize Git & Push from PowerShell
Open PowerShell in this project directory (`c:\Users\SquidSystem\Videos\desk-charm-app`) and run:

```powershell
# 1. Initialize local git repository
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "feat: Marvel Desk Charm with 20 realistic character models, signature string physics, and clickables"

# 4. Rename default branch to main
git branch -M main

# 5. Link to your GitHub remote repository (replace with your GitHub URL)
git remote add origin https://github.com/<your-username>/marvel-desk-charm.git

# 6. Push code to GitHub
git push -u origin main
```

---

## 🏗️ Architecture & Project Structure

```text
desk-charm-app/
├── assets/
│   ├── characters/                 # 20 High-Definition Vector Character Models
│   │   ├── spiderman.svg           # Classic Red/Blue Suit
│   │   ├── spiderman_symbiote.svg  # Symbiote Alien Black Suit
│   │   ├── ironman.svg             # Mark LXXXV Armor
│   │   ├── ironman_stealth.svg     # Gunmetal Stealth Armor
│   │   ├── thor.svg                # Asgardian Armor
│   │   ├── thor_awakened.svg       # Awakened God of Thunder
│   │   ├── doctor_strange.svg      # Master of Mystic Arts
│   │   ├── doctor_strange_supreme.svg # Strange Supreme
│   │   ├── captain_america.svg     # Classic Star-Spangled
│   │   ├── captain_america_stealth.svg # Stealth Strike Suit
│   │   ├── deadpool.svg            # Crimson Merc Suit
│   │   ├── deadpool_xforce.svg     # X-Force Spec-Ops Suit
│   │   ├── scarlet_witch.svg       # Chaos Magic Robes
│   │   ├── scarlet_witch_darkhold.svg # Darkhold Corrupted
│   │   ├── black_panther.svg       # Vibranium Habit
│   │   ├── black_panther_gold.svg  # Golden Jaguar Habit
│   │   ├── hulk.svg                # Emerald Hulk
│   │   ├── hulk_red.svg            # Volcanic Red Hulk
│   │   ├── groot.svg               # Baby Flora Colossus
│   │   └── groot_battle.svg        # Alpha Battle Crest
│   └── tray-icon.png               # Taskbar tray icon
├── tests/
│   └── string-styles.test.js       # Complete 20-model test validation suite
├── index.html                      # Canvas Verlet rope simulation, sound engine, and UI
├── main.js                         # Electron main process, tray menu, Win32 mouse tracker
├── preload.js                      # Context-isolated secure IPC bridge
├── package.json                    # Scripts and electron-builder packaging config
├── .gitignore                      # Git exclusion rules
├── LICENSE                         # MIT License
└── README.md                       # Comprehensive documentation
```

---

## ⚙️ Physics & Feel Customization

You can fine-tune the rope dynamics inside `index.html`:

```javascript
const NUM_POINTS = 14;          // Multi-segment Verlet rope resolution
const BASE_STRING_LENGTH = 150; // Tether drop length from screen edge
const GRAVITY = 0.48;           // Gravitational pull down
const AIR_DAMPING = 0.985;       // Velocity retention (pendulum oscillation)
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
Character trademarks and designs belong to Marvel Characters, Inc. and are used for desktop fan art simulation.
