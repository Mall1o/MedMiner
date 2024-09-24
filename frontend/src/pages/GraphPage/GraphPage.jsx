import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData, fetchPrescriptionGraphData, fetchDiseaseGraphData } from '../../services/graphDataService';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';
import styles from './GraphPage.module.css';  // Importa il CSS Module correttamente
import DetailsPanel from '../../components/detailsPanel/DetailPanel'; // Importa il componente per i dettagli del paziente
import SliderComponent from '../../components/slider/SliderComponent'; // Importa il componente per il filtro delle date

const GraphPage = () => {
  const { codice, tipo } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [originalGraphData, setOriginalGraphData] = useState(null); // Stato per mantenere i dati originali
  const [OriginalGraphDataFiltered, setOriginalGraphDataFiltered] = useState(null); // Stato per mantenere i dati originali filtrati
  const [betweennessApplied, setBetweennessApplied] = useState(false); // Stato per il cambio di bottone
  
  useEffect(() => {
    const fetchGraphData = async () => {
      let data;

      if (tipo === 'paziente') {
        data = await fetchPatientGraphData(codice);  // Codice fiscale
      } else if (tipo === 'prescrizione') {
        data = await fetchPrescriptionGraphData(codice);  // Codice prescrizione
      } else if (tipo === 'disease') {
        data = await fetchDiseaseGraphData(codice);  // Codice malattia
      }

      setGraphData(data); 
      setOriginalGraphDataFiltered(data);
      setOriginalGraphData(data); // Salva i dati originali

      setLoading(false);
    };

    fetchGraphData();
  }, [codice, tipo]);

  // Funzione per gestire il click su un nodo
  const handleNodeClick = (nodeData) => {
    setSelectedDetails({
      type: 'Nodo',
      ...nodeData
    });
  };

  // Funzione per gestire il click su un arco
  const handleEdgeClick = (edgeData) => {
    setSelectedDetails({
      type: 'Arco',
      ...edgeData
    });
  };

  const handleDateChange = (selectedDate) => {
    if (OriginalGraphDataFiltered && OriginalGraphDataFiltered.relationships) {
      
      // Filtra solo gli archi di tipo "CURATA_CON" basandoti sulla data
      const filteredEdges = OriginalGraphDataFiltered.relationships.map((edge) => {
        // Controlla se l'arco è di tipo "CURATA_CON"
        if (edge.type === 'CURATA_CON') {
          // Estrai l'anno dalla stringa "data_prescrizione"
          const edgeYear = parseInt(edge.properties.data_prescrizione.substring(0, 4)); // Estrai i primi 4 caratteri e converti in intero
  
          // Confronta l'anno dell'arco con l'anno selezionato
          if (edgeYear <= selectedDate) {
            return edge; // Mantieni l'arco se l'anno è successivo o uguale all'anno selezionato
          } else {
            return null; // Escludi l'arco se l'anno è precedente all'anno selezionato
          }
        } else if(edge.type === 'DIAGNOSTICATO_CON'){
          // Estrai l'anno dalla stringa "data_diagnosi"
          const edgeYear = parseInt(edge.properties.data_prima_diagnosi.substring(0, 4)); // Estrai i primi 4 caratteri e converti in intero
  
          // Confronta l'anno dell'arco con l'anno selezionato
          if (edgeYear <= selectedDate) {
            return edge; // Mantieni l'arco se l'anno è successivo o uguale all'anno selezionato
          } else {
            return null; // Escludi l'arco se l'anno è precedente all'anno selezionato
          }
        } else{
          return edge; 
        }
      }).filter(Boolean); // Rimuovi i valori nulli (gli archi esclusi)

       // Crea una mappa dei nodi che hanno ancora archi collegati
    const connectedNodes = new Set();
    filteredEdges.forEach(edge => {
      connectedNodes.add(edge.start_id); // Nodo di partenza dell'arco
      connectedNodes.add(edge.end_id);   // Nodo di arrivo dell'arco
    });

    // Filtra i nodi che sono ancora connessi
    const filteredNodes = OriginalGraphDataFiltered.nodes.filter(node => connectedNodes.has(node.id));

    // Aggiorna i dati del grafo con nodi e archi filtrati
    setGraphData({
      ...graphData,
      nodes: filteredNodes,      // Nodi rimasti connessi
      relationships: filteredEdges, // Archi filtrati
    });
    }
  };
  

  // Funzione per applicare la betweenness centrality
  const applyBetweenness = async () => {
    try {
      if (!betweennessApplied) {
        const utilsService = new UtilsDataServices();
        const betweennessData = await utilsService.getBetweenessMalattia();

        // Modifica i nodi in base alla betweenness
        const updatedNodes = graphData.nodes.map(node => {
          if (node.type === 'Malattia') {
            const nodeBetweenness = betweennessData.find(item => item.icd9cm === node.properties.codice);
          const newSize = nodeBetweenness ? nodeBetweenness.betweeness * 0.04 : 25; // Scala la dimensione in base alla betweenness
            return {
              ...node,
              size: newSize,
            };
          }
          return node; // Restituisci il nodo anche se non è di tipo Malattia
        });

        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setBetweennessApplied(true); // Aggiorna lo stato per il cambio di bottone
      } else {
        // Ripristina i dati originali
        setGraphData(originalGraphData);
        setBetweennessApplied(false); // Torna allo stato iniziale
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.graphPageContainer}>
      <SliderComponent onDateChange={handleDateChange} />
        {graphData ? (
        <div className={styles.graphContainer}>
          <GraphComponent
            data={graphData}
            onNodeClick={handleNodeClick}
            onEdgeClick={handleEdgeClick}
          />
        </div>
      ) : (
        <p>Impossibile caricare i dati del grafo.</p>
      )}
      <div className={styles.detailsPanel}>
      <DetailsPanel
          details={selectedDetails}
          applyBetweenness={applyBetweenness}
          isBetweennessApplied={betweennessApplied}
      />
      </div>
    </div>
  );
};

export default GraphPage;
