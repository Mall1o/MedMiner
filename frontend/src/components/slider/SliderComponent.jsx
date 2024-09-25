import React, { useState } from 'react';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import styles from './sliderComponent.module.css'; // Importa il modulo CSS

const SliderComponent = ({ onDateChange, minDate, maxDate }) => {
  const [value, setValue] = useState(maxDate); // Inizializza con la data finale

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue); // Invia la data selezionata al genitore
    }
  };

  // Funzione per avvolgere l'handle con Tooltip
  const handleWithTooltip = ({ value, dragging, index, ...restProps }) => (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Slider.Handle value={value} {...restProps} />
    </Tooltip>
  );

  return (
    <div className={styles.sliderContainer}>
      <Slider
        min={minDate}
        max={maxDate}
        value={value}
        onChange={handleSliderChange}
        step={1}
        handle={handleWithTooltip} // Usa l'handle con Tooltip
        marks={{
          [minDate]: minDate,
          [maxDate]: maxDate,
        }} // Mostra le date minima e massima
        className={styles.slider}
      />
    </div>
  );
};

export default SliderComponent;
