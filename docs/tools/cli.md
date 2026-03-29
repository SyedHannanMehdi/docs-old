# tscircuit CLI (`tsci`)

The **tscircuit CLI** is the primary developer tool for working with tscircuit projects locally. It provides commands for creating projects, running a live-reloading development server, building production artifacts, and exporting circuits to various formats.

- **Package:** `@tscircuit/cli`
- **npm:** https://www.npmjs.com/package/@tscircuit/cli
- **GitHub:** https://github.com/tscircuit/cli

---

## Installation

```bash
# Global install (recommended)
npm install -g @tscircuit/cli

# Or use it directly with npx
npx @tscircuit/cli <command>
```

Verify the installation:

```bash
tsci --version
```

---

## Commands

### `tsci init`

Scaffold a new tscircuit project.

```bash
tsci init [project-name]
```

This creates a new directory with a starter project including:
- A sample circuit component
- `package.json` with tscircuit dependencies
- TypeScript configuration
- Basic project structure

**Options:**

| Flag | Description |
|------|-------------|
| `--template <name>` | Use a specific starter template (e.g. `blank`, `resistor-divider`) |

---

### `tsci dev`

Start a local development server with hot-reloading. The server watches your source files and automatically re-renders the PCB and schematic views whenever you save.

```bash
tsci dev [entry-file]
```

Defaults to `index.tsx` in the current directory. Opens a browser window at `http://localhost:3000` showing your circuit in an interactive viewer.

**Options:**

| Flag | Description |
|------|-------------|
| `--port <number>` | Port to listen on (default: `3000`) |
| `--no-open` | Do not automatically open the browser |

---

### `tsci build`

Compile your circuit and produce circuit JSON output.

```bash
tsci build [entry-file]
```

**Options:**

| Flag | Description |
|------|-------------|
| `--outdir <dir>` | Output directory (default: `./dist`) |

---

### `tsci export`

Export your circuit to a specific format.

```bash
tsci export [entry-file] --format <format>
```

**Supported formats:**

| Format | Flag value | Description |
|--------|-----------|-------------|
| Gerber | `gerber` | Production files for PCB manufacturers |
| SVG | `svg` | Vector graphic of the schematic or PCB |
| KiCad | `kicad` | `.kicad_pcb` file for KiCad |
| Circuit JSON | `circuit-json` | Raw tscircuit circuit JSON |

**Example:**

```bash
tsci export index.tsx --format gerber --outdir ./gerbers
```

---

### `tsci add`

Add a component from the tscircuit registry to your project.

```bash
tsci add <component-name>
```

**Example:**

```bash
tsci add @tsci/arduino-uno
```

---

### `tsci login` / `tsci logout`

Authenticate with the tscircuit cloud services (required for features such as cloud autorouting and the snippet registry).

```bash
tsci login
tsci logout
```

---

## Project Structure

After running `tsci init`, a typical project looks like this:

```
my-circuit/
├── index.tsx          # Main circuit entry point
├── package.json
├── tsconfig.json
└── node_modules/
```

Your main entry file exports a default React component that represents your circuit:

```tsx
import { Board, Resistor, Capacitor, Trace } from "@tscircuit/core"

export default function MyCircuit() {
  return (
    <Board width="100mm" height="80mm">
      <Resistor
        name="R1"
        resistance="10kohm"
        footprint="0402"
        pcbX={0}
        pcbY={0}
      />
      <Capacitor
        name="C1"
        capacitance="100nF"
        footprint="0402"
        pcbX={5}
        pcbY={0}
      />
      <Trace from=".R1 .pin2" to=".C1 .pin1" />
    </Board>
  )
}
```

---

## Configuration

You can place a `tscircuit.config.ts` (or `.js`) file at the root of your project to customise CLI behaviour:

```ts
// tscircuit.config.ts
import { defineConfig } from "@tscircuit/cli"

export default defineConfig({
  entry: "src/index.tsx",
  outdir: "dist",
  autorouter: "freerouting", // or "auto" to use autorouting.com
})
```

---

## Troubleshooting

**Port already in use**

```bash
tsci dev --port 3001
```

**TypeScript errors on start**

Make sure `@tscircuit/core` is installed and your `tsconfig.json` includes `"jsx": "react-jsx"`.

**Autorouter not running**

For local autorouting, ensure Docker is installed. Alternatively, log in with `tsci login` to use the cloud autorouter at autorouting.com.
