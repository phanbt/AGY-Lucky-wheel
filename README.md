# Lucky Draw

An interactive, responsive **Lucky Draw** spinning-wheel web app built with vanilla HTML, CSS, and JavaScript for both laptops and smartphones.

## Features

- **Flexible Name Entry**: Enter names one per line or comma-separated, remove individual entries, shuffle the wheel, or load a sample roster.
- **Fair Spinning Wheel**: Smooth physics-based deceleration, cryptographically unbiased slice selection (`crypto.getRandomValues`), subtle peg-tick audio/visual feedback, and automatic winner removal after each spin.
- **Final-Two Rule**: When only 2 names remain on the wheel, spinning automatically crowns both the **Before Last** winner and the **Last Winner** and displays the full summary.
- **Game Controls**:
  - **Spin** — spin the wheel to draw and remove the next winner.
  - **Stop** — end the current session at any time and display the ordered list of winners.
  - **Replay** — restart from the beginning with the exact same initial list of names.
  - **Reset** — clear all names and winners to start fresh.
- **Day & Night Mode**: Toggle smoothly between warm Day and charcoal Night themes (persisted in `localStorage`).
- **Laptop & Smartphone Ready**: High-DPI responsive canvas and thumb-friendly mobile layout.

## Running Locally

Open `index.html` directly in any modern browser, or serve the folder locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
