import React, { useEffect, useRef, useState } from 'react';
import { TrainerDropdown, Trainers } from './Trainers';
import { PokemonAccordion } from '../Pokedex2/PokemonAccordion';
import { Box } from '@mui/material';

export const TrainersSection = ({ pokemonList, trainerList, selectedZone }) => {
  const selectedRef = useRef(selectedZone);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    if (selectedRef.current !== selectedZone) {
      setSelectedTrainer(null);
      selectedRef.current = selectedZone;
    }
  }, [selectedZone]);

  return (
    <Box
      className='trainer-section'
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        maxWidth: "1108px",
        minWidth: { xs: "400px", sm: "530px" },
        maxHeight: { sm: "unset", md: "400px" },
        width: "fit-content",
        border: "2px solid var(--ifm-table-border-color)",
      }}
    >
      <PokemonAccordion
        title={"Trainers"}
        id={"trainers"}
        sx={{
          maxWidth: "1100px",
          minWidth: { xs: "400px", sm: "33.125rem", md: "52.125rem", lg: "69rem" },
          minHeight: "5rem",
          maxHeight: { sm: "unset", md: "400px" },
          width: "100%",
          marginTop: "auto",
          marginBottom: "auto",
        }}
        open={selectedTrainer !== null}
        summarySx={{minHeight: "5rem"}}
      >
        <Trainers
          pokemonList={pokemonList}
          selectedTrainer={selectedTrainer}
        />
      </PokemonAccordion>
      <TrainerDropdown trainer={selectedTrainer} setTrainer={setSelectedTrainer} trainerList={trainerList} />
    </Box>
  );
};
