function statusClass(status) {
  if (status === "Delivered" || status === "Paid" || status === "Open") return "p-green";
  if (status === "Delayed" || status === "Due Soon" || status === "In Review") return "p-amber";
  if (status === "At Customs" || status === "Overdue") return "p-red";
  return "p-blue";
}

export default function Table({ columns, rows }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="tbl">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row[columns[0].key]}-${index}`}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.key === "status" ? (
                    <span className={`pill ${statusClass(row[column.key])}`}>{row[column.key]}</span>
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
