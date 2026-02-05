import { useState } from "react";
import voiceApi from "../api/voiceClient";

export default function CallMe() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleCall() {
    if (!phoneNumber.startsWith("+")) {
      setMessage("Please include country code (e.g. +254)");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await voiceApi.post("/voice/call-me", {
        phoneNumber
      });

      setMessage("📞 We are calling you shortly…");
      setPhoneNumber("");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to initiate call");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      <h2>Request a Call</h2>

      <input
        type="tel"
        placeholder="+2547XXXXXXXX"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 12 }}
      />

      <button
        onClick={handleCall}
        disabled={loading}
        style={{ width: "100%", padding: 12 }}
      >
        {loading ? "Calling…" : "Call Me"}
      </button>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
