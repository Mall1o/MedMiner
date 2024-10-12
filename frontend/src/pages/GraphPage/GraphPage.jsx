import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData, fetchPrescriptionGraphData, fetchDiseaseGraphData } from '../../services/graphDataService';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';
import styles from './GraphPage.module.css';
import DetailsPanel from '../../components/detailsPanel/DetailPanel';
import SliderComponent from '../../components/slider/SliderComponent';
import GraphFilter from '../../utils/GraphFilter';
import GraphMetrics from '../../utils/GraphMetrics';
import { DetailsPanelContext } from '../../context/DetailsPanelContext';  // Usa il contesto corretto

const GraphPage = () => {
  const { codice, tipo } = useParams();
  const { isPanelOpen } = useContext(DetailsPanelContext);  // Ottieni lo stato del pannello
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [originalGraphData, setOriginalGraphData] = useState(null);
  const [betweennessApplied, setBetweennessApplied] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [betweennessData, setBetweennessData] = useState(null); 
  const [dateRange, setDateRange] = useState({ min: 2000, max: 2024 });
  const [closenessData, setClosenessData] = useState(null);
  const [closenessApplied, setClosenessApplied] = useState(false);
  const [pageRankData, setPageRankData] = useState(null);
  const [pageRankApplied, setPageRankApplied] = useState(false);
  const [kCoreData, setKCoreData] = useState(null);
  const [kCoreApplied, setKCoreApplied] = useState(false);

  // Funzione per ripristinare il grafo allo stato iniziale
  const resetGraphToOriginal = () => {
    if (selectedDate) {
      const filteredGraph = GraphFilter.filterGraphByDate(originalGraphData, selectedDate);
      setGraphData(filteredGraph);
    } else {
      setGraphData(originalGraphData);
    }
    setBetweennessApplied(false);
    setClosenessApplied(false);
    setPageRankApplied(false);
    setKCoreApplied(false);
  };

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

      // Trova la data minima e massima dinamicamente
      let minDate = Infinity;
      let maxDate = -Infinity;

      data.relationships.forEach((rel) => {
        let year;
        if (rel.properties.data_prescrizione) {
          year = parseInt(rel.properties.data_prescrizione.substring(0, 4));
        } else if (rel.properties.data_prima_diagnosi) {
          year = parseInt(rel.properties.data_prima_diagnosi.substring(0, 4));
        }

        if (year) {
          if (year < minDate) minDate = year;
          if (year > maxDate) maxDate = year;
        }
      });

      if (minDate === Infinity) minDate = 2000;
      if (maxDate === -Infinity) maxDate = 2024;

      setDateRange({ min: minDate, max: maxDate });
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

    if (betweennessApplied && betweennessData) {
      const updatedNodes = await GraphMetrics.applyBetweenness(filteredGraph, betweennessData);
      filteredGraph = {
        ...filteredGraph,
        nodes: updatedNodes,
      };
    }

    if (closenessApplied && closenessData) {
      const updatedNodes = await GraphMetrics.applyCloseness(filteredGraph, closenessData);
      filteredGraph = {
        ...filteredGraph,
        nodes: updatedNodes,
      };
    }

    if (pageRankApplied && pageRankData) {
      const updatedNodes = await GraphMetrics.applyPageRank(filteredGraph, pageRankData);
      filteredGraph = {
        ...filteredGraph,
        nodes: updatedNodes,
      };
    }

    if (kCoreApplied && kCoreData) {
      const updatedNodes = await GraphMetrics.applyKcore(filteredGraph, kCoreData);
      filteredGraph = {
        ...filteredGraph,
        nodes: updatedNodes,
      };
    }

    setGraphData(filteredGraph);
  };

  const applyBetweenness = async () => {
    resetGraphToOriginal();
    try {
      if (!betweennessApplied) {
        const utilsService = new UtilsDataServices();
        const betweennessData = await utilsService.getBetweenessMalattia();
        setBetweennessData(betweennessData);

        const updatedNodes = await GraphMetrics.applyBetweenness(graphData, betweennessData);
        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setBetweennessApplied(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const applyCloseness = async () => {
    resetGraphToOriginal();
    try {
      if (!closenessApplied) {
        const utilsService = new UtilsDataServices();
        const closenessData = await utilsService.getClosenessMalattia();
        setClosenessData(closenessData);

        const updatedNodes = await GraphMetrics.applyCloseness(graphData, closenessData);
        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setClosenessApplied(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const applyKcore = async () => {
    resetGraphToOriginal();
    try {
      if (!kCoreApplied) {
        const utilsService = new UtilsDataServices();
        const kCoreData = await utilsService.getKcoreMalattia();
        setKCoreData(kCoreData);

        const updatedNodes = await GraphMetrics.applyKcore(graphData, kCoreData);
        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setKCoreApplied(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const applyPageRank = async () => {
    resetGraphToOriginal();
    try {
      if (!pageRankApplied) {
        const utilsService = new UtilsDataServices();
        const pageRankData = await utilsService.getPageRankMalattia();
        setPageRankData(pageRankData);

        const updatedNodes = await GraphMetrics.applyPageRank(graphData, pageRankData);
        setGraphData({
          ...graphData,
          nodes: updatedNodes,
        });
        setPageRankApplied(true);
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
      <div className={styles.pageContent}>
        {tipo === 'paziente' && (
          <div className={styles.sliderContainer}>
            <SliderComponent onDateChange={handleDateChange} minDate={dateRange.min} maxDate={dateRange.max} isDetailsPanelOpen={isPanelOpen} />
          </div>
        )}
        <div className={styles.graphContainer}>
          {graphData ? (
            <GraphComponent
              data={graphData}
              onNodeClick={handleNodeClick}
              onEdgeClick={handleEdgeClick}
            />
          ) : (
            <p>Impossibile caricare i dati del grafo.</p>
          )}
        </div>
        <div className={styles.detailsPanel}>
          <DetailsPanel
            details={selectedDetails}
            applyBetweenness={applyBetweenness}
            isBetweennessApplied={betweennessApplied}
            applyCloseness={applyCloseness}
            isClosenessApplied={closenessApplied}
            applyPageRank={applyPageRank}
            isPageRankApplied={pageRankApplied}
            applyKcore={applyKcore}
            isKCoreApplied={kCoreApplied}
            clearMetrics={resetGraphToOriginal}  // Pulsante per resettare le metriche
          />
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
