export default function DashboardCard({ title, right, children }) {
  return (
    <div className="card">
      <div className="card-head">
        <div className="card-title">{title}</div>
        {right}
      </div>
      {children}
    </div>
  );
}
