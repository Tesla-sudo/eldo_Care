import { useEffect, useState } from "react";
import { fetchSummary } from "../../api/ngo.api";
import StatCard from "../../components/cards/StatCard";

export default function NGODashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    fetchSummary().then(res => setSummary(res.data));
  }, []);

  if (!summary) return (
    <div style={{
      textAlign: 'center',
      padding: '100px 20px',
      backgroundColor: '#FFFFFF'
    }}>
      <div style={{
        display: 'inline-block',
        padding: '25px 40px',
        backgroundColor: '#F0F9F0',
        borderRadius: '12px',
        border: '2px solid #228B22'
      }}>
        <p style={{
          color: '#228B22',
          fontSize: '18px',
          fontWeight: '600',
          margin: '0'
        }}>
          Loading NGO Dashboard...
        </p>
        <div style={{
          marginTop: '15px',
          width: '40px',
          height: '40px',
          border: '4px solid #F0F9F0',
          borderTop: '4px solid #DC2626',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto'
        }}></div>
      </div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  return (
    <div style={{
      padding: '30px',
      backgroundColor: '#F8F9FA',
      minHeight: '100vh'
    }}>
     
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)',
        borderLeft: '5px solid #DC2626'
      }}>
        <h1 style={{
          color: '#DC2626',
          fontSize: '28px',
          fontWeight: 'bold',
          margin: '0'
        }}>
          NGO / Government Dashboard
        </h1>
        <p style={{
          color: '#666666',
          marginTop: '10px',
          fontSize: '16px'
        }}>
          Overview of health initiatives, cases, and impact metrics
        </p>
      </div>

     
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)',
          borderTop: '4px solid #228B22'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#228B22',
            marginBottom: '10px'
          }}>
            {summary.totalCalls}
          </div>
          <div style={{
            color: '#666666',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Total Calls
          </div>
          <div style={{
            fontSize: '14px',
            color: '#888888',
            marginTop: '5px'
          }}>
            Health consultations provided
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)',
          borderTop: '4px solid #DC2626'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#DC2626',
            marginBottom: '10px'
          }}>
            {summary.highRiskCases}
          </div>
          <div style={{
            color: '#666666',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            High Risk Cases
          </div>
          <div style={{
            fontSize: '14px',
            color: '#888888',
            marginTop: '5px'
          }}>
            Requiring immediate attention
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)',
          borderTop: '4px solid #228B22'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#228B22',
            marginBottom: '10px'
          }}>
            {summary.escalations}
          </div>
          <div style={{
            color: '#666666',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Escalations
          </div>
          <div style={{
            fontSize: '14px',
            color: '#888888',
            marginTop: '5px'
          }}>
            To hospital facilities
          </div>
        </div>

        <div style={{
          backgroundColor: '#FFFFFF',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)',
          borderTop: '4px solid #DC2626'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#DC2626',
            marginBottom: '10px'
          }}>
            {summary.revenueEvents}
          </div>
          <div style={{
            color: '#666666',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Revenue Events
          </div>
          <div style={{
            fontSize: '14px',
            color: '#888888',
            marginTop: '5px'
          }}>
            Billing incidents recorded
          </div>
        </div>
      </div>

     
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)'
      }}>
        <h2 style={{
          color: '#228B22',
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '20px'
        }}>
          Quick Actions
        </h2>
        <div style={{
          display: 'flex',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#228B22',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📊 Generate Report
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#FFFFFF',
            color: '#DC2626',
            border: '2px solid #DC2626',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            🔔 View Alerts
          </button>
          <button style={{
            padding: '12px 24px',
            backgroundColor: '#F0F9F0',
            color: '#228B22',
            border: '2px solid #228B22',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}>
            📈 View Analytics
          </button>
        </div>
      </div>
    </div>
  );
}