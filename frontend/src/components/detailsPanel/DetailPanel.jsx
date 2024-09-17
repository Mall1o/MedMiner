import React from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './DetailPanel.module.css';

const pieData = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const DetailsPanel = ({ details, metrics, plotData }) => {
    return (
      <div className={styles.DetailsPanel}>
        <div className={styles.detailsSection}>
          <h3>Dettagli</h3>
          {/* Visualizza dinamicamente i dettagli */}
          {Object.keys(details).map((key) => (
            <p key={key}><strong>{key}:</strong> {details[key]}</p>
          ))}
        </div>
  
        <div className={styles.metricsSection}>
          <h4>Applica Metriche</h4>
          {/* Crea pulsanti per le metriche dinamicamente */}
          {metrics.map((metric) => (
            <div key={metric.name} className="metric-item">
              <button onClick={metric.onClick}>{metric.name}</button>
              <span>{metric.description}</span>
            </div>
          ))}
        </div>

      <div className={styles.plotSection}>
        <h4>Informazioni del Paziente</h4>
        <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
            {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            </Pie>
            <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};


// Component with synthetic data for testing
const SyntheticDataTest = () => {
    // Dati sintetici del paziente
    const patientDetails = {
      name: 'Mario Rossi',
      age: 56,
      diagnosis: 'Diabete Tipo 2',
      lastVisit: '2024-09-10',
      prescriptions: 'Insulina, Metformina',
    };
  
    // Metriche sintetiche con funzioni di esempio
    const metrics = [
      {
        name: 'Degree Centrality',
        description: 'Numero di collegamenti diretti con altri nodi.',
        onClick: () => alert('Degree Centrality calcolata!'),
      },
      {
        name: 'Betweenness Centrality',
        description: 'Misura di centralità basata sul numero di volte in cui un nodo è su percorsi più brevi.',
        onClick: () => alert('Betweenness Centrality calcolata!'),
      },
      {
        name: 'K-core',
        description: 'Identifica i nodi più centrali in base alla loro connessione con gli altri.',
        onClick: () => alert('K-core calcolato!'),
      },
    ];
  
    // Dati sintetici per il plot del paziente
    const plotData = {
      labels: ['Diabete', 'Ipertensione', 'Dislipidemia'],
      datasets: [
        {
          label: 'Comorbidità',
          data: [40, 30, 30],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  
    return (
      <DetailsPanel details={patientDetails} metrics={metrics} plotData={plotData} />
    );
  };
  
  export default SyntheticDataTest;