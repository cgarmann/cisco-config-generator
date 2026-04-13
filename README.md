# Cisco Config Generator

A browser-based tool for generating Cisco IOS / IOS-XE / Packet Tracer configuration for multi-site networks. No installation required — open the HTML file directly in any modern browser.

---

## Versions

| File | Description |
|---|---|
| `cisco-config-generator-v7.html` | Full-featured v7 — multi-site, L2/L3 switches, OSPF/Static, presets, import/export |
| `index.html` | Simple single-device config generator with dropdown menus |

The active version served at `localhost:5500` is **v7** (`cisco-config-generator-v7.html` in Downloads).

---

## Features (v7)

- **Multi-site topology** — add as many locations as needed
- **Dropdown menus** for router model, switch model, subnet mask, routing protocol, WAN topology mode, and device types
- **L2 and L3 switch support**
  - L2 (Catalyst 2960): Router-on-a-Stick with trunk/access VLANs
  - L3 (Catalyst 3560/3650): SVI-based inter-VLAN routing
- **Routing protocols**: Static routes or OSPF area 0
- **WAN topology modes**: Auto (chain A→B→C) or Manual (define each link)
- **DHCP pools** auto-generated per subnet
- **PC Setup tab** — IP configuration guide for all end devices
- **Presets** — built-in examples + save/load custom presets
- **Export / Import** — save and restore projects as JSON
- **Copy** and **Download .txt** for generated configs
- **Draggable panel resizer**

---

## Supported Router Models

| Model | LAN Interface | Serial Interface |
|---|---|---|
| Cisco ISR 4331 ★ | GigabitEthernet0/0/0 | Serial0/1/0 |
| Cisco ISR 2901 | GigabitEthernet0/0 | Serial0/0/0 |
| Cisco ISR 1941 | GigabitEthernet0/0 | Serial0/0/0 |
| Cisco 2811 | FastEthernet0/0 | Serial0/0/0 |

## Supported Switch Models

| Model | Type |
|---|---|
| Catalyst 2960 ★ | L2 (trunk/access) |
| Catalyst 3560 | L3 (ip routing + SVIs) |
| Catalyst 3650 | L3 (ip routing + SVIs) |

---

## Built-in Presets

| Preset | Description |
|---|---|
| Blank (new project) | 2-site starter with Static routing |
| Cloudy Nerds / High Clouds | 2-site with 3 subnets each |
| L3 Switch Demo (3560) | HQ + Branch using OSPF and L3 switching |
| 3-location chain (OSPF) | 3-site chain with OSPF area 0 |

---

## How to Use (v7)

1. Open `cisco-config-generator-v7.html` in a browser (or use the live server at `localhost:5500`).
2. Select a **Preset** to load an example, or start from scratch with **Add Location**.
3. Set **Global Settings** — WAN/LAN subnet masks and routing protocol.
4. Configure each location: location code, router hostname, router model, switch model, interfaces, and subnets.
5. Add **devices** (PC, Laptop, Server, Printer, IP Phone) per subnet.
6. Click **⚡ Generate Configuration**.
7. Use the tabs to view configs per device. Click **Copy** or **Download .txt**.

---

## How to Use (Simple — index.html)

1. Open `index.html` in a browser.
2. Fill in device settings, interface details, routing, and management options using the dropdown menus.
3. Click **Generate Config** and copy the output.

---

## File Structure

```
Cisco config generator/          ← project root (served at localhost:5500)
├── .claude/launch.json          ← dev server config (Python http.server → Downloads/)
└── README.md                    ← this file

C:/Users/chris/Downloads/
├── cisco-config-generator-v7.html   ← main app (all English, fully translated)
├── cisco-config-generator-v6.html   ← previous versions
└── ...
```

---

## Notes

- Generated configs are designed for **Cisco Packet Tracer** but also work as a starting point for real IOS devices.
- The `enable secret` and line passwords are set to `cisco` — change these before deploying.
- VLAN IDs are auto-assigned as 10, 20, 30… per subnet order within a location.
- Transit subnets for L3 switches use the `172.16.x.0/30` range.
