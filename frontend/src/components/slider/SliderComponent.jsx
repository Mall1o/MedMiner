import React from 'react';
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'; // Assicurati di importare lo stile

const SliderComponent = ({ onChange, minDate, maxDate, defaultMinDate, defaultMaxDate }) => {
  const handleChange = (value) => {
    const [minTimestamp, maxTimestamp] = value;

    // Converti i timestamp di nuovo in oggetti Date per passare la data corretta
    const minDateSelected = new Date(minTimestamp);
    const maxDateSelected = new Date(maxTimestamp);

    onChange([minDateSelected, maxDateSelected]);
  };

  return (
    <div>
      <Range
        min={minDate.getTime()} // Converti le date in timestamp
        max={maxDate.getTime()}
        defaultValue={[defaultMinDate.getTime(), defaultMaxDate.getTime()]}
        onChange={handleChange}
        tipFormatter={(value) => new Date(value).toLocaleDateString()} // Mostra le date come stringhe nel tooltip
      />
      <div>
        <span>{minDate.toLocaleDateString()}</span>
        <span style={{ float: 'right' }}>{maxDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default SliderComponent;
