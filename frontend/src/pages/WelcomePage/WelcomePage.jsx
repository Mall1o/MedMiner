import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; 
import ReactCardCarousel from 'react-card-carousel';
import styles from './WelcomePage.module.css';
import logo from '../../assets/newLogo.png';

const WelcomePage = () => {
  const navigate = useNavigate();
  const carouselRefForScroll = useRef(null);
  const [showButton, setShowButton] = useState(true);

  const { ref: carouselRef, inView: carouselVisible } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const handleScroll = () => {
    if (carouselRefForScroll.current) {
      carouselRefForScroll.current.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        setShowButton(false);
      }, 200); 
    }
  };

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.fullPageHeader}>
        <h1 className={styles.title}>ComorGraph</h1>
        <img src={logo} alt="ComorGraph Logo" className={styles.fullPageLogo} />
        <button 
          className={`${styles.scrollButton} ${!showButton ? styles.hiddenButton : ''}`}
          onClick={handleScroll}
        >
          Scopri di più
        </button>
      </div>

      {/* Carosello con transizione */}
      <div
        ref={carouselRef}
        className={`${styles.carouselContainer} ${carouselVisible ? styles.visible : styles.hidden}`}
      >
        <div ref={carouselRefForScroll}> 
          <ReactCardCarousel autoplay={false}>
            <div className={styles.card}>
              <h3>Comorbidity</h3>
              <p>Analisi della comorbidità dei pazienti mediante tecniche di graph analisys.</p>
              <img className={styles.logoCard} src={logo} alt="ComorGraph Logo" />
              <button onClick={() => navigate('/dashboard')}>Scopri di più</button>
            </div>
            <div className={styles.card}>
              <h3>Progetto 2</h3>
              <p>Descrizione del progetto 2.</p>
              <button onClick={() => navigate('/dashboard')}>Scopri di più</button>
            </div>
            <div className={styles.card}>
              <h3>Progetto 3</h3>
              <p>Descrizione del progetto 3.</p>
              <button onClick={() => navigate('/dashboard')}>Scopri di più</button>
            </div>
            <div className={styles.card}>
              <h3>Progetto 4</h3>
              <p>Descrizione del progetto 4.</p>
              <button onClick={() => navigate('/dashboard')}>Scopri di più</button>
            </div>
          </ReactCardCarousel>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
