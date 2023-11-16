import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import Fuse from 'fuse.js';

export const PokemonSearchInput = ({ allPokemons, debouncedText, setDebouncedText }) => {
  const fuse = new Fuse(allPokemons, { keys: ['monsno', 'name'] });

  const fuzzySearch = (query) => {
    if (!query) {
      return allPokemons;
    }

    const result = fuse.search(query);
    return result.map((r) => r.item);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(debouncedText);
    }, 100);
    return () => clearTimeout(timer);
  }, [debouncedText]);

  return (
    <Autocomplete
      id="pokemon-search-input"
      options={allPokemons}
      getOptionLabel={(option) => option.name}
      onChange={(e, value) => setDebouncedText(value.name)}
      renderInput={(params) => (
        <TextField
          {...params}
          type="search"
          label="Search Pokémon"
          fullWidth
          value={debouncedText}
          onChange={(e) => setDebouncedText(e.target.value)}
        />
      )}
    />
  );
};
