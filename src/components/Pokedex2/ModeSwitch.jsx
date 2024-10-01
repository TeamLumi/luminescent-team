import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGlobalState } from '../common/GlobalState';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

const ModeSwitch = () => {
  const [globalState, updateMode] = useGlobalState();

  const handleChange = (event) => {
    updateMode(event.target.value);
  };
  return(
    <FormControl
      sx={{
        marginLeft: {xs: "unset", sm: ".25rem"},
        gridArea: "c"
      }}
    >
      <InputLabel id='version-selector-label'>Version</InputLabel>
      <Select
        labelId='version-selector-label'
        id='version-selector'
        value={globalState.mode}
        label="Version"
        onChange={handleChange}
      >
        <MenuItem value="vanilla">Vanilla BDSP</MenuItem>
        <MenuItem value="2.0">Luminescent 2.1F</MenuItem>
        <MenuItem value="3.0">Re:Illuminated</MenuItem>
      </Select>
    </FormControl>
  )  
}

export default ModeSwitch;