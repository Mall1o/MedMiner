import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const SliderComponent = ({ onDateChange }) => {
  const [value, setValue] = useState(2020); // Un esempio di data iniziale (2020)

  const handleSliderChange = (newValue) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue); // Invia la data selezionata al genitore
    }
  };

  return (
    <div>
      <Slider
        min={2000}
        max={2024}
        value={value}
        onChange={handleSliderChange}
        step={1}
      />
      <p>Data selezionata: {value}</p>
    </div>
  );
};

export default SliderComponent;
