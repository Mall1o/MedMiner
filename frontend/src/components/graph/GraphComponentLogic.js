import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

// Funzione per inizializzare il grafo
export const initializeNetwork = (container, data, handlePopup) => {
  if (!container) {
    console.error("Il contenitore del grafo non è pronto.");
    return;
  }

  const nodes = new DataSet(
    data.nodes.map(node => {
      let label = '';
      let icon = '';
      let color = '';

      // Assegna l'icona, il colore e il testo in base al tipo di nodo
      if (node.type === 'Paziente') {
        icon = '👤'; // Icona del paziente
        label = `${icon} ${node.properties.codice_fiscale_assistito}`; // Mostra solo il codice fiscale del paziente
        color = 'rgba(255, 99, 132, 0.5)'; // Colore del paziente
      } else if (node.type === 'Malattia') {
        icon = '⚕️'; // Icona della malattia
        label = `${icon} ${node.properties.codice}`; // Mostra solo il codice della malattia
        color = 'rgba(54, 162, 235, 0.5)'; // Colore della malattia
      } else if (node.type === 'Prescrizione') {
        icon = '💊'; // Icona della prescrizione
        label = `${icon} ${node.properties.codice}`; // Mostra solo il codice della prescrizione
        color = 'rgba(75, 192, 192, 0.5)'; // Colore della prescrizione
      }

      return {
        id: node.id,
        label: label,  // Mostra l'icona e il codice
        shape: 'dot',
        color: {
          background: color,
          border: node.type === 'Paziente'
            ? 'rgba(255, 99, 132, 1)' // Colore del bordo per il paziente
            : node.type === 'Malattia'
            ? 'rgba(54, 162, 235, 1)' // Colore del bordo per la malattia
            : 'rgba(75, 192, 192, 1)', // Colore del bordo per la prescrizione
          highlight: {
            background: 'rgba(255, 206, 86, 0.8)', // Colore di sfondo quando evidenziato
            border: 'rgba(255, 206, 86, 1)', // Colore del bordo quando evidenziato
          },
        },
        font: { color: '#fff', size: 16, align: 'center' }, // Assicura che il testo sia centrato
        borderWidth: 2, // Bordo più marcato
        size: node.type === 'Paziente' ? 30 : 25, // Dimensione personalizzata per i nodi
      };
    })
  );

  const edges = new DataSet(
    data.relationships.map((relationship) => {
      let color = '';
      // Imposta il colore dell'arco in base alla relazione
      if (relationship.type === 'DIAGNOSTICATO_CON') {
        color = 'rgba(54, 162, 235, 1)'; // Blu per DIAGNOSTICATO_CON
      } else if (relationship.type === 'RICEVE_PRESCRIZIONE') {
        color = 'rgba(75, 192, 192, 1)'; // Verde per RICEVE_PRESCRIZIONE
      }
  
      return {
        id: relationship.id || `edge-${relationship.start_id}-${relationship.end_id}`, // Usa un id basato sui nodi se non esiste un id
        from: relationship.start_id,
        to: relationship.end_id,
        arrows: 'to',
        color: { color: color }, // Applica il colore specifico
        // Rimuovi la proprietà 'label' per non mostrare il nome della relazione
        font: { color: '#000', size: 12 }, // Mantieni il font per eventuali altre personalizzazioni future
        arrowStrikethrough: false, // Previene che la freccia superi il nodo trasparente
      };
    })
  );
  

  const options = {
    autoResize: true,
    physics: {
      enabled: true,
      forceAtlas2Based: {
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springLength: 200,
        springConstant: 0.08,
      },
      maxVelocity: 50,
      solver: 'forceAtlas2Based',
      stabilization: {
        enabled: true,
        iterations: 1500,
        updateInterval: 25,
      },
    },
    layout: {
      improvedLayout: true,
    },
    nodes: {
      scaling: {
        min: 10,
        max: 30, // Imposta una dimensione massima per i nodi
      },
    },
    interaction: {
      hover: true,
      zoomView: false, // Disabilita lo zoom con la rotella
      dragView: true,
    },
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
          y: params.pointer.DOM.y,
        });
      } else if (params.edges.length > 0) {
        // Arco cliccato
        const edgeId = params.edges[0];
        const edgeData = data.relationships.find(
          (relationship) =>
            `edge-${relationship.start_id}-${relationship.end_id}` === edgeId // Confronta l'ID di partenza
        );

        handlePopup({
          title: `Dettagli Arco: ${edgeData.type}`,
          content: `Da: ${edgeData.start_id} a ${edgeData.end_id}\nTipo: ${edgeData.type}\nProprietà: ${JSON.stringify(edgeData.properties, null, 2)}`,
          x: params.pointer.DOM.x,
          y: params.pointer.DOM.y,
        });
      }
    });

    return network; // Ritorna l'istanza della rete
  } catch (error) {
    console.error("Errore durante l'inizializzazione del grafo:", error);
  }
};
