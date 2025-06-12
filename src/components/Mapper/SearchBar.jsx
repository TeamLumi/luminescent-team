import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import SettingsIcon from '@mui/icons-material/Settings';
import Fuse from 'fuse.js';

import { getLocationCoordsFromName, getLocationNames } from './coordinates';
import './style.css';

const PokemonSearchInput = ({
  allPokemons,
  setDebouncedText,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  const [searchText, setSearchText] = useState("");

  // Debouncing effect for searchText.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, setDebouncedText]);

  const handlePokemonNameChange = (_, value, reason) => {
    if (reason !== "clear" && value) {
      setSelectedPokemon(value);
      setSearchText(value?.name ?? "");
    } else {
      setSelectedPokemon(null);
      setSearchText("");
    }
  };

  const handleInputChange = (_, value) => {
    setSearchText(value);
  };

  return (
    <div className="monSearchBar">
      <Autocomplete
        id="pokemon-search-input"
        clearOnBlur={false}
        blurOnSelect
        options={allPokemons}
        getOptionLabel={(option) => option.name}
        value={selectedPokemon}
        onChange={handlePokemonNameChange}
        inputValue={searchText}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Pokémon Location"
            fullWidth
          />
        )}
      />
    </div>
  );
};

const LocationNameDropdown = ({
  locationName,
  setLocationName,
  setLocationZoneId,
}) => {
  const locations = getLocationNames();
  const handleLocationChange = (e, value, reason) => {
    if (reason !== "clear" && value) {
      setLocationName(value);
      const location = getLocationCoordsFromName(value);
      setLocationZoneId(location?.zoneId);
    } else {
      setLocationName(null);
      setLocationZoneId(null);
    }
  };

  return (
    <div className="location">
      <Autocomplete
        id="location-input"
        clearOnBlur={false}
        blurOnSelect
        options={locations}
        getOptionLabel={(option) => option}
        value={locationName}
        onChange={handleLocationChange}
        inputValue={locationName ?? ""}
        onInputChange={(_, value) => {
          setLocationName(value);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Current Location"
            fullWidth
          />
        )}
      />
    </div>
  );
};

const SettingsButton = ({handleShowSettings}) => {
  return (
    <div className="settings">
      <IconButton aria-label="settings" onClick={handleShowSettings}>
        <SettingsIcon />
      </IconButton>
    </div>
  );
}

export const SearchBar = ({
  canvasDimensions,
  pokemonList,
  handleDebouncedTextChange,
  locationName,
  setLocationName,
  setLocationZoneId,
  selectedPokemon,
  setSelectedPokemon,
  handleShowSettings,
}) => {
  return (
    <div
      className="infoCol"
      style={{
        width: `${canvasDimensions.width}px`,
        height: `${canvasDimensions.height}px`
      }}
    >
      <PokemonSearchInput
        allPokemons={pokemonList}
        setDebouncedText={handleDebouncedTextChange}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <LocationNameDropdown
        locationName={locationName}
        setLocationName={setLocationName}
        setLocationZoneId={setLocationZoneId}
      />
      <SettingsButton handleShowSettings={handleShowSettings} />
    </div>
  )
};