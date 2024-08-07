import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Box, Typography, FormControlLabel, Checkbox, FormGroup } from "@mui/material"

import { RodButtons, TimeOfDayButtons } from '../Encounters/Buttons';
import { PokemonAccordion } from '../../Pokedex2/PokemonAccordion';
import EncounterTable from '../Encounters/EncounterTable';
import ".././style.css"

const EncountersPanel = ({ encOptions, handleOptionChange, encounterList, pokemon }) => {
  const { colorMode, setColorMode } = useColorMode();
  const modeChangeTextColor = colorMode === "dark" ? "#F5FBF5" : "#000000";
  const boolOptions = Object.keys(encOptions).filter((key) => typeof encOptions[key] === 'boolean');

  return (
    <Box className='encounterBox'>
      <Typography
        variant="h5"
        sx={{display: "flex", justifyContent: "center", margin: "8px 0px 8px"}}
      >
        Encounters
      </Typography>
      <Box className='toggleBoxes' >
        <TimeOfDayButtons timeOfDay={encOptions.timeOfDay} handleTimeOfDayChange={handleOptionChange} />
        <RodButtons rod={encOptions.rod} handleRodChange={handleOptionChange} />
      </Box>
      <Box className='checkBoxes'>
        {boolOptions.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={encOptions[option]}
                onChange={(event) => handleOptionChange(option, event.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={option.charAt(0).toUpperCase() + option.slice(1)}
          />
        ))}
      </Box>
      <Box className='encAccordions'>
        <PokemonAccordion
          disabled={encounterList.GroundEnc.length === 0}
          title="Grass Encounters"
          id="groundEnc"
          bgColor={"success.main"}
          textColor={encounterList.GroundEnc.length !== 0 ? "#F5FBF5" : modeChangeTextColor}
        >
          <EncounterTable encounterList={encounterList.GroundEnc} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={encounterList.SurfEnc.length === 0}
          title="Surf Encounters"
          id="surfEnc"
          bgColor={"primary.dark"}
          textColor={encounterList.SurfEnc.length !== 0 ? "#F5FBF5" : modeChangeTextColor}
        >
          <EncounterTable encounterList={encounterList.SurfEnc} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={encounterList.RodEnc.length === 0}
          title="Rod Encounters"
          id="rodEnc"
          bgColor={"info.light"}
          textColor={encounterList.RodEnc.length !== 0 ? "#F5FBF5" : modeChangeTextColor}
        >
          <EncounterTable encounterList={encounterList.RodEnc} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={encounterList.event.length === 0}
          title="Unique Encounters"
          id="event"
          bgColor={"error.light"}
          textColor={encounterList.event.length === 0 && colorMode === "dark" ? "#F5FBF5" : "#000000"}
        >
          <EncounterTable encounterList={encounterList.event} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={encounterList.honey.length === 0}
          title="Honey Tree Encounters"
          id="honeyTree"
          bgColor={"warning.main"}
          textColor={encounterList.honey.length === 0 && colorMode === "dark" ? "#F5FBF5" : "#000000"}
        >
          <EncounterTable encounterList={encounterList.honey} pokemon={pokemon} />
        </PokemonAccordion>
      </Box>
    </Box>
  )
}

export default EncountersPanel;