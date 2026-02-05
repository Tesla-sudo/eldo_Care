import { NavLink } from "react-router-dom";

const linkStyle = {
  marginRight: 20,
  textDecoration: "none",
  fontWeight: "bold",
  color: "#228B22",
  padding: "8px 12px",
  borderRadius: "6px",
  transition: "all 0.3s ease"
};

const activeLinkStyle = {
  backgroundColor: "#DC2626", 
  color: "#FFFFFF", 
  padding: "8px 12px",
  borderRadius: "6px"
};

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "16px 32px",
        backgroundColor: "#FFFFFF", 
        borderBottom: "2px solid #228B22",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: "0 2px 10px rgba(34, 139, 34, 0.1)" 
      }}
    >
      <span style={{ 
        fontWeight: "bold", 
        fontSize: 22,
        color: "#DC2626", 
        display: "flex",
        alignItems: "center"
      }}>
        <span style={{
          backgroundColor: "#228B22", 
          color: "#FFFFFF", 
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "10px",
          fontSize: "16px"
        }}>⚕️</span>
        EldoCare
      </span>

      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {})
          })}
          onMouseEnter={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "#FEF2F2"; 
              e.target.style.color = "#DC2626"; 
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#228B22"; 
            }
          }}
        >
          Home
        </NavLink>
        
        <NavLink 
          to="/admin" 
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {})
          })}
          onMouseEnter={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "#FEF2F2";
              e.target.style.color = "#DC2626";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#228B22";
            }
          }}
        >
          Admin
        </NavLink>
        
        <NavLink 
          to="/hospital" 
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {})
          })}
          onMouseEnter={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "#FEF2F2";
              e.target.style.color = "#DC2626";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#228B22";
            }
          }}
        >
          Hospital
        </NavLink>
        
        <NavLink 
          to="/chv" 
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {})
          })}
          onMouseEnter={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "#FEF2F2";
              e.target.style.color = "#DC2626";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#228B22";
            }
          }}
        >
          CHV
        </NavLink>
        
        <NavLink 
          to="/ngo" 
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {})
          })}
          onMouseEnter={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "#FEF2F2";
              e.target.style.color = "#DC2626";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#228B22";
            }
          }}
        >
          NGO / Gov
        </NavLink>
        
        <NavLink 
          to="/call-me" 
          style={({ isActive }) => ({
            ...linkStyle,
            ...(isActive ? activeLinkStyle : {})
          })}
          onMouseEnter={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "#FEF2F2";
              e.target.style.color = "#DC2626";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.target.className.includes("active")) {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#228B22";
            }
          }}
        >
          Call Me
        </NavLink>
      </div>
    </nav>
  );
}