import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu'; // Icona per il pulsante di menu
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo2.png';
import Button from '@mui/material/Button';

const TransparentButton = styled(Button)({
  color: '#333',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '20px',
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

const NavbarContainer = styled(AppBar)({
  backgroundColor: 'rgba(255, 255, 255, 0.4)',
  boxShadow: '50%',
  borderRadius: '15px',
  margin: '10px 0',
  padding: '5px',
  width: '100%',
  boxSizing: 'border-box',
});

const Navbar = ({ onToggleSidebar }) => {
  return (
    <NavbarContainer position="static">
      <Toolbar sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <IconButton edge="start" color="inherit" sx={{ color: '#333' }} onClick={onToggleSidebar}>
            <MenuIcon /> {/* Icona del menu per aprire/chiudere la Sidebar */}
          </IconButton>
          <Link component={Link} to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={logo} alt="Logo" style={{ height: '90px', marginRight: '5px', borderRadius: '50%' }} />
            <Typography variant="h6" component="div" style={{ color: '#333' }}>
              MedMiner 2.0
            </Typography>
          </Link>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <TransparentButton component={Link} to="/">Home</TransparentButton>
          <TransparentButton component={Link} to="/search">Ricerca</TransparentButton>
          <TransparentButton component={Link} to="/graphs">Grafi</TransparentButton>
        </Box>
        <IconButton edge="end" color="inherit" sx={{ color: '#333' }}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;


/* codice con divisione logica ma che si deve aggiustare: 
import React from 'react';
import './Navbar.css'; // Importa il CSS per lo stile
import { NavbarContainer, TransparentButton } from './Navbar.js'; // Importa la logica e i componenti dal file JS
import logo from '../../assets/logo2.png';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Navbar = ({ onToggleSidebar }) => {
  return (
    <NavbarContainer>
      <Toolbar className="navbar-toolbar">
        <Box className="navbar-box-left">
          <IconButton className="navbar-menu-button" onClick={onToggleSidebar}>
            <MenuIcon />
          </IconButton>
          <Link to="/" className="navbar-link">
            <img src={logo} alt="Logo" className="navbar-logo" />
            <Typography className="navbar-title">
              MedMiner 2.0
            </Typography>
          </Link>
        </Box>
        <Box className="navbar-box-right">
          <TransparentButton component={Link} to="/">Home</TransparentButton>
          <TransparentButton component={Link} to="/search">Ricerca</TransparentButton>
          <TransparentButton component={Link} to="/graphs">Grafi</TransparentButton>
        </Box>
        <IconButton className="navbar-search-button">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
*/