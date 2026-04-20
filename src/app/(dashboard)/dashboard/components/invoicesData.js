/**
 * Static tables/cards from `pentagon_prime_client_portal.html` (TAB 5 — MY INVOICES).
 */

export const pendingInvoiceRows = [
  {
    invoice: "INV-2024-0314",
    bl: "BL-20240901",
    service: "Sea FCL · Mumbai–Hamburg",
    amount: "₹5.8L",
    issueDate: "Apr 02",
    dueDate: "Apr 17",
    dueStyle: { fontWeight: 600, color: "var(--red)" },
    statusClass: "pill p-amber",
    statusLabel: "Due Soon",
    payBtnStyle: { color: "var(--blue)" },
  },
  {
    invoice: "INV-2024-0313",
    bl: "BL-20240900",
    service: "Air Freight · Delhi–Dubai",
    amount: "₹2.4L",
    issueDate: "Apr 08",
    dueDate: "Apr 22",
    dueStyle: { fontWeight: 600, color: "var(--amber)" },
    statusClass: "pill p-amber",
    statusLabel: "Pending",
    payBtnStyle: { color: "var(--blue)" },
  },
  {
    invoice: "INV-2024-0312",
    bl: "BL-20240898",
    service: "LCL · Chennai–Singapore",
    amount: "₹4.2L",
    issueDate: "Apr 01",
    dueDate: "Apr 15 ⚠",
    dueStyle: { fontWeight: 600, color: "var(--red)" },
    statusClass: "pill p-red",
    statusLabel: "Overdue",
    payBtnStyle: {
      background: "var(--red-bg)",
      borderColor: "var(--red)",
      color: "var(--red)",
    },
  },
];

export const paymentHistoryRows = [
  {
    invoice: "INV-2024-0311",
    service: "Sea FCL · JNPT–Hamburg",
    amount: "₹6.1L",
    paidOn: "Apr 05",
  },
  {
    invoice: "INV-2024-0310",
    service: "Multimodal · Chennai–Sydney",
    amount: "₹3.8L",
    paidOn: "Apr 07",
  },
  {
    invoice: "INV-2024-0309",
    service: "Air Freight · BOM–JFK",
    amount: "₹4.2L",
    paidOn: "Mar 28",
  },
  {
    invoice: "INV-2024-0308",
    service: "Sea FCL · Mumbai–Hamburg",
    amount: "₹5.6L",
    paidOn: "Mar 22",
  },
  {
    invoice: "INV-2024-0307",
    service: "Custom Clearance",
    amount: "₹0.3L",
    paidOn: "Mar 18",
  },
];

export const spendByServiceRows = [
  { name: "Sea FCL / LCL", val: "₹84L (61%)", width: "61%", bg: "var(--blue-mid)" },
  { name: "Air Freight", val: "₹38L (27%)", width: "27%", bg: "var(--accent)" },
  { name: "Customs Clearance", val: "₹9L (6%)", width: "6%", bg: "var(--amber)" },
  { name: "Warehousing / Misc", val: "₹8L (6%)", width: "6%", bg: "var(--teal)", barMarginBottom: 0 },
];

export const statementRows = [
  {
    ico: "📊",
    icoBg: "var(--blue-light)",
    name: "Q1 2024 Account Statement",
    meta: "Jan–Mar · 14 invoices · ₹62L",
  },
  {
    ico: "📊",
    icoBg: "var(--bg2)",
    name: "Annual Statement 2023",
    meta: "Full year · 48 invoices · ₹1.2Cr",
  },
];
