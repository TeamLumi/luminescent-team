import React, { useState, useRef, useEffect } from 'react';
import EncountersPanel from './EncountersPanel';
import { Box, Tab, Tabs } from '@mui/material';
import { PokemonTabPanel } from './PokemonTabs';
import { TrainersPanel } from './TrainersPanel';

export const MapperTabPanel = ({
  encOptions,
  handleOptionChange,
  encounterList,
  pokemonName,
  trainerList,
  pokemonList,
  selectedTrainer,
  setSelectedTrainer,
  openTrainerModal,
}) => {
  return (
    <PokemonTabPanel tabNames={["Encounters", "Trainers", "Items", "Shops"]}>
      <EncountersPanel
        encOptions={encOptions}
        handleOptionChange={handleOptionChange}
        encounterList={encounterList}
        pokemon={pokemonName}
      />
      <TrainersPanel
        selectedTrainer={selectedTrainer}
        setSelectedTrainer={setSelectedTrainer}
        trainerList={trainerList}
        pokemonList={pokemonList}
        openTrainerModal={openTrainerModal}
      />
      <Box>
        Coming Soon.
      </Box>
      <Box>
        Coming Soon.
      </Box>
    </PokemonTabPanel>
  );
};
