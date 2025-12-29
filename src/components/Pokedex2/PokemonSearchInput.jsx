import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import Fuse from 'fuse.js';
import { buildQueryList, extractKeys } from '../common/FilterDrawerFunction';
import { defaultPokemonSearchTable } from './PokemonListPageContent';

function applyBaseStatRangeFilter(results, statKey, rangeValue) {
  if (!rangeValue) return results;

  if (rangeValue.startsWith(">")) {
    const minValue = Number(rangeValue.slice(2));
    const finalResults = results.filter(pokemon => {
      const stat = Number(pokemon.baseStats?.[statKey]);
      return !isNaN(stat) && stat >= minValue;
    });

    return finalResults
  }

  const range = rangeValue?.split("-");

  if (range?.length !== 2) {
    console.warn(`Invalid range format for ${statKey}:`, rangeValue);
    return results;
  }

  const [minValue, maxValue] = range.map(Number);

  const finalResults = results.filter(pokemon => {
    const stat = Number(pokemon.baseStats?.[statKey]);
    return !isNaN(stat) && stat >= minValue && stat <= maxValue;
  });

  return finalResults;
}

function getAdditionalFilters(searchTable, finalResults) {
  // Base Stats
  Object.entries(searchTable.baseStats ?? {}).forEach(([statKey, statData]) => {
    if (!statData?.value) return;

    finalResults = applyBaseStatRangeFilter(
      finalResults,
      statKey,
      statData.value
    );
  });

  // Types
  const type1Value = searchTable.types?.type1?.value;
  const type2Value = searchTable.types?.type2?.value;
  if (type1Value && type2Value) {
    // Both types are selected → Pokémon must have both
    const requiredTypes = [parseInt(type1Value), parseInt(type2Value)];

    finalResults = finalResults.filter(pokemon => {
      const pokemonTypes = Object.values(pokemon.types).map(Number);
      return requiredTypes.every(t => pokemonTypes.includes(t));
    });
  } else if (type1Value || type2Value) {
    // Only one type is selected → match either type
    const requiredType = parseInt(type1Value || type2Value);
    finalResults = finalResults.filter(pokemon =>
      Object.values(pokemon.types).map(Number).includes(requiredType)
    );
  }

  // Abilities
  const abilityValue = searchTable.ability?.value;
  if (abilityValue) {
    const requiredAbility = parseInt(abilityValue);
    finalResults = finalResults.filter(pokemon =>
      Object.values(pokemon.abilities).map(Number).includes(requiredAbility)
    );
  }

  // Items
  const itemValue = searchTable.item?.value;
  if (itemValue) {
    const item = parseInt(itemValue);
    finalResults = finalResults.filter(pokemon =>
      Object.values(pokemon.items).map(Number).includes(item)
    );
  }

  // Egg Groups
  const eggGroup1Value = searchTable.eggGroups?.eggGroup1.value;
  const eggGroup2Value = searchTable.eggGroups?.eggGroup2.value;
  if (eggGroup1Value && eggGroup2Value) {
    // Both types are selected → Pokémon must have both
    const requiredEggGroups = [eggGroup1Value, eggGroup2Value];

    finalResults = finalResults.filter(pokemon => {
      return requiredEggGroups.every(t => pokemon.eggGroupNames.includes(t));
    });
  } else if (eggGroup1Value || eggGroup2Value) {
    // Only one type is selected → match either type
    const requiredEggGroup = eggGroup1Value || eggGroup2Value;
    finalResults = finalResults.filter(pokemon =>
      pokemon.eggGroupNames.includes(requiredEggGroup)
    );
  }

  return finalResults;
}

export const PokemonSearchInput = ({ allPokemons, setPokemons, searchTable, handleFilterChange }) => {
  const fuseKeys = useMemo(() => extractKeys(defaultPokemonSearchTable), []);
  const fuse = useMemo(() => (
    new Fuse(allPokemons, { keys: fuseKeys, useExtendedSearch: true })
  ), [allPokemons, fuseKeys]);
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);
  const POKEMON_EXCLUDE_LIST = [
    "baseStats",
    "ability",
    "types",
    "item",
    "eggGroups",
  ];

  const handleTextChange = (value) => {
    setText(value);

    if (value === null || value.trim().length === 0) {
      handleFilterChange("monsno", { value: "", label: null });
      handleFilterChange("name", { value: "", label: null });
      return; // Exit early
    }

    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      handleFilterChange("name", { value: "", label: null });
      handleFilterChange("monsno", { value: parsedValue, label: null });
    } else {
      handleFilterChange("monsno", { value: "", label: null });
      handleFilterChange("name", { value, label: null });
    }
  };

  const fuzzySearch = useCallback(() => {
    const queryList = [];
    buildQueryList(searchTable, queryList, POKEMON_EXCLUDE_LIST);

    if (queryList.length === 0) {
      return getAdditionalFilters(searchTable, allPokemons);
    }

    const results = fuse.search({ $and: queryList });
    let finalResults = results.map((r) => r.item);
    return getAdditionalFilters(searchTable, finalResults);
  }, [fuse, searchTable, allPokemons]);

  useEffect(() => {
    const timer = setTimeout(() => handleTextChange(debouncedText), 500);
    return () => clearTimeout(timer);
  }, [debouncedText]);

  useEffect(() => {
    setPokemons(fuzzySearch());
  }, [fuzzySearch, setPokemons]);

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
