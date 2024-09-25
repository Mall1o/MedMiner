import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData, fetchPrescriptionGraphData, fetchDiseaseGraphData } from '../../services/graphDataService';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';
import styles from './GraphPage.module.css';
import DetailsPanel from '../../components/detailsPanel/DetailPanel';
import SliderComponent from '../../components/slider/SliderComponent';
import GraphFilter from '../../utils/GraphFilter';  // Importa la classe di utilità per il filtraggio
import GraphMetrics from '../../utils/GraphMetrics';  // Importa la classe di utilità per le metriche

const GraphPage = () => {
  const { codice, tipo } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [originalGraphData, setOriginalGraphData] = useState(null);
  const [betweennessApplied, setBetweennessApplied] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [betweennessData, setBetweennessData] = useState(null); // Dati di betweenness caricati

  useEffect(() => {
    const fetchGraphData = async () => {
      let data;

      if (tipo === 'paziente') {
        data = await fetchPatientGraphData(codice);
      } else if (tipo === 'prescrizione') {
        data = await fetchPrescriptionGraphData(codice);
      } else if (tipo === 'disease') {
        data = await fetchDiseaseGraphData(codice);
      }

      setGraphData(data);
      setOriginalGraphData(data);
      setLoading(false);
    };

    fetchGraphData();
  }, [codice, tipo]);

  const handleNodeClick = (nodeData) => {
    setSelectedDetails({
      type: 'Nodo',
      ...nodeData
    });
  };

  const handleEdgeClick = (edgeData) => {
    setSelectedDetails({
      type: 'Arco',
      ...edgeData
    });
  };

  const handleDateChange = async (selectedDate) => {
    setSelectedDate(selectedDate);

    let filteredGraph = GraphFilter.filterGraphByDate(originalGraphData, selectedDate);
    
    // Se la betweenness è applicata, riapplica la betweenness ai dati filtrati
    if (betweennessApplied && betweennessData) {
      const updatedNodes = await GraphMetrics.applyBetweenness(filteredGraph, betweennessData);
      filteredGraph = {
        ...filteredGraph,
        nodes: updatedNodes,
      };
    }

    setGraphData(filteredGraph);
  };

  const applyBetweenness = async () => {
    try {
      if (!betweennessApplied) {
        const utilsService = new UtilsDataServices();
        const betweennessData = await utilsService.getBetweenessMalattia();
        setBetweennessData(betweennessData); // Salva i dati di betweenness per uso futuro

        const updatedNodes = await GraphMetrics.applyBetweenness(graphData, betweennessData);

        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setBetweennessApplied(true);
      } else {
        let restoredData = originalGraphData;
        if (selectedDate) {
          restoredData = GraphFilter.filterGraphByDate(originalGraphData, selectedDate);
        }
        setGraphData(restoredData);
        setBetweennessApplied(false);
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
      {tipo === 'paziente' && (
        <div className={styles.sliderContainer}>
          <SliderComponent onDateChange={handleDateChange} />
        </div>
      )}
    </div>
  );
};

export default GraphPage;
