import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Box, Typography, FormControlLabel, Checkbox, FormGroup } from "@mui/material"

import { RodButtons, TimeOfDayButtons } from '../Encounters/Buttons';
import { PokemonAccordion } from '../../Pokedex2/PokemonAccordion';
import EncounterTable from '../Encounters/EncounterTable';
import ".././style.css"

const EncountersPanel = ({ encOptions, handleOptionChange, encounterList, pokemon, routeId }) => {
  const { colorMode, setColorMode } = useColorMode();
  const modeChangeTextColor = colorMode === "dark" ? "#F5FBF5" : "#000000";
  const boolOptions = Object.keys(encOptions).filter((key) => typeof encOptions[key] === 'boolean');

  const caveIds = [264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 292, 293, 294, 295, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 255, 256, 195, 196, 244, 245, 246, 247, 248, 249, 225, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 299, 300, 301, 302, 303, 304];
  
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
          disabled={encounterList.GroundEnc.length === 0 || caveIds.includes(routeId)}
          title="Grass Encounters"
          id="groundEnc"
          bgColor={"success.main"}
          textColor={encounterList.GroundEnc.length !== 0 ? "#F5FBF5" : modeChangeTextColor}
        >
          <EncounterTable encounterList={encounterList.GroundEnc} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={encounterList.GroundEnc.length === 0 || !(caveIds.includes(routeId))}
          title="Cave Encounters"
          id="caveEnc"
          bgColor={"#522c0b"}
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