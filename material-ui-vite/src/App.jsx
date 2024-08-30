import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import Dashboard from './dashboard/Dashboard.jsx';

export default function App() {
  return (
    <Router>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Material UI Vite.js example
          </Typography>
          <Routes>
            <Route path="/" element={<ProTip />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
          <Copyright />
        </Box>
      </Container>
    </Router>
  );
}
