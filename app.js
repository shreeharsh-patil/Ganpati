const pandals = [
  { id: 1, name: "Lalbaugcha Raja", area: "Lalbaug", lat: 18.9927, lng: 72.8375, status: "confirmed", timing: "Aarti: ~7 AM · 12–1 PM · 7 PM · 10 PM" },
  { id: 2, name: "Mumbaicha Raja (Ganesh Galli)", area: "Lalbaug", lat: 18.9941, lng: 72.8386, status: "confirmed", timing: "Aarti unpublished · Darshan 9 AM–3 PM" },
  { id: 3, name: "GSB Seva Mandal", area: "King's Circle", lat: 19.0271, lng: 72.8553, status: "confirmed", timing: "Aarti unpublished · Darshan 6 AM–11 PM" },
  { id: 4, name: "Andhericha Raja", area: "Andheri West", lat: 19.1363, lng: 72.8277, status: "confirmed", timing: "Aarti unpublished · Darshan 5 AM–12 PM" },
  { id: 5, name: "Chinchpoklicha Chintamani", area: "Chinchpokli", lat: 18.987, lng: 72.833, status: "confirmed", timing: "Evening aarti · Darshan 10 AM–9 PM" },
  { id: 6, name: "Girgaoncha Raja", area: "Girgaon", lat: 18.9531, lng: 72.8174, status: "confirmed", timing: "Aarti unpublished · Visiting 9 AM–6 PM" },
  { id: 7, name: "Khetwadicha Ganraj", area: "Khetwadi", lat: 18.9626, lng: 72.817, status: "confirmed", timing: "Aarti unpublished · Open during the day" },
  { id: 8, name: "Keshavji Naik Chawl Ganpati", area: "Girgaon", lat: 18.956, lng: 72.819, status: "confirmed", timing: "Aarti unpublished · Open any time of day" },
  { id: 9, name: "Malabar Hill Cha Raja", area: "Grant Road West", lat: 18.9647, lng: 72.8134, status: "confirmed", timing: "Aarti: 8 AM · 8 PM daily" },
  { id: 10, name: "Fortcha Raja", area: "Fort / Ballard Estate", lat: 18.9343, lng: 72.8371, status: "confirmed", timing: "Aarti time not published" },
  { id: 11, name: "Raja Tejukayacha", area: "Lalbaug", lat: 18.9976, lng: 72.8402, status: "confirmed", timing: "Aarti time not published" },
  { id: 12, name: "Parel Cha Raja", area: "Parel East", lat: 19.009, lng: 72.837, status: "confirmed", timing: "Aarti time not published" },
  { id: 13, name: "Kalachowkicha Mahaganpati", area: "Kalachowki", lat: 18.997, lng: 72.84, status: "confirmed", timing: "Aarti time not published" },
  { id: 14, name: "Chandanwadi Cha God Ganpati", area: "Chandanwadi / Marine Lines", lat: 18.9438, lng: 72.8239, status: "confirmed", timing: "Aarti time not published" },
  { id: 15, name: "Dongri Cha Raja", area: "Dongri / Umerkhadi", lat: 18.9615, lng: 72.84, status: "confirmed", timing: "Aarti time not published" },
  { id: 16, name: "GSB Ganpati Wadala", area: "Wadala", lat: 19.0178, lng: 72.8562, status: "confirmed", timing: "Aarti not listed · Poojas 7 AM–9 PM" },
  { id: 17, name: "Sahyadri Krida Mandal", area: "Tilak Nagar, Chembur", lat: 19.0522, lng: 72.9005, status: "confirmed", timing: "Aarti time not published" },
  { id: 18, name: "Mumbai Cha Peshwa", area: "Vile Parle East", lat: 19.1003, lng: 72.853, status: "confirmed", timing: "Aarti time not published" },
  { id: 19, name: "Ghatkopar Cha Raja", area: "Ghatkopar East", lat: 19.079, lng: 72.908, status: "confirmed", timing: "Aarti time not published" },
  { id: 20, name: "Sanpadyacha Maharaja", area: "Sanpada, Navi Mumbai", lat: 19.0607, lng: 73.0104, status: "confirmed", timing: "Aarti: 7 AM · 8 PM daily" },
  { id: 21, name: "Tejukaya Sarvajanik Ganeshotsav Mandal", area: "Lalbaug", lat: 18.9967, lng: 72.8391, status: "check", timing: "Aarti time not published" },
  { id: 22, name: "Parel Sarvajanik Utsav Mandal (Parelcha Raja)", area: "Nare Park, Parel", lat: 19.0068, lng: 72.8384, status: "check", timing: "Aarti time not published" },
  { id: 23, name: "Khetwadi 11th Galli Mandal (Mumbaicha Maharaja)", area: "Khetwadi 11th Lane", lat: 18.9617, lng: 72.8167, status: "check", timing: "Aarti time not published" },
  { id: 24, name: "Sahyadri Krida Mandal", area: "Tilak Nagar, Chembur", lat: 19.0544, lng: 72.8983, status: "check", timing: "Aarti time not published" },
  { id: 25, name: "Jolly Boys Sarvajanik Ganesh Mandal", area: "Bandra", lat: 19.0596, lng: 72.8295, status: "check", timing: "Aarti time not published" },
  { id: 26, name: "Dongricha Raja", area: "Chinch Bunder, Dongri", lat: 18.9584, lng: 72.8392, status: "check", timing: "Aarti time not published" },
  { id: 27, name: "Bhaveshwar Cha Raja", area: "Ghatkopar", lat: 19.0812, lng: 72.9047, status: "check", timing: "Aarti time not published" },
  { id: 28, name: "Juhu Ganesh Mandal", area: "Juhu", lat: 19.1075, lng: 72.8263, status: "check", timing: "Aarti time not published" },
  { id: 29, name: "Akhil Chandanwadi Cha Raja", area: "Chandanwadi", lat: 18.9443, lng: 72.8246, status: "check", timing: "Aarti time not published" },
  { id: 30, name: "Kolbhat Lane Cha Raja", area: "Kolbhat Lane", lat: 18.9546, lng: 72.821, status: "check", timing: "Aarti time not published" },
  { id: 31, name: "Matoshreecha Vighnaharta", area: "Parel", lat: 19.0106, lng: 72.8393, status: "confirmed", timing: "Aarti time not published" },
  { id: 32, name: "Colabyacha Ladka", area: "Colaba", lat: 18.9067, lng: 72.8147, status: "confirmed", timing: "Aarti time not published" },
  { id: 33, name: "Dharavicha Sukhkarta", area: "Dharavi", lat: 19.0418, lng: 72.853, status: "confirmed", timing: "Aarti time not published" },
  { id: 34, name: "Ekveera Mitra Mandal", area: "Kurla West", lat: 19.0726, lng: 72.8845, status: "confirmed", timing: "Aarti time not published" },
  { id: 35, name: "Malad Cha Maharaja", area: "Malad", lat: 19.1874, lng: 72.8484, status: "confirmed", timing: "Aarti time not published" },
  { id: 36, name: "Site Group", area: "Malad West", lat: 19.1845, lng: 72.8396, status: "confirmed", timing: "Aarti time not published" },
  { id: 37, name: "Mazgaoncha Morya", area: "Mazgaon", lat: 18.9689, lng: 72.8466, status: "confirmed", timing: "Aarti time not published" },
  { id: 38, name: "Mumbadevicha Ganraj", area: "Mumbadevi", lat: 18.9516, lng: 72.8296, status: "confirmed", timing: "Aarti time not published" },
  { id: 39, name: "Sioncha Icchapurti", area: "Sion", lat: 19.0434, lng: 72.8636, status: "confirmed", timing: "Aarti time not published" },
  { id: 40, name: "Vashi Cha Raja", area: "Vashi, Navi Mumbai", lat: 19.076, lng: 72.9982, status: "confirmed", timing: "Aarti time not published" },
  { id: 41, name: "Akhil Mahakali Sarvajanik Ganeshotsav Mandal", area: "Andheri East", lat: 19.1197, lng: 72.8468, status: "historic", timing: "Aarti time not published" },
  { id: 42, name: "Guru Kripa Seva Mandal", area: "Bandra West", lat: 19.0605, lng: 72.828, status: "historic", timing: "Aarti time not published" },
  { id: 43, name: "Jagruti Mitra Mandal", area: "Bhandup West", lat: 19.1495, lng: 72.9372, status: "historic", timing: "Aarti time not published" },
  { id: 44, name: "Hari Mitra Mandal", area: "Borivali East", lat: 19.2307, lng: 72.8567, status: "historic", timing: "Aarti time not published" },
  { id: 45, name: "Chembur Sarvajanik Shree Ganeshotsav Mandal", area: "Chembur", lat: 19.052, lng: 72.899, status: "historic", timing: "Aarti time not published" },
  { id: 46, name: "Avighna Mitra Mandal", area: "Cuffe Parade, Colaba", lat: 18.912, lng: 72.8238, status: "historic", timing: "Aarti time not published" },
  { id: 47, name: "Bhatia Bhuvan Ganeshotsav Mandal", area: "Dadar West", lat: 19.0178, lng: 72.8478, status: "historic", timing: "Aarti time not published" },
  { id: 48, name: "Dahisar Bhaji Market Bal Mitra Mandal", area: "Dahisar East", lat: 19.2494, lng: 72.8597, status: "historic", timing: "Aarti time not published" },
  { id: 49, name: "Janseva Krutishil Mandal", area: "Dharavi", lat: 19.0396, lng: 72.8518, status: "historic", timing: "Aarti time not published" },
  { id: 50, name: "Karwar Street Mitra Mandal", area: "Fort", lat: 18.9357, lng: 72.8364, status: "historic", timing: "Aarti time not published" },
  { id: 51, name: "Jugnu Sports Club", area: "Ghatkopar East", lat: 19.0811, lng: 72.9091, status: "historic", timing: "Aarti time not published" },
  { id: 52, name: "Paper Mill Lane V.P. Road S.G.M.", area: "Girgaon", lat: 18.9549, lng: 72.8187, status: "historic", timing: "Aarti time not published" },
  { id: 53, name: "Khadicha Raja Guruchandramani Sarvajanik Mandal", area: "Goregaon West", lat: 19.1663, lng: 72.8526, status: "historic", timing: "Aarti time not published" },
  { id: 54, name: "Morya SRA CHS", area: "Govandi", lat: 19.054, lng: 72.9213, status: "historic", timing: "Aarti time not published" },
  { id: 55, name: "Grant Road Bal Mitra Mandal", area: "Grant Road", lat: 18.9647, lng: 72.816, status: "historic", timing: "Aarti time not published" },
  { id: 56, name: "Navchaitanya Mandal", area: "Jogeshwari East", lat: 19.1375, lng: 72.8646, status: "historic", timing: "Aarti time not published" },
  { id: 57, name: "Shiv Samarth Mitra Mandal", area: "Juhu", lat: 19.1045, lng: 72.8294, status: "historic", timing: "Aarti time not published" },
  { id: 58, name: "Omkar Tarun Mitra Mandal", area: "Kalachowki", lat: 18.9981, lng: 72.8421, status: "historic", timing: "Aarti time not published" },
  { id: 59, name: "Ganesh Seva Sangh", area: "Kandivali West", lat: 19.2058, lng: 72.8426, status: "historic", timing: "Aarti time not published" },
  { id: 60, name: "Navtarun Krida Mandal", area: "Khar East", lat: 19.0726, lng: 72.8644, status: "historic", timing: "Aarti time not published" },
  { id: 61, name: "1st Parsiwada Sarvajanik Utsav Mandal", area: "Khetwadi", lat: 18.9633, lng: 72.8181, status: "historic", timing: "Aarti time not published" },
  { id: 62, name: "Hiramani Super Market Ganeshotsav Mandal", area: "Lalbaug", lat: 18.9948, lng: 72.8399, status: "historic", timing: "Aarti time not published" },
  { id: 63, name: "Liberty Garden Sarvajanik Shree Ganeshutsav Mandal", area: "Malad West", lat: 19.1891, lng: 72.8392, status: "historic", timing: "Aarti time not published" },
  { id: 64, name: "Royal Cricket Club", area: "Matunga", lat: 19.027, lng: 72.855, status: "historic", timing: "Aarti time not published" },
  { id: 65, name: "Shambhucha Maharaja", area: "Mulund West", lat: 19.1726, lng: 72.9565, status: "historic", timing: "Aarti time not published" },
  { id: 66, name: "Vidhyarthi Seva Mandal", area: "Parel", lat: 19.0071, lng: 72.8362, status: "historic", timing: "Aarti time not published" },
  { id: 67, name: "Bal Mitra Mandal (Kalinacha Vighnaharta)", area: "Kalina, Santacruz East", lat: 19.0808, lng: 72.8531, status: "historic", timing: "Aarti time not published" },
  { id: 68, name: "Savali Seva Foundation", area: "Vikhroli East", lat: 19.1089, lng: 72.9255, status: "historic", timing: "Aarti time not published" },
  { id: 69, name: "Ramnagar Utsav Mandal", area: "Wadala West", lat: 19.0201, lng: 72.8503, status: "historic", timing: "Aarti time not published" },
  { id: 70, name: "Shivsfurti Mandal", area: "Worli", lat: 19.0178, lng: 72.8177, status: "historic", timing: "Aarti time not published" }
];

