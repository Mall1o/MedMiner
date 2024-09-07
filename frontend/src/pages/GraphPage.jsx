import React, { useState, useEffect } from 'react';
import GraphComponent from '../components/graph/GraphComponent';
import { fetchGraphData } from '../services/graphDataService';
import GraphToolbar from '../components/graph/GraphToolbar';
import Loader from '../components/Loader';
import { Box, Container, Paper, Typography, Drawer, Divider, List, ListItem, ListItemText } from '@mui/material';

const GraphPage = () => {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGraphData();
        if (data) {
          setGraphData(data);
        } else {
          setError('Errore nel caricamento dei dati del grafo');
        }
      } catch (err) {
        setError('Errore imprevisto: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSelectNode = (node) => {
    setSelectedNode(node);
    setSelectedEdge(null); // Deselect edge if a node is selected
  };

  const handleSelectEdge = (edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null); // Deselect node if an edge is selected
  };

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <GraphToolbar />
        <Container sx={{ marginTop: 4 }}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h5" gutterBottom>
              Dettagli del Grafo
            </Typography>
            <GraphComponent data={graphData} onSelectNode={handleSelectNode} onSelectEdge={handleSelectEdge} />
          </Paper>
        </Container>
      </Box>

      {/* Sidebar a destra */}
      <Drawer
        anchor="right"
        open={Boolean(selectedNode || selectedEdge)}
        onClose={() => { setSelectedNode(null); setSelectedEdge(null); }}
      >
        <Box sx={{ width: 300, padding: 2 }}>
          <Typography variant="h6">Dettagli</Typography>
          <Divider />
          {selectedNode && (
            <List>
              <ListItem>
                <ListItemText primary="Tipo" secondary={selectedNode.type} />
              </ListItem>
              {Object.keys(selectedNode.properties).map((key) => (
                <ListItem key={key}>
                  <ListItemText primary={key} secondary={selectedNode.properties[key]} />
                </ListItem>
              ))}
            </List>
          )}

          {selectedEdge && (
            <List>
              <ListItem>
                <ListItemText primary="Tipo Relazione" secondary={selectedEdge.type} />
              </ListItem>
              {Object.keys(selectedEdge.properties).map((key) => (
                <ListItem key={key}>
                  <ListItemText primary={key} secondary={selectedEdge.properties[key]} />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default GraphPage;
