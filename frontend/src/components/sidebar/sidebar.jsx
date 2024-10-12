import React from 'react';
import styles from'./Sidebar.module.css';
import { useSidebar } from '../../context/SidebarContext'; // Importa il contesto globale
import logo from '../../assets/newLogo.png';
import { Link } from 'react-router-dom'; // Importa React Router

const Sidebar = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Usa lo stato globale della sidebar

  return (
    <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
      <div className={styles.sidebarToggle} onClick={toggleSidebar}>
        {isSidebarOpen ? '←' : '→'}
      </div>
      <div className={styles.sidebarLogo}>
        <Link to="/">
        <img src={logo} alt="Logo" /> 
        </Link>
        <h1 className={styles.appName}>ComorGraph</h1>
      </div>
      <div className="sidebar-content">
        <ul className={styles.sidebarMenu}>
          <li className={styles.sidebarMenuItem}><Link to="/dashboard">📈 Dashboard</Link></li>
          <li className={styles.sidebarMenuItem}><Link to="/patients">👥 Pazienti</Link></li>
          <li className={styles.sidebarMenuItem}><Link to="/diseases_group">⚕️ Malattie</Link></li>
          <li className={styles.sidebarMenuItem}><Link to="/prescriptions">💊 Prescrizioni</Link></li>
          <li className={styles.sidebarMenuItem}><Link to="/modulo-ia">🤖 Modulo IA</Link></li>
          <li className={styles.sidebarMenuItem}><Link to="/load-csv">💾 Carica CSV</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
