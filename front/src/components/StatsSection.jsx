// frontend/components/StatsSection.jsx
export default function StatsSection({ overview }) {
  // Default/fallback values to prevent crashes
  const stats = overview || {
    totalCalls: 0,
    activeCases: 0,
    resolvedCases: 0
  };

  // No reduce/map needed - just use the flat properties
  const total = stats.totalCalls + stats.activeCases + stats.resolvedCases;

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Call Overview</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
          Total: {total.toLocaleString()}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <th className="px-6 py-4">Event Type</th>
              <th className="px-6 py-4 text-right">Count</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-700">Total Calls</td>
              <td className="px-6 py-4 text-right text-gray-600">{stats.totalCalls.toLocaleString()}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-700">Active Cases</td>
              <td className="px-6 py-4 text-right text-gray-600">{stats.activeCases.toLocaleString()}</td>
            </tr>
            <tr className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium text-gray-700">Resolved Cases</td>
              <td className="px-6 py-4 text-right text-gray-600">{stats.resolvedCases.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}