import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Fuse from 'fuse.js';
import './style.css';
import { getLocationNames } from './coordinates';

const PokemonSearchInput = ({
  allPokemons,
  debouncedText,
  setDebouncedText,
  canvasRef,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  // It appears the original intent was to debounce a search text input, so we will manage that text with `searchText` and `debouncedText`.
  const [searchText, setSearchText] = useState('');

  // Fuse setup should be moved inside a useEffect to avoid initializing it on every render.
  useEffect(() => {
    const fuse = new Fuse(allPokemons, { keys: ['monsno', 'name'] });
    // Ideally, use fuse to filter/search through `allPokemons` based on `debouncedText`.
    // For now, this isn't directly used, but can be integrated for actual search functionality.
  }, [allPokemons]);

  // Debouncing effect for searchText.
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(searchText);
    }, 300); // 300ms is a common choice for debouncing.
    return () => clearTimeout(timer);
  }, [searchText]);

  const handlePokemonNameChange = (event, value) => {
    // Dispatch event with the name of the selected Pokemon.
    const pokemonLocationsEvent = new CustomEvent('passPokemonNameLocation', { detail: value });
    canvasRef.dispatchEvent(pokemonLocationsEvent);
    // Assume `value` is the whole Pokemon object selected from options.
    setSelectedPokemon(value);
    // Set the searchText as the Pokemon's name, which will then be debounced.
    setSearchText(value.name);
  };

  const handleInputChange = (event) => {
    // Update searchText directly from input.
    setSearchText(event.target.value);
  };

  return (
    <div className="monSearchBar">
      <Autocomplete
        id="pokemon-search-input"
        options={allPokemons}
        getOptionLabel={(option) => option.name}
        value={selectedPokemon}
        onChange={handlePokemonNameChange}
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            label="Search Pokémon Location"
            fullWidth
            onChange={handleInputChange}
            value={searchText} // Use searchText to reflect input changes immediately
          />
        )}
      />
    </div>
  );
};

const LocationNameDropdown = ({ locationName, setLocationName, canvasRef }) => {
  const locations = getLocationNames();
  const handleLocationChange = (e, value) => {
    const locationNameEvent = new CustomEvent('passLocationNameToParent', { detail: value });
    canvasRef.dispatchEvent(locationNameEvent);
    setLocationName(value)
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

export const SearchBar = ({
  canvasDimensions,
  pokemonList,
  debouncedText,
  handleDebouncedTextChange,
  locationName,
  setLocationName,
  canvasRef,
  selectedPokemon,
  setSelectedPokemon,
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
        debouncedText={debouncedText}
        setDebouncedText={handleDebouncedTextChange}
        canvasRef={canvasRef}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
      />
      <LocationNameDropdown
        locationName={locationName}
        setLocationName={setLocationName}
        canvasRef={canvasRef}
      />
    </div>
  )
};