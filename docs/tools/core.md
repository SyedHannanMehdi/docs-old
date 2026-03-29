# Core (`@tscircuit/core`)

**Repository:** [tscircuit/core](https://github.com/tscircuit/core)  
**npm:** [`@tscircuit/core`](https://www.npmjs.com/package/@tscircuit/core)

`@tscircuit/core` is the React-based circuit renderer at the heart of tscircuit. It converts JSX circuit descriptions into tscircuit's internal **circuit JSON** — a serializable representation of both the PCB layout and schematic — which every other tscircuit tool consumes.

## Installation

```bash
npm install @tscircuit/core
```

## Quick Example

```tsx
import { Circuit } from "@tscircuit/core"

const circuit = new Circuit()

circuit.add(
  <board width="30mm" height="20mm">
    <resistor
      name="R1"
      resistance="10k"
      footprint="0402"
      pcbX={-5}
      pcbY={0}
    />
    <capacitor
      name="C1"
      capacitance="100nF"
      footprint="0402"
      pcbX={5}
      pcbY={0}
    />
    <trace from=".R1 > .pin2" to=".C1 > .pin1" />
  </board>
)

const circuitJson = circuit.getCircuitJson()
// Pass to PCBViewer, circuit-to-svg, Gerber exporter, etc.
```

## Built-in Primitives

### Board

```tsx
<board
  width="50mm"
  height="40mm"
  // Optional: manually specify layer count
  layerCount={2}
/>
```

The `<board>` is the root element. Everything else is placed inside it.

### Passive Components

```tsx
<resistor
  name="R1"
  resistance="10k"       // Ohms — also accepts "10000", "10e3"
  footprint="0402"
  pcbX={0}
  pcbY={0}
/>

<capacitor
  name="C1"
  capacitance="100nF"    // Farads
  footprint="0603"
  pcbX={5}
  pcbY={0}
/>

<inductor
  name="L1"
  inductance="10uH"      // Henries
  footprint="0805"
  pcbX={10}
  pcbY={0}
/>
```

### Active Components

```tsx
<chip
  name="U1"
  footprint="soic8"
  pinLabels={{
    pin1: "VCC",
    pin2: "GND",
    pin3: "OUT",
    pin4: "IN",
  }}
  pcbX={0}
  pcbY={0}
/>

<diode
  name="D1"
  footprint="0402"
  pcbX={-5}
  pcbY={5}
/>
```

### Connectors

```tsx
<connector
  name="J1"
  footprint="pinrow4"     // 4-pin 2.54mm header
  pcbX={0}
  pcbY={-8}
/>
```

### Nets & Traces

```tsx
{/* Named net — components can reference it by name */}
<net name="VCC" />
<net name="GND" />

{/* Trace connecting two component pins */}
<trace from=".R1 > .pin1" to=".C1 > .pin2" />

{/* Trace to a named net */}
<trace from=".U1 > .VCC" to="net.VCC" />
```

Trace selectors follow a CSS-like syntax:
- `.R1 > .pin1` — pin 1 of component with name "R1"
- `net.VCC` — the net named "VCC"

### Groups & Subcircuits

```tsx
function VoltageRegulator({ name, pcbX, pcbY }) {
  return (
    <group name={name} pcbX={pcbX} pcbY={pcbY}>
      <chip name="U1" footprint="sot23" pinLabels={{ pin1: "IN", pin2: "GND", pin3: "OUT" }} />
      <capacitor name="Cin" capacitance="10uF" footprint="0805" pcbX={-5} pcbY={0} />
      <capacitor name="Cout" capacitance="10uF" footprint="0805" pcbX={5} pcbY={0} />
      <trace from=".U1 > .IN" to=".Cin > .pin1" />
      <trace from=".U1 > .OUT" to=".Cout > .pin1" />
    </group>
  )
}

// Use it like any React component:
circuit.add(
  <board width="60mm" height="40mm">
    <VoltageRegulator name="VR1" pcbX={0} pcbY={0} />
    <VoltageRegulator name="VR2" pcbX={25} pcbY={0} />
  </board>
)
```

## `Circuit` API

```ts
const circuit = new Circuit()

// Add JSX to the circuit
circuit.add(<board>...</board>)

// Get the serializable circuit JSON
const circuitJson = circuit.getCircuitJson()

// Get just the PCB elements
const pcbElements = circuit.getPcbElements()

// Get just the schematic elements
const schematicElements = circuit.getSchematicElements()
```

## Footprints

Footprints define the physical pad layout of a component. tscircuit ships with a library of common footprints:

| Footprint string | Package |
|-----------------|---------|
| `"0402"` | Imperial 0402 SMD |
| `"0603"` | Imperial 0603 SMD |
| `"0805"` | Imperial 0805 SMD |
| `"soic8"` | SOIC-8 |
| `"soic16"` | SOIC-16 |
| `"sot23"` | SOT-23 3-pin |
| `"qfp32"` | QFP-32 |
| `"pinrow<N>"` | Through-hole pin header (N pins, 2.54mm pitch) |
| `"dip<N>"` | DIP package (N pins) |

You can also define custom footprints inline:

```tsx
<chip
  name="U1"
  footprint={
    <footprint>
      <smtpad
        portHints={["pin1"]}
        shape="rect"
        width={1.5}
        height={0.9}
        pcbX={-1}
        pcbY={0}
        layer="top_copper"
      />
      <smtpad
        portHints={["pin2"]}
        shape="rect"
        width={1.5}
        height={0.9}
        pcbX={1}
        pcbY={0}
        layer="top_copper"
      />
    </footprint>
  }
/>
```

## Circuit JSON

The output of `circuit.getCircuitJson()` is an array of typed objects:

```json
[
  { "type": "pcb_board", "width": 30, "height": 20, ... },
  { "type": "pcb_component", "name": "R1", "center": { "x": -5, "y": 0 }, ... },
  { "type": "pcb_smtpad", "pcb_component_id": "...", "layer": "top_copper", ... },
  { "type": "source_component", "name": "R1", "ftype": "simple_resistor", ... },
  ...
]
```

The full schema is defined in [`@tscircuit/circuit-json`](https://github.com/tscircuit/circuit-json).

## See Also

- [PCB Viewer](./pcb-viewer.md) — visualise the circuit JSON interactively
- [autorouting.com](./autorouting.md) — route traces on the generated board
- [Gerber Exporter](./gerber-exporter.md) — export for manufacturing
- [Tools Overview](./overview.md)