const modakStops = [
  { id: "m1", name: "Aaswad Upahar & Mithai Gruh", area: "Dadar West", lat: 19.0212, lng: 72.8376, note: "Traditional Maharashtrian sweets" },
  { id: "m2", name: "Panshikar", area: "Girgaon", lat: 18.9564, lng: 72.8209, note: "Classic festive mithai stop" },
  { id: "m3", name: "Prakash Shakahari Upahar Kendra", area: "Dadar", lat: 19.0204, lng: 72.8421, note: "Maharashtrian snacks & sweets" },
  { id: "m4", name: "MM Mithaiwala", area: "Malad West", lat: 19.1869, lng: 72.8467, note: "Large mithai selection" },
  { id: "m5", name: "D. Damodar Mithaiwala", area: "Parel", lat: 19.0039, lng: 72.8422, note: "Festive sweet stop" }
];

const state = {
  filter: "all",
  query: "",
  userLocation: null,
  route: [],
  customPandals: [],
  markers: new Map(),
  modakMarkers: new Map(),
  map: null,
  userMarker: null,
  toastTimer: null
};

const statusLabel = { confirmed: "Confirmed 2026", check: "Needs checking", historic: "Last seen 2023" };
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function escapeHTML(value = "") {
  return String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", '"': "&quot;" }[char]));
}

