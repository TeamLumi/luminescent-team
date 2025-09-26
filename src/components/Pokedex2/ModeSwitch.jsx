import * as React from 'react';
import { useGlobalState } from '../common/GlobalState';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';
import { useColorMode } from '@docusaurus/theme-common';

const ModeSwitch = () => {
  const { colorMode, setColorMode } = useColorMode();
  const [globalState, updateMode] = useGlobalState();

  const handleChange = (event) => {
    updateMode(event.target.value);
  };
  return(
    <FormControl
      sx={{
        marginLeft: {xs: "unset", sm: ".25rem"},
        gridArea: "c",
        minWidth: "fit-content",
        backgroundColor: colorMode === "dark" ? "var(--ifm-background-color)" : "white",
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
        <MenuItem value={GAMEDATAV}>Vanilla BDSP</MenuItem>
        <MenuItem value={GAMEDATA2}>Luminescent 2.2F</MenuItem>
        <MenuItem value={GAMEDATA3}>Re:Illuminated</MenuItem>
      </Select>
    </FormControl>
  )  
}

export default ModeSwitch;