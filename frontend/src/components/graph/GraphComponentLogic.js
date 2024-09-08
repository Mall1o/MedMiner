import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

// Funzione per inizializzare il grafo
export const initializeNetwork = (container, data) => {
  if (!container) {
    console.error("Il contenitore del grafo non è pronto.");
    return;
  }

  const nodes = new DataSet(
    data.nodes.map(node => ({
      id: node.id,
      label: node.type === 'Paziente'
        ? `👤 Paziente\nCF: ${node.properties.codice_fiscale_assistito}`
        : node.type === 'Malattia'
        ? `⚕️ Malattia\nCodice: ${node.properties.codice}`
        : `💊 Prescrizione\nCodice: ${node.properties.codice}`,
      shape: node.type === 'Paziente' ? 'circle' : 'box',
      color: {
        background: node.type === 'Paziente' ? 'rgba(255, 99, 132, 0.5)' : node.type === 'Malattia' ? 'rgba(54, 162, 235, 0.5)' : 'rgba(75, 192, 192, 0.5)',
        border: node.type === 'Paziente' ? 'rgba(255, 99, 132, 1)' : node.type === 'Malattia' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
      },
      font: { color: '#fff', size: 14 },
    }))
  );

  const edges = new DataSet(
    data.relationships.map(relationship => ({
      from: relationship.start_id,
      to: relationship.end_id,
      label: relationship.type,
      arrows: 'to',
      color: { color: 'rgba(150, 150, 150, 0.5)' },
      font: { align: 'middle', color: '#000', size: 12 }
    }))
  );

  const options = {
    nodes: {
      shape: 'dot',
      size: 30,
      font: { size: 12, color: '#ffffff' },
      borderWidth: 2,
    },
    edges: { width: 2, font: { size: 10, align: 'middle' } },
    physics: { enabled: true, solver: 'forceAtlas2Based', stabilization: { iterations: 150 } },
    interaction: { hover: true, navigationButtons: true, zoomView: false },
  };

  try {
    const network = new Network(container, { nodes, edges }, options);
    return network; // Ritorna l'istanza della rete
  } catch (error) {
    console.error("Errore durante l'inizializzazione del grafo:", error);
  }
};
