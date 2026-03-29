# tscircuit Tools Overview

tscircuit provides a suite of tools for designing, previewing, converting, and manufacturing PCBs using TypeScript/React. This page gives a high-level overview of every user-facing tool in the ecosystem.

| Tool | Type | Purpose |
|------|------|---------|
| [tscircuit CLI](#tscircuit-cli) | CLI | Scaffold, develop & export circuits |
| [PCB Viewer](#pcb-viewer) | Web Component / Library | Interactive PCB visualization |
| [Runframe](#runframe) | Web App / Embed | Run & preview circuits in the browser |
| [autorouting.com](#autoroutingcom) | Web Service | Cloud-based PCB autorouter |
| [Core (`@tscircuit/core`)](#core-tscircuitcore) | Library | React renderer for circuit primitives |
| [Circuit-to-SVG](#circuit-to-svg) | Library | Export circuits as SVG images |
| [Circuit-to-PNG](#circuit-to-png) | Library | Export circuits as PNG images |
| [KiCad Converter](#kicad-converter) | Library / CLI | Convert to/from KiCad format |
| [Gerber Exporter](#gerber-exporter) | Library / CLI | Export Gerber files for manufacturing |
| [Snippets (tscircuit.com)](#snippets-tscircuitcom) | Web App | Share & run circuit snippets online |

---

## tscircuit CLI

**Repository:** [tscircuit/cli](https://github.com/tscircuit/cli)  
**Install:** `npm install -g @tscircuit/cli`

The CLI is the primary entry point for local circuit development. It provides commands to scaffold new projects, start a live-reloading dev server, and export your designs to various output formats.

### Key Commands

```bash
# Create a new circuit project
tsci init my-circuit

# Start the development server with live preview
tsci dev

# Export to Gerber files (for PCB manufacturing)
tsci export --format gerber

# Export to SVG
tsci export --format svg

# Export to KiCad
tsci export --format kicad
```

### Features

- **Live preview** — changes to your circuit code instantly refresh the PCB/schematic view.
- **Multiple export formats** — Gerber, SVG, PNG, KiCad, and more.
- **TypeScript-first** — first-class TypeScript support out of the box.

---

## PCB Viewer

**Repository:** [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer)  
**Install:** `npm install @tscircuit/pcb-viewer`

`pcb-viewer` is an interactive React component that renders a PCB layout from tscircuit's circuit JSON format. You can embed it in any React app to display a live, zoomable, pannable PCB.

### Usage

```tsx
import { PCBViewer } from "@tscircuit/pcb-viewer"

export default function App() {
  const circuitJson = /* your circuit JSON */ []

  return (
    <div style={{ width: 800, height: 600 }}>
      <PCBViewer circuitJson={circuitJson} />
    </div>
  )
}
```

### Features

- **Zoom & pan** — mouse wheel zoom, click-and-drag panning.
- **Layer visibility** — toggle copper layers, silkscreen, drill holes, etc.
- **Component hover** — hovering a component highlights it and shows its reference designator.
- **Trace inspection** — click traces to inspect net names and widths.
- **Dark / light mode** — adapts to your app's color scheme.

---

## Runframe

**Repository:** [tscircuit/runframe](https://github.com/tscircuit/runframe)  
**Live:** embedded in [tscircuit.com](https://tscircuit.com) snippets

Runframe is a sandboxed in-browser execution environment for tscircuit code. It compiles and runs TypeScript circuit code entirely client-side using a Web Worker, then renders the resulting PCB and schematic.

### Usage (embedded)

```tsx
import { RunFrame } from "@tscircuit/runframe"

export default function App() {
  return (
    <RunFrame
      code={`
import { resistor } from "@tscircuit/core"

export default () => (
  <board width="10mm" height="10mm">
    <resistor name="R1" resistance="10k" footprint="0402" />
  </board>
)
      `}
      entrypoint="index.tsx"
    />
  )
}
```

### Features

- **Zero-server execution** — all compilation happens in the browser via Web Workers.
- **Live error display** — TypeScript and runtime errors surface immediately.
- **Tabbed output** — switch between PCB view, schematic view, and 3D view.
- **Import resolution** — resolves `@tscircuit/*` packages from a CDN automatically.

---

## autorouting.com

**Website:** [autorouting.com](https://autorouting.com)  
**Repository:** [tscircuit/autorouting](https://github.com/tscircuit/autorouting)

autorouting.com is a cloud-based PCB autorouter. Upload your unrouted board (in circuit JSON or compatible format) and get back a fully routed PCB. It is also available as a library for programmatic use.

### Using via the Web UI

1. Export your unrouted board from tscircuit (or another EDA tool).
2. Upload the file at [autorouting.com](https://autorouting.com).
3. Download the routed result.

### Using via the API / Library

```ts
import { autoroute } from "@tscircuit/autorouting-client"

const routedCircuit = await autoroute({
  circuitJson: myUnroutedCircuitJson,
})
```

### Features

- **Multi-layer routing** — supports 2-layer and 4-layer boards.
- **Design rule checking** — respects clearance and track width rules.
- **Via insertion** — automatically inserts vias when layer changes are needed.
- **Local & cloud modes** — run the autorouter locally or offload to the cloud service.

---

## Core (`@tscircuit/core`)

**Repository:** [tscircuit/core](https://github.com/tscircuit/core)  
**Install:** `npm install @tscircuit/core`

`@tscircuit/core` is the React-based renderer that turns JSX circuit descriptions into tscircuit's internal circuit JSON representation. It is the foundation that all other tools build on.

### Usage

```tsx
import { Circuit } from "@tscircuit/core"

const circuit = new Circuit()

circuit.add(
  <board width="20mm" height="20mm">
    <resistor name="R1" resistance="10k" footprint="0402" pcbX={0} pcbY={0} />
    <capacitor name="C1" capacitance="100nF" footprint="0402" pcbX={5} pcbY={0} />
  </board>
)

const circuitJson = circuit.getCircuitJson()
```

### Features

- **JSX primitives** — `<board>`, `<resistor>`, `<capacitor>`, `<chip>`, `<trace>`, `<net>`, and many more.
- **Footprint library** — built-in footprints for common packages (0402, 0603, SOT-23, QFP, …).
- **Layout engine** — automatic component placement with manual override support.
- **Schematic generation** — generates both PCB and schematic representations simultaneously.

---

## Circuit-to-SVG

**Repository:** [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg)  
**Install:** `npm install circuit-to-svg`

Converts tscircuit's circuit JSON into SVG strings, suitable for embedding in web pages, READMEs, or PDF reports.

### Usage

```ts
import { circuitJsonToPcbSvg, circuitJsonToSchematicSvg } from "circuit-to-svg"

// PCB top-view SVG
const pcbSvg = circuitJsonToPcbSvg(circuitJson)

// Schematic SVG
const schematicSvg = circuitJsonToSchematicSvg(circuitJson)

// Write to file
import { writeFileSync } from "fs"
writeFileSync("my-board.svg", pcbSvg)
```

### Features

- **PCB & schematic** — separate render functions for both views.
- **Layer colours** — standard PCB colour conventions (red top copper, blue bottom copper, etc.).
- **Headless** — no browser required; runs in Node.js.

---

## Circuit-to-PNG

**Repository:** [tscircuit/circuit-to-png](https://github.com/tscircuit/circuit-to-png) *(or via CLI `tsci export --format png`)*

Builds on `circuit-to-svg` to produce rasterized PNG images, useful for documentation thumbnails, GitHub README badges, and automated image generation pipelines.

### Usage

```ts
import { circuitJsonToPcbPng } from "circuit-to-png"

const pngBuffer = await circuitJsonToPcbPng(circuitJson)

import { writeFileSync } from "fs"
writeFileSync("my-board.png", pngBuffer)
```

---

## KiCad Converter

**Repository:** [tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter)  
**Install:** `npm install @tscircuit/kicad-converter`

Converts between tscircuit's circuit JSON format and KiCad's `.kicad_pcb` / `.kicad_sch` file formats, enabling round-trips with KiCad for users who want to do final cleanup in a traditional EDA tool.

### Usage

```ts
import { circuitJsonToKicadPcb, kicadPcbToCircuitJson } from "@tscircuit/kicad-converter"

// Export to KiCad
const kicadPcb = circuitJsonToKicadPcb(circuitJson)
writeFileSync("my-board.kicad_pcb", kicadPcb)

// Import from KiCad
const circuitJson = kicadPcbToCircuitJson(kicadPcbString)
```

### Features

- **Bidirectional** — import existing KiCad boards into tscircuit or export for final KiCad editing.
- **Footprint mapping** — maps KiCad footprint library references to tscircuit footprints.

---

## Gerber Exporter

**Repository:** [tscircuit/circuit-json-to-gerber](https://github.com/tscircuit/circuit-json-to-gerber)  
**Install:** `npm install circuit-json-to-gerber`

Converts circuit JSON into industry-standard Gerber files (RS-274X) ready for submission to PCB fabrication houses (JLCPCB, PCBWay, OSHPark, etc.).

### Usage

```ts
import { circuitJsonToGerberFiles } from "circuit-json-to-gerber"

const gerberFiles = circuitJsonToGerberFiles(circuitJson)
// gerberFiles is a Record<string, string> mapping filename → content

import { writeFileSync } from "fs"
for (const [filename, content] of Object.entries(gerberFiles)) {
  writeFileSync(`output/${filename}`, content)
}
```

### Output Files

| File | Layer |
|------|-------|
| `copper_top.gtl` | Top copper |
| `copper_bottom.gbl` | Bottom copper |
| `silkscreen_top.gto` | Top silkscreen |
| `soldermask_top.gts` | Top soldermask |
| `soldermask_bottom.gbs` | Bottom soldermask |
| `drill.drl` | Drill holes (Excellon) |
| `board_outline.gko` | Board outline |

---

## Snippets (tscircuit.com)

**Website:** [tscircuit.com](https://tscircuit.com)

Snippets is the hosted platform for sharing, discovering, and remixing tscircuit circuit designs. Think of it as a "CodePen for PCBs."

### Features

- **In-browser editor** — write and run tscircuit code without installing anything.
- **Instant preview** — PCB, schematic, and 3D views update as you type.
- **Public sharing** — share a link to your snippet with anyone.
- **Fork & remix** — clone any public snippet as a starting point.
- **One-click export** — download Gerber, SVG, or KiCad files directly from the browser.
- **Registry** — publish reusable components that others can import with `import { MyChip } from "github:username/my-chip"`.

---

## Choosing the Right Tool

| I want to… | Use this tool |
|------------|---------------|
| Start a new PCB project locally | **tscircuit CLI** (`tsci init`) |
| Preview a board interactively in my React app | **PCB Viewer** |
| Run circuit code in the browser without a server | **Runframe** |
| Route the traces on my board automatically | **autorouting.com** |
| Render circuits programmatically in Node.js | **@tscircuit/core** |
| Generate SVG images of my board | **circuit-to-svg** |
| Generate PNG thumbnails | **circuit-to-png** |
| Open my board in KiCad | **KiCad Converter** |
| Send my board to a fab house | **Gerber Exporter** |
| Share a circuit design with a link | **tscircuit.com Snippets** |
