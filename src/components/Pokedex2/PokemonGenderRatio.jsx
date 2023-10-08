import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import { convertGenderRatioFromDecimal } from '../../core/genderRatioConverter';

export const PokemonGenderRatio = ({ genderDecimalValue }) => {
  const genderRatio = convertGenderRatioFromDecimal(genderDecimalValue);

  return (
    <Box sx={{ marginTop: "16px"}}>
      <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>Gender ratio:</Typography>
      <Container>
        <PokemonGenderText malePercentage={genderRatio.male} femalePercentage={genderRatio.female} />
      </Container>
    </Box>
  );
};

const PokemonGenderText = ({ malePercentage, femalePercentage }) => {
  if (malePercentage === 0.0 && femalePercentage === 0.0) {
    return <Typography>100% genderless</Typography>;
  }

  if (malePercentage === 100.0 && femalePercentage === 0.0) {
    return <Typography>100% male</Typography>;
  }

  if (femalePercentage === 100.0 && malePercentage === 0.0) {
    return <Typography>100% female</Typography>;
  }

  return (
    <Typography>
      {malePercentage.toFixed(2)}% male, {femalePercentage.toFixed(2)}% female
    </Typography>
  );
};
