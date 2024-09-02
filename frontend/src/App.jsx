import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import GraphPage from './pages/GraphPage'; 
import './App.css';

// Pagine placeholder temporanee
const SearchPlaceholder = () => <div>Search Page Placeholder</div>;

function App() {
  

  return (
    <div className="app-container">
      <Navbar />
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/search" element={<SearchPlaceholder />} />
        <Route path="/Graph" element={<GraphPage />} /> 
      </Routes>
      <div />
      <Footer />
    </div>
  );
}

export default App;
