import { useEffect, useState } from "react";
import { fetchVerificationStatus } from "../../api/chv.api";
import StatusBadge from "../../components/cards/StatusBadge";

export default function VerificationStatus() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    fetchVerificationStatus().then(res => setStatus(res.data));
  }, []);

  if (!status) return null;

  return (
    <div className="max-w-md mx-auto text-center">
      <h1 className="text-xl font-bold mb-4">Verification Status</h1>
      <StatusBadge status={status.state} />
      <p className="mt-2 text-gray-600">
        {status.message}
      </p>
    </div>
  );
}
