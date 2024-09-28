import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; // Aggiungi useLocation per gestire le rotte
import Sidebar from './components/sidebar/sidebar.jsx';
import WelcomePage from './pages/WelcomePage/WelcomePage.jsx';
import Home from './pages/Homepage/Home.jsx';
import GraphPage from './pages/GraphPage/GraphPage';
import PatientPage from './pages/PatientPage/patientPage.jsx'; // Lista pazienti
import PrescriptionPage from './pages/PrescriptionPage/prescriptionPage.jsx'; // Lista prescrizioni
import DiseasePage from './pages/DiseasePage/diseasePage.jsx'; // Lista malattie
import DiseaseDetails from './pages/DiseasePage/diseaseDetailsPage.jsx'; // Dettagli malattie
import LoadCsvPage from './pages/LoadCsvPage/LoadCsvPage.jsx'; // Pagina per caricare il CSV
import styles from './App.module.css';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import { DetailsPanelProvider } from './context/DetailsPanelContext';
import ScrollToTop from './hooks/ScrollToTop';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

const App = () => {
  useScrollToTop(); // Hook per tornare in cima alla pagina
  return (
    <ErrorBoundary>
      <SidebarProvider>
        <DetailsPanelProvider>
          <ScrollToTop />
          <MainLayout />
        </DetailsPanelProvider>
      </SidebarProvider>
    </ErrorBoundary>
  );
};

const MainLayout = () => {
  const { isSidebarOpen } = useSidebar(); // Ottieni lo stato della sidebar dal contesto
  const location = useLocation(); // Hook per rilevare i cambiamenti di rotta

  // Verifica se la pagina corrente è la homepage "/"
  const isHomePage = location.pathname === '/';

  return (
    <div className={`${styles.appContainer} ${isHomePage ? styles.homePageContainer : ''}`}>
      {!isHomePage && <Sidebar />} {/* Nascondi la sidebar se sei nella homepage */}
      <div className={`${styles.mainContent} ${isSidebarOpen && !isHomePage ? styles.mainContentSidebarOpen : styles.mainContentSidebarClosed}`}>
        <div className={styles.contentWrapper}>
          <Routes>
            <Route path="/" element={<WelcomePage />} /> {/* Homepage */}
            <Route path="/dashboard" element={<Home />} />
            <Route path="/graph/:tipo/:codice" element={<GraphPage />} /> {/* Percorso dinamico */}
            <Route path="/patients" element={<PatientPage />} /> {/* Lista dei pazienti */}
            <Route path="/prescriptions" element={<PrescriptionPage />} /> {/* Lista delle prescrizioni */}
            <Route path="/diseases_group" element={<DiseasePage />} /> {/* Lista delle malattie */}
            <Route path="/diseases/:gruppo" element={<DiseaseDetails />} />
            <Route path="/load-csv" element={<LoadCsvPage />} /> {/* Pagina per caricare il CSV */}
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
