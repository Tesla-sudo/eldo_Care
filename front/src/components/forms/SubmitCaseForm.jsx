import { useState } from "react";
import { submitCase } from "../../api/chv.api";

export default function SubmitCaseForm() {
  const [form, setForm] = useState({
    patientPhone: "",
    symptoms: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await submitCase(form);
    setLoading(false);
    alert("Case submitted successfully");
    setForm({ patientPhone: "", symptoms: "", location: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="input"
        placeholder="Patient phone number"
        value={form.patientPhone}
        onChange={e => setForm({ ...form, patientPhone: e.target.value })}
        required
      />
      <textarea
        className="input"
        placeholder="Symptoms"
        value={form.symptoms}
        onChange={e => setForm({ ...form, symptoms: e.target.value })}
        required
      />
      <input
        className="input"
        placeholder="Location"
        value={form.location}
        onChange={e => setForm({ ...form, location: e.target.value })}
      />
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Case"}
      </button>
    </form>
  );
}
