# Converters

tscircuit provides several **converters** that transform circuit data between tscircuit's internal format (circuit JSON / "soup") and industry-standard EDA file formats. This lets you import designs from other tools into tscircuit, and export finished boards to fabrication-ready formats.

## Available Converters

### Export Converters (tscircuit → other formats)

| Converter | Output Format | Use Case |
|-----------|--------------|----------|
| `@tscircuit/export-gerbers` | Gerber / Excellon drill | PCB fabrication (JLCPCB, PCBWay, OSHPark, …) |
| `@tscircuit/export-kicad` | KiCad `.kicad_pcb` | Open in KiCad for further editing |
| `@tscircuit/export-specctra-dsn` | Specctra DSN | Use with external routers (e.g. FreeRouter) |
| `@tscircuit/export-bom` | CSV / JSON BOM | Bill of Materials for procurement |
| `@tscircuit/export-pick-and-place` | CSV pick-and-place | SMT assembly houses |
| `@tscircuit/export-svg` | SVG | Previewing layers as vector images |

### Import Converters (other formats → tscircuit)

| Converter | Input Format | Use Case |
|-----------|-------------|----------|
| `@tscircuit/import-kicad-mod` | KiCad `.kicad_mod` | Import KiCad footprints into tscircuit |
| `@tscircuit/import-specctra-ses` | Specctra SES | Import autorouted traces from FreeRouter |
| `@tscircuit/easyeda-converter` | EasyEDA JSON | Import EasyEDA/LCSC components & boards |

## Using Converters via the CLI

The `tsci export` command uses these converters under the hood:

```bash
# Export Gerbers
tsci export --format gerber ./src/index.tsx

# Export KiCad PCB
tsci export --format kicad ./src/index.tsx

# Export BOM as CSV
tsci export --format bom-csv ./src/index.tsx

# Export pick-and-place
tsci export --format pick-and-place ./src/index.tsx

# Export SVG of the top copper layer
tsci export --format svg --layer F.Cu ./src/index.tsx
```

All output files are written to the `dist/` directory by default.

## Using Converters Programmatically

### Gerber Export

```bash
npm install @tscircuit/export-gerbers
```

```ts
import { circuitJsonToGerberCommands, circuitJsonToGerbers } from "@tscircuit/export-gerbers"

// Get raw Gerber command objects
const commands = circuitJsonToGerberCommands(circuitJson)

// Get a map of filename → Gerber file content strings
const gerberFiles = await circuitJsonToGerbers(circuitJson)
// {
//   "F_Cu.gbr": "...",
//   "B_Cu.gbr": "...",
//   "F_Silkscreen.gbr": "...",
//   "drill.xln": "...",
//   ...
// }
```

### KiCad Export

```bash
npm install @tscircuit/export-kicad
```

```ts
import { circuitJsonToKiCadPcb } from "@tscircuit/export-kicad"

const kicadPcbString = circuitJsonToKiCadPcb(circuitJson)
// Write to a .kicad_pcb file
```

### EasyEDA / LCSC Import

The EasyEDA converter is particularly useful for importing component footprints from LCSC (the component supplier integrated with JLCPCB).

```bash
npm install @tscircuit/easyeda-converter
```

```ts
import { convertEasyEdaJsonToTsCircuitSoup } from "@tscircuit/easyeda-converter"

// Fetch the EasyEDA component JSON from LCSC/EasyEDA API
const easyEdaJson = await fetchEasyEdaComponent("C14663") // LCSC part number

const componentSoup = convertEasyEdaJsonToTsCircuitSoup(easyEdaJson)
```

### BOM Export

```bash
npm install @tscircuit/export-bom
```

```ts
import { circuitJsonToBomRows, circuitJsonToBomCsv } from "@tscircuit/export-bom"

// Get structured BOM rows
const rows = circuitJsonToBomRows(circuitJson)
// [{ designator: "R1", value: "10k", footprint: "0402", ... }, ...]

// Get CSV string ready to save
const csv = circuitJsonToBomCsv(circuitJson)
```

## Online Converter Tools

Some converters are available as standalone online tools on [tscircuit.com](https://tscircuit.com/tools):

- **Gerber viewer** — paste Gerber files to visualize layers
- **KiCad → tscircuit** — import a `.kicad_pcb` file and get tscircuit code
- **EasyEDA → tscircuit** — paste an EasyEDA component JSON to get a tscircuit footprint

## GitHub / Repositories

- [github.com/tscircuit/gerbers](https://github.com/tscircuit/gerbers) — Gerber export
- [github.com/tscircuit/kicad-converter](https://github.com/tscircuit/kicad-converter) — KiCad import/export
- [github.com/tscircuit/easyeda-converter](https://github.com/tscircuit/easyeda-converter) — EasyEDA / LCSC import
- [github.com/tscircuit/export-bom](https://github.com/tscircuit/export-bom) — BOM export
