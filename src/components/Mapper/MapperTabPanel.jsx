import React, { useState, useRef, useEffect } from 'react';
import Encounters from './Encounters';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { TrainerDropdown, Trainers } from './Trainers';
import { PokemonTabPanel } from './PokemonTabs';

export const MapperTabPanel = ({
  encOptions,
  handleOptionChange,
  encounterList,
  pokemonName,
  trainerList,
  pokemonList,
  selectedZone
}) => {
  const selectedRef = useRef(selectedZone);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    if (selectedRef.current !== selectedZone) {
      setSelectedTrainer(null);
      selectedRef.current = selectedZone;
    }
  }, [selectedZone]);

  return (
    <PokemonTabPanel tabNames={["Encounters", "Trainers", "Items", "Shops"]}>
      <Encounters
        encOptions={encOptions}
        handleOptionChange={handleOptionChange}
        encounterList={encounterList}
        pokemon={pokemonName}
      />
      <Box
        width="416px"
        border="2px solid var(--ifm-table-border-color)"
      >
        <Box paddingBottom=".875rem" borderBottom="2px solid var(--ifm-table-border-color)">
          <Box display="grid" gridTemplateColumns={selectedTrainer ? "3fr 2fr" : "5fr"}>
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                justifyContent: selectedTrainer ? "end" : "center",
                margin: "8px 0px 8px"
              }}
            >
              Trainers
            </Typography>
            {selectedTrainer && (
              <Button variant="outlined" sx={{ margin: "0.5rem 1rem" }}>Detailed</Button>
            )}
          </Box>
          <TrainerDropdown
            trainer={selectedTrainer}
            setTrainer={setSelectedTrainer}
            trainerList={trainerList}
            smallest />
        </Box>
        <Box>
          <Trainers
            pokemonList={pokemonList}
            selectedTrainer={selectedTrainer}
            smallest />
        </Box>
      </Box>
      <Box>
        Coming Soon.
      </Box>
      <Box>
        Coming Soon.
      </Box>
    </PokemonTabPanel>
  );
};
