import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GraphComponent from '../../components/graph/GraphComponent';
import { fetchPatientGraphData, fetchPrescriptionGraphData, fetchDiseaseGraphData } from '../../services/graphDataService';
import UtilsDataServices from '../../services/utilsDataService';
import Loader from '../../components/Loader';
import styles from './GraphPage.module.css';
import DetailsPanel from '../../components/detailsPanel/DetailPanel';
import SliderComponent from '../../components/slider/SliderComponent';
import GraphFilter from '../../utils/GraphFilter';
import GraphMetrics from '../../utils/GraphMetrics';

const GraphPage = () => {
  const { codice, tipo } = useParams();
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [originalGraphData, setOriginalGraphData] = useState(null);
  const [betweennessApplied, setBetweennessApplied] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [betweennessData, setBetweennessData] = useState(null); 
  const [dateRange, setDateRange] = useState({ min: 2000, max: 2024 });
  const navigate = useNavigate();

  //logica di back
  /*const goBack = () => {
    navigate(-1); // Naviga indietro di una pagina
  };*/

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

    setGraphData(filteredGraph);
  };

  const applyBetweenness = async () => {
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
      <div className={styles.pageContent}>
        {tipo === 'paziente' && (
          <div className={styles.sliderContainer}>
            <SliderComponent onDateChange={handleDateChange} minDate={dateRange.min} maxDate={dateRange.max} />
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
          />
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
