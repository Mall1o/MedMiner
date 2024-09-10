import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import Home from './pages/Homepage/Home.jsx';
import GraphPage from './pages/GraphPage/GraphPage';
import './App.css';
import { SidebarProvider, useSidebar } from './context/SidebarContext';

const App = () => {
  return (
    <SidebarProvider>
      <MainLayout />
    </SidebarProvider>
  );
};

const MainLayout = () => {
  const { isSidebarOpen } = useSidebar(); // Ottieni lo stato della sidebar dal contesto

  return (
    <div className="app-container">
      <Sidebar /> 
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Navbar />
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph" element={<GraphPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
