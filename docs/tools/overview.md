# tscircuit Tools Overview

tscircuit provides a suite of user-facing tools that span the full circuit design and prototyping workflow — from writing circuit code to viewing PCB layouts, routing traces, and exporting to industry-standard formats.

## Available Tools

| Tool | Description | Where to Access |
|------|-------------|-----------------|
| [tscircuit CLI](./cli.md) | Scaffold, develop, and build circuit projects | `npm install -g @tscircuit/cli` |
| [PCB Viewer](./pcb-viewer.md) | Interactive 2D/3D PCB visualization | [tscircuit.com](https://tscircuit.com) / npm |
| [Runframe](./runframe.md) | In-browser circuit runner and live preview | [runframe.tscircuit.com](https://runframe.tscircuit.com) |
| [Autorouter](./autorouter.md) | Automatic PCB trace routing service | [autorouting.com](https://autorouting.com) |
| [tscircuit Core](./core.md) | The circuit rendering / compilation engine | npm package |
| [Converters](./converters.md) | Convert between PCB/schematic file formats | Online tools + CLI |

---

## Workflow Overview

```
Write Circuit Code (TypeScript)
         │
         ▼
   tscircuit CLI / Runframe   ← live preview & development
         │
         ▼
    tscircuit Core            ← compiles to circuit JSON (soup)
         │
         ├──► PCB Viewer      ← visualize your layout
         │
         ├──► Autorouter      ← automatically route traces
         │
         └──► Converters      ← export to KiCad, Gerber, etc.
```
