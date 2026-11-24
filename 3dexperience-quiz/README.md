# 3DEXPERIENCE Basic Knowledge Quiz

An interactive, responsive **3DEXPERIENCE Basic Knowledge Quiz** built with vanilla HTML, CSS, and JavaScript.

## Features

- **105-Question Knowledge Database**: Covers 10 core 3DEXPERIENCE domains (Platform & 3DCompass, 3DDashboard & Widgets, 3DSwym & Collaboration, 3DDrive & File Sharing, 3DSpace & Collaborative Spaces, 3DSearch & 6WTags, Lifecycle & Revisions, 3DPlay & Data Organization, Tasks/Issues/Routes & Change Management, and Dassault Systèmes Brands, Roles & Administration).
- **4 Choices, 1 Correct Answer**: Questions and options are dynamically shuffled on every game using `crypto.getRandomValues`.
- **Two Single-Use Special Jokers**:
  - **50/50** — removes 2 wrong answers on the current question (usable once per game).
  - **Ask the 3DEXPERIENCE Champion** — displays tailored domain advice and an expert recommendation (usable once per game).
- **Gold Medal Reward System**: Earn a gold medal for every correct answer, tracked in real time in the header and Medal Collection shelf, with a full medal showcase and rank title at the end of the game.
- **Game Controls**: **Stop Game** (end anytime and view total medals earned) and **Restart Game** (reset medals, restore both jokers, and reshuffle questions).
- **Day & Night Mode + Sound Toggle**: Smooth theme switching and subtle synthesized audio feedback.

## Running Locally

Open `index.html` in any modern browser or serve locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.
