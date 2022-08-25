import React from "react";
import "./styles.css";

const Navbar = ({ onLogout }) => {
  return (
    <nav className="nav">
      <h1 className="logo">SisRepo</h1>
      <button onClick={onLogout}>Sair</button>
    </nav>
  );
};

export default Navbar;
