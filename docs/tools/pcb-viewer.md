# PCB Viewer

**Repository:** [tscircuit/pcb-viewer](https://github.com/tscircuit/pcb-viewer)  
**npm:** [`@tscircuit/pcb-viewer`](https://www.npmjs.com/package/@tscircuit/pcb-viewer)

`pcb-viewer` is an interactive React component for rendering PCB layouts from tscircuit's circuit JSON format. It supports zoom, pan, layer toggling, and component inspection.

## Installation

```bash
npm install @tscircuit/pcb-viewer
```

## Basic Usage

```tsx
import { PCBViewer } from "@tscircuit/pcb-viewer"

export default function App() {
  const circuitJson = /* circuit JSON from @tscircuit/core or an API */ []

  return (
    <div style={{ width: "100%", height: 600 }}>
      <PCBViewer circuitJson={circuitJson} />
    </div>
  )
}
```

## With `@tscircuit/core`

The most common pattern is to render circuit JSON with `@tscircuit/core` and pass it directly to the viewer:

```tsx
import { Circuit } from "@tscircuit/core"
import { PCBViewer } from "@tscircuit/pcb-viewer"
import { useMemo } from "react"

function MyBoard() {
  const circuitJson = useMemo(() => {
    const circuit = new Circuit()
    circuit.add(
      <board width="30mm" height="20mm">
        <resistor name="R1" resistance="10k" footprint="0402" pcbX={0} pcbY={0} />
        <capacitor name="C1" capacitance="100nF" footprint="0402" pcbX={5} pcbY={0} />
      </board>
    )
    return circuit.getCircuitJson()
  }, [])

  return (
    <div style={{ width: 800, height: 600 }}>
      <PCBViewer circuitJson={circuitJson} />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `circuitJson` | `AnyCircuitElement[]` | **required** | The circuit JSON to render |
| `initialLayer` | `"top" \| "bottom"` | `"top"` | Initially active copper layer |
| `onHoverComponent` | `(ref: string \| null) => void` | — | Callback when a component is hovered |
| `onClickComponent` | `(ref: string) => void` | — | Callback when a component is clicked |
| `height` | `number` | `600` | Height of the viewer in pixels |
| `allowEditing` | `boolean` | `false` | Enable drag-to-move components (experimental) |

## Interactive Controls

| Action | Control |
|--------|---------|
| Zoom in / out | Scroll wheel |
| Pan | Click and drag |
| Reset view | Double-click empty area |
| Toggle layer | Layer buttons in toolbar |
| Inspect component | Hover over a pad or silkscreen outline |

## Layer Visibility

The toolbar at the top of the viewer lets you show/hide individual PCB layers:

| Layer | Colour |
|-------|--------|
| Top copper (F.Cu) | Red |
| Bottom copper (B.Cu) | Blue |
| Top silkscreen (F.SilkS) | White |
| Board outline (Edge.Cuts) | Yellow |
| Drill holes | White circles |
| Ratsnest (unrouted connections) | Thin grey lines |

## Embedding in Non-React Apps

If you are not using React, you can use the standalone `renderPcbViewerToSvg` helper from [`circuit-to-svg`](./circuit-to-svg.md) to produce a static SVG instead.

## See Also

- [Runframe](./runframe.md) — full in-browser circuit runner with PCBViewer built in
- [circuit-to-svg](./circuit-to-svg.md) — headless SVG export (no React needed)
- [Tools Overview](./overview.md)
