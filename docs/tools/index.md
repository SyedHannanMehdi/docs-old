# tscircuit User-Facing Tools

tscircuit is a collection of tools that work together to let you design PCBs using TypeScript and React. This section documents each user-facing tool: what it does, how to access it, and how to use it.

## Tools

- **[Overview](./overview.md)** — How the tools fit together
- **[tscircuit CLI](./cli.md)** — Scaffold, develop, and build circuit projects from the command line
- **[PCB Viewer](./pcb-viewer.md)** — Interactive 2D/3D browser-based PCB visualization
- **[Runframe](./runframe.md)** — In-browser circuit runner and live preview, no installation needed
- **[Autorouter](./autorouter.md)** — Automatic PCB trace routing at [autorouting.com](https://autorouting.com)
- **[tscircuit Core](./core.md)** — The circuit compilation engine that powers everything else
- **[Converters](./converters.md)** — Import/export between tscircuit and KiCad, Gerber, EasyEDA, BOM, and more

## Quick Start

If you're new to tscircuit, the fastest path is:

1. Install the CLI: `npm install -g @tscircuit/cli`
2. Create a project: `tsci init my-board && cd my-board`
3. Start the dev server: `tsci dev`
4. Edit `src/index.tsx` and watch your board update live in the browser.

Or, try it instantly in the browser with no installation at [runframe.tscircuit.com](https://runframe.tscircuit.com).
