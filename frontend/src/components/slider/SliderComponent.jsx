import React, { useEffect, useState } from 'react';
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
      <Typography className={styles.sliderLabel}>Anno: {value}</Typography>
      <Slider
        value={value}
        onChange={handleSliderChange}
        min={minDate}
        max={maxDate}
        step={1}
        marks={[
          { value: minDate, label: <span className={styles.markLabel}>{minDate}</span> },
          { value: maxDate, label: <span className={styles.markLabel}>{maxDate}</span> },
        ]}
        valueLabelDisplay="auto"
        orientation="horizontal"
        valueLabelFormat={(value) => `${value}`}
        sx={{
          '& .MuiSlider-valueLabel': {
            display: 'none',
          },
          '&:hover .MuiSlider-valueLabel, & .MuiSlider-thumb.Mui-active .MuiSlider-valueLabel': {
            display: 'block',
            width: 'auto',
            minWidth: '50px',
            textAlign: 'center',
            left: 'calc(100% - 15px)',
            transform: 'none',
            backgroundColor: '#777777',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '5px',
            '&:before': {
              content: "''",
              position: 'absolute',
              width: '0',
              height: '0',
              borderStyle: 'solid',
              borderWidth: '0px 0px 0 0px',
              borderColor: '#777777 transparent transparent transparent',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%) rotate(180deg)',
            }
          },
          '& .MuiSlider-thumb': {
            backgroundColor: '#ebe5e5',
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
            backgroundColor: '#ebe5e5',
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
