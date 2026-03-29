# tscircuit CLI

**Repository:** [tscircuit/cli](https://github.com/tscircuit/cli)  
**npm:** [`@tscircuit/cli`](https://www.npmjs.com/package/@tscircuit/cli)

The tscircuit CLI (`tsci`) is the primary tool for local circuit development. It handles project scaffolding, provides a live-reloading development server, and can export your designs to production-ready formats.

## Installation

```bash
npm install -g @tscircuit/cli
# or
yarn global add @tscircuit/cli
# or
bun add -g @tscircuit/cli
```

Verify the installation:

```bash
tsci --version
```

## Quick Start

```bash
# 1. Create a new project
tsci init my-first-pcb
cd my-first-pcb

# 2. Start the dev server
tsci dev
```

Opening `http://localhost:3020` shows a live PCB + schematic preview that refreshes every time you save a file.

## Commands

### `tsci init [project-name]`

Scaffolds a new tscircuit project in the given directory (or the current directory if no name is provided).

```bash
tsci init my-circuit
```

**Generated file structure:**

```
my-circuit/
├── index.tsx          # Main circuit entry point
├── package.json
└── tsconfig.json
```

**`index.tsx` template:**

```tsx
import { Circuit } from "@tscircuit/core"

export default () => (
  <board width="20mm" height="20mm">
    {/* Add components here */}
  </board>
)
```

---

### `tsci dev`

Starts a live-reloading development server.

```bash
tsci dev
# Server running at http://localhost:3020
```

**Options:**

| Flag | Default | Description |
|------|---------|-------------|
| `--port` | `3020` | Port to listen on |
| `--file` | `index.tsx` | Entry file to render |

```bash
tsci dev --port 4000 --file src/my-board.tsx
```

The dev server watches your source files, re-runs the circuit, and pushes updates to the browser via WebSocket — no page reload required.

---

### `tsci export`

Exports your circuit to a specified format.

```bash
tsci export --format <format> [options]
```

**Supported formats:**

| Format | Flag | Output |
|--------|------|--------|
| Gerber | `--format gerber` | ZIP of Gerber/Excellon files |
| SVG | `--format svg` | PCB and/or schematic SVG |
| PNG | `--format png` | PCB raster image |
| KiCad PCB | `--format kicad` | `.kicad_pcb` file |

**Examples:**

```bash
# Export Gerber files for manufacturing
tsci export --format gerber --output ./gerbers

# Export a PCB preview SVG
tsci export --format svg --output my-board.svg

# Export schematic SVG
tsci export --format svg --view schematic --output my-schematic.svg

# Export PNG thumbnail
tsci export --format png --output preview.png
```

---

### `tsci add <package>`

Installs a tscircuit component package from the registry.

```bash
tsci add @tsci/seveibar.smd-led
```

This adds the package to your `package.json` and makes it available as a JSX import.

---

### `tsci build`

Builds the project without starting a server. Useful for CI pipelines.

```bash
tsci build
```

---

## Configuration

Projects can be configured via a `tscircuit.config.ts` (or `.json`) file in the project root:

```ts
// tscircuit.config.ts
export default {
  entrypoint: "src/index.tsx",
  outDir: "dist",
  defaultExportFormat: "gerber",
}
```

## Typical Development Workflow

```
┌─────────────────────────────────────────────┐
│  1.  tsci init my-board                     │
│  2.  tsci dev              ← live preview   │
│  3.  Edit index.tsx        ← your design    │
│  4.  tsci export --format gerber            │
│  5.  Upload to JLCPCB / PCBWay             │
└─────────────────────────────────────────────┘
```

## See Also

- [PCB Viewer](./pcb-viewer.md) — the component the dev server uses for rendering
- [Gerber Exporter](./gerber-exporter.md) — details on Gerber output
- [Tools Overview](./overview.md)
