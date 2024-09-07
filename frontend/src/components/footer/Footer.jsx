import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import './Footer.css'; // Importa il file di stile

const Footer = () => {
  return (
    <AppBar position="static" className="footer-container" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
      <Toolbar className="footer-toolbar">
        <Box>
          <Typography variant="body2" color="textSecondary">
            © 2024 MedMiner 2.0. All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Contact us: info@medminer.com
          </Typography>
        </Box>
        <Box>
          <IconButton color="inherit" className="footer-icon" href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" className="footer-icon" href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" className="footer-icon" href="https://linkedin.com">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" className="footer-icon" href="mailto:info@medminer.com">
            <EmailIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
