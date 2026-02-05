export default function RevenueSection({ billing }) {
  return (
    <div>
      <h2>Revenue Summary</h2>
      <p>Total Revenue: {billing.totalRevenue}</p>
      <p>Pending Payments: {billing.pendingPayments}</p>
    </div>
  );
}
