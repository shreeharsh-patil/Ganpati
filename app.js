/**
 * Aamche Bappa - Ganpati Pandal Atlas
 * Ultra-smooth, high-performance interactive client implementation
 */

(function() {
  'use strict';

  // Constants
  const MUMBAI_CENTER = [19.076, 72.8777];
  const TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const KILOMETER = 1000;
  const FESTIVAL_DATE = new Date('2026-09-14T00:00:00+05:30').getTime();

  // State configurations for Maharashtra, Karnataka, and Goa
  const STATE_CONFIG = {
    all: {
      name: 'All Locations',
      icon: '🕉️',
      bounds: [[12.2, 72.2], [21.6, 79.8]],
      subregions: [
        { id: 'all', label: 'All Regions' },
        { id: 'Mumbai & MMR', label: 'Mumbai & MMR (70)' },
        { id: 'Pune', label: 'Pune (8)' },
        { id: 'Ashtavinayak', label: 'Ashtavinayak (8)' },
        { id: 'Bengaluru', label: 'Bengaluru (5)' },
        { id: 'Belagavi', label: 'Belagavi (4)' },
        { id: 'Hubballi-Dharwad', label: 'Hubballi (3)' },
        { id: 'Mangaluru & Coast', label: 'Mangaluru & Coast (5)' },
        { id: 'Panaji & North Goa', label: 'Panaji & Tiswadi (4)' },
        { id: 'Ponda', label: 'Ponda (4)' },
        { id: 'Margao & South Goa', label: 'Margao & South Goa (6)' },
        { id: 'Mapusa & North Goa', label: 'Mapusa & North Goa (5)' }
      ]
    },
    Maharashtra: {
      name: 'Maharashtra',
      badge: 'MH',
      bounds: [[16.2, 72.6], [21.5, 79.5]],
      subregions: [
        { id: 'all', label: 'All Maharashtra (92)' },
        { id: 'Mumbai & MMR', label: 'Mumbai & MMR (70)' },
        { id: 'Pune', label: 'Pune Manache Ganpati (8)' },
        { id: 'Ashtavinayak', label: 'Ashtavinayak Sacred 8 (8)' },
        { id: 'Konkan', label: 'Konkan & Coastal MH (3)' },
        { id: 'Vidarbha', label: 'Nagpur & Vidarbha (1)' },
        { id: 'North Maharashtra', label: 'Nashik (1)' },
        { id: 'Western Maharashtra', label: 'Kolhapur (1)' }
      ]
    },
    Karnataka: {
      name: 'Karnataka',
      badge: 'KA',
      bounds: [[12.4, 74.0], [16.2, 77.8]],
      subregions: [
        { id: 'all', label: 'All Karnataka (17)' },
        { id: 'Bengaluru', label: 'Bengaluru (5)' },
        { id: 'Belagavi', label: 'Belagavi (4)' },
        { id: 'Hubballi-Dharwad', label: 'Hubballi-Dharwad (3)' },
        { id: 'Mangaluru & Coast', label: 'Mangaluru & Coast (5)' }
      ]
    },
    Goa: {
      name: 'Goa',
      badge: 'GA',
      bounds: [[14.9, 73.6], [15.8, 74.3]],
      subregions: [
        { id: 'all', label: 'All Goa (19)' },
        { id: 'Panaji & North Goa', label: 'Panaji & Tiswadi (4)' },
        { id: 'Ponda', label: 'Ponda Temple Heart (4)' },
        { id: 'Margao & South Goa', label: 'Margao & South Goa (6)' },
        { id: 'Mapusa & North Goa', label: 'Mapusa, Pernem & Bicholim (5)' }
      ]
    }
  };

  const REGION_CENTERS = {
    'Mumbai & MMR': { center: [19.076, 72.8777], zoom: 12 },
    'Pune': { center: [18.518, 73.856], zoom: 14 },
    'Ashtavinayak': { center: [18.7, 74.0], zoom: 9 },
    'Konkan': { center: [17.5, 73.2], zoom: 9 },
    'Vidarbha': { center: [21.1492, 79.0827], zoom: 13 },
    'North Maharashtra': { center: [20.0163, 73.7432], zoom: 13 },
    'Western Maharashtra': { center: [16.7022, 74.2405], zoom: 13 },
    'Bengaluru': { center: [12.9716, 77.5946], zoom: 12 },
    'Belagavi': { center: [15.85, 74.51], zoom: 13 },
    'Hubballi-Dharwad': { center: [15.36, 75.13], zoom: 13 },
    'Mangaluru & Coast': { center: [13.4, 74.7], zoom: 9 },
    'Panaji & North Goa': { center: [15.50, 73.83], zoom: 13 },
    'Margao & South Goa': { center: [15.28, 73.96], zoom: 12 },
    'Ponda': { center: [15.40, 74.00], zoom: 13 },
    'Mapusa & North Goa': { center: [15.63, 73.80], zoom: 11 }
  };

  // State
  let userLocation = null;
  let userSubmittedPandals = [];
  try {
    const saved = localStorage.getItem('community_pandals');
    if (saved) {
      userSubmittedPandals = JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load local pandals', e);
  }

  // Ensure default metadata on base Mumbai pandals
  const basePandals = (window.PANDALS_DATA || []).map(p => {
    if (!p.state) p.state = 'Maharashtra';
    if (!p.city) p.city = (p.area && (p.area.includes('Thane') ? 'Thane' : p.area.includes('Navi Mumbai') ? 'Navi Mumbai' : 'Mumbai')) || 'Mumbai';
    if (!p.region) p.region = 'Mumbai & MMR';
    return p;
  });

  const baseModaks = (window.MODAK_STOPS_DATA || []).map(m => {
    if (!m.state) m.state = 'Maharashtra';
    if (!m.city) m.city = 'Mumbai';
    if (!m.region) m.region = 'Mumbai & MMR';
    return m;
  });

  const regionalPandals = window.REGIONAL_PANDALS_DATA || window.regionalPandals || [];
  const regionalModaks = window.REGIONAL_MODAK_STOPS_DATA || window.regionalModakStops || [];

  // Combine datasets
  let allPandals = [...basePandals, ...regionalPandals, ...userSubmittedPandals];
  let allModaks = [...baseModaks, ...regionalModaks];

  // Filtering state
  let selectedState = 'all'; // 'all' | 'Maharashtra' | 'Karnataka' | 'Goa'
  let selectedRegion = 'all';
  let selectedModakState = 'all';
  let filteredPandals = [...allPandals];
  let searchQuery = '';
  let exactPinsOnly = false;
  let publishedTimingsOnly = false;
  let selectedRouteIds = [];

  // Map references
  let map = null;
  let pandalLayerGroup = null;
  let modakLayerGroup = null;
  let userMarker = null;
  let pandalMarkersMap = new Map(); // id -> L.marker
  let modakMarkersMap = new Map();  // name -> L.marker
  let activeMarkerInfo = null;

  // DOM elements
  const dialogContainer = document.getElementById('dialog-container');
  const toastContainer = document.getElementById('toast-container');
  const searchInput = document.getElementById('pandal-search');
  const marqueeRegion = document.getElementById('nearby-pandals');
  const mapFooter = document.querySelector('.map-footer');
  const filterBtn = document.querySelector('.filter-button');
  const navbar = document.querySelector('.festival-nav');

  // Haversine distance in meters
  function getDistanceMeters(lat1, lon1, lat2, lon2) {
    const toRad = deg => (deg * Math.PI) / 180;
    const R = 6371e3; // Earth radius in meters
    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);
    const deltaPhi = toRad(lat2 - lat1);
    const deltaLambda = toRad(lon2 - lon1);

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // Format distance
  function formatDistance(pandal) {
    if (pandal.distanceMeters === null || pandal.distanceMeters === undefined) {
      return 'allow location';
    }
    const prefix = pandal.confidence === 'approximate' ? 'approx. ' : '';
    if (pandal.distanceMeters < KILOMETER) {
      return `${prefix}${Math.round(pandal.distanceMeters)} m away`;
    }
    return `${prefix}${(pandal.distanceMeters / KILOMETER).toFixed(1)} km away`;
  }

  // Recalculate distances and sort
  function updateDistances() {
    if (!userLocation) return;
    for (const p of allPandals) {
      p.distanceMeters = getDistanceMeters(userLocation.lat, userLocation.lng, p.lat, p.lng);
    }
    allPandals.sort((a, b) => (a.distanceMeters ?? 9999999) - (b.distanceMeters ?? 9999999));
    applyFilters();
  }

  // Toast notifications with smooth slide in / out
  function showToast(message) {
    if (!toastContainer) return;
    toastContainer.innerHTML = `
      <output class="atlas-toast" role="status" aria-live="polite">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check size-5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
        <span>${message}</span>
      </output>
    `;
    setTimeout(() => {
      const toast = toastContainer.querySelector('.atlas-toast');
      if (toast) {
        toast.style.animation = 'toastSlideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) reverse forwards';
        setTimeout(() => toastContainer.innerHTML = '', 300);
      }
    }, 3800);
  }

  // Create Pandal Icon
  function createPandalIcon(pandal, isActive = false) {
    const isExact = pandal.confidence === 'exact';
    const isCommunity = pandal.source === 'user_submitted';
    const activeClass = isActive ? ' is-active' : '';
    const approxClass = !isExact ? ' is-approx' : '';
    const commClass = isCommunity ? ' is-community' : '';
    const stateCode = (pandal.state || 'Maharashtra').toLowerCase().slice(0, 2);

    const html = `
      <div class="atlas-map-marker-host${activeClass}${approxClass}${commClass} pin-state-${stateCode}">
        <div class="atlas-map-marker-body">
          <img class="atlas-map-marker-logo" src="./images/ganesha-marker.webp" alt="${pandal.name}" width="20" height="20" loading="eager" decoding="async" />
          <span class="atlas-map-marker-rank">${pandal.rank}</span>
        </div>
        <div class="atlas-map-marker-tip"></div>
      </div>
    `;

    return L.divIcon({
      className: 'atlas-marker-div',
      html: html,
      iconSize: [32, 38],
      iconAnchor: [16, 38],
      popupAnchor: [0, -36]
    });
  }

  // Create Pandal Map Popup
  function createPandalPopup(pandal) {
    const container = document.createElement('article');
    container.className = 'pandal-map-popup';

    const meta = document.createElement('p');
    meta.className = 'map-popup-meta';
    meta.textContent = `#${pandal.rank} · ${pandal.city || pandal.area} (${pandal.state || 'MH'}) · ${pandal.pinPrecision || 'Venue-level'}`;
    container.appendChild(meta);

    if (pandal.source === 'user_submitted') {
      const comm = document.createElement('span');
      comm.className = 'map-popup-community';
      comm.textContent = 'Added by community';
      container.appendChild(comm);
    }

    const title = document.createElement('h3');
    title.textContent = pandal.name;
    container.appendChild(title);

    const addr = document.createElement('p');
    addr.className = 'map-popup-address';
    addr.textContent = pandal.address;
    container.appendChild(addr);

    const timing = document.createElement('p');
    timing.className = 'map-popup-timing';
    timing.textContent = pandal.aarti_times || 'Aarti timing published locally';
    container.appendChild(timing);

    if (pandal.timingDetails) {
      const detail = document.createElement('p');
      detail.className = 'map-popup-timing-detail';
      detail.textContent = pandal.timingDetails;
      container.appendChild(detail);
    }

    const confP = document.createElement('p');
    confP.className = 'map-popup-confidence';
    confP.textContent = pandal.sourceLine || 'Verified from public temple records.';
    container.appendChild(confP);

    const actions = document.createElement('div');
    actions.className = 'map-popup-actions';

    const dirBtn = document.createElement('button');
    dirBtn.type = 'button';
    dirBtn.className = 'map-popup-primary';
    dirBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation size-4" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
      Directions
    `;
    dirBtn.addEventListener('click', () => openNavDialog(pandal));
    actions.appendChild(dirBtn);

    const repBtn = document.createElement('button');
    repBtn.type = 'button';
    repBtn.className = 'map-popup-secondary';
    repBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-flag size-4" aria-hidden="true"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" x2="4" y1="22" y2="15"></line></svg>
      Report
    `;
    repBtn.addEventListener('click', () => openReportDialog(pandal));
    actions.appendChild(repBtn);

    container.appendChild(actions);
    return container;
  }

  // Prebuild marker for pandal
  function buildMarkerForPandal(pandal) {
    let marker = pandalMarkersMap.get(pandal.id);
    if (marker) return marker;

    marker = L.marker([pandal.lat, pandal.lng], {
      alt: `${pandal.name} map pin`,
      title: `${pandal.name} (${pandal.city}, ${pandal.state})`,
      keyboard: true,
      riseOnHover: true,
      icon: createPandalIcon(pandal, false)
    });

    marker.bindPopup(createPandalPopup(pandal), {
      autoPan: true,
      autoPanPaddingBottomRight: [18, 18],
      autoPanPaddingTopLeft: [18, 18],
      maxWidth: 320,
      minWidth: 240
    });

    marker.on('popupopen', () => {
      if (activeMarkerInfo && activeMarkerInfo.marker !== marker) {
        activeMarkerInfo.marker.setIcon(createPandalIcon(activeMarkerInfo.pandal, false));
      }
      marker.setIcon(createPandalIcon(pandal, true));
      activeMarkerInfo = { marker, pandal };
    });

    marker.on('popupclose', () => {
      marker.setIcon(createPandalIcon(pandal, false));
      if (activeMarkerInfo && activeMarkerInfo.marker === marker) {
        activeMarkerInfo = null;
      }
    });

    pandalMarkersMap.set(pandal.id, marker);
    return marker;
  }

  // Prebuild marker for modak stop
  function buildMarkerForModak(stop) {
    let marker = modakMarkersMap.get(stop.name);
    if (marker) return marker;

    const stateCode = (stop.state || 'Maharashtra').toLowerCase().slice(0, 2);
    const icon = L.divIcon({
      className: 'modak-marker-div',
      html: `
        <div class="modak-map-marker-host state-${stateCode}" title="Modak stop: ${stop.name} (${stop.city || stop.area})">
          <div class="modak-map-marker-badge">
            <svg viewBox="0 0 32 32" width="20" height="20" aria-hidden="true">
              <path d="M16 3C16 12 4 15 4 23c0 8 24 8 24 0C28 15 16 12 16 3Z" fill="#fff9f0" stroke="#fff9f0" stroke-width="1.2"/>
              <path d="M16 8c-1 8-6 11-6 17m6-17c1 8 6 11 6 17m-6-14v15" fill="none" stroke="#204d2e" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="modak-marker-tip"></div>
        </div>
      `,
      iconSize: [32, 38],
      iconAnchor: [16, 38],
      popupAnchor: [0, -36]
    });

    const popupContent = `
      <div class="modak-map-popup">
        <span class="modak-popup-badge">${stop.state || 'Maharashtra'}</span>
        <strong>${stop.name}</strong>
        <p>${stop.area}, ${stop.city} · ${stop.notableFor}</p>
        <p class="modak-popup-address">${stop.address}</p>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}&travelmode=walking" target="_blank" rel="noopener noreferrer">Get directions</a>
        <small>Confirm the storefront and modak availability before visiting.</small>
      </div>
    `;

    marker = L.marker([stop.lat, stop.lng], {
      icon: icon,
      title: `Modak stop: ${stop.name} (${stop.city}, ${stop.state})`,
      riseOnHover: true,
      zIndexOffset: 250
    }).bindPopup(popupContent, { maxWidth: 280, minWidth: 220, autoPan: true });

    modakMarkersMap.set(stop.name, marker);
    return marker;
  }

  // Viewport Culling & Marker Synchronization
  let updateMarkersRAF = null;
  function scheduleVisibleMarkersUpdate() {
    if (updateMarkersRAF) cancelAnimationFrame(updateMarkersRAF);
    updateMarkersRAF = requestAnimationFrame(() => {
      updateVisibleMarkers();
    });
  }

  function updateVisibleMarkers() {
    if (!map || !pandalLayerGroup || !modakLayerGroup) return;

    // Viewport bounds with 35% margin padding to prevent pop-in during drag gestures
    const bounds = map.getBounds().pad(0.35);

    // 1. Visible Pandals
    const targetPandalIds = new Set();
    for (let i = 0; i < filteredPandals.length; i++) {
      const p = filteredPandals[i];
      const isActive = activeMarkerInfo && activeMarkerInfo.pandal.id === p.id;
      if (isActive || bounds.contains([p.lat, p.lng])) {
        targetPandalIds.add(p.id);
        const marker = buildMarkerForPandal(p);
        if (!pandalLayerGroup.hasLayer(marker)) {
          pandalLayerGroup.addLayer(marker);
        }
      }
    }

    // Unmount pandals outside padded viewport
    pandalMarkersMap.forEach((marker, id) => {
      if (!targetPandalIds.has(id) && pandalLayerGroup.hasLayer(marker)) {
        if (!marker.isPopupOpen()) {
          pandalLayerGroup.removeLayer(marker);
        }
      }
    });

    // 2. Visible Modak stops
    const activeModaks = allModaks.filter(stop => {
      if (selectedState !== 'all' && stop.state !== selectedState) return false;
      return true;
    });

    const targetModakNames = new Set();
    for (let i = 0; i < activeModaks.length; i++) {
      const stop = activeModaks[i];
      if (bounds.contains([stop.lat, stop.lng])) {
        targetModakNames.add(stop.name);
        const marker = buildMarkerForModak(stop);
        if (!modakLayerGroup.hasLayer(marker)) {
          modakLayerGroup.addLayer(marker);
        }
      }
    }

    // Unmount modaks outside padded viewport or filtered out
    modakMarkersMap.forEach((marker, name) => {
      if (!targetModakNames.has(name) && modakLayerGroup.hasLayer(marker)) {
        if (!marker.isPopupOpen()) {
          modakLayerGroup.removeLayer(marker);
        }
      }
    });
  }

  function renderPandalMarkers() {
    scheduleVisibleMarkersUpdate();
  }

  function renderModakMarkers() {
    scheduleVisibleMarkersUpdate();
  }

  // Initialize Map
  function initMap() {
    const mapEl = document.querySelector('.interactive-map');
    const mapStatus = document.querySelector('.map-status');
    if (!mapEl || !window.L) return;

    if (mapStatus) mapStatus.style.display = 'none';

    try {
      map = L.map(mapEl, {
        attributionControl: true,
        center: [16.8, 74.8],
        fadeAnimation: true,
        markerZoomAnimation: true,
        zoomAnimation: true,
        wheelDebounceTime: 80,
        wheelPxPerZoomLevel: 100,
        scrollWheelZoom: true,
        zoom: 7,
        zoomControl: true,
        preferCanvas: true
      });

      pandalLayerGroup = L.layerGroup().addTo(map);
      modakLayerGroup = L.layerGroup().addTo(map);

      const tiles = L.tileLayer(TILE_URL, {
        subdomains: ['a', 'b', 'c'],
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
        maxZoom: 19,
        keepBuffer: 2,
        updateWhenIdle: true,
        updateWhenZooming: false,
        updateInterval: 120,
        crossOrigin: true
      });
      tiles.addTo(map);

      // Prebuild markers into memory cache
      for (const p of allPandals) {
        buildMarkerForPandal(p);
      }
      for (const m of allModaks) {
        buildMarkerForModak(m);
      }

      // Initial visible marker mount
      updateVisibleMarkers();

      // Fit broad bounds encompassing Maharashtra, Karnataka and Goa
      map.fitBounds(STATE_CONFIG.all.bounds, {
        animate: false,
        paddingBottomRight: [30, 30],
        paddingTopLeft: [50, 50]
      });

      // Settle visible markers for the fitted bounds
      scheduleVisibleMarkersUpdate();

      // Viewport culling on map movement
      map.on('moveend', scheduleVisibleMarkersUpdate);
      map.on('zoomend', scheduleVisibleMarkersUpdate);

      // Throttled update during continuous long drag gestures
      let panThrottleTimer = null;
      map.on('move', () => {
        if (!panThrottleTimer) {
          panThrottleTimer = setTimeout(() => {
            panThrottleTimer = null;
            scheduleVisibleMarkersUpdate();
          }, 180);
        }
      });

      let resizeTimer = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (map) {
            map.invalidateSize({ animate: false, pan: false });
            scheduleVisibleMarkersUpdate();
          }
        }, 120);
      }, { passive: true });

    } catch (err) {
      console.error('Error initializing map:', err);
    }
  }

  // Smooth camera fly-to pandal
  function selectPandal(pandal) {
    if (!map) return;
    const mapSection = document.getElementById('pandal-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const marker = buildMarkerForPandal(pandal);
    if (pandalLayerGroup && !pandalLayerGroup.hasLayer(marker)) {
      pandalLayerGroup.addLayer(marker);
    }
    map.flyTo([pandal.lat, pandal.lng], Math.max(map.getZoom(), 15), {
      duration: 0.75,
      easeLinearity: 0.25
    });
    setTimeout(() => {
      if (marker) {
        marker.openPopup();
      }
    }, 450);
  }

  // Smooth camera fly-to modak stop
  function selectModakStop(modakName) {
    if (!map) return;
    const stop = allModaks.find(m => m.name === modakName);
    if (!stop) return;

    const mapSection = document.getElementById('pandal-map');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const marker = buildMarkerForModak(stop);
    if (modakLayerGroup && !modakLayerGroup.hasLayer(marker)) {
      modakLayerGroup.addLayer(marker);
    }
    map.flyTo([stop.lat, stop.lng], Math.max(map.getZoom(), 16), {
      duration: 0.75,
      easeLinearity: 0.25
    });
    setTimeout(() => {
      if (marker) {
        marker.openPopup();
      }
    }, 450);
  }

  // Render Marquee Cards
  function renderMarqueeCards() {
    if (!marqueeRegion) return;

    if (filteredPandals.length === 0) {
      marqueeRegion.innerHTML = `
        <section class="pandal-marquee-empty" aria-label="Nearby pandals">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search size-4" aria-hidden="true"><path d="m21 21-4.34-4.34"></path><circle cx="11" cy="11" r="8"></circle></svg>
          <p>No pandals match your search and filters in ${selectedState === 'all' ? 'any region' : selectedState}.</p>
          <button id="marquee-clear-filters-btn" type="button">Reset filters</button>
        </section>
      `;
      const resetBtn = marqueeRegion.querySelector('#marquee-clear-filters-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
      }
      return;
    }

    const isMultiple = filteredPandals.length > 4;
    const groups = isMultiple ? [false, true] : [false];
    // Optimize DOM size: show up to 24 featured pandals in the marquee loop for max smoothness
    const marqueePandals = filteredPandals.length > 24 ? filteredPandals.slice(0, 24) : filteredPandals;

    function createCardHTML(pandal, isClone) {
      const confIcon = pandal.confidence === 'approximate'
        ? `<span class="source-status approximate" aria-label="Street-level estimate."><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert size-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg></span>`
        : `<span class="source-status exact" aria-label="Current source verifies the venue for 2026."><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check size-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg></span>`;

      const distanceText = formatDistance(pandal);
      const statusLabel = pandal.source === 'user_submitted' ? 'Added by user' : (pandal.status === 'editor_verified' ? 'Confirmed 2026' : 'Needs checking');
      const stateClass = (pandal.state === 'Karnataka' ? 'ka' : (pandal.state === 'Goa' ? 'ga' : 'mh'));
      const stateBadge = `<span class="state-pill state-${stateClass}">${pandal.city || pandal.state}</span>`;

      const timingText = pandal.aarti_times || 'Aarti timings published locally';
      const timingHTML = `
        <span class="pandal-timing" aria-label="${pandal.timingDetails || timingText}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock3 lucide-clock-3 size-4" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6h4"></path></svg>
          <span>${timingText}</span>
        </span>
      `;

      return `
        <button class="pandal-card" type="button" data-pandal-id="${pandal.id}" aria-label="${pandal.name}, ${pandal.area}, ${pandal.city}, ${pandal.state}, ${distanceText}. ${pandal.timingDetails || pandal.aarti_times || ''}">
          <div class="pandal-card-copy">
            <div class="card-meta">
              <span class="rank-badge">#${pandal.rank}</span>
              ${stateBadge}
              <span class="status-pill">${statusLabel}</span>
            </div>
            <h2>${pandal.name}</h2>
            <p>${pandal.area}${pandal.city && pandal.city !== pandal.area ? ' · ' + pandal.city : ''}${pandal.state && pandal.state !== 'Maharashtra' ? ' (' + pandal.state + ')' : ''} - ${distanceText}</p>
            ${timingHTML}
          </div>
          <div class="card-icons">
            ${confIcon}
            <span class="card-action" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation size-4" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            </span>
          </div>
        </button>
      `;
    }

    let trackHTML = '';
    for (const isClone of groups) {
      trackHTML += `<div aria-hidden="${isClone}" class="pandal-marquee-group">`;
      for (const p of marqueePandals) {
        trackHTML += createCardHTML(p, isClone);
      }
      trackHTML += `</div>`;
    }

    const durationSec = Math.max(28, Math.min(80, marqueePandals.length * 3.2));

    marqueeRegion.innerHTML = `
      <section aria-label="Nearby pandals" class="pandal-marquee">
        <div class="pandal-marquee-track" style="--marquee-duration:${durationSec}s">
          ${trackHTML}
        </div>
      </section>
    `;

    // Add click listeners to marquee cards
    marqueeRegion.querySelectorAll('.pandal-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-pandal-id');
        const p = allPandals.find(item => item.id === id);
        if (p) {
          selectPandal(p);
          openNavDialog(p);
        }
      });
    });
  }

  // Update Map Footer Preview
  function updateMapFooter() {
    if (!mapFooter) return;

    const top3 = filteredPandals.slice(0, 3);
    let listHTML = '';
    for (const p of top3) {
      const dist = formatDistance(p);
      listHTML += `
        <button class="nearby-pandal-card" type="button" data-id="${p.id}">
          <span class="nearby-pandal-title">${p.name}</span>
          <span class="nearby-pandal-meta">${p.city || p.area} (${p.state || 'MH'}) · ${dist}</span>
        </button>
      `;
    }

    const stateLabel = selectedState === 'all' ? 'Maharashtra, Karnataka & Goa' : selectedState;

    mapFooter.innerHTML = `
      <section class="nearby-footer" aria-label="Nearby pandals preview">
        <div>
          <h2>Pandals in ${stateLabel}</h2>
          <p>${filteredPandals.length} pandal ${filteredPandals.length === 1 ? 'location' : 'locations'} listed</p>
        </div>
        <span class="nearby-footer-ready">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-radar size-4" aria-hidden="true"><path d="M19.07 4.93A10 10 0 0 0 6.99 3.34"></path><path d="M4 6h.01"></path><path d="M2.29 9.62A10 10 0 1 0 21.31 8.35"></path><path d="M16.24 7.76A6 6 0 1 0 8.23 16.24"></path><path d="M12 18h.01"></path><path d="M17.99 11.66A6 6 0 0 1 15.77 16.24"></path><circle cx="12" cy="12" r="2"></circle><path d="m13.41 10.59 5.66-5.66"></path></svg>
          ${selectedState === 'all' ? '3 States Active' : selectedState}
        </span>
      </section>
      <div class="nearby-pandal-list">
        ${listHTML}
        <button class="route-plan-cta" type="button" aria-label="Plan a route with all ${filteredPandals.length} pandals">
          <span class="route-plan-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin size-4" aria-hidden="true"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"></path><circle cx="12" cy="8" r="2"></circle><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"></path></svg>
            Plan My Route
          </span>
          <span class="route-plan-copy">Build a darshan route with selected stops</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </div>
    `;

    mapFooter.querySelectorAll('.nearby-pandal-card').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const p = allPandals.find(item => item.id === id);
        if (p) {
          selectPandal(p);
          openNavDialog(p);
        }
      });
    });

    const routeCta = mapFooter.querySelector('.route-plan-cta');
    if (routeCta) {
      routeCta.addEventListener('click', () => {
        openRoutePlannerDialog(filteredPandals);
      });
    }
  }

  // Filter application
  function applyFilters() {
    filteredPandals = allPandals.filter(p => {
      // State filter
      if (selectedState !== 'all' && p.state !== selectedState) return false;
      // Region filter
      if (selectedRegion !== 'all' && p.region !== selectedRegion) return false;
      // Confidence filter
      if (exactPinsOnly && p.confidence !== 'exact') return false;
      // Timings filter
      if (publishedTimingsOnly) {
        const t = (p.aarti_times || '').toLowerCase();
        if (!t || t.includes('unpublished') || t.includes('not published')) return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inName = (p.name || '').toLowerCase().includes(q);
        const inArea = (p.area || '').toLowerCase().includes(q);
        const inCity = (p.city || '').toLowerCase().includes(q);
        const inState = (p.state || '').toLowerCase().includes(q);
        const inRegion = (p.region || '').toLowerCase().includes(q);
        const inAddr = (p.address || '').toLowerCase().includes(q);
        if (!inName && !inArea && !inCity && !inState && !inRegion && !inAddr) return false;
      }
      return true;
    });

    renderPandalMarkers();
    renderModakMarkers();
    renderMarqueeCards();
    updateMapFooter();
    updateFilterButtonUI();
  }

  function resetFilters() {
    exactPinsOnly = false;
    publishedTimingsOnly = false;
    searchQuery = '';
    selectedState = 'all';
    selectedRegion = 'all';
    if (searchInput) searchInput.value = '';
    renderStateFilterUI();
    closeFilterPopover();
    applyFilters();
  }

  function updateFilterButtonUI() {
    if (!filterBtn) return;
    let activeCount = 0;
    if (exactPinsOnly) activeCount++;
    if (publishedTimingsOnly) activeCount++;

    const existingBadge = filterBtn.querySelector('.filter-count');
    if (existingBadge) existingBadge.remove();

    if (activeCount > 0) {
      const badge = document.createElement('span');
      badge.className = 'filter-count';
      badge.setAttribute('aria-label', `${activeCount} active`);
      badge.textContent = String(activeCount);
      filterBtn.appendChild(badge);
    }
  }

  // State Filter Navigation UI
  function renderStateFilterUI() {
    const nav = document.getElementById('state-filter-nav');
    if (!nav) return;

    const counts = {
      all: allPandals.length,
      Maharashtra: allPandals.filter(p => p.state === 'Maharashtra').length,
      Karnataka: allPandals.filter(p => p.state === 'Karnataka').length,
      Goa: allPandals.filter(p => p.state === 'Goa').length
    };

    const states = [
      { id: 'all', name: 'All Locations', icon: '🕉️' },
      { id: 'Maharashtra', name: 'Maharashtra', badge: 'MH' },
      { id: 'Karnataka', name: 'Karnataka', badge: 'KA' },
      { id: 'Goa', name: 'Goa', badge: 'GA' }
    ];

    let tabsHtml = '<div class="state-tabs-bar" role="tablist" aria-label="Select state">';
    for (const s of states) {
      const activeClass = selectedState === s.id ? ' active' : '';
      const badgeHtml = s.badge ? `<span class="state-tab-badge">${s.badge}</span>` : `<span class="state-tab-icon">${s.icon}</span>`;
      tabsHtml += `
        <button type="button" class="state-tab-btn${activeClass}" data-state="${s.id}" role="tab" aria-selected="${selectedState === s.id}">
          ${badgeHtml}
          <span>${s.name}</span>
          <span class="state-tab-count">${counts[s.id] || 0}</span>
        </button>
      `;
    }
    tabsHtml += '</div>';

    // Subregion chips
    const subregions = (STATE_CONFIG[selectedState] && STATE_CONFIG[selectedState].subregions) || STATE_CONFIG.all.subregions;
    let chipsHtml = '<div class="subregion-chips-bar" role="toolbar" aria-label="Filter sub-regions">';
    for (const sub of subregions) {
      const activeClass = selectedRegion === sub.id ? ' active' : '';
      chipsHtml += `
        <button type="button" class="subregion-chip-btn${activeClass}" data-region="${sub.id}">
          ${sub.label}
        </button>
      `;
    }
    chipsHtml += '</div>';

    nav.innerHTML = tabsHtml + chipsHtml;

    // Attach click handlers
    nav.querySelectorAll('.state-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const state = btn.getAttribute('data-state');
        setFilterState(state);
      });
    });

    nav.querySelectorAll('.subregion-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const reg = btn.getAttribute('data-region');
        setFilterRegion(reg);
      });
    });
  }

  function setFilterState(state) {
    if (selectedState === state && selectedRegion === 'all') return;
    selectedState = state;
    selectedRegion = 'all';
    renderStateFilterUI();
    applyFilters();

    if (map && STATE_CONFIG[state]) {
      map.flyToBounds(STATE_CONFIG[state].bounds, {
        duration: 0.95,
        easeLinearity: 0.25,
        padding: [25, 25]
      });
    }
  }

  function setFilterRegion(regionId) {
    selectedRegion = regionId;
    renderStateFilterUI();
    applyFilters();

    if (map) {
      if (regionId === 'all') {
        const cfg = STATE_CONFIG[selectedState];
        if (cfg) map.flyToBounds(cfg.bounds, { duration: 0.8, padding: [25, 25] });
      } else if (REGION_CENTERS[regionId]) {
        const target = REGION_CENTERS[regionId];
        map.flyTo(target.center, target.zoom, { duration: 0.85, easeLinearity: 0.25 });
      }
    }
  }

  // Modak Directory Section
  function renderModakDirectory() {
    const tabsContainer = document.getElementById('modak-state-tabs');
    const gridContainer = document.querySelector('.modak-directory-grid');
    const countEl = document.querySelector('.modak-directory-count');

    const counts = {
      all: allModaks.length,
      Maharashtra: allModaks.filter(m => m.state === 'Maharashtra').length,
      Karnataka: allModaks.filter(m => m.state === 'Karnataka').length,
      Goa: allModaks.filter(m => m.state === 'Goa').length
    };

    if (countEl) {
      countEl.textContent = `${allModaks.length} stops across Maharashtra, Karnataka & Goa`;
    }

    if (tabsContainer) {
      const states = [
        { id: 'all', label: `All Stops (${counts.all})` },
        { id: 'Maharashtra', label: `Maharashtra (${counts.Maharashtra})` },
        { id: 'Karnataka', label: `Karnataka (${counts.Karnataka})` },
        { id: 'Goa', label: `Goa (${counts.Goa})` }
      ];

      tabsContainer.innerHTML = states.map(s => `
        <button type="button" class="modak-state-btn${selectedModakState === s.id ? ' active' : ''}" data-modak-state="${s.id}">
          ${s.label}
        </button>
      `).join('');

      tabsContainer.querySelectorAll('.modak-state-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedModakState = btn.getAttribute('data-modak-state');
          renderModakDirectory();
        });
      });
    }

    if (gridContainer) {
      const displayModaks = allModaks.filter(m => {
        if (selectedModakState !== 'all' && m.state !== selectedModakState) return false;
        return true;
      });

      gridContainer.innerHTML = displayModaks.map(stop => `
        <article class="modak-directory-card" data-modak-name="${stop.name}">
          <span class="modak-directory-area">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-store size-4" aria-hidden="true"><path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"></path><path d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"></path><path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"></path></svg>
            ${stop.area}, ${stop.city} (${stop.state})
          </span>
          <h3>${stop.name}</h3>
          <p>${stop.notableFor}</p>
          <address>${stop.address}</address>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${stop.lat},${stop.lng}&travelmode=walking" target="_blank" rel="noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation size-4" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
            Get directions
          </a>
        </article>
      `).join('');

      // Wire card clicks to flyTo on map
      gridContainer.querySelectorAll('.modak-directory-card').forEach(card => {
        card.style.cursor = 'pointer';
        const modakName = card.getAttribute('data-modak-name');
        card.addEventListener('click', e => {
          if (e.target.closest('a')) return;
          selectModakStop(modakName);
        });
      });
    }
  }

  // Filter popover toggling
  function toggleFilterPopover() {
    const existing = document.querySelector('.filter-popover');
    if (existing) {
      closeFilterPopover();
    } else {
      openFilterPopover();
    }
  }

  function openFilterPopover() {
    closeFilterPopover();
    const popover = document.createElement('div');
    popover.className = 'filter-popover';
    popover.style.cssText = 'position:absolute;z-index:100;box-shadow:0 8px 24px rgba(0,0,0,0.18);border-radius:12px;';

    popover.innerHTML = `
      <div class="filter-popover-header" style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:0.75rem;">
        <strong style="font-size:0.95rem;font-weight:700;">Filter pandals</strong>
        <small style="color:#78695f;">${filteredPandals.length} of ${allPandals.length} shown</small>
      </div>
      <label class="filter-option" for="exact-pins-filter">
        <input type="checkbox" id="exact-pins-filter" ${exactPinsOnly ? 'checked' : ''} />
        <div>
          <strong>Exact pins only</strong>
          <p>Show only pandals with verified street-level coordinates</p>
        </div>
      </label>
      <label class="filter-option" for="timings-filter">
        <input type="checkbox" id="timings-filter" ${publishedTimingsOnly ? 'checked' : ''} />
        <div>
          <strong>Published timings only</strong>
          <p>Hide pandals without confirmed aarti or darshan schedules</p>
        </div>
      </label>
      <button class="reset-filters-button" type="button">Reset filters</button>
    `;

    const rect = filterBtn.getBoundingClientRect();
    popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
    popover.style.right = `${Math.max(16, window.innerWidth - rect.right)}px`;

    document.body.appendChild(popover);

    popover.querySelector('#exact-pins-filter').addEventListener('change', e => {
      exactPinsOnly = e.target.checked;
      applyFilters();
      openFilterPopover();
    });

    popover.querySelector('#timings-filter').addEventListener('change', e => {
      publishedTimingsOnly = e.target.checked;
      applyFilters();
      openFilterPopover();
    });

    popover.querySelector('.reset-filters-button').addEventListener('click', resetFilters);

    setTimeout(() => {
      document.addEventListener('click', handleOutsideClick);
    }, 10);
  }

  function handleOutsideClick(e) {
    const popover = document.querySelector('.filter-popover');
    if (popover && !popover.contains(e.target) && !filterBtn.contains(e.target)) {
      closeFilterPopover();
    }
  }

  function closeFilterPopover() {
    const popover = document.querySelector('.filter-popover');
    if (popover) {
      popover.remove();
      document.removeEventListener('click', handleOutsideClick);
    }
  }

  // Geolocation Request
  function requestLocation() {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.');
      return;
    }
    showToast('Locating your position across MH, KA & Goa...');
    navigator.geolocation.getCurrentPosition(
      pos => {
        userLocation = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        };

        if (map) {
          if (!userMarker) {
            const userIcon = L.divIcon({
              className: 'user-location-marker',
              html: '<div style="background:#f26b0f;width:18px;height:18px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 12px #f26b0f;"></div>',
              iconSize: [18, 18],
              iconAnchor: [9, 9]
            });
            userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon, zIndexOffset: 500 }).addTo(map);
          } else {
            userMarker.setLatLng([userLocation.lat, userLocation.lng]);
          }

          map.flyTo([userLocation.lat, userLocation.lng], 14, {
            duration: 0.8,
            easeLinearity: 0.25
          });
        }

        updateDistances();
        showToast('Sorted pandals by proximity to you!');
      },
      err => {
        console.warn('Geolocation failed:', err);
        showToast('Unable to retrieve location. Please check browser permissions.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  }

  // Dialog System
  function closeDialog() {
    if (!dialogContainer) return;
    const backdrop = dialogContainer.querySelector('.dialog-backdrop');
    if (backdrop) {
      backdrop.style.animation = 'dialogFadeOut 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      const content = backdrop.querySelector('.dialog-content');
      if (content) {
        content.style.animation = 'dialogSlideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      }
      setTimeout(() => {
        dialogContainer.innerHTML = '';
      }, 200);
    } else {
      dialogContainer.innerHTML = '';
    }
  }

  // Navigation Dialog
  function openNavDialog(pandal) {
    if (!dialogContainer) return;
    closeDialog();

    const dist = formatDistance(pandal);
    const mapsAppUrl = `https://www.google.com/maps/dir/?api=1&destination=${pandal.lat},${pandal.lng}&travelmode=walking`;

    const backdrop = document.createElement('div');
    backdrop.className = 'dialog-backdrop';
    backdrop.innerHTML = `
      <div class="dialog-content" role="dialog" aria-modal="true" aria-labelledby="dialog-title">
        <header class="dialog-header">
          <p class="dialog-kicker">#${pandal.rank} · ${pandal.area}, ${pandal.city} (${pandal.state})</p>
          <h2 id="dialog-title">${pandal.name}</h2>
          <p class="dialog-copy">${pandal.address}</p>
        </header>
        <div class="dialog-body">
          <div class="dialog-info-box">
            <strong>Estimated Distance</strong>
            <p>${dist}</p>
          </div>
          <div class="dialog-info-box">
            <strong>Visiting / Aarti Timings</strong>
            <p>${pandal.aarti_times || 'Check mandal locally'}</p>
            ${pandal.timingDetails ? `<small>${pandal.timingDetails}</small>` : ''}
          </div>
          <div class="dialog-actions">
            <a href="${mapsAppUrl}" target="_blank" rel="noopener noreferrer" class="dialog-primary-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation size-4" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11"></polygon></svg>
              Open in Google Maps
            </a>
            <button type="button" class="dialog-close-btn">Close</button>
          </div>
        </div>
      </div>
    `;

    backdrop.querySelector('.dialog-close-btn').addEventListener('click', closeDialog);
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeDialog();
    });

    dialogContainer.appendChild(backdrop);
  }

  // Report Dialog
  function openReportDialog(pandal) {
    if (!dialogContainer) return;
    closeDialog();

    const backdrop = document.createElement('div');
    backdrop.className = 'dialog-backdrop';
    backdrop.innerHTML = `
      <div class="dialog-content" role="dialog" aria-modal="true" aria-labelledby="report-title">
        <header class="dialog-header">
          <p class="dialog-kicker">Report Update</p>
          <h2 id="report-title">Update ${pandal.name}</h2>
          <p class="dialog-copy">Help fellow devotees across Maharashtra, Karnataka and Goa with accurate ground intel.</p>
        </header>
        <form class="dialog-form" id="report-form">
          <label>
            <span>What needs updating?</span>
            <select name="issue_type" required>
              <option value="location">Incorrect map location / entrance</option>
              <option value="timings">Aarti / darshan timing update</option>
              <option value="crowd">Heavy queue / road diversion</option>
              <option value="other">Other detail</option>
            </select>
          </label>
          <label>
            <span>Details / Correction notes</span>
            <textarea name="notes" rows="3" placeholder="Provide accurate ground details or official mandal links..." required></textarea>
          </label>
          <div class="dialog-actions">
            <button type="submit" class="dialog-primary-btn">Submit Correction</button>
            <button type="button" class="dialog-close-btn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    backdrop.querySelector('.dialog-close-btn').addEventListener('click', closeDialog);
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeDialog();
    });

    const form = backdrop.querySelector('#report-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      closeDialog();
      showToast('Thank you! Your correction report has been logged.');
    });

    dialogContainer.appendChild(backdrop);
  }

  // Add Pandal Dialog
  function openAddPandalDialog() {
    if (!dialogContainer) return;
    closeDialog();

    const backdrop = document.createElement('div');
    backdrop.className = 'dialog-backdrop';
    backdrop.innerHTML = `
      <div class="dialog-content" role="dialog" aria-modal="true" aria-labelledby="add-title">
        <header class="dialog-header">
          <p class="dialog-kicker">Community Contribution</p>
          <h2 id="add-title">Add a Ganpati Pandal</h2>
          <p class="dialog-copy">Submit your local pandal in Maharashtra, Karnataka or Goa to the Atlas.</p>
        </header>
        <form class="dialog-form" id="add-pandal-form">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <label>
              <span>State *</span>
              <select name="state" id="add-state" required>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Goa">Goa</option>
              </select>
            </label>
            <label>
              <span>City *</span>
              <input type="text" name="city" placeholder="e.g. Pune, Bengaluru, Panaji" required />
            </label>
          </div>
          <label>
            <span>Pandal Name *</span>
            <input type="text" name="name" placeholder="e.g. Akhil Mandai Mandal" required />
          </label>
          <label>
            <span>Area / Locality *</span>
            <input type="text" name="area" placeholder="e.g. Budhwar Peth, Basavanagudi, Altinho" required />
          </label>
          <label>
            <span>Full Address *</span>
            <input type="text" name="address" placeholder="Exact lane or landmark" required />
          </label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <label>
              <span>Latitude *</span>
              <input type="number" step="any" name="lat" placeholder="e.g. 18.516" required />
            </label>
            <label>
              <span>Longitude *</span>
              <input type="number" step="any" name="lng" placeholder="e.g. 73.856" required />
            </label>
          </div>
          <label>
            <span>Aarti / Visiting Timings</span>
            <input type="text" name="timings" placeholder="e.g. Aarti: 8 AM | 8 PM · Darshan 6 AM-11 PM" />
          </label>
          <div class="dialog-actions">
            <button type="submit" class="dialog-primary-btn">Submit Pandal</button>
            <button type="button" class="dialog-close-btn">Cancel</button>
          </div>
        </form>
      </div>
    `;

    backdrop.querySelector('.dialog-close-btn').addEventListener('click', closeDialog);
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeDialog();
    });

    const form = backdrop.querySelector('#add-pandal-form');
    form.addEventListener('submit', e => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = fd.get('name').trim();
      const area = fd.get('area').trim();
      const city = fd.get('city').trim();
      const state = fd.get('state');
      const address = fd.get('address').trim();
      const lat = parseFloat(fd.get('lat'));
      const lng = parseFloat(fd.get('lng'));
      const timings = fd.get('timings').trim() || 'Timings verified locally';

      if (isNaN(lat) || isNaN(lng)) {
        showToast('Please enter valid numeric latitude and longitude.');
        return;
      }

      const newPandal = {
        id: `U${Date.now().toString().slice(-6)}`,
        rank: allPandals.length + 1,
        name: name,
        area: area,
        city: city,
        state: state,
        region: city,
        address: address,
        lat: lat,
        lng: lng,
        status: 'user_submitted',
        confidence: 'exact',
        pinPrecision: 'Community Ground Pin',
        evidenceYear: 2026,
        aarti_times: timings,
        timingDetails: 'Added by community volunteer.',
        sourceLine: 'Community submission for 2026.',
        source: 'user_submitted'
      };

      allPandals.push(newPandal);
      userSubmittedPandals.push(newPandal);
      try {
        localStorage.setItem('community_pandals', JSON.stringify(userSubmittedPandals));
      } catch (err) {}

      buildMarkerForPandal(newPandal);
      renderStateFilterUI();
      applyFilters();
      closeDialog();
      showToast(`${name} added to the Atlas!`);
    });

    dialogContainer.appendChild(backdrop);
  }

  // Route Planner Dialog
  function openRoutePlannerDialog(pandals) {
    if (!dialogContainer) return;
    closeDialog();

    selectedRouteIds = pandals.slice(0, 5).map(p => p.id);

    const backdrop = document.createElement('div');
    backdrop.className = 'dialog-backdrop';

    function renderRouteDialogContent() {
      const selectedPandals = selectedRouteIds.map(id => allPandals.find(p => p.id === id)).filter(Boolean);
      const remainingPandals = allPandals.filter(p => !selectedRouteIds.includes(p.id));
      const allListed = [...selectedPandals, ...remainingPandals];

      backdrop.innerHTML = `
        <div class="dialog-content route-planner-modal" role="dialog" aria-modal="true" aria-labelledby="route-title">
          <header class="dialog-header">
            <p class="dialog-kicker">Itinerary Builder</p>
            <h2 id="route-title">Plan Your Darshan Route</h2>
            <p class="dialog-copy">Select stops across Maharashtra, Karnataka or Goa and create an optimized visiting itinerary.</p>
          </header>
          <div class="route-planner-body">
            <div class="route-stops-summary">
              <strong>Selected Stops (${selectedPandals.length})</strong>
              <div class="selected-stops-chips">
                ${selectedPandals.map((p, idx) => `
                  <span class="route-chip">
                    <b>${idx + 1}</b> ${p.name} (${p.city || p.area})
                    <button type="button" data-remove-id="${p.id}" aria-label="Remove ${p.name}">&times;</button>
                  </span>
                `).join('')}
              </div>
            </div>
            <div class="route-available-list">
              <label style="font-weight:700;font-size:0.88rem;margin-bottom:6px;display:block;">Available Stops</label>
              <div class="route-items-scroll">
                ${allListed.slice(0, 30).map(p => {
                  const isChecked = selectedRouteIds.includes(p.id);
                  return `
                    <label class="route-item-row">
                      <input type="checkbox" data-pandal-id="${p.id}" ${isChecked ? 'checked' : ''} />
                      <span class="route-item-info">
                        <strong>${p.name}</strong>
                        <small>${p.area}, ${p.city} (${p.state})</small>
                      </span>
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
            <div class="dialog-actions">
              <button type="button" class="dialog-primary-btn build-google-route-btn" ${selectedPandals.length < 2 ? 'disabled' : ''}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pinned size-4" aria-hidden="true"><path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0"></path><circle cx="12" cy="8" r="2"></circle><path d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"></path></svg>
                Launch Route in Google Maps
              </button>
              <button type="button" class="dialog-close-btn">Close</button>
            </div>
          </div>
        </div>
      `;

      backdrop.querySelector('.dialog-close-btn').addEventListener('click', closeDialog);
      backdrop.addEventListener('click', e => {
        if (e.target === backdrop) closeDialog();
      });

      backdrop.querySelectorAll('.selected-stops-chips button').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-remove-id');
          selectedRouteIds = selectedRouteIds.filter(item => item !== id);
          renderRouteDialogContent();
        });
      });

      backdrop.querySelectorAll('.route-items-scroll input[type="checkbox"]').forEach(cb => {
        cb.addEventListener('change', () => {
          const id = cb.getAttribute('data-pandal-id');
          if (cb.checked) {
            if (!selectedRouteIds.includes(id)) selectedRouteIds.push(id);
          } else {
            selectedRouteIds = selectedRouteIds.filter(item => item !== id);
          }
          renderRouteDialogContent();
        });
      });

      const confirmBtn = backdrop.querySelector('.build-google-route-btn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => {
          const stops = selectedRouteIds.map(id => allPandals.find(p => p.id === id)).filter(Boolean);
          if (stops.length === 0) return;

          let url = 'https://www.google.com/maps/dir/?api=1';
          const origin = stops[0];
          const dest = stops[stops.length - 1];
          url += `&origin=${origin.lat},${origin.lng}`;
          url += `&destination=${dest.lat},${dest.lng}`;

          if (stops.length > 2) {
            const waypoints = stops.slice(1, stops.length - 1).map(s => `${s.lat},${s.lng}`).join('|');
            url += `&waypoints=${encodeURIComponent(waypoints)}`;
          }

          url += '&travelmode=walking';
          window.open(url, '_blank', 'noopener,noreferrer');
        });
      }
    }

    renderRouteDialogContent();
    dialogContainer.appendChild(backdrop);
  }

  // Smooth Lotus Bloom scroll with spring/lerp interpolation
  function initLotusBloom() {
    const section = document.querySelector('.lotus-bloom-section');
    if (!section) return;

    const petals = Array.from(section.querySelectorAll('[data-lotus-angle]'));
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    let targetProgress = 0;
    let currentProgress = 0;
    let isRunning = false;

    function calculateTarget() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      if (prefersReducedMotion.matches) return 1;
      return Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.58 + rect.height * 0.22)));
    }

    function animate() {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.001) {
        currentProgress += diff * 0.12;
      } else {
        currentProgress = targetProgress;
        isRunning = false;
      }

      const scale = 0.16 + currentProgress * 0.84;
      const opacity = 0.28 + currentProgress * 0.72;

      section.style.setProperty('--lotus-progress', currentProgress.toFixed(3));
      section.style.setProperty('--lotus-scale', scale.toFixed(3));
      section.style.setProperty('--lotus-opacity', opacity.toFixed(3));

      petals.forEach(petal => {
        const angle = Number(petal.dataset.lotusAngle ?? 0);
        petal.style.setProperty('--lotus-rotation', `${(angle * currentProgress).toFixed(2)}deg`);
      });

      if (isRunning) {
        window.requestAnimationFrame(animate);
      }
    }

    function onScroll() {
      targetProgress = calculateTarget();
      if (!isRunning) {
        isRunning = true;
        window.requestAnimationFrame(animate);
      }
    }

    targetProgress = calculateTarget();
    currentProgress = targetProgress;
    animate();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    prefersReducedMotion.addEventListener('change', onScroll);
  }

  // Sticky Navbar shadow on scroll
  function initNavbarScroll() {
    if (!navbar) return;
    function checkScroll() {
      if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 16px 36px rgba(80, 25, 4, 0.16)';
        navbar.style.borderColor = 'rgba(80, 25, 4, 0.18)';
      } else {
        navbar.style.boxShadow = '0 12px 32px rgba(80, 25, 4, 0.1)';
        navbar.style.borderColor = 'var(--festival-ink-12)';
      }
    }
    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // Global Keyboard Navigation
  function initKeybindings() {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeDialog();
        closeFilterPopover();
      }
    });
  }

  // Initial event bindings
  function initEvents() {
    // Nav location buttons
    document.querySelectorAll('.festival-nav-location, .festival-hero-secondary, .location-button').forEach(btn => {
      btn.addEventListener('click', requestLocation);
    });

    // Add pandal button in map header
    const addPandalBtn = document.querySelector('.add-pandal-button');
    if (addPandalBtn) {
      addPandalBtn.addEventListener('click', openAddPandalDialog);
    }

    // Search input with smooth debounce and clear
    if (searchInput) {
      let searchDebounceTimer = null;
      searchInput.addEventListener('input', e => {
        searchQuery = e.target.value;
        clearTimeout(searchDebounceTimer);
        searchDebounceTimer = setTimeout(() => {
          applyFilters();
        }, 80);

        let clearBtn = searchInput.parentElement.querySelector('.search-clear-button');
        if (searchQuery) {
          if (!clearBtn) {
            clearBtn = document.createElement('button');
            clearBtn.type = 'button';
            clearBtn.className = 'search-clear-button';
            clearBtn.setAttribute('aria-label', 'Clear search');
            clearBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x size-4" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
            clearBtn.addEventListener('click', () => {
              searchInput.value = '';
              searchQuery = '';
              clearBtn.remove();
              clearTimeout(searchDebounceTimer);
              applyFilters();
            });
            searchInput.parentElement.appendChild(clearBtn);
          }
        } else if (clearBtn) {
          clearBtn.remove();
        }
      });
    }

    // Filter button
    if (filterBtn) {
      filterBtn.addEventListener('click', toggleFilterPopover);
    }
  }

  // DOM ready
  function onReady() {
    renderStateFilterUI();
    initMap();
    initEvents();
    renderModakDirectory();
    initLotusBloom();
    initNavbarScroll();
    initKeybindings();
    updateMapFooter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', onReady);
  } else {
    onReady();
  }

})();
