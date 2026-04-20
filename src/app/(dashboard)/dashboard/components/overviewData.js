/**
 * Static data mirroring `pentagon_prime_client_portal.html` overview tab:
 * `renderOvTable()` uses `allShips.filter(s => s.status !== 'past')`.
 */
export const overviewActiveShipments = [
  {
    bl: "BL-20240901",
    origin: "Mumbai",
    dest: "Hamburg",
    mode: "🚢 Sea FCL",
    eta: "Apr 23",
    status: "transit",
    prog: 60,
  },
  {
    bl: "BL-20240900",
    origin: "Delhi",
    dest: "Dubai",
    mode: "✈️ Air",
    eta: "Apr 09",
    status: "transit",
    prog: 85,
  },
  {
    bl: "BL-20240898",
    origin: "Chennai",
    dest: "Singapore",
    mode: "🚢 LCL",
    eta: "Apr 10",
    status: "transit",
    prog: 90,
  },
  {
    bl: "BL-20240896",
    origin: "JNPT",
    dest: "Los Angeles",
    mode: "🚢 Sea FCL",
    eta: "Apr 22",
    status: "delayed",
    prog: 45,
  },
  {
    bl: "BL-20240892",
    origin: "Mumbai",
    dest: "Hamburg",
    mode: "🚢 Sea FCL",
    eta: "Apr 21",
    status: "delayed",
    prog: 50,
  },
  {
    bl: "BL-20240888",
    origin: "Delhi",
    dest: "New York",
    mode: "✈️ Air",
    eta: "Apr 07",
    status: "customs",
    prog: 95,
  },
  {
    bl: "BL-20240885",
    origin: "Chennai",
    dest: "Sydney",
    mode: "🚢 Multimodal",
    eta: "Apr 07",
    status: "delivered",
    prog: 100,
  },
  {
    bl: "BL-20240882",
    origin: "JNPT",
    dest: "Hamburg",
    mode: "🚢 Sea FCL",
    eta: "Apr 05",
    status: "delivered",
    prog: 100,
  },
  {
    bl: "BL-20240879",
    origin: "Mumbai",
    dest: "Singapore",
    mode: "🚢 LCL",
    eta: "Apr 13",
    status: "transit",
    prog: 30,
  },
];

/** Matches `buildSpendChart()` in the sample HTML. */
const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"];
const seaS = [18, 22, 16, 25, 28, 30, 24, 21, 26, 30, 32, 34];
const airS = [8, 9, 7, 10, 12, 13, 11, 9, 11, 13, 14, 15];
const mulS = [2, 3, 2, 4, 4, 5, 4, 3, 4, 5, 5, 6];
const maxV = Math.max(...seaS.map((v, i) => v + airS[i] + mulS[i]));

export const spendChartColumns = months.map((m, i) => ({
  month: m,
  mh: Math.round((mulS[i] / maxV) * 108),
  ah: Math.round((airS[i] / maxV) * 108),
  sh: Math.round((seaS[i] / maxV) * 108),
}));

export const statusPillMap = {
  transit: { className: "pill p-blue", label: "In Transit" },
  delayed: { className: "pill p-amber", label: "Delayed" },
  customs: { className: "pill p-red", label: "At Customs" },
  delivered: { className: "pill p-green", label: "Delivered" },
};

export const progressColorMap = {
  transit: "var(--blue-mid)",
  delayed: "var(--amber)",
  customs: "var(--red)",
  delivered: "var(--teal)",
};
