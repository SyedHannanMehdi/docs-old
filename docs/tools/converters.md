# Converters & Exporters

tscircuit provides several libraries for converting the internal **circuit JSON** format into output formats used by EDA tools and PCB fabrication houses. All converters are pure functions — they take circuit JSON in and return the target format out.

---

## circuit-to-svg

**Repository:** [tscircuit/circuit-to-svg](https://github.com/tscircuit/circuit-to-svg)  
**npm:** [`circuit-to-svg`](https://www.npmjs.com/package/circuit-to-svg)

Converts circuit JSON into SVG strings. Useful for embedding board images in web pages, READMEs, email reports, or any context that accepts SVG.

### Installation

```bash
npm install circuit-to-svg
```

### Usage

```ts
import {
  circuitJsonToPcbSvg,
  circuitJsonToSchematicSvg,
} from "circuit-to-svg"
import { writeFileSync } from "fs"

// Top-down PCB view
const pcbSvg = circuitJsonToPcbSvg(circuitJson)
writeFileSync("board.svg", pcbSvg)

// Schematic diagram
const schematicSvg = circuitJsonToSchematicSvg(circuitJson)
writeFileSync("schematic.svg", schematicSvg)
```

### Options

```ts
const pcbSvg = circuitJsonToPcbSvg(circuitJson, {
  // Which layers to render (default: all visible layers)
  layers: ["top_copper", "bottom_copper", "top_silkscreen", "board_outline"],

  // Pixel width of the output (height is computed proportionally)
  width: 1200,

  // Colour theme
  theme: "dark", // "dark" | "light"
})
```

### Layer Colours

| Layer | Dark theme | Light theme |
|-------|-----------|-------------|
| Top copper (F.Cu) | `#ff0000` (red) | `#c02020` |
| Bottom copper (B.Cu) | `#0000ff` (blue) | `#2020c0` |
| Top silkscreen | `#ffffff` (white) | `#303030` |
| Board outline | `#ffff00` (yellow) | `#808000` |
| Drill holes | `#ffffff` circles | `#000000` circles |

---

## circuit-to-png

**Repository:** [tscircuit/circuit-to-png](https://github.com/tscircuit/circuit-to-png) *(also available via `tsci export --format png`)*  
**npm:** [`circuit-to-png`](https://www.npmjs.com/package/circuit-to-png)

Rasterizes the SVG output of `circuit-to-svg` to PNG using a headless browser (Puppeteer) or a server-side canvas. Ideal for CI-generated documentation thumbnails and README preview images.

### Installation

```bash
npm install circuit-to-png
```

### Usage

```ts
import { circuitJsonToPcbPng } from "circuit-to-png"
import { writeFileSync } from "fs"

const pngBuffer = await circuitJsonToPcbPng(circuitJson, {
  width: 800,   // pixels
  theme: "dark",
})

writeFileSync("board.png", pngBuffer)
```

---

## Gerber Exporter (circuit-json-to-gerber)

**Repository:** [tscircuit/circuit-json-to-gerber](https://github.com/tscircuit/circuit-json-to-gerber)  
**npm:** [`circuit-json-to-gerber`](https://www.npmjs.com/package/circuit-json-to-gerber)

Converts circuit JSON into **Gerber RS-274X** and **Excellon drill** files — the industry standard format accepted by virtually every PCB fabrication house (JLCPCB, PCBWay, OSHPark, Seeed, etc.).

### Installation

```bash
npm install circuit-json-to-gerber
```

### Usage

```ts
import { circuitJsonToGerberFiles } from "circuit-json-to-gerber"
import { writeFileSync, mkdirSync } from "fs"
import { join } from "path"

const gerberFiles = circuitJsonToGerberFiles(circuitJson)
// Returns Record<string, string> — filename → file content

mkdirSync("./gerbers", { recursive: true })
for (const [filename, content] of Object.entries(gerberFiles)) {
  writeFileSync(join("./gerbers", filename), content)
}
```

### Output Files

| Filename | Layer | Extension |
|----------|-------|-----------|
| `copper_top.gtl` | Top copper | Gerber |
| `copper_bottom.gbl` | Bottom copper | Gerber |
| `silkscreen_top.gto` | Top silkscreen | Gerber |
| `silkscreen_bottom.gbo` | Bottom silkscreen | Gerber |
| `soldermask_top.gts` | Top soldermask | Gerber |
| `soldermask_bottom.gbs` | Bottom soldermask | Gerber |
| `board_outline.gko` | Board outline | Gerber |
| `drill.drl` | Drill holes | Excellon |

### Submitting to a Fab House

1. Run the exporter to produce all `.gtl`, `.gbl`, `.gto`, etc. files.
2. Zip the entire `gerbers/` folder.
3. Upload the ZIP to [JLCPCB](https://jlcpcb.com), [PCBWay](https://www.pcbway.com), [OSHPark](https://oshpark.com), or your preferred fab.

---

## KiCad Converter

**Repository:** [tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter)  
**npm:** [`@tscircuit/kicad-converter`](https://www.npmjs.com/package/@tscircuit/kicad-converter)

Converts between tscircuit circuit JSON and KiCad's native file formats (`.kicad_pcb` and `.kicad_sch`). Useful when you want to:

- **Export** a tscircuit design into KiCad for final manual cleanup.
- **Import** an existing KiCad PCB into tscircuit for programmatic manipulation.

### Installation

```bash
npm install @tscircuit/kicad-converter
```

### Export to KiCad

```ts
import { circuitJsonToKicadPcb } from "@tscircuit/kicad-converter"
import { writeFileSync } from "fs"

const kicadPcbContent = circuitJsonToKicadPcb(circuitJson)
writeFileSync("my-board.kicad_pcb", kicadPcbContent)
```

Then open `my-board.kicad_pcb` in KiCad PCB Editor.

### Import from KiCad

```ts
import { kicadPcbToCircuitJson } from "@tscircuit/kicad-converter"
import { readFileSync } from "fs"

const kicadPcbContent = readFileSync("existing-board.kicad_pcb", "utf-8")
const circuitJson = kicadPcbToCircuitJson(kicadPcbContent)
```

### Footprint Mapping

The converter maps between KiCad footprint library references and tscircuit footprint identifiers. Common mappings:

| KiCad reference | tscircuit footprint |
|----------------|-------------------|
| `Resistor_SMD:R_0402_1005Metric` | `"0402"` |
| `Capacitor_SMD:C_0603_1608Metric` | `"0603"` |
| `Package_SO:SOIC-8_3.9x4.9mm_P1.27mm` | `"soic8"` |

---

## Choosing the Right Exporter

| Goal | Tool |
|------|------|
| Embed a board image in a README / webpage | **circuit-to-svg** |
| Generate a PNG thumbnail for CI/CD | **circuit-to-png** |
| Send a board to a fab house | **circuit-json-to-gerber** |
| Open a board in KiCad for editing | **kicad-converter** |
| Quick export from the command line | `tsci export --format <format>` (via the [CLI](./cli.md)) |

---

## See Also

- [Core (`@tscircuit/core`)](./core.md) — generates the circuit JSON that all converters consume
- [CLI](./cli.md) — wraps these converters behind easy `tsci export` commands
- [Tools Overview](./overview.md)
