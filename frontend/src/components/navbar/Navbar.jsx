import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Button from '@mui/material/Button';
import { useResponsive, useWidth } from '../../hooks/use-responsive';
import './Navbar.css'; // Importa il file CSS

const Navbar = ({ onToggleSidebar }) => {
  const isMobile = useResponsive('down', 'sm'); // Verifica se lo schermo è piccolo
  const currentWidth = useWidth();  // Ottieni il breakpoint attuale

  return (
    <AppBar 
      position="static" 
      className={`navbar-container ${currentWidth === 'xs' ? 'navbar-xs' : ''}`}
      sx={{ backgroundColor: 'transparent !important' }} // Garantisce che Material-UI non sovrascriva lo stile
    >
      <Toolbar className="navbar-toolbar">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            edge="start" 
            color="inherit" 
            className="navbar-menu-button" 
            onClick={onToggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" className="navbar-logo-link">
            <img 
              src={logo} 
              alt="Logo" 
              className={`navbar-logo ${isMobile ? 'small-logo' : ''}`} 
            />
            <Typography 
              variant="h6" 
              component="div" 
              className={`navbar-title ${isMobile ? 'small-title' : ''}`}
            >
              MedMiner 2.0
            </Typography>
          </Link>
        </Box>

        {/* Mostra i pulsanti di navigazione solo su schermi medi o più grandi */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button component={Link} to="/" className="transparent-button">Home</Button>
            <Button component={Link} to="/search" className="transparent-button">Ricerca</Button>
            <Button component={Link} to="/graph" className="transparent-button">Grafi</Button>
          </Box>
        )}
        
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
