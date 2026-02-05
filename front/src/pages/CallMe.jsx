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
    <div style={{ 
      maxWidth: 400, 
      margin: "60px auto", 
      textAlign: "center",
      backgroundColor: "#FFFFFF",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 12px rgba(34, 139, 34, 0.1)"
    }}>
      <h2 style={{ color: "#DC2626", marginBottom: "20px" }}>
        Request a Call
      </h2>

      <input
        type="tel"
        placeholder="+2547XXXXXXXX"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        style={{ 
          width: "100%", 
          padding: 12, 
          marginBottom: 12,
          border: "2px solid #228B22",
          borderRadius: "6px",
          fontSize: "16px"
        }}
      />

      <button
        onClick={handleCall}
        disabled={loading}
        style={{ 
          width: "100%", 
          padding: 12,
          backgroundColor: "#DC2626",
          color: "#FFFFFF",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          opacity: loading ? 0.7 : 1
        }}
      >
        {loading ? "Calling…" : "Call Me"}
      </button>

      {message && (
        <p style={{ 
          marginTop: 12,
          padding: "10px",
          borderRadius: "6px",
          backgroundColor: message.includes("❌") ? "#FEF2F2" : "#F0F9F0",
          color: message.includes("❌") ? "#DC2626" : "#228B22",
          border: `1px solid ${message.includes("❌") ? "#FECACA" : "#BBF7D0"}`
        }}>
          {message}
        </p>
      )}
    </div>
  );
}