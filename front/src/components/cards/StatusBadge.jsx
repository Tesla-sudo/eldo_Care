export default function StatusBadge({ status }) {
  const color = {
    pending: "bg-yellow-400",
    verified: "bg-green-500",
    rejected: "bg-red-500"
  }[status];

  return (
    <span className={`px-4 py-2 rounded text-white ${color}`}>
      {status.toUpperCase()}
    </span>
  );
}
