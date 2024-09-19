import React, { useState, useEffect }from 'react';
import styles from './Home.module.css';
import { useHomeData } from './Home.js';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from '../../components/footer/Footer.jsx'; // Importa il Footer
import { useSidebar } from '../../context/SidebarContext'; // Importa il contesto
import UtilsDataServices from '../../services/utilsDataService.js';

const Home = () => {
  const { isSidebarOpen } = useSidebar(); // Usa il contesto della sidebar
  const stats = useHomeData();
  const [barData, setBarData] = useState([]);
  const [orData, setOrData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDegreeGroupMalattia = async () => {
    try {
      const dataService = new UtilsDataServices();
      const data = await dataService.getDegreeGroupMalattia();
      // Trasforma i dati nel formato adatto a Recharts
      const formattedData = data.map(item => ({
        name: item.codice_malattia, 
        value: item.degree_centrality, 
      }));
      setBarData(formattedData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const getFrequncyGroupMalattiaPrescrizione = async () => {
    try {
      const dataService = new UtilsDataServices();
      const data = await dataService.getFrequencyPrescriptionMalattia();
      // Trasforma i dati nel formato adatto a Recharts
      const formattedDataFrequency = data.map(item => ({
        name: item.etichetta, 
        value: item.frequenza,
        prescrizione: item.codice_prescrizione 
      }));
      setOrData(formattedDataFrequency);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Usa useEffect per chiamare l'API al montaggio del componente
  useEffect(() => {
    getDegreeGroupMalattia();
    getFrequncyGroupMalattiaPrescrizione();
  }, []);

  return (
    <>
      <div className={`${styles.homeContainer} ${isSidebarOpen ? styles.homeSidebarOpen : styles.homeSidebarClosed}`}>
        <div className={styles.homeContent}>
          <section className={styles.homeStats}>
            <div className={styles.statCard}>
              <span role="img" aria-label="patients">👥</span>
              <h3>{stats.pazienti}</h3>
              <p>PAZIENTI</p>
            </div>
            <div className={styles.statCard}>
              <span role="img" aria-label="prescriptions">💊</span>
              <h3>{stats.prescrizioni}</h3>
              <p>PRESCRIZIONI</p>
            </div>
            <div className={styles.statCard}>
              <span role="img" aria-label="diseases">⚕️</span>
              <h3>{stats.malattie}</h3>
              <p>MALATTIE</p>
            </div>
          </section>

          <section className={styles.homeGraphs}>
            <div className={styles.graphContainer}>
              <h4>Degree Centrality per Gruppo Malattia</h4>
              {loading ? (
                <p>Caricamento...</p>
              ) : error ? (
                <p>Errore: {error}</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={barData}>
                    <XAxis dataKey="name" tick={false} label={{ value: 'Gruppi malattia', position: 'insideBottom'}} />
                    <YAxis />
                    <Tooltip formatter={(value, name, props) => [`${value}`, ` ${props.payload.name}`]} />
                    <Bar dataKey="value" fill="#32408C" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>

          <section className={styles.homeGraphs}>
            <div className={styles.graphContainer}>
              <h4>Frequenza prescrizioni per Malattia</h4>
              {loading ? (
                <p>Caricamento...</p>
              ) : error ? (
                <p>Errore: {error}</p>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart layout="vertical"  data={orData}>
                    <XAxis type="number" tick={false} label={{ value: 'Frequenza', position: 'insideBottom'}} />
                    <YAxis dataKey="name" type="category" tick={false} label={{ value: 'Gruppi malattia',angle: -90, style: { textAnchor: 'middle' } }}/>
                    <Tooltip formatter={(value, name, props) => [`${value}`, `Prescrizione: ${props.payload.prescrizione}`]} />
                    <Bar dataKey="value" fill="#32408C" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Footer fuori dal contenitore principale */}
      <Footer className={styles.footer}/>
    </>
  );
};

export default Home;
