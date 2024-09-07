import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import 'vis-network/styles/vis-network.css';

const GraphComponent = ({ data, onSelectNode, onSelectEdge }) => {
  const networkRef = useRef(null);

  useEffect(() => {
    const nodes = new DataSet(
      data.nodes.map(node => ({
        id: node.id,
        label: node.type === 'Paziente' 
          ? `Paziente\nCF: ${node.properties.codice_fiscale_assistito}\nEtà: ${node.properties.eta_prima_diagnosi}`
          : `${node.type}\nCodice: ${node.properties.codice}`,
        shape: node.type === 'Paziente' ? 'circle' : 'box',
        color: node.type === 'Paziente' ? '#FF5733' : '#3498db',
        font: { color: '#fff', size: 16 }
      }))
    );

    const edges = new DataSet(
      data.relationships.map(relationship => ({
        from: relationship.start_id,
        to: relationship.end_id,
        label: relationship.type,
        arrows: 'to',
        color: { color: '#7f8c8d' },
        font: { align: 'horizontal', color: '#000' }
      }))
    );

    const networkData = { nodes, edges };

    const options = {
      nodes: {
        shape: 'dot',
        size: 20,
        font: { size: 15, color: '#000' },
        borderWidth: 2
      },
      edges: { width: 2, font: { align: 'top' } },
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        stabilization: { iterations: 150 }
      },
      interaction: {
        hover: true,
        navigationButtons: true,
        zoomView: true
      }
    };

    const network = new Network(networkRef.current, networkData, options);

    // Aggiungi event listeners per selezionare nodi o archi
    network.on('selectNode', function (params) {
      const nodeId = params.nodes[0];
      const selectedNode = data.nodes.find(node => node.id === nodeId);
      if (selectedNode) {
        onSelectNode(selectedNode);
      }
    });

    network.on('selectEdge', function (params) {
      const edgeId = params.edges[0];
      const selectedEdge = data.relationships.find(rel => rel.id === edgeId);
      if (selectedEdge) {
        onSelectEdge(selectedEdge);
      }
    });

    return () => {
      network.destroy(); // Cleanup
    };
  }, [data, onSelectNode, onSelectEdge]);

  return <div ref={networkRef} style={{ height: '600px', width: '100%' }} />;
};

export default GraphComponent;
