# Aamche Bappa — Ganpati Pandal Atlas

A responsive Ganesh Utsav guide for Goa, Karnataka and Maharashtra, inspired by the provided Ganpati Pandal Atlas reference.

## What is included

- Editorial Ganpati festival landing page with Marathi + English typography
- Interactive Leaflet/OpenStreetMap atlas
- Multi-state pandal directory spanning Goa, Karnataka and Maharashtra
- State and city filters that stay synchronized with the map
- Original Mumbai dataset plus Pune, Bengaluru, Belagavi, Mangaluru, Hubballi and Goa coverage seeds
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

Locations and timings are planning references and may be approximate. Regional entries marked “Needs checking” are intentionally not presented as confirmed 2026 schedules. Festival conditions, timings, traffic diversions, and queue rules can change quickly. Verify important details with the mandal or local authorities before travelling.

## Next production step

The “Add a pandal” form currently stores suggestions in the visitor's browser only. Connect it to your preferred database/API and moderation workflow before accepting public submissions.
