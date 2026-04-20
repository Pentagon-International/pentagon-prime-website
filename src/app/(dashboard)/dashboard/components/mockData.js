export const navLinks = [
  { href: "/dashboard", label: "My Dashboard" },
  { href: "/dashboard/shipments", label: "My Shipments" },
  { href: "/dashboard/tracking", label: "Live Tracking" },
  { href: "/dashboard/jobs", label: "Documents" },
  { href: "/dashboard/accounts", label: "Invoices" },
  { href: "/dashboard/settings", label: "Support" },
];

export const overviewStats = [
  { label: "Active Shipments", value: "14", sub: "↑ 3 from last month" },
  { label: "Delivered (MTD)", value: "8", sub: "100% on time" },
  { label: "Need Attention", value: "2", sub: "Delay + Customs" },
  { label: "Freight Spend (MTD)", value: "₹28.4L", sub: "↑ 8% vs last month" },
  { label: "Pending Invoices", value: "3", sub: "₹12.4L outstanding" },
];

export const shipmentRows = [
  {
    bl: "BL-20240901",
    route: "Mumbai → Hamburg",
    mode: "Sea FCL",
    eta: "Apr 23",
    status: "In Transit",
    progress: "60%",
  },
  {
    bl: "BL-20240892",
    route: "Mumbai → Hamburg",
    mode: "Sea FCL",
    eta: "Apr 21",
    status: "Delayed",
    progress: "50%",
  },
  {
    bl: "BL-20240888",
    route: "Delhi → New York",
    mode: "Air",
    eta: "Apr 07",
    status: "At Customs",
    progress: "95%",
  },
];

export const jobsRows = [
  { id: "JOB-1021", name: "Container Re-Booking", owner: "Ops", status: "Open" },
  { id: "JOB-1022", name: "Invoice Reconciliation", owner: "Accounts", status: "In Review" },
  { id: "JOB-1023", name: "Customs Document Upload", owner: "Compliance", status: "Pending" },
];

export const accountRows = [
  { invoice: "INV-2024-0314", amount: "₹5.8L", due: "Apr 17", status: "Due Soon" },
  { invoice: "INV-2024-0313", amount: "₹2.4L", due: "Apr 22", status: "Pending" },
  { invoice: "INV-2024-0312", amount: "₹4.2L", due: "Apr 15", status: "Overdue" },
];
