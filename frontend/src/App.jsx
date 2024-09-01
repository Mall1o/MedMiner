import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import Home from './pages/Home';
import './App.css';

// Pagine placeholder temporanee
const SearchPlaceholder = () => <div>Search Page Placeholder</div>;
const GraphsPlaceholder = () => <div>Graphs Page Placeholder</div>;

function App() {
  

  return (
    <div className="app-container">
      <Navbar />
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/search" element={<SearchPlaceholder />} />
        <Route path="/graphs" element={<GraphsPlaceholder />} />
      </Routes>
      <div />
      <Footer />
    </div>
  );
}

export default App;
