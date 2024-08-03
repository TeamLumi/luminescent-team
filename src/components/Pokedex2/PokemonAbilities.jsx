import React, { useState } from 'react';
import { Box } from '@mui/system';
import { Typography, Modal } from '@mui/material';
import { getAbilityIdFromAbilityName, getAbilityInfo } from '../../utils/dex/ability';
import { useGlobalState } from '../common/GlobalState';

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

export const PokemonAbility = ({
  abilityName,
  isHiddenAbility=false,
  needsSpacing=false,
  sx,
  label=false
}) => {
  const [globalState, updateMode] = useGlobalState();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: 'flex' }}>
      {label && (
        <Typography>
          Ability:&nbsp;
        </Typography>
      )}
      <Typography
        sx={{
          textDecoration: 'underline',
          fontSize: '0.9rem',
          marginRight: needsSpacing && '8px',
          cursor: 'pointer',
          ...sx
        }}
        onClick={handleOpen}
      >
        {abilityName}
        {isHiddenAbility && ' (H)'}
        {needsSpacing && ','}
      </Typography>
      <Modal open={open} onClose={handleClose}>
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--ifm-color-content-inverse)',
            color: 'var(--ifm-color-content)',
            padding: '16px',
            borderRadius: '8px',
            border: 'var(--ifm-table-border-width) solid var(--ifm-table-border-color)',
          }}
        >
          <Typography variant="h5" style={{ textAlign: 'center' }}>{abilityName}</Typography>
          <Typography variant="h6">{getAbilityInfo(getAbilityIdFromAbilityName(abilityName, globalState.mode), globalState.mode)}</Typography>
        </Box>
      </Modal>
    </div>
  );
};
