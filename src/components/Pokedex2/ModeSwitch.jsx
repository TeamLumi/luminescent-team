import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGlobalState } from '../common/GlobalState';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ModeSwitch = ({ pokemonExists }) => {
  const [globalState, updateMode] = useGlobalState();

  React.useEffect(() => {
    if (pokemonExists && globalState.mode === "2.0") {
      updateMode("3.0");
    }
  }, [pokemonExists, globalState.mode, updateMode]);

  const handleChange = () => {
    const newMode = globalState.mode === "2.0" ? "3.0" : "2.0";
    updateMode(newMode);
  };
  return(
    <Stack direction="row" spacing={1} alignItems="center" marginLeft={2}>
      <Typography>2.0</Typography>
      <MaterialUISwitch
        checked={globalState.mode === "3.0"}
        onChange={handleChange}
        disabled={pokemonExists}
      />
      <Typography>3.0</Typography>
    </Stack>
  )  
}

export default ModeSwitch;