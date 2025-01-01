import React from 'react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { TrainerDropdown, Trainers } from '../Trainers/Trainers';
import "../style.css";

const TrainersPanel = ({
  selectedTrainer,
  setSelectedTrainer,
  trainerList,
  pokemonList,
  openTrainerModal,
}) => {
  const theme = useTheme();
  const smallest = useMediaQuery(theme.breakpoints.down('sm'));
  const handleOpen = () => {
    openTrainerModal();
  }
  return (
    <Box className='trainer-panel'>
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
          {selectedTrainer && !smallest && (
            <Button
              variant="outlined"
              sx={{ margin: "0.5rem 1rem" }}
              onClick={handleOpen}
            >
              Detailed
            </Button>
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

export default TrainersPanel;
