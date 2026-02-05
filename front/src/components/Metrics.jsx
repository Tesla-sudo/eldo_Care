export default function Metrics({ leads }) {
  const totalLeads = leads.length;

  // Temporary logic (frontend-only)
  const contacted = leads.filter(l => l.status === 'contacted').length;
  const converted = leads.filter(l => l.status === 'converted').length;

  return (
    <div style={{ display: 'flex', gap: 20, marginBottom: 30 }}>
      <Metric label="Total Leads" value={totalLeads} />
      <Metric label="Contacted" value={contacted} />
      <Metric label="Converted" value={converted} />
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div style={{
      padding: 20,
      border: '1px solid #ccc',
      borderRadius: 8,
      width: 200
    }}>
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  );
}
