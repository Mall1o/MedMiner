import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

// Funzione per inizializzare il grafo
export const initializeNetwork = (container, data, handlePopup) => {
  if (!container) {
    console.error("Il contenitore del grafo non è pronto.");
    return;
  }

  const nodes = new DataSet(
    data.nodes.map(node => ({
      id: node.id,
      label: node.type === 'Paziente'
        ? `👤 Paziente\n`
        : node.type === 'Malattia'
        ? `⚕️ Malattia\nCodice: ${node.properties.codice}`
        : `💊 Prescrizione\nCodice: ${node.properties.codice}`,
      shape: node.type === 'circle',
      color: {
        background: node.type === 'Paziente' 
          ? 'rgba(255, 99, 132, 0.5)' 
          : node.type === 'Malattia' 
          ? 'rgba(54, 162, 235, 0.5)' 
          : 'rgba(75, 192, 192, 0.5)',
        border: node.type === 'Paziente' 
          ? 'rgba(255, 99, 132, 1)' 
          : node.type === 'Malattia' 
          ? 'rgba(54, 162, 235, 1)' 
          : 'rgba(75, 192, 192, 1)',
        highlight: {
          background: 'rgba(255, 206, 86, 0.8)',  // Colore di sfondo quando evidenziato
          border: 'rgba(255, 206, 86, 1)'         // Colore del bordo quando evidenziato
        }
      },
      font: { color: '#fff', size: 16 },  // Font leggermente più grande
      borderWidth: 2,                     // Bordo più marcato
      size: node.type === 'Paziente' ? 30 : 25, // Dimensione personalizzata per i nodi
    }))
  );

  const edges = new DataSet(
    data.relationships.map((relationship, index) => ({
      id: relationship.id || `edge-${relationship.start_id}-${relationship.end_id}`, // Usa un id basato sui nodi se non esiste un id
      from: relationship.start_id,
      to: relationship.end_id,
      label: relationship.type,
      arrows: 'to',
      color: { color: 'rgba(150, 150, 150, 0.5)' },
      font: { align: 'middle', color: '#000', size: 12 }
    }))
  );

  const options = {
    autoResize: true,
    physics: { enabled: true, solver: 'forceAtlas2Based', stabilization: { iterations: 150 } },
    interaction: { hover: true, navigationButtons: true, zoomView: false },
  };

  try {
    const network = new Network(container, { nodes, edges }, options);

    // Aggiungi il listener per il click su nodi e archi
    network.on('click', function (params) {
      if (params.nodes.length > 0) {
        // Nodo cliccato
        const nodeId = params.nodes[0];
        const nodeData = data.nodes.find(node => node.id === nodeId);
        handlePopup({
          title: `Dettagli Nodo: ${nodeData.type}`,
          content: `ID: ${nodeId}\nTipo: ${nodeData.type}\nProprietà: ${JSON.stringify(nodeData.properties, null, 2)}`,
          x: params.pointer.DOM.x,
          y: params.pointer.DOM.y
        });
      } else if (params.edges.length > 0) {
        // Arco cliccato
        const EdgeId = params.edges[0];
        const edgeData = data.relationships.find(relationship => 
          `edge-${relationship.start_id}-${relationship.end_id}` === EdgeId // Confronta l'ID di partenza
        );
        
        handlePopup({
          title: `Dettagli Arco: ${edgeData.type}`,
          content: `Da: ${edgeData.start_id} a ${edgeData.end_id}\nTipo: ${edgeData.type}\nProprietà: ${JSON.stringify(edgeData.properties, null, 2)}`,
          x: params.pointer.DOM.x,
          y: params.pointer.DOM.y
        });
      }
    });

    return network; // Ritorna l'istanza della rete
  } catch (error) {
    console.error("Errore durante l'inizializzazione del grafo:", error);
  }
};

