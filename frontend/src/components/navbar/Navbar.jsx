import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Button from '@mui/material/Button';
import './Navbar.css'; // Importa il file CSS

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      className="navbar-container"
      sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} //necessario per sovrascrivere il tema
    >
      <Toolbar className="navbar-toolbar">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" className="navbar-logo-link">
            <img 
              src={logo} 
              alt="Logo" 
              className="navbar-logo" 
            />
            <Typography 
              variant="h6" 
              component="div" 
              className="navbar-title"
            >
              MedMiner 2.0
            </Typography>
          </Link>
        </Box>

        {/* Pulsanti di navigazione */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button component={Link} to="/" className="transparent-button">Home</Button>
          <Button component={Link} to="/search" className="transparent-button">Ricerca</Button>
          <Button component={Link} to="/graph" className="transparent-button">Grafi</Button>
        </Box>
        
        <IconButton 
          edge="end" 
          color="inherit" 
          className="navbar-search-button"
        >
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
