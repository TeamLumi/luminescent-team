import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const timeOfDayRadios = [
  { name: 'Morning', value: '1', color: "standard"},
  { name: 'Day', value: '2', color: "primary" },
  { name: 'Night', value: '3', color: "secondary" },
];

const rodRadios = [
  { name: 'Old Rod', value: '1', color: "standard"},
  { name: 'Good Rod', value: '2', color: "primary" },
  { name: 'Super Rod', value: '3', color: "secondary" },
];

export function TimeOfDayButtons(timeOfDay, handleTimeOfDayChange) {
  return (
    <ToggleButtonGroup
      value={timeOfDay}
      exclusive
      onChange={handleTimeOfDayChange}
    >
      {timeOfDayRadios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          value={radio.value}
          color={radio.color}
          variant="contained"
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function RodButtons(rod, handleRodChange) {
  return (
    <ToggleButtonGroup
      value={rod}
      exclusive
      onChange={handleRodChange}
    >
      {rodRadios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          value={radio.value}
          color={radio.color}
          variant="contained"
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
