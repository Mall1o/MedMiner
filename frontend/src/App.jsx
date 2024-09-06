import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar.jsx';
import Footer from './components/footer/Footer.jsx'; 
import Sidebar from './components/sidebar/Sidebar.jsx';
import Home from './pages/Home';
import GraphPage from './pages/GraphPage'; 
import './App.css';
import ThemeProvider from './theme/index.jsx';

const App = () => {
  return (
    <ThemeProvider> 
      <div className="app-container sidebar-open">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/graph" element={<GraphPage />} /> 
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
