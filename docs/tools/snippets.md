# Snippets (tscircuit.com)

**Website:** [tscircuit.com](https://tscircuit.com)  
**Repository:** [tscircuit/tscircuit](https://github.com/tscircuit/tscircuit) *(monorepo)*

Snippets is the hosted platform for writing, sharing, and discovering tscircuit circuit designs entirely in the browser — no local install required. Think of it as **CodePen for PCBs**.

## Features

### In-Browser Editor

A Monaco-based code editor gives you a full TypeScript editing experience with autocomplete, type checking, and inline error highlights — all without installing anything.

### Instant Preview

As you type, your circuit is compiled and rendered in real time. Switch between:

| Tab | View |
|-----|------|
| **PCB** | Interactive top-down PCB layout |
| **Schematic** | Auto-generated schematic diagram |
| **3D** | Three-dimensional board render |
| **BOM** | Bill of materials table |

### Public Sharing

Every snippet gets a permanent URL like:

```
https://tscircuit.com/username/my-snippet-name
```

Share that link with anyone — they can view the board without logging in.

### Fork & Remix

Click **Fork** on any public snippet to copy it into your account as a starting point. Iterate on the design and publish your own version.

### One-Click Export

Download your board directly from the browser:

- **Gerber ZIP** — ready to upload to JLCPCB, PCBWay, OSHPark, etc.
- **SVG** — PCB or schematic as a vector image.
- **KiCad** — `.kicad_pcb` for further editing in KiCad.

### Component Registry

Snippets doubles as a **component registry**. Publish reusable components that other designers can import by URL:

```tsx
// Import a community component directly in your snippet
import { SmdLed } from "github:seveibar/smd-led"

export default () => (
  <board width="20mm" height="10mm">
    <SmdLed name="D1" color="red" pcbX={0} pcbY={0} />
  </board>
)
```

Published components are versioned, so imports remain stable over time.

## Getting Started

1. Go to [tscircuit.com](https://tscircuit.com).
2. Click **New Snippet** (no account needed for a quick try).
3. Write your circuit in the editor.
4. Click the **PCB** tab to see your board rendered live.
5. **Sign in with GitHub** to save and share your snippet.

## Example Snippet

```tsx
// A simple voltage divider
export default () => (
  <board width="20mm" height="15mm">
    <resistor name="R1" resistance="10k" footprint="0402" pcbX={-4} pcbY={0} />
    <resistor name="R2" resistance="10k" footprint="0402" pcbX={4} pcbY={0} />
    <net name="VIN" />
    <net name="VOUT" />
    <net name="GND" />
    <trace from=".R1 > .pin1" to="net.VIN" />
    <trace from=".R1 > .pin2" to=".R2 > .pin1" />
    <trace from=".R1 > .pin2" to="net.VOUT" />
    <trace from=".R2 > .pin2" to="net.GND" />
  </board>
)
```

## Powered by Runframe

Under the hood, Snippets uses [Runframe](./runframe.md) for in-browser execution and [PCB Viewer](./pcb-viewer.md) for rendering. All computation happens client-side — your code is not sent to a server.

## See Also

- [Runframe](./runframe.md) — the execution engine powering the online editor
- [CLI](./cli.md) — local development workflow
- [Tools Overview](./overview.md)
