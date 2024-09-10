import React from 'react';
import './sidebar.css';
import { useSidebar } from '../../context/SidebarContext'; // Importa il contesto globale

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Usa lo stato globale della sidebar

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? '←' : '→'}
      </div>
      <div className="sidebar-content">
        <ul className="sidebar-menu">
          <li>📊 Dashboard</li>
          <li>👥 Pazienti</li>
          <li>⚕️ Malattie</li>
          <li>💊 Prescrizioni</li>
          <li>🤖 Modulo IA</li>
          <li>Altre pagine boh</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;