import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer'; // Importiamo il hook
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './WelcomePage.module.css';
import logo from '../../assets/newLogo.png';

const WelcomePage = () => {
  const navigate = useNavigate();
  
  // Usiamo il hook useInView per osservare il carosello
  const { ref: carouselRef, inView: carouselVisible } = useInView({
    triggerOnce: false, // Animazione si attiverà ogni volta che entra o esce
    threshold: 0.1, // Quando il 10% del carosello è visibile
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className={styles.welcomeContainer}>
      {/* Sezione iniziale con logo e titolo */}
      <div className={styles.fullPageHeader}>
        <h1 className={styles.title}>ComorGraph</h1>
        <img src={logo} alt="ComorGraph Logo" className={styles.fullPageLogo} />
      </div>

      {/* Carosello con transizione */}
      <div
        ref={carouselRef}
        className={`${styles.carouselContainer} ${carouselVisible ? styles.visible : styles.hidden}`}
      >
        <Slider {...settings}>
          <div className={styles.card}>
            <h3>Progetto 1</h3>
            <p>Descrizione del progetto 1.</p>
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
        </Slider>
      </div>
    </div>
  );
};

export default WelcomePage;
