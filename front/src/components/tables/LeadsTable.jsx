import { useState, useEffect } from 'react';

export default function LeadsTable({ leads }) {
  const [localLeads, setLocalLeads] = useState([]);

  useEffect(() => {
    // Add a default status for each lead
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalLeads(leads.map(l => ({ ...l, status: 'new' })));
  }, [leads]);

  function updateStatus(index, status) {
    const updated = [...localLeads];
    updated[index].status = status;
    setLocalLeads(updated);
  }

  return (
    <section>
      <h2>Incoming Leads</h2>
      <table width="100%" border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Date</th>
            <th>Risk Level</th>
            <th>County</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {localLeads.map((lead, index) => (
            <tr key={lead._id || index}>
              <td>{lead.createdAt ? new Date(lead.createdAt).toLocaleString() : 'N/A'}</td>
              <td>{lead.metadata?.riskLevel || 'N/A'}</td>
              <td>{lead.metadata?.county || 'N/A'}</td>
              <td>{lead.status}</td>
              <td>
                <select
                  value={lead.status}
                  onChange={(e) => updateStatus(index, e.target.value)}
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
