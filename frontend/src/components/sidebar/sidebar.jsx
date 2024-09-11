import React from 'react';
import './sidebar.css';
import { useSidebar } from '../../context/SidebarContext'; // Importa il contesto globale
import logo from '../../assets/newLogo.png';
import { Link } from 'react-router-dom'; // Importa React Router

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Usa lo stato globale della sidebar

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '←' : '→'}
      </div>
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
        <h1 className="app-name">ComorGraph</h1>
      </div>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li><Link to="/home">🏠 Home</Link></li>
          <li><Link to="/patients">👥 Pazienti</Link></li>
          <li><Link to="/diseases">⚕️ Malattie</Link></li>
          <li><Link to="/prescriptions">💊 Prescrizioni</Link></li>
          <li><Link to="/ai-module">🤖 Modulo IA</Link></li>
          <li><Link to="/other-pages">...</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
