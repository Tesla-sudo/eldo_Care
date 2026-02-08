// frontend/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import adminApi from '../api/adminClient';
import StatsSection from '../components/StatsSection';
import RevenueSection from '../components/RevenueSection';

export default function AdminDashboard() {
  const [overview, setOverview] = useState({ totalCalls: 0, activeCases: 0, resolvedCases: 0 });
  // const [billing, setBilling] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        // Fixed path - added /api prefix
        const overviewRes = await adminApi.get('/api/insights/overview');
        // If you have billing route later:
        // const billingRes = await adminApi.get('/api/billing/summary');
        // setBilling(billingRes.data);

        setOverview(overviewRes.data);
      } catch (err) {
        console.error('Failed to load dashboard', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium text-gray-500 animate-pulse">Loading dashboard…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-medium text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-gray-500">Monitor your platform performance and revenue.</p>
        </header>
        
        <div className="space-y-8">
          {/* <RevenueSection billing={billing} /> */} {/* Uncomment when ready */}
          <StatsSection overview={overview} />
        </div>
      </div>
    </div>
  );
}