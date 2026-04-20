/**
 * Static document lists from `pentagon_prime_client_portal.html` (TAB 4 — MY DOCUMENTS).
 */

export const DOCUMENT_FILTER_CHIPS = [
  { id: "all", label: "All" },
  { id: "bol", label: "Bills of Lading" },
  { id: "customs", label: "Customs" },
  { id: "cert", label: "Certificates" },
  { id: "pack", label: "Packing Lists" },
];

/** Recent Documents card — order and copy match the sample HTML. */
export const recentDocumentRows = [
  {
    ico: "📋",
    icoBg: "var(--blue-light)",
    name: "BL-20240901 — Bill of Lading",
    meta: "Mumbai → Hamburg · MSC Gulsun · Apr 02, 2024",
    size: "248 KB",
    action: "↓ PDF",
  },
  {
    ico: "🏛",
    icoBg: "var(--teal-bg)",
    name: "BL-20240901 — Customs Invoice",
    meta: "HS 720610 · Flat steel · FOB · PRIME validated",
    size: "186 KB",
    action: "↓ PDF",
  },
  {
    ico: "📑",
    icoBg: "var(--amber-bg)",
    name: "BL-20240901 — Packing List",
    meta: "24T net · 26T gross · 2 × 40' FCL",
    size: "120 KB",
    action: "↓ PDF",
  },
  {
    ico: "📋",
    icoBg: "var(--blue-light)",
    name: "BL-20240900 — Air Waybill",
    meta: "Delhi → Dubai · Air India Cargo · Apr 08, 2024",
    size: "198 KB",
    action: "↓ PDF",
  },
  {
    ico: "⚠️",
    icoBg: "var(--red-bg)",
    name: "BL-20240888 — Form 7512 MISSING",
    meta: "CBP New York — Required for customs clearance",
    metaStyle: { color: "var(--red)" },
    size: "—",
    action: "Upload",
    actionStyle: {
      background: "var(--red-bg)",
      borderColor: "var(--red)",
      color: "var(--red)",
    },
  },
];

/** Past Documents (2023–2024) card — order and copy match the sample HTML. */
export const pastDocumentRows = [
  {
    ico: "📋",
    icoBg: "var(--blue-light)",
    name: "BL-20240882 — Bill of Lading",
    meta: "JNPT → Hamburg · Delivered Apr 05",
    size: "231 KB",
    action: "↓ PDF",
  },
  {
    ico: "📋",
    icoBg: "var(--blue-light)",
    name: "BL-20240885 — Bill of Lading",
    meta: "Chennai → Sydney · Delivered Apr 07",
    size: "218 KB",
    action: "↓ PDF",
  },
  {
    ico: "🏆",
    icoBg: "var(--teal-bg)",
    name: "Certificate of Origin — Q1 2024",
    meta: "Flat steel · HS 720610 · FIEO certified",
    size: "164 KB",
    action: "↓ PDF",
  },
  {
    ico: "📑",
    icoBg: "var(--amber-bg)",
    name: "Annual Compliance Pack 2023",
    meta: "AEO certification docs · Customs audit trail",
    size: "1.8 MB",
    action: "↓ ZIP",
  },
  {
    ico: "📊",
    icoBg: "var(--purple-bg)",
    name: "Freight Performance Report 2023",
    meta: "312 shipments · On-time · Cost analysis",
    size: "3.2 MB",
    action: "↓ PDF",
  },
];
