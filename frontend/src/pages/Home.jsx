import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Welcome to MedMiner 2.0</h1>
        <p>Your tool for comprehensive graph analysis.</p>
      </header>
      <section style={styles.section}>
        <div style={styles.card}>
          <h2>Graph Search</h2>
          <p>Search through various graphs to find the data you need.</p>
        </div>
        <div style={styles.card}>
          <h2>Analysis Tools</h2>
          <p>Use our advanced tools to analyze and visualize your graphs.</p>
        </div>
        <div style={styles.card}>
          <h2>Get Started</h2>
          <p>Begin your journey by exploring our features.</p>
        </div>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  header: {
    marginBottom: '40px',
  },
  section: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  card: {
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '8px',
    width: '30%',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
};

export default Home;
