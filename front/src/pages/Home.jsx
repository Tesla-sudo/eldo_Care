import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 900, margin: "40px auto" }}>
      <h1>Health Access & Emergency Response Platform</h1>

      <p style={{ fontSize: 18 }}>
        Fast, voice-based health triage connecting communities
        to care in minutes.
      </p>

      <button
        onClick={() => navigate("/call-me")}
        style={{
          padding: "14px 24px",
          fontSize: 16,
          marginTop: 24,
          cursor: "pointer"
        }}
      >
        📞 Request a Call
      </button>
    </div>
  );
}
