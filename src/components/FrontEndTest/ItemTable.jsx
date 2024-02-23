import React from 'react';
import { Box, Typography } from '@mui/material';

import { useGlobalState } from '../common/GlobalState';
import ModeSwitch from '../Pokedex2/ModeSwitch';

export default function ItemTablePage() {
  // globalState.mode will provide you with the mode
  // You can use this to pass into any function that asks for it.
  const [globalState, updateMode] = useGlobalState();

  return (
    <>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        {/* ModeSwitch is a component that can change the Mode when clicked */}
        {/* This is hooked directly into the useGlobalState */}
        {/* So whenever this switch is changed, globalState.mode will be updated */}
        <ModeSwitch />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Typography fontSize="1.5rem">Item Table</Typography>
      </Box>
    </>
  );
};
