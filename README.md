# AgriPulse 🌱

AgriPulse is a responsive smart-agriculture workspace built with React 18, TypeScript, Vite, Tailwind CSS and Lucide icons. It includes a farm overview, crop-cycle manager, soil diagnostics and harvest logistics planner.

## Features

- Farm dashboard with acreage, soil moisture, harvest countdowns and planning-value estimates.
- Crop batch creation, search, progress tracking and removal.
- Soil nutrient and moisture controls with contextual, non-prescriptive recommendations.
- Inventory temperature monitoring and a route/fuel planning estimator.
- CSV crop report export.
- Browser localStorage persistence for crop batches, soil readings, inventory and irrigation preference.
- Responsive dark agri-tech interface.

> Weather, farm metrics, soil readings and logistics figures in this starter workspace are sample/demo data. They are not connected to live sensors, weather services, maps or market prices. Soil recommendations are general guidance, not a substitute for laboratory analysis or local agricultural extension advice.

## Getting started

Requirements: Node.js 20.19+ or 22.12+ and npm.

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run typecheck
npm run build
npm run preview
```

## Deploy to Vercel

1. Import `kennedy-blip/Agri-pulse` from GitHub in Vercel.
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Install command: `npm install`.
6. Deploy. No environment variables are required for the demo version.

## Project structure

```text
src/
  components/       Reusable dashboard components
  hooks/            localStorage persistence hook
  App.tsx           Workspace modules and interactions
  mockData.ts       Demo farm data
  types.ts          Shared TypeScript models
  main.tsx          React entry point
  styles.css        Responsive design system
```

## Next production steps

Connect a trusted weather API, farm IoT/sensor ingestion, geocoding/routing provider and authenticated database before using this for operational decisions. Add server-side authorization, validation, audit logs and backups before storing real farm records.