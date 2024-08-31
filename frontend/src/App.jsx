// src/App.js
import React from 'react';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';

function App() {
  /*const handleSearch = (query) => {
    console.log(`Cercando: ${query}`);
  };*/

  return (
    <div className="App">
      <Navbar />
      {/* Altri componenti verranno aggiunti qui */}
    </div>
  );
}

export default App;
