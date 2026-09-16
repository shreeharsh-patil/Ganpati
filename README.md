# Aamche Bappa — Ganpati Pandal Atlas

A responsive Mumbai Ganesh Utsav guide inspired by the provided Ganpati Pandal Atlas reference.

## What is included

- Editorial Ganpati festival landing page with Marathi + English typography
- Interactive Leaflet/OpenStreetMap atlas
- Pandal directory with 70 entries and status filters
- Browser geolocation and distance sorting
- Multi-stop darshan route planner with Google Maps hand-off
- Separate modak-stop layer
- Local-only “Add a pandal” flow using `localStorage`
- Responsive mobile navigation and accessible controls
- No build step: deploy as a static site on Vercel, Netlify, GitHub Pages, or any static host

## Run locally

```bash
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Data note

Locations and timings are planning references and may be approximate. Festival conditions, timings, traffic diversions, and queue rules can change quickly. Verify important details with the mandal or local authorities before travelling.

## Next production step

The “Add a pandal” form currently stores suggestions in the visitor's browser only. Connect it to your preferred database/API and moderation workflow before accepting public submissions.
