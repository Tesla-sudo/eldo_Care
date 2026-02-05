import { useEffect, useState } from "react";
import { fetchCHVActivity } from "../../api/ngo.api";

// eslint-disable-next-line react-refresh/only-export-components
function CHVTable() {
  const [chvs, setChvs] = useState([]);

  useEffect(() => {
    fetchCHVActivity().then(res => setChvs(res.data));
  }, []);

  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="text-left border-b">
          <th className="p-2">Name</th>
          <th className="p-2">Region</th>
          <th className="p-2">Verified Actions</th>
        </tr>
      </thead>
      <tbody>
        {chvs.map(chv => (
          <tr key={chv.chvId} className="border-b">
            <td className="p-2">{chv.name}</td>
            <td className="p-2">{chv.region}</td>
            <td className="p-2 font-bold">{chv.verifiedActions}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
