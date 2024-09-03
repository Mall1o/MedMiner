import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const FooterContainer = styled(AppBar)({
    position: 'fixed',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    boxShadow: '50%',
    borderRadius: '15px 15px 0 0',
    padding: '10px 20px',
    boxSizing: 'border-box',
    zIndex: 1300,  // Assicura che il footer sia sopra altri contenuti
  });

const Footer = () => {
  return (
    <FooterContainer position="static">
      <Toolbar sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            © 2024 MedMiner 2.0. All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Contact us: info@medminer.com
          </Typography>
        </Box>
        <Box>
          <IconButton color="inherit" sx={{ color: '#333' }} href="https://facebook.com">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ color: '#333' }} href="https://twitter.com">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ color: '#333' }} href="https://linkedin.com">
            <LinkedInIcon />
          </IconButton>
          <IconButton color="inherit" sx={{ color: '#333' }} href="mailto:info@medminer.com">
            <EmailIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </FooterContainer>
  );
};

export default Footer;
