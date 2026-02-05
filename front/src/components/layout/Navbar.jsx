import { NavLink } from "react-router-dom";

const linkStyle = {
  marginRight: 16,
  textDecoration: "none",
  fontWeight: "bold"
};

export default function Navbar() {
  return (
    <nav
      style={{
        padding: "16px 24px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}
    >
      <span style={{ fontWeight: "bold", fontSize: 18 }}>
        EldoCare
      </span>

      <div>
        <NavLink to="/" style={linkStyle}>Home</NavLink>
        <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
        <NavLink to="/hospital" style={linkStyle}>Hospital</NavLink>
        <NavLink to="/chv" style={linkStyle}>CHV</NavLink>
        <NavLink to="/ngo" style={linkStyle}>NGO / Gov</NavLink>
        <NavLink to="/call-me" style={linkStyle}>Call Me</NavLink>

      </div>
    </nav>
  );
}
