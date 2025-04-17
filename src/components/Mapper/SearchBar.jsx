import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Autocomplete, TextField } from '@mui/material';
import Fuse from 'fuse.js';

import { getLocationCoordsFromName, getLocationNames } from './coordinates';
import './style.css';

const PokemonSearchInput = ({
  allPokemons,
  setDebouncedText,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  const [searchText, setSearchText] = useState('');

  // Debouncing effect for searchText.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, setDebouncedText]);

  const handlePokemonNameChange = (event, value, reason) => {
    if (reason !== "clear" && value) {
      setSelectedPokemon(value);
      setSearchText(value.name);
    } else {
      setSelectedPokemon(null);
      setSearchText("");
    }
  };

  const handleInputChange = (event, value) => {
    setSearchText(value);
  };

  return (
    <div className="monSearchBar">
      <Autocomplete
        id="pokemon-search-input"
        options={allPokemons}
        getOptionLabel={(option) => option.name}
        value={selectedPokemon}
        onChange={handlePokemonNameChange}
        inputValue={searchText}
        onInputChange={handleInputChange}
        blurOnSelect
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
  const handleLocationChange = (e, value) => {
    setLocationName(value);
    const location = getLocationCoordsFromName(value);
    setLocationZoneId(location?.zoneId);
  };

  const defaultOption = locations.length > 0 ? locations[0] : '';
  return (
    <div className="location">
      <Autocomplete
        id="location-input"
        options={locations}
        getOptionLabel={(option) => option}
        defaultValue={defaultOption}
        value={locationName}
        onChange={handleLocationChange}
        blurOnSelect
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            label="Current Location"
            fullWidth
            value={locationName}
            onChange={(e) => setLocationName(e.target.value)}
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