import React from 'react';
import styles from './Home.module.css';
import { useHomeData } from './Home.js';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Footer from '../../components/footer/Footer.jsx'; // Importa il Footer
import { useSidebar } from '../../context/SidebarContext'; // Importa il contesto

const Home = () => {
  const { isSidebarOpen } = useSidebar(); // Usa il contesto della sidebar
  const stats = useHomeData();

  const barData = [
    { name: 'Gen', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
  ];

  const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
              <h4>Some Stats</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className={styles.graphContainer}>
              <h4>Some Stats</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
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
