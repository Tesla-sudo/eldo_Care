import { useEffect, useState } from "react";
import { fetchMyCases } from "../../api/chv.api";
import CHVActivityTable from "../../components/tables/CHVActivityTable";

export default function CHVDashboard() {
  const [cases, setCases] = useState([]);

  useEffect(() => {
    fetchMyCases().then(res => setCases(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Activity</h1>
      <CHVActivityTable cases={cases} />
    </div>
  );
}
