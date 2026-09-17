# Contributing to Marvel Desk Charm

Thank you for your interest in contributing to **Marvel Desk Charm**! 

Whether you want to add new Marvel superhero characters, design alternate costumes, optimize Verlet rope physics, or report issues, all contributions are welcome.

---

## 📋 Code of Conduct

Please review and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md) in all community interactions and contributions.

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Git**

### Step-by-Step Setup
1. **Fork and Clone** the repository:
   ```bash
   git clone https://github.com/<your-username>/marvel-desk-charm.git
   cd marvel-desk-charm
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Launch the development app**:
   ```bash
   npm start
   ```
4. **Run automated tests**:
   ```bash
   npm test
   ```

---

## 🦸 Adding or Modifying Marvel Character Models

All hero models are stored in `assets/characters/` as standalone SVG files.

### 1. Coordinate & Anatomy Requirements
- **ViewBox**: All character SVGs must use `viewBox="0 0 130 160"`.
- **Raised Arm & Hand Grip Anchor**:
  - The hero must feature an anatomical raised arm (sleeve, armor, muscle, or branch) leading from shoulder (`x=88, y=56`) up to the hand/gauntlet at `cx="65" cy="16"`.
  - The signature tether connects directly to `cx="65" cy="16"`.
  - Curled fingers and gauntlet plating must wrap in front of `cy=16` so the tether appears naturally gripped in the hand.
- **Inverted Poses**:
  - Spider-Man hangs upside-down with hand clutching web at top (`cx=65 cy=16`) and inverted mask at bottom (`y=96-157`).

### 2. Registering in `main.js` and `index.html`
- Add the character definition to `BUILT_IN_CHARMS` in `main.js`.
- Provide both `file` (Classic model) and `altFile` (Alternate model), along with `stringStyle`.
- Implement or assign one of the signature string styles (`web`, `repulsor_beam`, `lightning_arc`, `mystic_mandala`, `tactical_cable`, `comic_doodle`, `chaos_hex`, `kinetic_weave`, `gamma_chain`, `living_vine`).

### 3. Updating Test Suite
- Add the new hero configuration to `tests/string-styles.test.js`.
- Ensure `npm test` passes 100%.

---

## 🧪 Testing Guidelines

Always run the test suite before submitting a pull request:

```bash
npm test
```

Tests verify:
- Complete removal of non-Marvel legacy charms.
- Validity and syntax of all 20 character SVG files.
- Hand anchor alignment at `cx="65" cy="16"`.
- Upside-down hanging pose attributes for Spider-Man models.
- IPC communication bridges and hero dock skin toggling.
- All 10 signature string physics renderers and switch branches.

---

## 📦 Packaging & Building

To verify that your changes compile into clean Windows standalone binaries:

```bash
npm run dist
```

Outputs will be generated in `dist/`:
- `Marvel Desk Charm <version>.exe` (Portable)
- `Marvel Desk Charm Setup <version>.exe` (NSIS Installer)

---

## 🚀 Submitting a Pull Request

1. Create a feature branch:
   ```bash
   git checkout -b feature/my-new-character
   ```
2. Commit your changes following conventional commits:
   ```bash
   git commit -m "feat: add Wolverine with adamantium claws and slash tether"
   ```
3. Push to your fork:
   ```bash
   git push origin feature/my-new-character
   ```
4. Open a Pull Request on GitHub against the `main` branch.
