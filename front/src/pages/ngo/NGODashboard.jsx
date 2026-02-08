import { useEffect, useState } from "react";
import { fetchSummary } from "../../api/ngo.api";

export default function NGODashboard() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await fetchSummary();
        setSummary(res.data);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load NGO dashboard data");
      } finally {
        setLoading(false);
      }
    }

    loadSummary();
  }, []);

  // =======================
  // Loading State
  // =======================
  if (loading) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "100px 20px",
        backgroundColor: "#F8F9FA",
        minHeight: "100vh"
      }}>
        <div style={{
          display: "inline-block",
          padding: "40px 60px",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(34, 139, 34, 0.1)",
          border: "2px solid #228B22"
        }}>
          <div style={{
            width: "60px",
            height: "60px",
            border: "4px solid #F0F9F0",
            borderTop: "4px solid #DC2626",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 25px"
          }}></div>
          <h3 style={{
            color: "#228B22",
            fontSize: "24px",
            fontWeight: "600",
            margin: "0"
          }}>
            Loading NGO Dashboard…
          </h3>
          <p style={{
            color: "#666666",
            marginTop: "10px",
            fontSize: "14px"
          }}>
            Fetching latest health impact metrics
          </p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // =======================
  // Error State
  // =======================
  if (error) {
    return (
      <div style={{ 
        textAlign: "center", 
        padding: "100px 20px",
        backgroundColor: "#F8F9FA",
        minHeight: "100vh"
      }}>
        <div style={{
          display: "inline-block",
          padding: "40px 60px",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(220, 38, 38, 0.1)",
          border: "2px solid #DC2626",
          maxWidth: "500px"
        }}>
          <div style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#FEF2F2",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 25px"
          }}>
            <span style={{ fontSize: "40px", color: "#DC2626" }}>⚠️</span>
          </div>
          <h3 style={{
            color: "#DC2626",
            fontSize: "24px",
            fontWeight: "600",
            margin: "0"
          }}>
            Unable to Load Data
          </h3>
          <p style={{
            color: "#666666",
            marginTop: "15px",
            fontSize: "16px",
            lineHeight: "1.6"
          }}>
            {error}. Please check your connection and try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: "25px",
              padding: "12px 24px",
              backgroundColor: "#DC2626",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#B91C1C";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#DC2626";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // =======================
  // Render Dashboard
  // =======================
  return (
    <div style={{ 
      padding: "30px 20px",
      backgroundColor: "#F8F9FA",
      minHeight: "100vh",
      maxWidth: "1400px",
      margin: "0 auto"
    }}>
      {/* Header Section */}
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "35px",
        borderRadius: "16px",
        marginBottom: "30px",
        boxShadow: "0 4px 20px rgba(34, 139, 34, 0.08)",
        borderLeft: "6px solid #DC2626"
      }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <h1 style={{
              color: "#DC2626",
              fontSize: "32px",
              fontWeight: "bold",
              margin: "0 0 8px 0"
            }}>
              NGO / Government Dashboard
            </h1>
            <p style={{
              color: "#666666",
              fontSize: "16px",
              margin: "0"
            }}>
              Comprehensive overview of health initiatives and impact metrics
            </p>
          </div>
          <div style={{
            backgroundColor: "#F0F9F0",
            color: "#228B22",
            padding: "10px 20px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <span>📊</span>
            Last updated: Today
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "25px",
        marginBottom: "40px"
      }}>
        <Metric 
          label="Total Calls" 
          value={summary.totalCalls} 
          icon="📞" 
          description="Health consultations provided"
          trend="+12% this month"
          color="#228B22"
        />
        <Metric 
          label="High Risk Cases" 
          value={summary.highRiskCases} 
          icon="⚠️" 
          description="Requiring immediate attention"
          trend="Critical monitoring"
          color="#DC2626"
        />
        <Metric 
          label="Escalations" 
          value={summary.escalations} 
          icon="🏥" 
          description="To hospital facilities"
          trend="+8% from last week"
          color="#228B22"
        />
        <Metric 
          label="Revenue Events" 
          value={summary.revenueEvents} 
          icon="💰" 
          description="Billing incidents recorded"
          trend="+5% growth"
          color="#DC2626"
        />
      </div>

      {/* Additional Stats Section */}
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "35px",
        borderRadius: "16px",
        marginBottom: "40px",
        boxShadow: "0 4px 20px rgba(34, 139, 34, 0.08)"
      }}>
        <h2 style={{
          color: "#228B22",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 0 25px 0",
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <span style={{
            backgroundColor: "#F0F9F0",
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>📈</span>
          Additional Insights
        </h2>
        
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px"
        }}>
          <InsightCard 
            title="Avg. Response Time" 
            value="4.2 min" 
            subtitle="From call to triage"
            color="#228B22"
          />
          <InsightCard 
            title="CHV Coverage" 
            value="78%" 
            subtitle="Community reach"
            color="#228B22"
          />
          <InsightCard 
            title="Pending Cases" 
            value="23" 
            subtitle="Awaiting review"
            color="#DC2626"
          />
          <InsightCard 
            title="Satisfaction Rate" 
            value="94%" 
            subtitle="Patient feedback"
            color="#228B22"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "35px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(34, 139, 34, 0.08)"
      }}>
        <h2 style={{
          color: "#DC2626",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 0 25px 0"
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          <ActionButton 
            icon="📥" 
            label="Export Report" 
            color="#228B22"
          />
          <ActionButton 
            icon="🔔" 
            label="View Alerts" 
            color="#DC2626"
            badge="3"
          />
          <ActionButton 
            icon="👥" 
            label="Manage Teams" 
            color="#228B22"
          />
          <ActionButton 
            icon="⚙️" 
            label="Settings" 
            color="#666666"
          />
        </div>
      </div>
    </div>
  );
}

