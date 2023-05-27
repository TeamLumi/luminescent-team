import React from 'react';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';

export const PokemonAbilities = ({ abilityName1, abilityName2, abilityNameHidden }) => {
  const allAbilitiesAreEqual = abilityName1 === abilityName2 && abilityName2 === abilityNameHidden;
  const hiddenAbilityIsDifferent = abilityName1 === abilityName2 && abilityName1 !== abilityNameHidden;
  const abilityIsSameAsHidden = abilityName1 === abilityNameHidden || abilityName2 === abilityNameHidden;

  if (allAbilitiesAreEqual) {
    return (
      <Box display="flex">
        <PokemonAbility abilityName={abilityName1} isHiddenAbility={false} needsSpacing={false} />
      </Box>
    );
  }

  if (hiddenAbilityIsDifferent) {
    return (
      <Box display="flex">
        <PokemonAbility abilityName={abilityName1} isHiddenAbility={false} needsSpacing={true} />
        <PokemonAbility abilityName={abilityNameHidden} isHiddenAbility={true} needsSpacing={false} />
      </Box>
    );
  }

  if (abilityIsSameAsHidden) {
    return (
      <Box display="flex">
        <PokemonAbility abilityName={abilityName1} isHiddenAbility={false} needsSpacing={true} />
        <PokemonAbility abilityName={abilityName2} isHiddenAbility={false} needsSpacing={false} />
      </Box>
    );
  }

  return (
    <Box display="flex">
      <PokemonAbility abilityName={abilityName1} isHiddenAbility={false} needsSpacing={true} />
      <PokemonAbility abilityName={abilityName2} isHiddenAbility={false} needsSpacing={true} />
      <PokemonAbility abilityName={abilityNameHidden} isHiddenAbility={true} needsSpacing={false} />
    </Box>
  );
};

export const PokemonAbility = ({ abilityName, isHiddenAbility, needsSpacing }) => {
  return (
    <Typography sx={{ textDecoration: 'underline', fontSize: '0.9rem', marginRight: needsSpacing && '8px' }}>
      {abilityName}
      {isHiddenAbility && ' (H)'}
      {needsSpacing && ','}
    </Typography>
  );
};
