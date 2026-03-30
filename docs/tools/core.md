# tscircuit Core

**tscircuit/core** is the rendering and compilation engine that powers all other tscircuit tools. It takes your React-based circuit code and compiles it into a portable **circuit JSON** format (also called "soup") that downstream tools — the PCB viewer, autorouter, exporters — consume.

## Installation

```bash
npm install @tscircuit/core
```

## What It Does

tscircuit/core:

1. **Renders** your JSX circuit tree (boards, components, traces) using a React-like reconciler.
2. **Resolves** component footprints, port positions, and net assignments.
3. **Runs layout** — places components on the PCB according to `pcbX`/`pcbY` props or an automatic layout engine.
4. **Outputs circuit JSON** — a flat array of typed elements (components, pads, traces, nets, etc.) that other tools understand.

## Basic Usage

```tsx
import { renderToCircuitJson } from "@tscircuit/core"

const circuitJson = await renderToCircuitJson(
  <board width="20mm" height="20mm">
    <resistor
      resistance="10k"
      footprint="0402"
      name="R1"
      pcbX={0}
      pcbY={0}
    />
    <capacitor
      capacitance="100nF"
      footprint="0402"
      name="C1"
      pcbX={5}
      pcbY={0}
    />
    <trace from=".R1 > .pin2" to=".C1 > .pin1" />
  </board>
)

console.log(circuitJson)
// [ { type: "pcb_component", ... }, { type: "pcb_pad", ... }, ... ]
```

## Circuit JSON (Soup) Format

The output is an array of **typed element objects**. Common element types:

| Type | Description |
|------|-------------|
| `source_component` | Logical component (resistor, cap, IC, …) |
| `source_port` | Named pin on a component |
| `source_trace` | Logical connection between two ports |
| `pcb_component` | Component placed on the PCB |
| `pcb_pad` | Copper pad on a footprint |
| `pcb_trace` | Routed copper trace |
| `pcb_via` | Via connecting layers |
| `schematic_component` | Component in the schematic |
| `schematic_trace` | Wire in the schematic |

The full schema is defined in the [`@tscircuit/soup`](https://github.com/tscircuit/soup) package.

## Using the Circuit Class API

For more control, use the `Circuit` class directly:

```ts
import { Circuit } from "@tscircuit/core"

const circuit = new Circuit()

circuit.add(
  <board width="30mm" height="20mm">
    <chip name="U1" footprint="soic8" />
  </board>
)

// Render to circuit JSON
const json = circuit.getCircuitJson()

// Render to SVG (for quick previewing)
const svg = circuit.getSvg({ view: "pcb" })
```

## Integration Points

| Tool | How it uses core |
|------|-----------------|
| `tsci dev` | Calls core on every file save to get fresh circuit JSON |
| PCB Viewer | Reads circuit JSON to render the board |
| Autorouter | Takes unrouted circuit JSON, returns routed circuit JSON |
| Converters | Read circuit JSON, emit KiCad / Gerber / etc. |
| Runframe | Runs core inside a web worker in the browser |

## GitHub / Repository

[github.com/tscircuit/core](https://github.com/tscircuit/core)
