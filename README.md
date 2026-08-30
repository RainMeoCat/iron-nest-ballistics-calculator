English · [繁體中文](README.zh-TW.md) · [简体中文](README.zh-CN.md) · [Français](README.fr.md) · [Deutsch](README.de.md) · [Español](README.es.md) · [Português (Brasil)](README.pt-BR.md) · [Українська](README.uk.md) · [日本語](README.ja.md) · [Русский](README.ru.md) · [한국어](README.ko.md) · [Čeština](README.cs.md) · [Polski](README.pl.md) · [Italiano](README.it.md) · [Español (Latinoamérica)](README.es-419.md) · [Türkçe](README.tr.md)

# Iron Nest Ballistics Calculator

A ballistics calculator built with Vue 3 + TypeScript + Vite. It computes distance, azimuth, elevation, flight time, and fire time from gun and target coordinates, and manages a fire queue for two guns. The UI supports 16 languages.

## Usage

1. **Set the gun position**: Click the "Gun Position" button at the top of the screen and pick the block (A–T), row (1–10), and sub-coordinates (X/Y, 0–9) in the popup to set where the gun sits.
2. **Set the target coordinates**: In the "Target Position" panel, enter the target's coordinates the same way.
3. **Choose charge bags**: Pick a charge value from 1–6. Options that exceed the current range (each charge bag reaches at most 5km) are automatically disabled, and the selection switches to a valid value if the distance changes and outgrows it.
4. **(Optional) Set the target impact time**: Open settings (gear icon) and enable "Enable impact time / fire time", then enter the target's impact time (24-hour format) under "Target Impact Time" — the result will back-calculate the corresponding fire time.
5. **Read the results**: The "Results" panel shows, live:
   - **Distance**: distance between gun and target (km)
   - **Azimuth**: bearing in degrees
   - **Elevation**: elevation angle
   - **Flight Time**: shell flight time in seconds (requires impact time enabled)
   - **Fire Time**: the time to fire at (requires impact time enabled)
6. **Add to the fire queue**: Click "Load Gun 1" or "Load Gun 2" to save the current target coordinates, charge, azimuth, elevation, and (if enabled) fire/impact time into that gun's queue (up to 5 records each). In the queue panel you can mark a record as fired or delete it.
7. **Switch language**: Use the language menu in the top-right corner to change the UI language; the choice is saved in the browser and remembered next time.

## Development Setup

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run build      # Type-check and build for production
npm run preview    # Preview the production build
npm run lint        # Lint the codebase
npm run lint:fix    # Auto-fix lint issues
npm run format      # Format with Prettier and fix lint issues
```

## Tech Stack

- [Vue 3](https://vuejs.org/) `<script setup>` + TypeScript
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [vue-i18n](https://vue-i18n.intlify.dev/)
- [motion-v](https://motion.dev/) / [lucide-vue-next](https://lucide.dev/)
