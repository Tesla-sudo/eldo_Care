import { useEffect, useState } from 'react';
import hospitalApi from '../api/hospitalClient';
import Metrics from '../components/Metrics';
import LeadsTable from '../components/tables/LeadsTable';

export default function HospitalDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await hospitalApi.get('/insights/hospital/leads');
        setLeads(res.data.map(l => ({ ...l, status: 'new' }))); 
      } catch (err) {
        console.error('Failed to load leads', err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  if (loading) return (
    <div style={{ 
      textAlign: 'center', 
      padding: '60px 20px',
      backgroundColor: '#FFFFFF' 
    }}>
      <div style={{
        display: 'inline-block',
        padding: '20px 40px',
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
          Loading hospital dashboard…
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
      maxWidth: 1000, 
      margin: '40px auto',
      padding: '0 20px'
    }}>
      <h1 style={{
        color: '#DC2626', 
        borderBottom: '3px solid #228B22', 
        paddingBottom: '10px',
        marginBottom: '30px'
      }}>
        🏥 Hospital Dashboard
      </h1>
      
      <div style={{
        backgroundColor: '#FFFFFF', 
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)', 
        marginBottom: '30px',
        border: '1px solid #E5E7EB'
      }}>
        <Metrics leads={leads} />
      </div>
      
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(34, 139, 34, 0.1)', 
        border: '1px solid #E5E7EB'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '2px solid #F0F9F0' 
        }}>
          <h2 style={{
            color: '#228B22', 
            margin: '0'
          }}>
            Patient Leads
          </h2>
          <span style={{
            backgroundColor: '#FEF2F2',
            color: '#DC2626', 
            padding: '6px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            {leads.length} {leads.length === 1 ? 'Lead' : 'Leads'}
          </span>
        </div>
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}