/**
 * Mirrors `allShips` in `pentagon_prime_client_portal.html` (renderAllShip / openModal).
 */
export const allShips = [
  {
    bl: "BL-20240901",
    origin: "Mumbai",
    dest: "Hamburg",
    commodity: "Flat steel",
    mode: "🚢 Sea FCL",
    weight: "24T · 2×40'",
    etd: "Apr 02",
    eta: "Apr 23",
    status: "transit",
    prog: 60,
    vessel: "MSC Gulsun",
    carrier: "MSC",
    hs: "720610",
    steps: ["Booking", "Cargo Loaded", "Departed JNPT", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 3,
  },
  {
    bl: "BL-20240900",
    origin: "Delhi",
    dest: "Dubai",
    commodity: "Auto spares",
    mode: "✈️ Air",
    weight: "1.8T · 12 CBM",
    etd: "Apr 08",
    eta: "Apr 09",
    status: "transit",
    prog: 85,
    vessel: "AI Cargo AI-204",
    carrier: "Air India",
    hs: "870899",
    steps: ["Booking", "AWB Issued", "Departed DEL", "In Transit", "Arrived DXB", "Customs", "Delivered"],
    step: 4,
  },
  {
    bl: "BL-20240898",
    origin: "Chennai",
    dest: "Singapore",
    commodity: "Machinery parts",
    mode: "🚢 LCL",
    weight: "4.2T · 8 CBM",
    etd: "Apr 01",
    eta: "Apr 10",
    status: "transit",
    prog: 90,
    vessel: "Evergreen Ever Excel",
    carrier: "Evergreen",
    hs: "842199",
    steps: ["Booking", "Cargo Loaded", "Departed INMAA", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 5,
  },
  {
    bl: "BL-20240896",
    origin: "JNPT",
    dest: "Los Angeles",
    commodity: "Wire rods",
    mode: "🚢 Sea FCL",
    weight: "18T · 1×40'",
    etd: "Mar 25",
    eta: "Apr 22",
    status: "delayed",
    prog: 45,
    vessel: "COSCO Yantian",
    carrier: "COSCO",
    hs: "721310",
    steps: ["Booking", "Cargo Loaded", "Departed JNPT", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 3,
  },
  {
    bl: "BL-20240892",
    origin: "Mumbai",
    dest: "Hamburg",
    commodity: "HR coils",
    mode: "🚢 Sea FCL",
    weight: "26T · 2×40'",
    etd: "Mar 28",
    eta: "Apr 21",
    status: "delayed",
    prog: 50,
    vessel: "MSC Gulsun",
    carrier: "MSC",
    hs: "720821",
    steps: ["Booking", "Cargo Loaded", "Departed JNPT", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 3,
  },
  {
    bl: "BL-20240888",
    origin: "Delhi",
    dest: "New York",
    commodity: "Electrical goods",
    mode: "✈️ Air",
    weight: "0.9T · 4 CBM",
    etd: "Apr 06",
    eta: "Apr 07",
    status: "customs",
    prog: 95,
    vessel: "AI Cargo AI-306",
    carrier: "Air India",
    hs: "854140",
    steps: ["Booking", "AWB Issued", "Departed DEL", "In Transit", "Arrived JFK", "Customs", "Delivered"],
    step: 5,
  },
  {
    bl: "BL-20240885",
    origin: "Chennai",
    dest: "Sydney",
    commodity: "Auto parts",
    mode: "🚢 Multimodal",
    weight: "18T · 2×20'",
    etd: "Mar 20",
    eta: "Apr 07",
    status: "delivered",
    prog: 100,
    vessel: "MSC Flavia",
    carrier: "MSC",
    hs: "870899",
    steps: ["Booking", "Cargo Loaded", "Departed INMAA", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 7,
  },
  {
    bl: "BL-20240882",
    origin: "JNPT",
    dest: "Hamburg",
    commodity: "Flat steel",
    mode: "🚢 Sea FCL",
    weight: "24T · 2×40'",
    etd: "Mar 15",
    eta: "Apr 05",
    status: "delivered",
    prog: 100,
    vessel: "Maersk Elba",
    carrier: "Maersk",
    hs: "720610",
    steps: ["Booking", "Cargo Loaded", "Departed JNPT", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 7,
  },
  {
    bl: "BL-20240879",
    origin: "Mumbai",
    dest: "Singapore",
    commodity: "Wire rods",
    mode: "🚢 LCL",
    weight: "7T · 12 CBM",
    etd: "Apr 04",
    eta: "Apr 13",
    status: "transit",
    prog: 30,
    vessel: "Evergreen Ever Merit",
    carrier: "Evergreen",
    hs: "721310",
    steps: ["Booking", "Cargo Loaded", "Departed JNPT", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 2,
  },
  {
    bl: "BL-20231142",
    origin: "Mumbai",
    dest: "Hamburg",
    commodity: "CR coils",
    mode: "🚢 Sea FCL",
    weight: "22T · 2×40'",
    etd: "Dec 10",
    eta: "Jan 02",
    status: "past",
    prog: 100,
    vessel: "MSC Oscar",
    carrier: "MSC",
    hs: "720922",
    steps: ["Booking", "Cargo Loaded", "Departed JNPT", "In Transit", "Port Arrival", "Customs", "Delivered"],
    step: 7,
  },
  {
    bl: "BL-20231098",
    origin: "Delhi",
    dest: "Dubai",
    commodity: "Electronics",
    mode: "✈️ Air",
    weight: "2.1T · 14 CBM",
    etd: "Nov 22",
    eta: "Nov 23",
    status: "past",
    prog: 100,
    vessel: "EK SkyCargo EK9801",
    carrier: "Emirates",
    hs: "854140",
    steps: ["Booking", "AWB Issued", "Departed DEL", "In Transit", "Arrived DXB", "Customs", "Delivered"],
    step: 7,
  },
];

export const shipTableStatusPill = {
  transit: { className: "pill p-blue", label: "In Transit" },
  delayed: { className: "pill p-amber", label: "Delayed" },
  customs: { className: "pill p-red", label: "At Customs" },
  delivered: { className: "pill p-green", label: "Delivered" },
  past: { className: "pill p-gray", label: "Past" },
};

export const shipProgressColors = {
  transit: "var(--blue-mid)",
  delayed: "var(--amber)",
  customs: "var(--red)",
  delivered: "var(--teal)",
  past: "var(--txt3)",
};

export const modalStatusLabel = {
  transit: "In Transit",
  delayed: "Delayed ⚠",
  customs: "At Customs",
  delivered: "Delivered ✓",
  past: "Completed",
};

/** Same filter logic as `renderAllShip()` in the sample HTML. */
export function filterShipments(ships, sFilter, searchQuery) {
  const q = (searchQuery || "").trim().toLowerCase();
  return ships.filter((r) => {
    const fOk =
      sFilter === "all" ||
      (sFilter === "active" && ["transit", "delayed", "customs"].includes(r.status)) ||
      (sFilter === "past" && r.status === "past") ||
      r.status === sFilter;
    const qOk = !q || Object.values(r).join(" ").toLowerCase().includes(q);
    return fOk && qOk;
  });
}

/** Same logic as `filterTracking()` in the sample HTML (Live Tracking tab). */
export function filterTrackingShips(ships, trkFilter, searchQuery) {
  const q = (searchQuery || "").trim().toLowerCase();
  const active = ships.filter((s) => ["transit", "delayed", "customs"].includes(s.status));
  return active.filter((r) => {
    const fOk =
      trkFilter === "all" ||
      (trkFilter === "sea" && r.mode.includes("🚢")) ||
      (trkFilter === "air" && r.mode.includes("✈️")) ||
      trkFilter === r.status;
    const qOk =
      !q ||
      r.bl.toLowerCase().includes(q) ||
      r.origin.toLowerCase().includes(q) ||
      r.dest.toLowerCase().includes(q);
    return fOk && qOk;
  });
}

/** Status label on tracking cards (matches `buildTrackCards` in the sample HTML). */
export const trackingCardStatusLabel = {
  transit: "In Transit",
  delayed: "Delayed",
  customs: "At Customs",
};

/** Pill class for tracking cards (`sMap` in sample HTML). */
export const trackingCardPillClass = {
  transit: "pill p-blue",
  delayed: "pill p-amber",
  customs: "pill p-red",
};
