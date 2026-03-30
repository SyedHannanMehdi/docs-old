# Autorouter

The **tscircuit Autorouter** (hosted at [autorouting.com](https://autorouting.com)) automatically routes PCB traces for circuits produced by tscircuit. Instead of manually placing every wire on your PCB, you describe connectivity in code and let the autorouter find a valid, DRC-clean trace layout.

## Access

👉 [autorouting.com](https://autorouting.com)

The autorouter is also invoked automatically during `tsci build` and can be used as a standalone npm package.

## What It Does

Given a tscircuit circuit JSON (soup) that contains component placements and a netlist, the autorouter:

1. Reads the **netlist** — which pads need to be connected.
2. Reads **keep-out zones**, board outline, and design rules.
3. Runs a grid- or vector-based routing algorithm to place traces on the copper layers.
4. Returns an updated circuit JSON with traces added.

## Using the Autorouter via the Web UI

1. Go to [autorouting.com](https://autorouting.com).
2. Upload a `.circuit.json` (soup) file, or paste JSON directly.
3. Click **Route**.
4. Download the routed circuit JSON or Gerbers.

## Using the Autorouter Programmatically

### As an npm package

```bash
npm install @tscircuit/autorouter
```

```ts
import { autoroute } from "@tscircuit/autorouter"

const routedSoup = await autoroute(unroutedCircuitJson)
```

### Via the Autorouting API

The autorouter exposes a REST API used by both the web UI and `tsci build`:

```ts
const response = await fetch("https://registry-api.tscircuit.com/autorouting/jobs", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ input_circuit_json: circuitJson }),
})
const { job_id } = await response.json()

// Poll for completion
const result = await fetch(`https://registry-api.tscircuit.com/autorouting/jobs/${job_id}`)
const { output_circuit_json } = await result.json()
```

## Supported Routing Modes

| Mode | Description |
|------|-------------|
| `sequential-trace` | Routes one trace at a time; fast, good for simple boards |
| `multi-layer` | Uses both top and bottom copper layers with vias |
| `obstacle-aware` | Avoids keepout zones and existing traces |

## Design Rules

The autorouter respects the following design rules (configurable in your circuit):

- Minimum trace width
- Minimum clearance between traces
- Via drill size
- Board outline keepout

## Limitations

- Complex, high-density boards may require manual intervention for 100% routing completion.
- The autorouter is optimized for 2-layer boards; 4+ layer support is experimental.

## GitHub / Repository

[github.com/tscircuit/autorouting](https://github.com/tscircuit/autorouting)
