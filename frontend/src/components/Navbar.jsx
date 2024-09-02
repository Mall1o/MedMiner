import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import logo from '../assets/logo2.png';

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

const Navbar = () => {
  return (
    <NavbarContainer position="static">
      <Toolbar sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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
          <TransparentButton component={Link} to="/graph">Graph</TransparentButton>
        </Box>
        <IconButton edge="end" color="inherit" sx={{ color: '#333' }}>
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </NavbarContainer>
  );
};

export default Navbar;
