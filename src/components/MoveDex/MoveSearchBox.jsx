import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useHistory } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import { normalizePokemonName } from '../../utils/dex/name';

export const MoveSearchBox = ({ movesList, moveName }) => {
  const { colorMode, setColorMode } = useColorMode();
  const history = useHistory();
  const { path } = usePluginData('luminescent-movedex-data-plugin');
  const moveDexPath = useBaseUrl(path);
  const [options, setOptions] = useState(movesList.map((move) => ({ value: move.name, label: move.name })));
  const [selectedMoveName, setSelectedMoveName] = useState(options[0]);

  useEffect(() => {
    setOptions(movesList.map((move) => ({ value: move.name, label: move.name })));
  }, [movesList]);

  useEffect(() => {
    setSelectedMoveName(options.find((m) => m.value === moveName ) || null);
  }, [options]);

  return (
    <Autocomplete
      disablePortal
      id="moveNameSelector"
      sx={{
        width: {xs: "250px", sm: "300px"},
        gridArea: "a",
        backgroundColor: colorMode === "dark" ? "var(--ifm-background-color)" : "white",
      }}
      options={options}
      value={selectedMoveName}
      onChange={(_, move) => {
        console.log(move);
        history.push(`${moveDexPath}/${normalizePokemonName(move.value)}`);
      }}
      isOptionEqualToValue={(option, value) => {
        return option.value === value.value;
      }}
      renderOption={(props, option) => {
        return (
          <li {...props} key={`search-field-${option.value}`}>
            {option.label}
          </li>
        );
      }}
      renderInput={(params) => <TextField {...params} label="Search Moves" />}
    />
  );
};
