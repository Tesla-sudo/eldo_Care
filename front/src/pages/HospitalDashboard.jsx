import { useEffect, useState } from 'react';
import hospitalApi from '../api/hospitalClient';
import Metrics from '../components/Metrics';
import LeadsTable from '../components/tables/LeadsTable';

export default function HospitalDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await hospitalApi.get('/insights/hospital/leads');
        setLeads(res.data.map(l => ({ ...l, status: 'new' }))); // default status
      } catch (err) {
        console.error('Failed to load leads', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading hospital dashboard…</p>;

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto' }}>
      <h1>Hospital Dashboard</h1>
      <Metrics leads={leads} />
      <LeadsTable leads={leads} />
    </div>
  );
}
