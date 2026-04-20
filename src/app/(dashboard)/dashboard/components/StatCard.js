export default function StatCard({ label, value, sub }) {
  return (
    <div className="kpi">
      <div className="kpi-lbl">{label}</div>
      <div className="kpi-val">{value}</div>
      <div className="kpi-sub">{sub}</div>
    </div>
  );
}
