# Runframe

**Repository:** [tscircuit/runframe](https://github.com/tscircuit/runframe)  
**npm:** [`@tscircuit/runframe`](https://www.npmjs.com/package/@tscircuit/runframe)

Runframe is a sandboxed, in-browser execution environment for tscircuit code. It compiles and evaluates TypeScript circuit code entirely client-side using a Web Worker, then renders the resulting PCB, schematic, and 3D views — no server required.

It is embedded in [tscircuit.com](https://tscircuit.com) to power the online snippet editor, and can be embedded in any React application.

## Installation

```bash
npm install @tscircuit/runframe
```

## Basic Usage

```tsx
import { RunFrame } from "@tscircuit/runframe"

const code = `
import { Circuit } from "@tscircuit/core"

export default () => (
  <board width="20mm" height="20mm">
    <resistor name="R1" resistance="10k" footprint="0402" pcbX={0} pcbY={0} />
    <capacitor name="C1" capacitance="100nF" footprint="0402" pcbX={5} pcbY={0} />
  </board>
)
`

export default function App() {
  return (
    <div style={{ width: "100%", height: 700 }}>
      <RunFrame code={code} entrypoint="index.tsx" />
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `code` | `string` | **required** | TypeScript/TSX source code to execute |
| `entrypoint` | `string` | `"index.tsx"` | Filename used for error messages and module resolution |
| `files` | `Record<string, string>` | `{}` | Additional virtual files available to the entrypoint via relative imports |
| `onRenderComplete` | `(circuitJson: AnyCircuitElement[]) => void` | — | Called after a successful render with the resulting circuit JSON |
| `onError` | `(error: Error) => void` | — | Called when a compile or runtime error occurs |
| `defaultTab` | `"pcb" \| "schematic" \| "3d" \| "code"` | `"pcb"` | Initially active tab |
| `showCode` | `boolean` | `true` | Whether to show the Code tab |

## Multi-file Example

You can pass additional virtual files that the entrypoint can import:

```tsx
<RunFrame
  files={{
    "index.tsx": `
      import { MyChip } from "./MyChip"
      export default () => (
        <board width="40mm" height="30mm">
          <MyChip name="U1" pcbX={0} pcbY={0} />
        </board>
      )
    `,
    "MyChip.tsx": `
      export const MyChip = (props) => (
        <chip
          {...props}
          footprint="soic8"
          pinLabels={{ pin1: "VCC", pin2: "GND", pin3: "OUT" }}
        />
      )
    `,
  }}
  entrypoint="index.tsx"
/>
```

## How It Works

```
┌─────────────────────────────────────────────────────┐
│  Browser Main Thread                                │
│                                                     │
│   <RunFrame code={...} />                          │
│        │                                            │
│        │  postMessage(code)                         │
│        ▼                                            │
│  ┌───────────────┐    ┌──────────────────────────┐ │
│  │  Web Worker   │    │  Import from CDN          │ │
│  │               │◄───│  (esm.sh / unpkg)         │ │
│  │  TypeScript   │    │  @tscircuit/core, etc.    │ │
│  │  compile      │    └──────────────────────────┘ │
│  │  + evaluate   │                                  │
│  │               │                                  │
│  └──────┬────────┘                                  │
│         │  circuitJson                              │
│         ▼                                           │
│   <PCBViewer />  <SchematicViewer />  <3DViewer />  │
└─────────────────────────────────────────────────────┘
```

1. Your code string is sent to a **Web Worker** via `postMessage`.
2. The worker compiles TypeScript using the bundled TypeScript compiler.
3. `@tscircuit/*` imports are resolved from a CDN (no local install needed inside the sandbox).
4. The default export is called; the resulting circuit JSON is sent back to the main thread.
5. The main thread passes the circuit JSON to the viewer components.

## Error Handling

Runframe displays errors inline beneath the editor:

- **TypeScript compile errors** — shown with file/line information before execution.
- **Runtime errors** — caught and displayed with a stack trace.
- **Layout errors** — component overlap or impossible constraints are highlighted on the PCB view.

## Viewing Tabs

| Tab | What it shows |
|-----|---------------|
| **PCB** | Interactive top-down PCB layout |
| **Schematic** | Auto-generated schematic diagram |
| **3D** | Three-dimensional board render |
| **Code** | The raw source code (read-only or editable) |

## See Also

- [tscircuit.com Snippets](./snippets.md) — hosted platform built on Runframe
- [PCB Viewer](./pcb-viewer.md) — the PCB component embedded inside Runframe
- [Core (`@tscircuit/core`)](./core.md) — the renderer that Runframe invokes
- [Tools Overview](./overview.md)
