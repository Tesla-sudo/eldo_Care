export default function CHVActivityTable({ cases }) {
  return (
    <table className="w-full border">
      <thead>
        <tr className="bg-gray-100">
          <th>Date</th>
          <th>Risk</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {cases.map(c => (
          <tr key={c._id} className="border-t">
            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
            <td>{c.riskLevel}</td>
            <td>{c.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
