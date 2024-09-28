import React from 'react';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorCode}>404</h1>
        <h2 className={styles.errorMessage}>Oops! Qualcosa è andato storto</h2>
        <p className={styles.errorDescription}>
          La pagina che stai cercando non esiste o si è verificato un errore. Ti invitiamo a tornare alla <a href="/" className={styles.homeLink}>Home</a>.
        </p>
        <img
          className={styles.errorImage}
          src="https://cdn-icons-png.flaticon.com/512/753/753345.png"
          alt="Errore"
        />
      </div>
    </div>
  );
};

export default ErrorPage;
