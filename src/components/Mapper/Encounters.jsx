import React from 'react';
import { Box, Typography, FormControlLabel, Checkbox, FormGroup } from "@mui/material"

import { RodButtons, TimeOfDayButtons } from './Buttons';
import { PokemonAccordion } from '../Pokedex2/PokemonAccordion';
import { EncounterTable } from './EncounterTable';
import "./style.css"

const Encounters = ({ encOptions, handleOptionChange, encounterList, pokemon }) => {
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
        {TimeOfDayButtons(encOptions.timeOfDay, handleOptionChange)}
        {RodButtons(encOptions.rod, handleOptionChange)}
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
        <PokemonAccordion title="Grass Encounters" id="groundEnc" bgColor={"success.main"} textColor={"#F5FBF5"}>
          <EncounterTable encounterList={encounterList.GroundEnc} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion title="Surf Encounters" id="surfEnc" bgColor={"primary.dark"} textColor={"#F5FBF5"}>
          <EncounterTable encounterList={encounterList.SurfEnc} pokemon={pokemon} />
        </PokemonAccordion>
        <PokemonAccordion title="Rod Encounters" id="rodEnc" bgColor={"info.light"} textColor={"#F5FBF5"}>
          <EncounterTable encounterList={encounterList.RodEnc} pokemon={pokemon} />
        </PokemonAccordion>
      </Box>
    </Box>
  )
}

export default Encounters;