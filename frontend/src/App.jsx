import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Aggiungi useLocation per gestire le rotte
import Navbar from './components/navbar/Navbar.jsx';
import Sidebar from './components/sidebar/sidebar.jsx';
import Home from './pages/Homepage/Home.jsx';
import GraphPage from './pages/GraphPage/GraphPage';
import PatientPage from './pages/PatientPage/patientPage.jsx'; // Lista pazienti
import './App.css';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import ScrollToTop from './hooks/ScrollToTop';
import { useScrollToTop } from './hooks/use-scroll-to-top';

const App = () => {
  useScrollToTop(); // Hook per tornare in cima alla pagina
  return (
    <SidebarProvider>
      <ScrollToTop />
      <MainLayout />
    </SidebarProvider>
  );
};

const MainLayout = () => {
  const { isSidebarOpen } = useSidebar(); // Ottieni lo stato della sidebar dal contesto
  const location = useLocation(); // Hook per rilevare i cambiamenti di rotta
  return (
    <div className="app-container">
      <Sidebar /> 
      <div className={`main-content ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        {/*<Navbar />*/}
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph/:codiceFiscale" element={<GraphPage />} /> {/* Percorso dinamico */}
            <Route path="/patients" element={<PatientPage />} /> {/* Lista dei pazienti */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
