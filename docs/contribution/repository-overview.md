# tscircuit Repository Overview for Contributors

This guide documents the different repositories in the tscircuit ecosystem, their purposes, and how to contribute to each one. Whether you're fixing a bug, adding a feature, or improving documentation, this page will help you find the right repo.

---

## What is tscircuit?

[tscircuit](https://github.com/tscircuit/tscircuit) is an open-source project that lets you design electronic circuits using React-like JSX/TSX syntax. You can describe schematics, PCB layouts, and component footprints in TypeScript, then export to industry-standard formats (KiCad, Gerber, SVG, etc.).

---

## Repository Map

### 🧠 Core Library

| Repository | Description |
|---|---|
| [`tscircuit/tscircuit`](https://github.com/tscircuit/tscircuit) | The main meta-package / entry point. Exports the high-level API consumers use. |
| [`tscircuit/core`](https://github.com/tscircuit/core) | Core rendering engine that processes JSX circuit elements into a circuit JSON (soup) representation. This is the heart of tscircuit. |
| [`tscircuit/react-fiber`](https://github.com/tscircuit/react-fiber) | Custom React reconciler (fiber) that enables JSX-based circuit description. Bridges the gap between React and the circuit rendering engine. |

---

### 📐 Circuit Representation & Data Model

| Repository | Description |
|---|---|
| [`tscircuit/circuit-json`](https://github.com/tscircuit/circuit-json) | Defines the canonical JSON schema (TypeScript types + Zod validators) for all circuit elements — components, nets, ports, traces, pads, etc. If you want to understand the data model, start here. |
| [`tscircuit/soup-util`](https://github.com/tscircuit/soup-util) | Utility functions for querying and manipulating circuit JSON (soup) objects. |
| [`tscircuit/circuit-json-to-readable-netlist`](https://github.com/tscircuit/circuit-json-to-readable-netlist) | Converts circuit JSON into a human-readable netlist format. |

---

### 🎨 Rendering & Visualization

| Repository | Description |
|---|---|
| [`tscircuit/schematic-viewer`](https://github.com/tscircuit/schematic-viewer) | React component that renders schematic diagrams from circuit JSON. |
| [`tscircuit/pcb-viewer`](https://github.com/tscircuit/pcb-viewer) | React component that renders interactive PCB layouts from circuit JSON. |
| [`tscircuit/circuit-to-svg`](https://github.com/tscircuit/circuit-to-svg) | Converts circuit JSON to SVG for schematic and PCB views — useful for headless / server-side rendering. |
| [`tscircuit/schematic-symbols`](https://github.com/tscircuit/schematic-symbols) | Library of SVG schematic symbols for common components (resistors, capacitors, op-amps, etc.). Contributers can add new symbols here. |

---

### 🔌 Component Libraries & Footprints

| Repository | Description |
|---|---|
| [`tscircuit/footprinter`](https://github.com/tscircuit/footprinter) | Programmatically generates standard PCB footprints (SOIC, QFN, DIP, 0402, etc.) from parameters. |
| [`tscircuit/jscad-electronics`](https://github.com/tscircuit/jscad-electronics) | 3D electronic component models built with JSCAD (JavaScript Constructive Solid Geometry). Used for 3D PCB previews. |
| [`tscircuit/jscad-fiber`](https://github.com/tscircuit/jscad-fiber) | React reconciler for JSCAD, enabling 3D model description using JSX. |

---

### 📦 Export & File Format Support

| Repository | Description |
|---|---|
| [`tscircuit/kicad-mod-converter`](https://github.com/tscircuit/kicad-mod-converter) | Parses and converts KiCad `.kicad_mod` footprint files to/from circuit JSON. |
| [`tscircuit/kicad-component-converter`](https://github.com/tscircuit/kicad-component-converter) | Converts KiCad schematic symbols and components to tscircuit-compatible formats. |
| [`tscircuit/dsn-converter`](https://github.com/tscircuit/dsn-converter) | Converts between circuit JSON and Specctra DSN format (used by many PCB autorouters). |
| [`tscircuit/gerbers`](https://github.com/tscircuit/gerbers) | Generates industry-standard Gerber files and drill files from circuit JSON for PCB fabrication. |
| [`tscircuit/circuit-json-to-gerber`](https://github.com/tscircuit/circuit-json-to-gerber) | Focused converter: circuit JSON → Gerber format output. |

---

### 🤖 Autorouting

| Repository | Description |
|---|---|
| [`tscircuit/autorouting`](https://github.com/tscircuit/autorouting) | PCB trace autorouting algorithms. Contains multiple router implementations (grid-based, etc.) that automatically connect pads with copper traces. |
| [`tscircuit/autorouting-dataset`](https://github.com/tscircuit/autorouting-dataset) | Benchmark datasets and evaluation tools for comparing autorouting algorithm quality. |
| [`tscircuit/freerouting-cli`](https://github.com/tscircuit/freerouting-cli) | CLI wrapper around the Freerouting autorouter, enabling it to be driven programmatically from tscircuit. |

---

### 🛠️ Developer Tools & CLI

| Repository | Description |
|---|---|
| [`tscircuit/cli`](https://github.com/tscircuit/cli) | The `tsci` command-line interface. Lets you run, build, export, and publish tscircuit projects from the terminal. |
| [`tscircuit/runframe`](https://github.com/tscircuit/runframe) | An in-browser execution environment that runs tscircuit code, powers the live preview on the website and in the CLI dev server. |
| [`tscircuit/eval-webworker`](https://github.com/tscircuit/eval-webworker) | Safely evaluates tscircuit/TypeScript code inside a Web Worker for sandboxed in-browser execution. |
| [`tscircuit/props`](https://github.com/tscircuit/props) | TypeScript prop types and Zod schemas for all tscircuit JSX elements (`<resistor />`, `<capacitor />`, `<chip />`, etc.). |

---

### 🌐 Online Platform & Registry

| Repository | Description |
|---|---|
| [`tscircuit/tscircuit.com`](https://github.com/tscircuit/tscircuit.com) | The main website and web application at [tscircuit.com](https://tscircuit.com). Built with React + TypeScript. |
| [`tscircuit/snippets`](https://github.com/tscircuit/snippets) | The "snippets" platform — a registry where users share reusable tscircuit components. Think npm for circuit snippets. |
| [`tscircuit/registry`](https://github.com/tscircuit/registry) | Backend API for the snippets/package registry. |

---

### 🧪 Testing & AI Tools

| Repository | Description |
|---|---|
| [`tscircuit/circuit-json-to-bom-csv`](https://github.com/tscircuit/circuit-json-to-bom-csv) | Generates a Bill of Materials (BOM) CSV file from circuit JSON — useful for ordering components. |
| [`tscircuit/prompt-benchmarks`](https://github.com/tscircuit/prompt-benchmarks) | Benchmarks for AI prompt quality when generating tscircuit code with LLMs. |
| [`tscircuit/ai-tools`](https://github.com/tscircuit/ai-tools) | Utilities for generating and improving tscircuit code using AI/LLMs. |

---

### 📚 Documentation

| Repository | Description |
|---|---|
| [`tscircuit/docs`](https://github.com/tscircuit/docs) | The current official documentation site. |
| [`tscircuit/docs-old`](https://github.com/tscircuit/docs-old) | The previous documentation site (this repo). Contains guides and reference docs being migrated. |

---

## How to Contribute

### General Workflow

1. **Find an issue** — Browse the [tscircuit GitHub org](https://github.com/tscircuit) and look for issues tagged `good first issue` or `help wanted`.
2. **Fork the repo** — Fork the specific repository you want to contribute to.
3. **Clone your fork** — `git clone https://github.com/YOUR_USERNAME/REPO_NAME`
4. **Install dependencies** — Most repos use `npm install` or `bun install`.
5. **Create a branch** — `git checkout -b fix/your-feature-name`
6. **Make your changes** — Follow the conventions in that repo (see below).
7. **Run tests** — See the repo's README for the test command (usually `npm test` or `bun test`).
8. **Open a Pull Request** — Reference the issue number in your PR description.

### Common Tech Stack

Most tscircuit repositories use:
- **Language:** TypeScript
- **Package manager:** `npm` or `bun`
- **Testing:** `vitest` or `@tscircuit/testing-library`
- **Build:** `tsup` or `vite`
- **Linting:** `biome` or `eslint` + `prettier`

### Where to Start by Interest

| If you're interested in… | Start with… |
|---|---|
| Core circuit logic / rendering | `tscircuit/core`, `tscircuit/circuit-json` |
| UI / visualization | `tscircuit/pcb-viewer`, `tscircuit/schematic-viewer`, `tscircuit/circuit-to-svg` |
| Adding component symbols | `tscircuit/schematic-symbols` |
| Adding PCB footprints | `tscircuit/footprinter` |
| File format support (Gerber, KiCad) | `tscircuit/gerbers`, `tscircuit/kicad-mod-converter` |
| Autorouting algorithms | `tscircuit/autorouting` |
| CLI / developer experience | `tscircuit/cli`, `tscircuit/runframe` |
| Website / platform | `tscircuit/tscircuit.com`, `tscircuit/snippets` |
| Documentation | `tscircuit/docs`, `tscircuit/docs-old` |
| AI / LLM integrations | `tscircuit/ai-tools`, `tscircuit/prompt-benchmarks` |

---

## Repository Quick-Reference Table

| Repository | Language | Difficulty | Good First Issue |
|---|---|---|---|
| `tscircuit/schematic-symbols` | TypeScript / SVG | ⭐ Beginner | Add a new component symbol |
| `tscircuit/docs` | MDX / Markdown | ⭐ Beginner | Fix docs, add examples |
| `tscircuit/circuit-json` | TypeScript | ⭐ Beginner | Add/update types |
| `tscircuit/footprinter` | TypeScript | ⭐⭐ Intermediate | Add a new footprint generator |
| `tscircuit/circuit-to-svg` | TypeScript | ⭐⭐ Intermediate | Rendering improvements |
| `tscircuit/pcb-viewer` | TypeScript / React | ⭐⭐ Intermediate | UI improvements |
| `tscircuit/autorouting` | TypeScript | ⭐⭐⭐ Advanced | Algorithm improvements |
| `tscircuit/core` | TypeScript | ⭐⭐⭐ Advanced | Core rendering logic |
| `tscircuit/react-fiber` | TypeScript | ⭐⭐⭐ Advanced | Reconciler internals |

---

## Getting Help

- 💬 **Discord:** Join the [tscircuit Discord](https://discord.gg/tscircuit) to ask questions and meet other contributors.
- 🐛 **Issues:** Open a GitHub issue on the relevant repository.
- 🗣️ **Discussions:** Check GitHub Discussions on the main `tscircuit/tscircuit` repo.

---

## Contributing to This Documentation

Found something missing or outdated? This file lives at [`tscircuit/docs-old`](https://github.com/tscircuit/docs-old). Open a PR with your improvements!
