---
title: "Runframe (tscircuit.com)"
description: "Browser-based circuit editor and live preview environment"
sidebar_position: 2
---

# Runframe

**Repository:** [github.com/tscircuit/runframe](https://github.com/tscircuit/runframe)  
**Live site:** [tscircuit.com](https://tscircuit.com)

## What is Runframe?

Runframe is the browser-based tscircuit execution environment. It compiles and
runs tscircuit TypeScript/React code entirely in your browser using a Web Worker,
then renders an interactive schematic and PCB preview — no install required.

Runframe is embedded in [tscircuit.com](https://tscircuit.com) and is also the
UI shown when you run `tsci dev` locally.

## Key features

- **Zero-install playground** — open [tscircuit.com](https://tscircuit.com), hit
  **New**, and start typing circuit code instantly.
- **Split-pane editor** — code on the left, live schematic/PCB preview on the
  right, with real-time updates as you type.
- **Tabbed views** — switch between Schematic, PCB, 3D, Bill of Materials (BOM),
  and Circuit JSON with a single click.
- **Error overlay** — compile-time and runtime errors are shown inline next to
  the offending line.
- **Shareable snippets** — every snippet on tscircuit.com gets a permanent URL
  you can share or embed.
- **Embeddable** — the `runframe` package can be dropped into any React app to
  provide an in-browser tscircuit REPL.

## Who is it for?

- **Beginners** who want to try tscircuit without any setup.
- **Teams** who want to review or share circuit snippets via a link.
- **Library authors** who want to publish interactive examples alongside their
  components on the tscircuit registry.

## Getting started

1. Go to [tscircuit.com](https://tscircuit.com).
2. Click **New** in the top navigation.
3. Type or paste your tscircuit code in the left panel.
4. The PCB and schematic preview updates automatically.

## Embedding Runframe in your own app

```bash
npm install @tscircuit/runframe
```

```tsx
import { RunframeForCli } from "@tscircuit/runframe"

export default function App() {
  return (
    <RunframeForCli
      initialCode={`
export default () => (
  <resistor name="R1" resistance="10kohm" footprint="0402" />
)
`}
    />
  )
}
```

## Related tools

- [CLI](./cli) — uses Runframe as its local preview window.
- [PCB Viewer](./pcb-viewer) — the PCB tab inside Runframe is powered by
  `@tscircuit/pcb-viewer`.
