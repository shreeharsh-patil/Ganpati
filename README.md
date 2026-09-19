# Aamche Bappa — Ganpati Pandal Atlas

An exact, high-performance interactive atlas covering verified Ganpati pandals, historic temples, and modak stops across **Maharashtra**, **Karnataka**, and **Goa**. Features complete editorial styling, typography, interactive OpenStreetMap/Leaflet integration, state & regional filter bars, dynamic marquee, modak directory, and route planner.

## Features Included

- **Editorial Ganesh Utsav Design**: Full typography (Public Sans, Bricolage Grotesque, Tiro Devanagari Marathi) with local WOFF2 assets and CSS variables.
- **Hero & Countdown Banner**: Dynamic countdown / active status for Ganesh Chaturthi 2026.
- **Shloka & How It Works**: 3-step darshan planning guide with original icons and editorial layout.
- **Interactive OpenStreetMap / Leaflet Atlas**:
  - Pandal markers with ranks (#1, #2, etc.), confidence indicators (exact vs. approximate), and custom Ganesha icons.
  - Interactive popups with timing, address, Google Maps walking directions, route options, and report modal.
  - Modak stops layer with custom green icons and detail cards.
- **Pandal Marquee**:
  - Smooth 60s infinite scrolling card marquee.
  - Interactive pause on hover/touch.
  - Direct selection of pandals to center map and open navigation drawer.
- **Search & Filter Strip**:
  - Real-time search across pandal names, areas, and addresses.
  - Filter popover with options for "Exact pins only" and "Published visiting times".
  - Active filter badges and one-click reset.
- **Nearby Footer & Route Planner**:
  - Distance sorting with browser geolocation ("Allow location" / "Find near me").
  - Nearest 3 pandals with distance calculations (Haversine formula).
  - Multi-stop darshan route planner with reordering (move earlier/later) and direct export to Google Maps walking route with waypoints.
- **Interactive Modals & Dialogs**:
  - **Open navigation dialog** with walking directions and location pin.
  - **Report a problem modal** with structured radio reasons and feedback confirmation.
  - **Add a pandal community modal** with address input, interactive mini-map pin drop, and local storage persistence.
  - Floating toast notifications.
- **Lotus Bloom Interactive Scroll Effect**:
  - Multi-petal SVG lotus blooming dynamically as the user scrolls.

## Run Locally

```bash
python -m http.server 4173
```

Then open `http://localhost:4173` in your browser.
