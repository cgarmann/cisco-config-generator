# Cisco Config Generator

A single-file web app that generates complete **Cisco Packet Tracer** configurations — routers, switches, VLANs, DHCP, routing and PC setup — all from a clean visual interface.

No installation. No dependencies. Just open the HTML file in a browser.

---

## Features

- **Router config** — hostname, interfaces, WAN serial links, passwords, banner motd, `no ip domain-lookup`
- **Router-on-a-Stick** — automatic sub-interface + dot1Q config for L2 multi-subnet setups
- **L3 Switch (Catalyst 3560/3650)** — `ip routing`, SVIs as gateways, routed uplink via `/30` transit subnet, DHCP on switch
- **L2 Switch (Catalyst 2960)** — trunk/access ports, VLAN config, distribution + access switch hierarchy
- **DHCP** — pools with excluded ranges auto-calculated from device count
- **Routing protocols** — Static routes or OSPF area 0 (routers + L3 switches)
- **Multiple device types per subnet** — e.g. `2× PC + 1× Laptop + 1× Printer`
- **PC Setup guide** — full IP/mask/gateway/DNS list for every device, ready for Packet Tracer
- **Router models** — ISR 4331 ★, ISR 2901, ISR 1941, Cisco 2811 (auto-fills interface names)
- **Switch models** — Catalyst 2960 (L2) ★, 3560 (L3), 3650 (L3)
- **WAN topology** — Auto chain (A→B→C→D) or fully manual
- **Subnet masks** — dropdown with recommended options; `/30` enforced on WAN
- **Presets** — built-in examples + save/load your own via localStorage
- **Export / Import** — save and share projects as JSON
- **Draggable panel divider** — resize the config output panel to your liking
- **Hover tooltips** — every field has a "What / Why" explanation

---

## Usage

### Option A — Open locally
Download [`index.html`](index.html) and open it in any modern browser.

### Option B — GitHub Pages
Visit the live version at:
**https://cgarmann.github.io/cisco-config-generator/**

---

## How it works

1. Add one or more **locations** (each gets a router + switch)
2. Add **subnets** per location with gateway IP and device types
3. Add **WAN links** between routers (auto or manual)
4. Click **⚡ Generate Configuration**
5. Use the tabs to browse configs per device, copy or download

---

## Supported Cisco devices

| Device | Models |
|---|---|
| Router | ISR 4331, ISR 2901, ISR 1941, 2811 |
| L2 Switch | Catalyst 2960 |
| L3 Switch | Catalyst 3560, Catalyst 3650 |

---

## Built-in presets

| Preset | Description |
|---|---|
| Blank | Two empty sites to get started |
| Cloudy Nerds / High Clouds | Two sites, 3 subnets each, mixed device types |
| L3 Switch Demo | HQ with Catalyst 3560 + OSPF |
| 3-site chain (OSPF) | Oslo → Bergen → Trondheim |

---

## License

MIT — see [LICENSE](LICENSE)
