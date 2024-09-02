import React, { useState, useEffect } from 'react';
import Graph from '../components/Graph';

const GraphPage = () => {
  const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

  useEffect(() => {
    // Simulazione di fetch iniziale da backend
    fetch('/api/grafo')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setGraphData(data))
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  const fetchMoreElements = () => {
    // Simulazione di caricamento incrementale da backend
    // In una vera applicazione, questa funzione dovrebbe fare una richiesta al server
    return [
      { data: { id: '3', label: 'Node 3' } },
      { data: { id: '4', label: 'Node 4' } },
      { data: { source: '3', target: '4', label: 'Edge from 3 to 4' } }
    ];
  };

  return (
    <div>
      <h1>Graph Visualization</h1>
      <Graph initialElements={[...graphData.nodes, ...graphData.edges]} fetchMoreElements={fetchMoreElements} />
    </div>
  );
};

export default GraphPage;
