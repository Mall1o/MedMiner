import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './WelcomePage.module.css';
import logo from '../../assets/newLogo.png';

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>ComorGraph</h1>
        <img src={logo} alt="ComorGraph Logo" className={styles.logo} />
      </div>

      <div className={styles.buttonContainer}>
        <button className={styles.button}>...</button>
        <button className={styles.button} onClick={() => navigate('/dashboard')}>Comorbidity</button>
        <button className={styles.button}>...</button>
      </div>

      <div className={styles.footer}>
        <button className={styles.csvButton} onClick={() => navigate('/load-csv')}>Carica CSV</button>

        <div className={styles.selectDatabase}>
          <p>Seleziona Database</p>
          <ul>
            <li>Main</li>
            <li>Menu Label</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
