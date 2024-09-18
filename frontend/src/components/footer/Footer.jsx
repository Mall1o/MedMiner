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
import styles from './Footer.module.css';
import { useSidebar } from '../../context/SidebarContext'; // Importa il contesto

const Footer = () => {
  const { isSidebarOpen } = useSidebar(); // Ottieni lo stato della sidebar

  return (
    <AppBar 
      position="relative" 
      className={`${styles.footerContainer} ${isSidebarOpen ? styles.footerSidebarOpen : styles.footerSidebarClosed}`}
      sx={{ backgroundColor: 'rgb(235, 229, 229)' }}
    >
      <Toolbar className={styles.footerToolbar}>
        <Box className={styles.footerText}>
          <Typography variant="body2" color="textSecondary">
            © 2024 ComorGraph All rights reserved.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Contact us: info@comorgraph.com
          </Typography>
        </Box>
        <Box className={styles.footerIcons}>
          <IconButton 
            color="inherit" 
            className={styles.footerIcons}
            href="https://facebook.com"
            target="_blank" 
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            className={styles.footerIcons}
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            className={styles.footerIcons}
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            className={styles.footerIcons}
            href="mailto:info@comorgraph.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EmailIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
