import React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";
import { useColorMode } from '@docusaurus/theme-common';

const timeOfDayRadios = [
  {
    name: 'Morning',
    value: '1',
    textColor: "#000000",
    selectedColor: "#FFC455",
    hoverColor: "#FFA700",
    defaultHover: "#6B4600",
    lightDefaultHover: "#FFDB99",
  },
  {
    name: 'Day',
    value: '2',
    textColor: "#000000",
    selectedColor: "#87C5F8",
    hoverColor: "#4CA9F5",
    defaultHover: "#084E87",
    lightDefaultHover: "#B2DAFB"
  },
  {
    name:'Night',
    value: '3',
    textColor: "#000000",
    selectedColor: "#A0A9D2",
    hoverColor: "#8691C6",
    defaultHover: "#2A445A",
    lightDefaultHover: "#C4CAE3"
  },
];

const rodRadios = [
  {
    name: 'Old',
    value: '1',
    textColor: "#000000",
    selectedColor: "#66bb6a",
    hoverColor: "#34b25e",
    defaultHover: "#288a49",
    lightDefaultHover: "#A2E4B8",
  },
  {
    name: 'Good',
    value: '2',
    textColor: "#000000",
    selectedColor: "#42a5f5",
    hoverColor: "#327DBC",
    defaultHover: "#255E8D",
    lightDefaultHover: "#7AB0DC",
  },
  {
    name: 'Super',
    value: '3',
    textColor: "#000000",
    selectedColor: "#FFC455",
    hoverColor: "#FFA700",
    defaultHover: "#6B4600",
    lightDefaultHover: "#FFDB99",
  },
];

const ToggleButton = styled(MuiToggleButton)(({ colorMode = "dark", textColor, selectedColor, hoverColor, defaultHover }) => ({
  "&.Mui-selected": {
    color: textColor,
    backgroundColor: selectedColor
  },
  "&.Mui-selected:hover": {
    color: textColor,
    backgroundColor: hoverColor
  },
  "&:hover": {
    color: colorMode === "dark" ? "white" : "black",
    backgroundColor: defaultHover
  }
}));

export function TimeOfDayButtons(timeOfDay, handleTimeOfDayChange) {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <ToggleButtonGroup
      value={timeOfDay}
      exclusive
      onChange={(event) => handleTimeOfDayChange('timeOfDay', event.target.value)}
    >
      {timeOfDayRadios.map((radio, idx) => (
        <ToggleButton
          key={radio.name}
          id={`radio-${radio.name}`}
          value={radio.value}
          variant="contained"
          size='small'
          colorMode={colorMode}
          textColor={radio.textColor}
          selectedColor={radio.selectedColor}
          hoverColor={radio.hoverColor}
          defaultHover={colorMode === "dark" ? radio.defaultHover : radio.lightDefaultHover}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

export function RodButtons(rod, handleRodChange) {
  const { colorMode, setColorMode } = useColorMode();
  return (
    <ToggleButtonGroup
      value={rod}
      exclusive
      onChange={(event) => handleRodChange('rod', event.target.value)}
    >
      {rodRadios.map((radio, idx) => (
        <ToggleButton
          key={idx}
          id={`radio-${idx}`}
          value={radio.value}
          variant="contained"
          size='small'
          colorMode={colorMode}
          textColor={radio.textColor}
          selectedColor={radio.selectedColor}
          hoverColor={radio.hoverColor}
          defaultHover={colorMode === "dark" ? radio.defaultHover : radio.lightDefaultHover}
        >
          {radio.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
