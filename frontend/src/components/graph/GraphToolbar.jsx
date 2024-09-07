// src/components/graph/GraphToolbar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const GraphToolbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Visualizzazione del Grafo Paziente
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default GraphToolbar;
