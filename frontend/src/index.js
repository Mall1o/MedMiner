import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
import './index.css';
import ThemeProvider from './theme/index/ThemeProvider'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter> 
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
  </StrictMode>,
);
