import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx'; 
import Sidebar from './components/sidebar/Sidebar.jsx';
import Home from './pages/Home';
import GraphPage from './pages/GraphPage'; 
import './App.css';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true); // Stato per gestire la visibilità della Sidebar

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="app-container" style={{ display: 'flex' }}>
      {isSidebarOpen && <Sidebar />} {/* Mostra o nascondi la Sidebar in base allo stato */}
      <div style={{ flexGrow: 1 }}>
        <Navbar onToggleSidebar={toggleSidebar} /> {/* Passa la funzione di toggle alla Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />  
          {/* Aggiungi qui altre rotte */}
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;


/* CODICE CON SEPARAZIONE LOGICA DI NAVBAR

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer'; 
import Sidebar from './components/sidebar/Sidebar.jsx';
import Home from './pages/Home';
import './App.css';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {isSidebarOpen && <Sidebar />}
      <div className="navbar-container">
        <Navbar onToggleSidebar={toggleSidebar} />
      </div>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />  */
          {/* Aggiungi qui altre rotte */}
          /*</Routes>
          <Footer />
        </div>
      </div>
    );
  };
  
  export default App;*/