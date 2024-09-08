import React from 'react';
import './Home.css';  // Importiamo il file CSS
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
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
    <div className="home-container">
      <div className="home-content">
        <section className="home-stats">
          <div className="stat-card">
            <span role="img" aria-label="patients">👥</span>
            <h3>75 K</h3>
            <p>**Pazienti**</p>
          </div>
          <div className="stat-card">
            <span role="img" aria-label="prescriptions">💊</span>
            <h3>75 K</h3>
            <p>**Prescrizioni**</p>
          </div>
          <div className="stat-card">
            <span role="img" aria-label="diseases">⚕️</span>
            <h3>75 K</h3>
            <p>**Malattie**</p>
          </div>
        </section>

        <section className="home-graphs">
          <div className="graph-container">
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

          <div className="graph-container">
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
  );
};

export default Home;