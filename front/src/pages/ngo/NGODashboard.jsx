// inside NGODashboard.jsx
import { useEffect, useState } from "react";
import { fetchSummary } from "../../api/ngo.api";
import StatCard from "../../components/cards/StatCard";

export default function NGODashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary().then(res => setSummary(res.data));
  }, []);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">NGO / Government Dashboard</h1>

      <div className="grid grid-cols-4 gap-4">
        <StatCard title="Total Calls" value={summary.totalCalls} />
        <StatCard title="High Risk Cases" value={summary.highRiskCases} />
        <StatCard title="Escalations" value={summary.escalations} />
        <StatCard title="Revenue Events" value={summary.revenueEvents} />
      </div>

      {/* CHV + Heatmap sections come next */}
    </div>
  );
}
