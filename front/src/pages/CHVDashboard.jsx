export default function CHVDashboard() {
  return (
    <div style={{ 
      maxWidth: 900, 
      margin: "40px auto",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "#FFFFFF", /* White background for card */
        borderRadius: "12px",
        padding: "40px",
        boxShadow: "0 4px 15px rgba(34, 139, 34, 0.15)", /* Green-tinted shadow */
        border: "1px solid #E5E7EB",
        textAlign: "center"
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80px",
          height: "80px",
          backgroundColor: "#F0F9F0", /* Light green circle */
          borderRadius: "50%",
          marginBottom: "25px",
          border: "3px solid #228B22" /* Green border */
        }}>
          <span style={{ fontSize: "36px" }}>👨‍⚕️</span>
        </div>
        
        <h1 style={{
          color: "#228B22", /* Green for main heading */
          marginBottom: "15px",
          fontSize: "32px"
        }}>
          CHV Interface
        </h1>
        
        <p style={{
          color: "#333333",
          fontSize: "18px",
          lineHeight: "1.6",
          marginBottom: "40px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto"
        }}>
          Submit cases, view activity, and track verification status.
        </p>
        
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap"
        }}>
          <button style={{
            padding: "14px 28px",
            backgroundColor: "#228B22", /* Green button */
            color: "#FFFFFF", /* White text */
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#1C6F1C"; /* Darker green */
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(34, 139, 34, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#228B22";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}>
            📋 Submit New Case
          </button>
          
          <button style={{
            padding: "14px 28px",
            backgroundColor: "#FFFFFF", /* White button */
            color: "#DC2626", 
            border: "2px solid #DC2626", 
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#FEF2F2";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#FFFFFF";
            e.target.style.transform = "translateY(0)";
          }}>
            📊 View Activity
          </button>
          
          <button style={{
            padding: "14px 28px",
            backgroundColor: "#DC2626", 
            color: "#FFFFFF", 
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#B91C1C"; 
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.3)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#DC2626";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "none";
          }}>
            🔍 Track Status
          </button>
        </div>
        
        <div style={{
          marginTop: "50px",
          padding: "25px",
          backgroundColor: "#F8F9FA",
          borderRadius: "10px",
          borderLeft: "4px solid #DC2626" 
        }}>
          <h3 style={{
            color: "#DC2626",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            ⚡ Quick Stats
          </h3>
          <div style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            gap: "20px"
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#228B22" 
              }}>12</div>
              <div style={{ color: "#666666", fontSize: "14px" }}>Cases Today</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#228B22"
              }}>47</div>
              <div style={{ color: "#666666", fontSize: "14px" }}>This Week</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#DC2626" 
              }}>3</div>
              <div style={{ color: "#666666", fontSize: "14px" }}>Pending</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#228B22" 
              }}>89%</div>
              <div style={{ color: "#666666", fontSize: "14px" }}>Verified Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}