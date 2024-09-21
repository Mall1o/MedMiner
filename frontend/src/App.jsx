import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Aggiungi useLocation per gestire le rotte
import Sidebar from './components/sidebar/sidebar.jsx';
import Home from './pages/Homepage/Home.jsx';
import GraphPage from './pages/GraphPage/GraphPage';
import PatientPage from './pages/PatientPage/patientPage.jsx'; // Lista pazienti
import PrescriptionPage from './pages/PrescriptionPage/prescriptionPage.jsx'; // Lista prescrizioni
import styles from './App.module.css';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { DetailsPanelProvider } from './context/DetailsPanelContext';
import ScrollToTop from './hooks/ScrollToTop';
import { useScrollToTop } from './hooks/use-scroll-to-top';

const App = () => {
  useScrollToTop(); // Hook per tornare in cima alla pagina
  return (
    <SidebarProvider>
      <DetailsPanelProvider>
        <ScrollToTop />
        <MainLayout />
      </DetailsPanelProvider>
    </SidebarProvider>
  );
};

const MainLayout = () => {
  const { isSidebarOpen } = useSidebar(); // Ottieni lo stato della sidebar dal contesto
  const location = useLocation(); // Hook per rilevare i cambiamenti di rotta
  return (
    <div className={styles.appContainer}>
      <Sidebar /> 
      <div className={`${styles.mainContent} ${isSidebarOpen ? styles.mainContentSidebarOpen : styles.mainContentSidebarClosed}`}>
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/graph/:codiceFiscale" element={<GraphPage />} /> {/* Percorso dinamico */}
            <Route path="/patients" element={<PatientPage />} /> {/* Lista dei pazienti */}
            <Route path="/prescriptions" element={<PrescriptionPage />} /> {/* Lista delle prescrizioni */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
