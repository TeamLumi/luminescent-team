import * as React from 'react';
import { useGlobalState } from './GlobalState';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV, GAME_MODE_STRINGS } from '../../../__gamedata';
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
        <MenuItem value={GAMEDATAV}>{GAME_MODE_STRINGS[GAMEDATAV]}</MenuItem>
        <MenuItem value={GAMEDATA2}>{GAME_MODE_STRINGS[GAMEDATA2]}</MenuItem>
        <MenuItem value={GAMEDATA3}>{GAME_MODE_STRINGS[GAMEDATA3]}</MenuItem>
      </Select>
    </FormControl>
  )  
}

export default ModeSwitch;