function allPandals() {
  return [...state.customPandals, ...pandals];
}

function distanceKm(a, b) {
  const toRad = deg => deg * Math.PI / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function pinIcon(type = "pandal") {
  return L.divIcon({
    className: "",
    html: `<div class="custom-pin ${type}"><span></span></div>`,
    iconSize: [28, 28],
    iconAnchor: [13, 27],
    popupAnchor: [0, -25]
  });
}

function initMap() {
  const mapStatus = $("#mapStatus");
  if (!window.L) {
    mapStatus.textContent = "Map library could not load. The pandal directory still works below.";
    return;
  }

  state.map = L.map("map", { scrollWheelZoom: false, zoomControl: false }).setView([19.02, 72.87], 11);
  L.control.zoom({ position: "bottomright" }).addTo(state.map);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(state.map);

  allPandals().forEach(addPandalMarker);
  modakStops.forEach(addModakMarker);
  mapStatus.textContent = `${allPandals().length} pandals · ${modakStops.length} modak stops`;
}

function addPandalMarker(pandal) {
  if (!state.map || state.markers.has(pandal.id)) return;
  const marker = L.marker([pandal.lat, pandal.lng], { icon: pinIcon("pandal") }).addTo(state.map);
  marker.bindPopup(`<div class="popup-title">${escapeHTML(pandal.name)}</div><div class="popup-meta">${escapeHTML(pandal.area)}<br>${escapeHTML(pandal.timing)}</div>`);
  marker.on("click", () => highlightPandal(pandal.id, false));
  state.markers.set(pandal.id, marker);
}

function addModakMarker(stop) {
  if (!state.map) return;
  const marker = L.marker([stop.lat, stop.lng], { icon: pinIcon("modak") }).addTo(state.map);
  marker.bindPopup(`<div class="popup-title">${escapeHTML(stop.name)}</div><div class="popup-meta">${escapeHTML(stop.area)} · ${escapeHTML(stop.note)}</div>`);
  state.modakMarkers.set(stop.id, marker);
}

function visiblePandals() {
  const q = state.query.trim().toLowerCase();
  let items = allPandals().filter(p => {
    const matchesFilter = state.filter === "all" || p.status === state.filter;
    const matchesQuery = !q || `${p.name} ${p.area} ${p.timing}`.toLowerCase().includes(q);
    return matchesFilter && matchesQuery;
  });
  if (state.userLocation) {
    items = items.map(p => ({ ...p, distance: distanceKm(state.userLocation, p) })).sort((a, b) => a.distance - b.distance);
  }
  return items;
}

function renderPandals() {
  const items = visiblePandals();
  const grid = $("#pandalGrid");
  $("#resultCount").textContent = items.length;
  $("#emptyState").hidden = items.length > 0;

  grid.innerHTML = items.map((pandal, index) => {
    const inRoute = state.route.includes(pandal.id);
    const distance = Number.isFinite(pandal.distance) ? `<span class="distance">${pandal.distance.toFixed(1)} km away</span>` : "";
    return `<article class="pandal-card" data-pandal-id="${pandal.id}">
      <div class="pandal-rank">#${String(index + 1).padStart(2, "0")}</div>
      <div class="pandal-main">
        <h3>${escapeHTML(pandal.name)}</h3>
        <div class="pandal-area">${escapeHTML(pandal.area)}</div>
      </div>
      <div class="pandal-info">
        <span class="status-badge ${pandal.status}">${escapeHTML(statusLabel[pandal.status] || "Community added")}</span>
        <span class="pandal-timing">${escapeHTML(pandal.timing)} ${distance}</span>
      </div>
      <div class="pandal-actions">
        <button class="small-action" type="button" data-map-id="${pandal.id}">View map</button>
        <button class="small-action primary ${inRoute ? "active" : ""}" type="button" data-route-id="${pandal.id}">${inRoute ? "Added ✓" : "+ Route"}</button>
      </div>
    </article>`;
  }).join("");
}

function renderRoute() {
  const list = $("#routeList");
  const count = $("#routeCount");
  const empty = $("#routeEmpty");
  const open = $("#openRouteButton");
  const clear = $("#clearRouteButton");
  const items = state.route.map(id => allPandals().find(p => p.id === id)).filter(Boolean);

  count.textContent = items.length;
  empty.hidden = items.length > 0;
  open.disabled = items.length === 0;
  clear.disabled = items.length === 0;
  list.innerHTML = items.map((p, index) => `<li class="route-item">
    <span class="route-item-index">${index + 1}</span>
    <div><strong>${escapeHTML(p.name)}</strong><span>${escapeHTML(p.area)}</span></div>
    <button type="button" data-remove-route="${p.id}" aria-label="Remove ${escapeHTML(p.name)} from route">×</button>
  </li>`).join("");
}

function renderModak() {
  $("#modakList").innerHTML = modakStops.map(stop => `<article class="modak-card">
    <div class="modak-icon" aria-hidden="true">◉</div>
    <div><h3>${escapeHTML(stop.name)}</h3><p>${escapeHTML(stop.area)} · ${escapeHTML(stop.note)}</p></div>
    <button type="button" data-modak-id="${stop.id}">View map</button>
  </article>`).join("");
}

function highlightPandal(id, scroll = true) {
  const pandal = allPandals().find(p => p.id === id);
  if (!pandal) return;
  if (state.map) {
    state.map.flyTo([pandal.lat, pandal.lng], 15, { duration: .8 });
    state.markers.get(id)?.openPopup();
  }
  if (scroll) $("#atlas")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function focusModak(id) {
  const stop = modakStops.find(s => s.id === id);
  if (!stop || !state.map) return;
  state.map.flyTo([stop.lat, stop.lng], 15, { duration: .8 });
  state.modakMarkers.get(id)?.openPopup();
  $("#atlas")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function toggleRoute(id) {
  if (state.route.includes(id)) {
    state.route = state.route.filter(routeId => routeId !== id);
  } else {
    if (state.route.length >= 9) {
      toast("Keep routes to 9 stops or fewer for easier navigation.");
      return;
    }
    state.route.push(id);
  }
  renderRoute();
  renderPandals();
}

function openRoute() {
  const stops = state.route.map(id => allPandals().find(p => p.id === id)).filter(Boolean);
  if (!stops.length) return;
  const origin = state.userLocation ? `${state.userLocation.lat},${state.userLocation.lng}` : `${stops[0].lat},${stops[0].lng}`;
  const destination = stops.length === 1 ? `${stops[0].lat},${stops[0].lng}` : `${stops.at(-1).lat},${stops.at(-1).lng}`;
  const waypointStops = state.userLocation ? stops.slice(0, -1) : stops.slice(1, -1);
  const waypoints = waypointStops.map(p => `${p.lat},${p.lng}`).join("|");
  const params = new URLSearchParams({ api: "1", origin, destination, travelmode: "walking" });
  if (waypoints) params.set("waypoints", waypoints);
  window.open(`https://www.google.com/maps/dir/?${params.toString()}`, "_blank", "noopener,noreferrer");
}

function locateUser() {
  if (!navigator.geolocation) {
    toast("Location is not supported by this browser.");
    return;
  }
  toast("Finding your location…");
  navigator.geolocation.getCurrentPosition(({ coords }) => {
    state.userLocation = { lat: coords.latitude, lng: coords.longitude };
    if (state.map) {
      if (state.userMarker) state.userMarker.remove();
      state.userMarker = L.marker([coords.latitude, coords.longitude], { icon: pinIcon("user") }).addTo(state.map).bindPopup("You are here");
      state.map.flyTo([coords.latitude, coords.longitude], 13, { duration: .9 });
    }
    renderPandals();
    toast("Nearby pandals are now sorted by distance.");
  }, error => {
    const message = error.code === 1 ? "Location permission was not granted." : "Could not determine your location.";
    toast(message);
  }, { enableHighAccuracy: true, timeout: 9000, maximumAge: 60000 });
}

function toast(message) {
  const el = $("#toast");
  clearTimeout(state.toastTimer);
  el.textContent = message;
  el.classList.add("show");
  state.toastTimer = setTimeout(() => el.classList.remove("show"), 2800);
}

function loadCustomPandals() {
  try {
    const parsed = JSON.parse(localStorage.getItem("aamche-bappa-custom-pandals") || "[]");
    if (Array.isArray(parsed)) state.customPandals = parsed;
  } catch { state.customPandals = []; }
}

function saveCustomPandal(form) {
  const data = new FormData(form);
  const pandal = {
    id: `custom-${Date.now()}`,
    name: data.get("name")?.toString().trim(),
    area: data.get("area")?.toString().trim(),
    lat: Number(data.get("lat")),
    lng: Number(data.get("lng")),
    timing: data.get("timing")?.toString().trim() || "Timing not provided",
    status: "check"
  };
  if (!pandal.name || !pandal.area || !Number.isFinite(pandal.lat) || !Number.isFinite(pandal.lng)) return false;
  state.customPandals.unshift(pandal);
  localStorage.setItem("aamche-bappa-custom-pandals", JSON.stringify(state.customPandals));
  addPandalMarker(pandal);
  renderPandals();
  toast("Pandal saved on this device.");
  return true;
}

function bindEvents() {
  $("#pandalSearch").addEventListener("input", event => { state.query = event.target.value; renderPandals(); });
  $("#filterPills").addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    state.filter = button.dataset.filter;
    $$("[data-filter]", $("#filterPills")).forEach(el => el.classList.toggle("active", el === button));
    renderPandals();
  });
  $("#pandalGrid").addEventListener("click", event => {
    const mapButton = event.target.closest("[data-map-id]");
    const routeButton = event.target.closest("[data-route-id]");
    if (mapButton) highlightPandal(Number.isNaN(Number(mapButton.dataset.mapId)) ? mapButton.dataset.mapId : Number(mapButton.dataset.mapId));
    if (routeButton) toggleRoute(Number.isNaN(Number(routeButton.dataset.routeId)) ? routeButton.dataset.routeId : Number(routeButton.dataset.routeId));
  });
  $("#routeList").addEventListener("click", event => {
    const remove = event.target.closest("[data-remove-route]");
    if (!remove) return;
    const raw = remove.dataset.removeRoute;
    toggleRoute(Number.isNaN(Number(raw)) ? raw : Number(raw));
  });
  $("#openRouteButton").addEventListener("click", openRoute);
  $("#clearRouteButton").addEventListener("click", () => { state.route = []; renderRoute(); renderPandals(); });
  $$('[data-action="locate"]').forEach(button => button.addEventListener("click", locateUser));
  $("#modakList").addEventListener("click", event => {
    const button = event.target.closest("[data-modak-id]");
    if (button) focusModak(button.dataset.modakId);
  });
  $("#focusModakButton").addEventListener("click", () => {
    if (state.map) {
      const bounds = L.latLngBounds(modakStops.map(s => [s.lat, s.lng]));
      state.map.fitBounds(bounds.pad(.35));
      $("#atlas")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  const menuButton = $("#menuButton");
  const mobileNav = $("#mobileNav");
  menuButton.addEventListener("click", () => {
    const expanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!expanded));
    mobileNav.hidden = expanded;
  });
  $$("a", mobileNav).forEach(link => link.addEventListener("click", () => {
    mobileNav.hidden = true;
    menuButton.setAttribute("aria-expanded", "false");
  }));

  const dialog = $("#addPandalDialog");
  const form = $("#addPandalForm");
  $("#addPandalButton").addEventListener("click", () => {
    dialog.showModal();
    document.body.classList.add("modal-open");
  });
  dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));
  form.addEventListener("submit", event => {
    const submitterValue = event.submitter?.value;
    if (submitterValue === "cancel") return;
    event.preventDefault();
    if (saveCustomPandal(form)) {
      form.reset();
      dialog.close();
      document.body.classList.remove("modal-open");
    }
  });
}

function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$(".reveal").forEach(el => el.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  $$(".reveal").forEach(el => observer.observe(el));
}

function init() {
  loadCustomPandals();
  renderPandals();
  renderRoute();
  renderModak();
  initMap();
  bindEvents();
  initReveal();
}

document.addEventListener("DOMContentLoaded", init);
