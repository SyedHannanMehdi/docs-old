# tscircuit CLI

The **tscircuit CLI** (`tsci`) is the primary command-line tool for creating, developing, and building tscircuit projects.

## Installation

```bash
npm install -g @tscircuit/cli
```

Verify the installation:

```bash
tsci --version
```

## Key Commands

### `tsci init`

Scaffold a new tscircuit project in the current directory (or a named subdirectory).

```bash
tsci init my-circuit
cd my-circuit
```

This creates a project with a sample circuit file, `package.json`, and TypeScript config.

### `tsci dev`

Start a local development server with **hot reload**. Your circuit updates in the browser every time you save a file.

```bash
tsci dev
```

Opens a browser window at `http://localhost:3000` showing the PCB and schematic views of your circuit.

### `tsci build`

Compile your circuit and emit output files (Gerber, BOM, pick-and-place CSV, etc.) into the `dist/` folder.

```bash
tsci build
```

### `tsci export`

Export a specific output format from a circuit file.

```bash
# Export Gerbers
tsci export --format gerber ./src/index.tsx

# Export KiCad PCB
tsci export --format kicad ./src/index.tsx

# Export BOM as CSV
tsci export --format bom-csv ./src/index.tsx
```

### `tsci add`

Add a component from the tscircuit registry to your project.

```bash
tsci add @tsci/resistor
tsci add @tsci/esp32-s3
```

### `tsci publish`

Publish a reusable circuit component or snippet to the tscircuit registry.

```bash
tsci publish
```

## Configuration

Projects can be configured via `tscircuit.config.ts` (or `.js` / `.json`) at the root of your project:

```ts
// tscircuit.config.ts
export default {
  // Entry point for your top-level circuit
  entry: "src/index.tsx",
  // Output directory for build artifacts
  outDir: "dist",
}
```

## Tips

- Use `tsci dev` during active design — the live preview catches wiring errors early.
- Run `tsci build` in CI to verify your board compiles and exports cleanly.
- Combine `tsci export --format gerber` with a Gerber viewer to do a final sanity check before sending to a fab house.

## GitHub / Repository

[github.com/tscircuit/cli](https://github.com/tscircuit/cli)
