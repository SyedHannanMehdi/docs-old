# tscircuit Tools Overview

tscircuit provides a suite of user-facing tools that work together to help you design, preview, simulate, and export circuit boards. This page gives an overview of each tool and when to use it.

## Tools at a Glance

| Tool | Description | Use Case |
|------|-------------|----------|
| [tscircuit CLI](#tscircuit-cli) | Command-line interface for developing circuits | Local development, building, exporting |
| [PCB Viewer](#pcb-viewer) | Interactive PCB preview component | Visualising PCB layouts in the browser |
| [Runframe](#runframe) | In-browser circuit runner & playground | Quick prototyping and sharing snippets |
| [autorouting.com](#autoroutingcom) | Cloud-based PCB autorouter | Automatically routing traces on a PCB |
| [Circuit Converters](#circuit-converters) | Format conversion utilities | Converting between KiCad, Gerber, SVG, etc. |
| [tscircuit Core](#tscircuit-core) | React-based circuit design library | Writing circuit components in TypeScript/React |

---

## tscircuit CLI

The **tscircuit CLI** (`tsci`) is your primary tool for local circuit development. It lets you initialise new projects, run a dev server with hot-reload, build production artifacts, and export your circuit to various formats.

👉 [Full CLI documentation](./cli.md)

### Quick start

```bash
npm install -g @tscircuit/cli
tsci init my-circuit
cd my-circuit
tsci dev
```

---

## PCB Viewer

The **PCB Viewer** (`@tscircuit/pcb-viewer`) is an interactive React component that renders a PCB layout in the browser. It supports zooming, panning, layer toggling, and inspecting component footprints.

👉 [Full PCB Viewer documentation](./pcb-viewer.md)

### Quick start

```tsx
import { PCBViewer } from "@tscircuit/pcb-viewer"

export default function App() {
  return <PCBViewer soup={circuitJson} />
}
```

---

## Runframe

**Runframe** is a browser-based playground that lets you write, run, and share tscircuit snippets without any local setup. It executes your circuit code entirely in the browser using WebAssembly and displays both schematic and PCB views side-by-side.

👉 [Full Runframe documentation](./runframe.md)

---

## autorouting.com

**autorouting.com** is a hosted cloud service that automatically routes PCB traces. You upload your circuit JSON (or use it via the CLI), and it returns a fully routed board. It uses advanced algorithms to minimise trace length and avoid design-rule violations.

👉 [Full autorouting.com documentation](./autorouting.md)

---

## Circuit Converters

tscircuit ships several **converter utilities** that translate between circuit formats:

- **KiCad → tscircuit** – import KiCad schematics and footprints
- **tscircuit → Gerber** – export production-ready Gerber files
- **tscircuit → SVG** – render circuits as SVG images
- **tscircuit → KiCad** – export for further editing in KiCad

👉 [Full Converters documentation](./converters.md)

---

## tscircuit Core

**tscircuit Core** (`@tscircuit/core`) is the underlying React-based library that all other tools build on. It defines the component model (resistors, capacitors, ICs, traces, …) and the circuit JSON data format that flows between tools.

👉 [Full Core documentation](./core.md)
