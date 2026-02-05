import React from 'react';
export default function StatsSection({ overview }) {
  const totalCalls = overview.reduce((sum, e) => sum + e.total, 0);

  return (
    <section style={{ marginTop: 30 }}>
      <h2>Call Overview</h2>

      <p><strong>Total Calls:</strong> {totalCalls}</p>

      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Event Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {overview.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
