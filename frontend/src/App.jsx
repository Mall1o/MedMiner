import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx'; 
import Sidebar from './components/sidebar/Sidebar.jsx';
import Home from './pages/Home';
import GraphPage from './pages/GraphPage'; 
import './App.css';
import ThemeProvider from './theme/index.jsx';

const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <ThemeProvider> 
    <div className={`app-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
      {isSidebarOpen && <Sidebar />}
      <div className="main-content">
        <Navbar onToggleSidebar={toggleSidebar} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graph" element={<GraphPage />} /> 
          {/* Aggiungi qui altre rotte */}
        </Routes>
        <Footer />
      </div>
    </div>
    </ThemeProvider>
  );
};

export default App;
