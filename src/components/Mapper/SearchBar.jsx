import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Fuse from 'fuse.js';
import './style.css';
import { getLocationNames } from './coordinates';

const PokemonSearchInput = ({ allPokemons, debouncedText, setDebouncedText }) => {
  const fuse = new Fuse(allPokemons, { keys: ['monsno', 'name'] });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(debouncedText);
    }, 100);
    return () => clearTimeout(timer);
  }, [debouncedText]);

  return (
    <div className="monSearchBar">
      <Autocomplete
        id="pokemon-search-input"
        options={allPokemons}
        getOptionLabel={(option) => option.name}
        onChange={(e, value) => setDebouncedText(value.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            label="Search Pokémon Location"
            fullWidth
            value={debouncedText}
            onChange={(e) => setDebouncedText(e.target.value)}
          />
        )}
      />
    </div>
  );
};

const LocationNameDropdown = ({ locationName, setLocationName }) => {
  const locations = getLocationNames(); // Assuming this function fetches location names
  
  return (
    <div className="location">
      <Autocomplete
        id="location-input"
        options={locations}
        getOptionLabel={(option) => option}
        value={locationName}
        onChange={(e, value) => setLocationName(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            label="Current Location"
            fullWidth
          />
        )}
      />
    </div>
  );
};

export const SearchBar = ({
  canvasDimensions,
  pokemonList,
  debouncedText,
  handleDebouncedTextChange,
  locationName,
  setLocationName
}) => {
  return (
    <div
      className="infoCol"
      style={{
        width: `${canvasDimensions.width-10}px`,
        height: `${canvasDimensions.height}px`
      }}
    >
      <PokemonSearchInput
        allPokemons={pokemonList}
        debouncedText={debouncedText}
        setDebouncedText={handleDebouncedTextChange}
      />
      <LocationNameDropdown locationName={locationName} setLocationName={setLocationName} />
    </div>
  )
};