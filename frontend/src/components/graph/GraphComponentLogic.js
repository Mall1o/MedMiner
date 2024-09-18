import { DataSet } from 'vis-data';
import { Network } from 'vis-network';

export const initializeNetwork = (container, data) => {
  if (!container) {
    console.error("Il contenitore del grafo non è pronto.");
    return;
  }

  const nodes = new DataSet(
    data.nodes.map(node => {
      let label = '';
      let icon = '';
      let color = '';

      if (node.type === 'Paziente') {
        icon = '👤';
        label = `${icon} ${node.properties.codice_fiscale_assistito}`;
        color = 'rgba(255, 99, 132, 0.5)';
      } else if (node.type === 'Malattia') {
        icon = '⚕️';
        label = `${icon} ${node.properties.codice}`;
        color = 'rgba(54, 162, 235, 0.5)';
      } else if (node.type === 'Prescrizione') {
        icon = '💊';
        label = `${icon} ${node.properties.codice}`;
        color = 'rgba(75, 192, 192, 0.5)';
      }

      return {
        id: node.id,
        label: label,
        shape: 'dot',
        color: {
          background: color,
          border: node.type === 'Paziente' ? 'rgba(255, 99, 132, 1)' :
                 node.type === 'Malattia' ? 'rgba(54, 162, 235, 1)' : 'rgba(75, 192, 192, 1)',
          highlight: {
            background: 'rgba(255, 206, 86, 0.8)',
            border: 'rgba(255, 206, 86, 1)',
          },
        },
        font: { color: '#fff', size: 16, align: 'center' },
        borderWidth: 2,
        size: node.type === 'Paziente' ? 30 : 25,
      };
    })
  );

  const edges = new DataSet(
    data.relationships.map(relationship => {
      let color = '';
      if (relationship.type === 'DIAGNOSTICATO_CON') {
        color = 'rgba(54, 162, 235, 1)';
      } else if (relationship.type === 'CURATO_CON') {
        color = 'rgba(75, 192, 192, 1)';
      } else if (relationship.type === 'ASSOCIATO_A') {
        color = 'rgba(75, 192, 192, 1)';
      }
      else if (relationship.type === 'ASSOCIATO_A') {
        color = 'rgba(255, 99, 132, 1)';
      }

      return {
        id: relationship.id || `edge-${relationship.start_id}-${relationship.end_id}`,
        from: relationship.start_id,
        to: relationship.end_id,
        arrows: 'to',
        color: { color: color },
        font: { color: '#000', size: 12 },
        arrowStrikethrough: false,
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
        max: 30,
      },
    },
    interaction: {
      hover: true,
      zoomView: false,
      dragView: true,
    },
  };

  try {
    const network = new Network(container, { nodes, edges }, options);

    console.log("Network creato:", network);

    network.once("stabilized", () => {
      if (typeof network.fit === 'function') {
          network.fit({
              animation: {
                  duration: 500,
                  easingFunction: "easeInOutQuad"
              }
          });
      } else {
          console.error("Il metodo 'fit' non è disponibile.");
      }
    });

    return network;
  } catch (error) {
    console.error("Errore durante l'inizializzazione del grafo:", error);
  }
};
