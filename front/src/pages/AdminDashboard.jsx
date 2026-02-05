import { useEffect, useState } from 'react';
import adminApi from '../api/adminClient';
import StatsSection from '../components/StatsSection';
import RevenueSection from '../components/RevenueSection';



export default function AdminDashboard() {
  const [overview, setOverview] = useState([]);
  const [billing, setBilling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const overviewRes = await adminApi.get('/insights/overview');
        const billingRes = await adminApi.get('/billing/summary');

        setOverview(overviewRes.data);
        setBilling(billingRes.data);
      } catch (err) {
        console.error('Failed to load dashboard', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading dashboard…</p>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto' }}>
      <h1>Admin Dashboard</h1>

      <StatsSection overview={overview} />
      <RevenueSection billing={billing} />
    </div>
  );
}
