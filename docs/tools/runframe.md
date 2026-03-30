# Runframe

**Runframe** is a browser-based circuit runner and live-preview environment for tscircuit. It lets you write, run, and inspect tscircuit code entirely in the browser — no local installation required.

## Access

👉 [runframe.tscircuit.com](https://runframe.tscircuit.com)

Runframe is also embedded in [tscircuit.com](https://tscircuit.com) snippets and can be self-hosted or embedded in your own React application.

## What Runframe Does

Runframe executes tscircuit code **inside a web worker** so the main thread stays responsive. It then renders the resulting circuit JSON through the [PCB Viewer](./pcb-viewer.md) and schematic viewer — giving you instant visual feedback as you type.

### Key Features

| Feature | Description |
|---------|-------------|
| **Live preview** | PCB and schematic update on every code change |
| **Error panel** | Compile and DRC errors shown inline |
| **Multiple view tabs** | PCB, Schematic, 3D, and raw circuit JSON (soup) |
| **Import from registry** | Use `@tsci/` packages directly in the browser |
| **Share via URL** | Generated code can be shared as a permalink |
| **Embed anywhere** | Drop into any React app with the npm package |

## Using the Runframe React Component

```bash
npm install @tscircuit/runframe
```

```tsx
import { RunFrame } from "@tscircuit/runframe"

export default function Playground() {
  return (
    <RunFrame
      defaultCode={`
import { resistor, led } from "@tscircuit/core"

export default () => (
  <board width="10mm" height="10mm">
    <resistor resistance="1k" footprint="0402" name="R1" />
    <led color="red" footprint="0402" name="LED1" />
  </board>
)
      `.trim()}
      style={{ width: "100%", height: "80vh" }}
    />
  )
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `defaultCode` | `string` | Initial TypeScript/TSX code to load |
| `code` | `string` | Controlled code value |
| `onCodeChange` | `(code: string) => void` | Called when user edits code |
| `style` | `React.CSSProperties` | Container style |
| `showCodeEditor` | `boolean` | Show/hide the code editor pane (default `true`) |

## How It Works Internally

1. User code is bundled in a **web worker** using an in-browser bundler.
2. The bundled module is executed; the default export (a React component) is rendered by tscircuit/core to produce **circuit JSON**.
3. The circuit JSON is passed to the PCB Viewer and schematic viewer components.
4. DRC checks run against the circuit JSON and surface errors.

## GitHub / Repository

[github.com/tscircuit/runframe](https://github.com/tscircuit/runframe)
