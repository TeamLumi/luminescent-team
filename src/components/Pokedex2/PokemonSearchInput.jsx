import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Fuse from 'fuse.js';

export const PokemonSearchInput = ({ allPokemons, setPokemons }) => {
  const fuse = new Fuse(allPokemons, { keys: ['monsno', 'name'] });
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  const fuzzySearch = useCallback((query) => {
    if (!query) {
      return allPokemons;
    }

    const result = fuse.search(query);
    return result.map((r) => r.item);
  });

  useEffect(() => {
    const timer = setTimeout(() => setText(debouncedText), 100);
    return () => clearTimeout(timer);
  }, [debouncedText]);

  useEffect(() => {
    setPokemons(fuzzySearch(text));
  }, [text]);

  return (
    <TextField
      id="pokemon-search-input"
      type="search"
      label="Search Pokémon"
      fullWidth={true}
      value={debouncedText}
      onChange={(e) => setDebouncedText(e.target.value)}
    />
  );
};
