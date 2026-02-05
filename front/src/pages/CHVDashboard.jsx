export default function CHVDashboard() {
  return (
    <div style={{ 
      maxWidth: 1000, 
      margin: "40px auto",
      padding: "20px"
    }}>
    
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(34, 139, 34, 0.1)",
        borderLeft: "5px solid #228B22"
      }}>
        <h1 style={{ color: "#228B22", marginBottom: "10px" }}>
          Community Health Volunteer Dashboard
        </h1>
        <p style={{ color: "#666666", fontSize: "18px" }}>
          Submit cases, view activity, and track verification status.
        </p>
      </div>

     
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        marginBottom: "30px"
      }}>
        {[
          { title: "Cases Today", value: "12", color: "#228B22" },
          { title: "This Week", value: "47", color: "#228B22" },
          { title: "Pending", value: "3", color: "#DC2626" },
          { title: "Verified", value: "44", color: "#228B22" }
        ].map((stat, index) => (
          <div key={index} style={{
            backgroundColor: "#FFFFFF",
            padding: "25px",
            borderRadius: "10px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0,0,0,0.05)",
            border: "1px solid #E5E7EB"
          }}>
            <div style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: stat.color,
              marginBottom: "10px"
            }}>
              {stat.value}
            </div>
            <div style={{ color: "#666666" }}>
              {stat.title}
            </div>
          </div>
        ))}
      </div>

    
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
        boxShadow: "0 4px 12px rgba(34, 139, 34, 0.1)"
      }}>
        <h2 style={{ color: "#DC2626", marginBottom: "20px" }}>
          Quick Actions
        </h2>
        <div style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap"
        }}>
          <button style={{
            padding: "15px 25px",
            backgroundColor: "#228B22",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            📋 Submit New Case
          </button>
          <button style={{
            padding: "15px 25px",
            backgroundColor: "#FFFFFF",
            color: "#DC2626",
            border: "2px solid #DC2626",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            📊 View Reports
          </button>
          <button style={{
            padding: "15px 25px",
            backgroundColor: "#F0F9F0",
            color: "#228B22",
            border: "2px solid #228B22",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
            🔍 Track Patient
          </button>
        </div>
      </div>

     
      <div style={{
        backgroundColor: "#FFFFFF",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(34, 139, 34, 0.1)"
      }}>
        <h2 style={{ color: "#228B22", marginBottom: "20px" }}>
          Recent Cases
        </h2>
        <div style={{
          border: "1px solid #E5E7EB",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F0F9F0" }}>
                <th style={{ padding: "15px", textAlign: "left", color: "#228B22" }}>Patient</th>
                <th style={{ padding: "15px", textAlign: "left", color: "#228B22" }}>Date</th>
                <th style={{ padding: "15px", textAlign: "left", color: "#228B22" }}>Status</th>
                <th style={{ padding: "15px", textAlign: "left", color: "#228B22" }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {[
                { patient: "John Mwangi", date: "2024-01-15", status: "Verified", priority: "High" },
                { patient: "Mary Wambui", date: "2024-01-14", status: "Pending", priority: "Medium" },
                { patient: "James Omondi", date: "2024-01-13", status: "Verified", priority: "Low" }
              ].map((caseItem, index) => (
                <tr key={index} style={{ 
                  borderTop: "1px solid #E5E7EB",
                  backgroundColor: index % 2 === 0 ? "#FFFFFF" : "#FAFAFA"
                }}>
                  <td style={{ padding: "15px" }}>{caseItem.patient}</td>
                  <td style={{ padding: "15px" }}>{caseItem.date}</td>
                  <td style={{ padding: "15px" }}>
                    <span style={{
                      backgroundColor: caseItem.status === "Verified" ? "#F0F9F0" : "#FEF2F2",
                      color: caseItem.status === "Verified" ? "#228B22" : "#DC2626",
                      padding: "5px 10px",
                      borderRadius: "20px",
                      fontSize: "14px"
                    }}>
                      {caseItem.status}
                    </span>
                  </td>
                  <td style={{ padding: "15px" }}>
                    <span style={{
                      color: caseItem.priority === "High" ? "#DC2626" : 
                             caseItem.priority === "Medium" ? "#D97706" : "#228B22",
                      fontWeight: "bold"
                    }}>
                      {caseItem.priority}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}