function Metric({ label, value, icon, description, trend, color }) {
  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      padding: "30px",
      borderRadius: "16px",
      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
      borderTop: `4px solid ${color}`,
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-8px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.1)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 0, 0, 0.05)";
    }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "20px"
      }}>
        <div style={{
          backgroundColor: color === "#DC2626" ? "#FEF2F2" : "#F0F9F0",
          width: "56px",
          height: "56px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px"
        }}>
          {icon}
        </div>
        <span style={{
          backgroundColor: color === "#DC2626" ? "#FEF2F2" : "#F0F9F0",
          color: color,
          padding: "6px 12px",
          borderRadius: "20px",
          fontSize: "12px",
          fontWeight: "600"
        }}>
          {trend}
        </span>
      </div>
      
      <h2 style={{
        fontSize: "42px",
        fontWeight: "bold",
        color: color,
        margin: "0 0 10px 0",
        lineHeight: "1"
      }}>
        {value}
      </h2>
      
      <p style={{
        color: "#333333",
        fontSize: "18px",
        fontWeight: "600",
        margin: "0 0 8px 0"
      }}>
        {label}
      </p>
      
      <p style={{
        color: "#666666",
        fontSize: "14px",
        margin: "0",
        opacity: "0.8"
      }}>
        {description}
      </p>
    </div>
  );
}

function InsightCard({ title, value, subtitle, color }) {
  return (
    <div style={{
      backgroundColor: color === "#DC2626" ? "#FEF2F2" : "#F0F9F0",
      padding: "20px",
      borderRadius: "12px",
      border: `1px solid ${color}20`
    }}>
      <p style={{
        color: color,
        fontSize: "14px",
        fontWeight: "600",
        margin: "0 0 10px 0",
        textTransform: "uppercase",
        letterSpacing: "0.5px"
      }}>
        {title}
      </p>
      <h3 style={{
        fontSize: "28px",
        fontWeight: "bold",
        color: color,
        margin: "0 0 5px 0"
      }}>
        {value}
      </h3>
      <p style={{
        color: "#666666",
        fontSize: "13px",
        margin: "0"
      }}>
        {subtitle}
      </p>
    </div>
  );
}

function ActionButton({ icon, label, color, badge }) {
  return (
    <button style={{
      padding: "16px 24px",
      backgroundColor: color === "#666666" ? "#F8F9FA" : (color === "#DC2626" ? "#FEF2F2" : "#F0F9F0"),
      color: color,
      border: `2px solid ${color}`,
      borderRadius: "12px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      position: "relative"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-4px)";
      e.currentTarget.style.backgroundColor = color === "#666666" ? "#F1F3F4" : (color === "#DC2626" ? "#FECACA" : "#BBF7D0");
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.backgroundColor = color === "#666666" ? "#F8F9FA" : (color === "#DC2626" ? "#FEF2F2" : "#F0F9F0");
    }}
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
      {label}
      {badge && (
        <span style={{
          position: "absolute",
          top: "-8px",
          right: "-8px",
          backgroundColor: "#DC2626",
          color: "#FFFFFF",
          fontSize: "12px",
          fontWeight: "bold",
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          {badge}
        </span>
      )}
    </button>
  );
}