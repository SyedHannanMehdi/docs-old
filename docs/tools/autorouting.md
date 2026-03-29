# autorouting.com

**Website:** [autorouting.com](https://autorouting.com)  
**Repository:** [tscircuit/autorouting](https://github.com/tscircuit/autorouting)  
**npm:** [`@tscircuit/autorouting-client`](https://www.npmjs.com/package/@tscircuit/autorouting-client)

autorouting.com is tscircuit's cloud-based PCB autorouter. Given an unrouted board (a circuit JSON with components placed but no trace routes), it returns a fully routed PCB.

The autorouter is also available as an open-source library so you can run it locally or integrate it into your own tooling.

## Web UI

1. Go to [autorouting.com](https://autorouting.com).
2. Upload your board file (circuit JSON, or supported EDA format).
3. Adjust routing parameters (layer count, clearance, trace width) if needed.
4. Click **Route** and wait for the result.
5. Download the routed output in your preferred format.

## Programmatic Usage

### Install

```bash
npm install @tscircuit/autorouting-client
```

### Route a board

```ts
import { autoroute } from "@tscircuit/autorouting-client"

const routedCircuitJson = await autoroute({
  circuitJson: myUnroutedCircuitJson,
})
```

### With options

```ts
const routedCircuitJson = await autoroute({
  circuitJson: myUnroutedCircuitJson,
  options: {
    // Number of copper layers to use (2 or 4)
    layerCount: 2,

    // Minimum spacing between traces (mm)
    minTraceWidth: 0.15,
    minClearance: 0.15,

    // Use the cloud service instead of running locally
    serverUrl: "https://autorouting.com/api/autoroute",
  },
})
```

### Integrating with `@tscircuit/core`

```ts
import { Circuit } from "@tscircuit/core"
import { autoroute } from "@tscircuit/autorouting-client"

// 1. Build unrouted circuit
const circuit = new Circuit()
circuit.add(
  <board width="30mm" height="20mm">
    <resistor name="R1" resistance="10k" footprint="0402" pcbX={-5} pcbY={0} />
    <resistor name="R2" resistance="10k" footprint="0402" pcbX={5} pcbY={0} />
    <trace from=".R1 > .pin1" to=".R2 > .pin1" />
  </board>
)

const unrouted = circuit.getCircuitJson()

// 2. Autoroute
const routed = await autoroute({ circuitJson: unrouted })

// 3. Render or export the routed result
```

## Routing Algorithm

The autorouter uses a combination of algorithms depending on the complexity of the board:

| Board complexity | Algorithm used |
|-----------------|----------------|
| Simple (< 50 nets) | Grid-based Lee/BFS maze router |
| Medium | A* with layer-aware cost heuristic |
| Complex | Concurrent multi-net routing with rip-up and retry |

### Design Rules

The autorouter respects the following design rules embedded in the circuit JSON:

- **Trace width** — per-net and board-level minimum trace width.
- **Clearance** — minimum gap between any two copper features.
- **Via size** — drill diameter and annular ring for through-hole vias.
- **Board outline** — traces are kept inside the board boundary.

## Local Mode (No Cloud)

You can run the autorouting engine entirely offline:

```ts
import { autoroute } from "@tscircuit/autorouting"
// Note: this imports the local package, not the client

const routed = await autoroute({ circuitJson: unrouted })
```

> **Note:** The local package is heavier (~5 MB) due to the routing engine. Use the client package (`@tscircuit/autorouting-client`) in browser environments.

## Limitations

- Very dense boards (> 500 components) may time out on the free tier of the cloud service.
- Differential pair routing is not yet supported.
- High-speed design rules (impedance control) are not enforced.

## See Also

- [Core (`@tscircuit/core`)](./core.md) — generates the unrouted circuit JSON
- [Gerber Exporter](./gerber-exporter.md) — export the routed board for manufacturing
- [Tools Overview](./overview.md)
