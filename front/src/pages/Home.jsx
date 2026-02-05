import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ 
      maxWidth: 900, 
      margin: "40px auto",
      backgroundColor: "#ffffff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h1 style={{ 
        color: "#228B22", 
        marginBottom: "20px"
      }}>
        Health Access & Emergency Response Platform
      </h1>

      <p style={{ 
        fontSize: 18,
        color: "#333333", 
        lineHeight: "1.6",
        marginBottom: "30px"
      }}>
        Fast, voice-based health triage connecting communities
        to care in minutes.
      </p>

      <button
        onClick={() => navigate("/call-me")}
        style={{
          padding: "14px 24px",
          fontSize: 16,
          marginTop: 24,
          cursor: "pointer",
          backgroundColor: "#DC2626",
          color: "#ffffff", 
          border: "none",
          borderRadius: "8px",
          fontWeight: "600",
          transition: "all 0.3s ease",
          boxShadow: "0 2px 8px rgba(220, 38, 38, 0.3)"
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#B91C1C";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.4)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#DC2626";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 2px 8px rgba(220, 38, 38, 0.3)";
        }}
      >
        📞 Request a Call
      </button>
    </div>
  );
}