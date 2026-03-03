# TARA MARK II — Rover Dashboard UI

<div align="center">

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![WebSocket](https://img.shields.io/badge/WebSocket-Realtime-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A sci-fi inspired, real-time ground station dashboard for URC (University Rover Challenge) rover operations.**

*Multi-camera WebSocket feeds • Live telemetry monitoring • 3S LiPo cell tracking • HUD-style interface*

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Camera Configuration](#-camera-configuration)
- [Telemetry System](#-telemetry-system)
- [Component Reference](#-component-reference)
- [Agentic Instructions](#-agentic-instructions)
- [Contributing](#-contributing)
- [Roadmap](#-roadmap)

---

## 🌐 Overview

**ASTRA MARK II** is a React-based single-page ground station dashboard designed for real-time monitoring and control of a Mars rover during the University Rover Challenge (URC). The UI features a dark, sci-fi HUD aesthetic with scanline overlays, neon accents, and monospace telemetry fonts — providing operators with a clear, immersive interface for mission-critical operations.

The dashboard connects to the rover via **WebSocket streams** for live camera feeds and displays simulated telemetry data with physics-based interpolation for realistic sensor fluctuation.

---

## ✨ Features

### 🎥 Multi-Camera Feed System
- **5 simultaneous camera views** from 4 WebSocket streams
- **ZED2 Stereo Camera** — split into Depth Mode (left) and RGB Mode (right) views
- **Front View Camera** — with REC/STANDBY status badge
- **Arm Camera & Arm Video** — dual arm-mounted feeds
- Per-camera **enable/disable toggles** and **live FPS tracking**
- Connection status indicators (green = connected, red = disconnected)
- Graceful disconnection handling with animated placeholder UI

### 📊 Live Telemetry Dashboard
- **Temperature** — color-coded thresholds (green < 32°C, amber 32–35°C, red > 35°C)
- **Speed** — real-time km/h readout
- **Moisture & Humidity** — environmental percentage sensors
- **3S LiPo Battery Monitoring** — individual Cell 1, Cell 2, Cell 3 voltages with amber warning below 3.6V
- **Battery percentage** — color-coded health (green > 40%, amber 20–40%, red < 20%)
- Smooth value transitions via custom `SensorSimulator` class

### 🎨 Sci-Fi HUD Interface
- Dark theme with CSS custom properties (`--bg`, `--accent`, `--accent2`, `--accent3`)
- Animated scanline overlay across the entire viewport
- Grid overlays and corner brackets on camera panels
- Monospace telemetry font (`Share Tech Mono`) + UI font (`Rajdhani`)
- Blinking status indicators and smooth color transitions

### 🧩 Modular Dashboard Panels (Expandable)
- Navigation, Science Data, Environmental Conditions
- System Status, Mission Control (with interactive mission selector)
- Team Communication

---

## 📸 Screenshots

> *Add screenshots of the dashboard here*
>
> ```
> screenshots/
> ├── dashboard-full.png
> ├── camera-feeds.png
> ├── telemetry-strip.png
> └── zed-stereo-split.png
> ```

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                     ASTRA MARK II Dashboard                  │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ TOP BAR — Logo │ Speed │ Battery │ Temp │ Online/Offline│ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌─────────────────────────────────────────────────────────┐ │
│  │ METRICS STRIP (8-col grid)                              │ │
│  │ Temp │ Speed │ Moisture │ Humidity │ C1 │ C2 │ C3 │ Bat│ │
│  └─────────────────────────────────────────────────────────┘ │
│  ┌──────────────────────┬──────────────────────┐            │
│  │  ZED2 Depth (Left)   │  ZED2 RGB (Right)    │  Row 1     │
│  │  [ws://....:8003]    │  [ws://....:8003]    │            │
│  ├────────────┬─────────┴──┬───────────────────┤            │
│  │ Front View │ Arm Camera │ Arm Video          │  Row 2     │
│  │ [:8000]    │ [:8001]    │ [:8002]            │            │
│  └────────────┴────────────┴───────────────────┘            │
└──────────────────────────────────────────────────────────────┘

Data Flow:
  Rover (192.168.0.5) ──WebSocket──► Browser (React App)
  Ports: 8000-8003         Base64 JPEG frames
```

---

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| **React 18.2** | UI framework (functional components + hooks) |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Custom CSS** | HUD effects, scanlines, animations, grid layout |
| **Lucide React** | Icon library (Camera, Compass, Activity, Settings, etc.) |
| **WebSocket API** | Real-time camera stream ingestion |
| **Canvas API** | ZED2 stereo image splitting (left/right crop) |
| **Create React App** | Build tooling & dev server |
| **PostCSS + Autoprefixer** | CSS processing pipeline |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x (or yarn)
- Rover running WebSocket camera servers on `192.168.0.5:8000–8003`

### Installation

```bash
# Clone the repository
git clone https://github.com/Vaibhavs006/URC-Dash-Board.git
cd URC-Dash-Board/RoverUI

# Install dependencies
npm install

# Start development server
npm start
```

The dashboard will open at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
```

Generates optimized static files in the `build/` directory.

### Network Configuration

Ensure your machine is on the same network as the rover (`192.168.0.x` subnet). The dashboard expects WebSocket servers at:

| Port | Stream |
|---|---|
| `8000` | Front View Camera |
| `8001` | Arm Camera |
| `8002` | Arm Video |
| `8003` | ZED2 Depth Camera (stereo) |

To change the rover IP or ports, edit `src/config/cameraConfig.js`.

---

## 📁 Project Structure

```
RoverUI/
├── public/
│   ├── index.html              # HTML shell (loads Google Fonts)
│   ├── manifest.json           # PWA manifest
│   └── robots.txt
├── src/
│   ├── App.js                  # ★ Main dashboard — telemetry simulation + layout
│   ├── App.css                 # Top bar, metrics strip, camera grid styles
│   ├── index.js                # React entry point
│   ├── index.css               # CSS variables, Tailwind directives, scanline overlay
│   ├── config/
│   │   └── cameraConfig.js     # WebSocket URLs for all camera feeds
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── CamFeed.js      # ★ Camera feed component (WebSocket + ZED split)
│   │   │   ├── Nav.js          # Navigation panel (placeholder)
│   │   │   ├── SciData.js      # Science data panel (placeholder)
│   │   │   ├── SysStat.js      # System status panel (placeholder)
│   │   │   ├── EnvCondition.js # Environmental conditions (placeholder)
│   │   │   ├── MisnCtrl.js     # Mission control (interactive mission selector)
│   │   │   └── TeamCom.js      # Team communication (placeholder)
│   │   ├── shared/
│   │   │   └── CamCtrl.js      # Camera controls (placeholder)
│   │   └── ui/
│   │       └── card.js         # Reusable Card, CardHeader, CardTitle, CardContent
│   ├── reportWebVitals.js      # Performance monitoring
│   └── setupTests.js           # Test configuration
├── package.json
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS plugins
└── jsconfig.json               # Absolute import paths (baseUrl: "src")
```

---

## 📹 Camera Configuration

Camera feeds are defined in `src/config/cameraConfig.js`:

```js
// Each camera object
{
  name: "Front View Camera",
  type: "regular",           // "regular" | "zed"
  ip: "192.168.0.5",
  port: 8000,
  wsUrl: "ws://192.168.0.5:8000"
}
```

### ZED2 Stereo Processing

The ZED2 camera delivers a **side-by-side stereo image** over a single WebSocket stream. The `CamFeed` component uses hidden `<canvas>` elements to split the frame:

- **Left half** → Depth Mode panel
- **Right half** → RGB Mode panel

Each half is rendered independently with its own status indicators and FPS counter.

---

## 📈 Telemetry System

### SensorSimulator Class

Telemetry values use a custom `SensorSimulator` class that provides smooth, realistic fluctuations:

```js
new SensorSimulator(min, max, changeRate)
```

| Sensor | Range | Change Rate | Warning Threshold |
|---|---|---|---|
| Temperature | 20–45 °C | 0.5 | > 32°C amber, > 35°C red |
| Speed | 5–7 km/h | 0.3 | — |
| Moisture | 10–90 % | 2.0 | — |
| Humidity | 20–95 % | 1.5 | — |
| Cell 1 Voltage | 3.5–4.2 V | 0.02 | < 3.6V amber |
| Cell 2 Voltage | 3.5–4.2 V | 0.02 | < 3.6V amber |
| Cell 3 Voltage | *calculated* | — | < 3.6V amber |
| Battery | 0–100 % | 0.5 | < 20% red, < 40% amber |

> **Note:** Cell 3 voltage is derived as `12.0 - Cell1 - Cell2` to ensure the 3S LiPo pack always totals 12V.

Sensors update every **250ms** via `setInterval`.

---

## 🧱 Component Reference

### `<CamFeed />` — Camera Feed Panel
The core component rendering all 5 camera views. Manages WebSocket connections, frame decoding, FPS tracking, and ZED stereo splitting.

**Key State:**
- `frames` — latest base64 JPEG per camera
- `connected` — connection status per camera
- `enabled` — toggle per camera
- `fps` — live FPS counter per camera

### `<MisnCtrl />` — Mission Control
Interactive mission selector with 3 mission types:
- 🔬 Science Mission
- 📦 Delivery Mission
- 🔧 Equipment Servicing

### `<SysStat />` — System Status
Displays battery level, signal strength, temperature, operational status, and LED indicator. *(Props-driven, not yet wired to live data.)*

### `<SciData />` — Science Data
Accepts `pHValue` prop for soil/sample analysis display.

### Card System (`card.js`)
Reusable compound components: `Card`, `CardHeader`, `CardTitle`, `CardContent` — used by all dashboard panels.

---

## 🤖 Agentic Instructions

> **These instructions are for AI coding agents (GitHub Copilot, Cursor, Cline, etc.) working on this codebase.**

### Project Context
- **Framework**: React 18 (CRA) with Tailwind CSS + custom CSS
- **Language**: JavaScript (ES6+), no TypeScript
- **State Management**: Local `useState`/`useEffect` only — no Redux or Context API
- **Styling**: Hybrid Tailwind utilities + custom CSS in `App.css` and `index.css`
- **Imports**: Absolute imports enabled via `jsconfig.json` (`baseUrl: "src"`)

### Code Conventions
1. **Functional components only** — no class components
2. **Hooks for all state/effects** — `useState`, `useEffect`, `useRef`
3. **File naming**: PascalCase for components (`CamFeed.js`), camelCase for configs (`cameraConfig.js`)
4. **CSS approach**: Use Tailwind utilities first; add custom CSS in `App.css` or `index.css` for complex effects (animations, pseudo-elements, gradients)
5. **Icons**: Use `lucide-react` — do not add other icon libraries
6. **Component location**: Dashboard panels → `src/components/dashboard/`, shared utilities → `src/components/shared/`, base UI → `src/components/ui/`

### Critical Patterns

#### WebSocket Camera Integration
```
- Camera config lives in src/config/cameraConfig.js
- Each camera has: name, type ("regular"|"zed"), ip, port, wsUrl
- WebSocket sends base64 JPEG frames as plain text messages
- ZED cameras deliver side-by-side stereo; split using Canvas API
- Always handle connection/disconnection gracefully with status UI
```

#### Telemetry Simulation
```
- SensorSimulator class is defined inline in App.js
- Uses physics-based interpolation (target + velocity approach)
- 250ms update interval
- Cell 3 voltage = 12.0 - Cell1 - Cell2 (constraint)
- Color thresholds are applied inline via ternary expressions
```

#### Theming / CSS Variables
```
- --bg: #0a0c0f       (background)
- --panel: #0f1218    (panel surfaces)
- --accent: #00e5ff   (primary cyan)
- --accent2: #ff3d5a  (warning red)
- --accent3: #39ff8f  (healthy green)
- --warn: #ffb830     (amber warning)
- Always use these variables for consistency
```

### Common Tasks

#### Adding a New Camera Feed
1. Add the camera config to `src/config/cameraConfig.js`
2. The `CamFeed` component auto-creates WebSocket connections for all entries
3. For special processing (like ZED split), add logic in `CamFeed.js`

#### Wiring a Placeholder Component
1. Import the component in `App.js`
2. Replace the simulated data with real WebSocket/API data
3. Pass data as props to the component
4. Ensure consistent styling using CSS variables and Card components

#### Adding New Telemetry Sensors
1. Create a new `SensorSimulator` instance in `App.js`
2. Add it to the `useEffect` update interval
3. Add the metric to the metrics strip grid in the JSX
4. Apply color thresholds using the existing ternary pattern

#### Modifying the Layout
- Top bar: CSS class `.topbar` in `App.css`
- Metrics strip: CSS class `.metrics-strip` (8-column grid)
- Camera grid: CSS class `.content` (6-column × 2-row grid)
- Adjust `grid-template-columns` and `grid-column` spans as needed

### Do NOT
- ❌ Add TypeScript — this project is intentionally plain JavaScript
- ❌ Add React Router — this is a single-page dashboard, not a multi-page app
- ❌ Add Redux/MobX/Zustand — keep state local unless explicitly requested
- ❌ Modify the scanline/HUD effects without user approval — they define the visual identity
- ❌ Change the camera WebSocket protocol — the rover firmware expects this exact format
- ❌ Remove the 12V battery constraint (Cell3 = 12 - C1 - C2)

### Testing
- Run `npm test` — uses React Testing Library (default CRA setup)
- Test files follow `*.test.js` naming convention
- Camera feeds require the rover to be online; mock WebSocket in tests

---

## 🤝 Contributing

1. **Fork** the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat: add new feature"`
4. Push to branch: `git push origin feature/my-feature`
5. Open a **Pull Request**

### Commit Convention
- `feat:` — new feature
- `fix:` — bug fix
- `style:` — styling/UI changes
- `refactor:` — code restructuring
- `docs:` — documentation updates
- `chore:` — maintenance tasks

---

## 🗺 Roadmap

- [ ] Wire placeholder components (Nav, SciData, SysStat, EnvCondition, TeamCom) to live data
- [ ] Replace simulated telemetry with real ROS/WebSocket sensor streams
- [ ] Add gamepad/joystick control integration for rover movement
- [ ] Implement robotic arm control UI with joint angle visualization
- [ ] Add GPS/IMU-based map view in the Navigation panel
- [ ] Implement soil pH / spectrometer data visualization in Science Data
- [ ] Add recording functionality for camera feeds
- [ ] WebRTC upgrade for lower-latency video streaming
- [ ] Add dark/light theme toggle (preserving HUD aesthetic)
- [ ] PWA support for offline dashboard access

---

## 📄 License

This project is part of the URC (University Rover Challenge) competition effort.

---

<div align="center">

**Built with ❤️ for the University Rover Challenge**

*ASTRA MARK II — Ground Station Dashboard*

</div>
