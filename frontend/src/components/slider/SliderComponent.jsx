import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import { Box, Typography } from '@mui/material';
import styles from './sliderComponent.module.css'; // Importa il tuo modulo CSS

const SliderComponent = ({ onDateChange, minDate, maxDate, isDetailsPanelOpen }) => {
  const [value, setValue] = useState(maxDate);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue);
    }
  };

  return (
    <Box className={`${styles.sliderContainer} ${isDetailsPanelOpen ? styles.panelOpen : ''}`}>
      <Typography className={styles.sliderLabel}>Date Range</Typography>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={minDate}
        max={maxDate}
        step={1}
        marks={[
          { value: minDate, label: `${minDate}` },
          { value: maxDate, label: `${maxDate}` },
        ]}
        valueLabelDisplay="auto"
        sx={{
          '& .MuiSlider-thumb': {
            backgroundColor: '#3b82f6',
            border: '2px solid #3b82f6',
            width: '20px',
            height: '20px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.2s ease',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0px 0px 0px 8px rgba(25, 118, 210, 0.16)',
            },
            '&.Mui-active': {
              boxShadow: '0px 0px 0px 14px rgba(25, 118, 210, 0.16)',
            },
          },
          '& .MuiSlider-track': {
            backgroundColor: '#3b82f6',
            height: '6px',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#d1d5db',
            height: '6px',
          },
        }}
      />
    </Box>
  );
};

export default SliderComponent;
