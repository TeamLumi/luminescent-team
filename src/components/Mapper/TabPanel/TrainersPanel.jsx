import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { TrainerDropdown, Trainers } from '../Trainers/Trainers';

export const TrainersPanel = ({
  selectedTrainer, setSelectedTrainer, trainerList, pokemonList
}) => {
  return (
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
  );
};
