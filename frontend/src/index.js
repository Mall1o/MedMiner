import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';  // Assicurati che BrowserRouter sia importato
import App from './App';
import './index.css';
import ThemeProvider from './theme/index/ThemeProvider';  // Importa ThemeProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>  {/* Avvolgi App con BrowserRouter */}
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
);
