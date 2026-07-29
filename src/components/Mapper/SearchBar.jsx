import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { Autocomplete, TextField } from '@mui/material';
import { FixedSizeList } from 'react-window';

import { getLocationCoordsFromName, getLocationNames } from './coordinates';
import './style.css';

const PokemonSearchInput = ({
  allPokemons,
  setDebouncedText,
  selectedPokemon,
  setSelectedPokemon,
}) => {
  const [searchText, setSearchText] = useState("");

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

  const defaultOption = locations.length > 0 ? locations[0] : '';
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

const LISTBOX_PADDING = 8;
const ITEM_SIZE = 48;
const MAX_VISIBLE_ITEMS = 14;

function renderRow(props) {
  const { data, index, style } = props;
  const inlineStyle = {
    ...style,
    top: (style.top ?? 0) + LISTBOX_PADDING,
  };

  return React.cloneElement(data[index], {
    style: {
      ...data[index].props.style,
      ...inlineStyle,
    },
  });
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef(function OuterElementType(props, ref) {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = React.Children.toArray(children);
  const itemCount = itemData.length;

  const height = itemCount > MAX_VISIBLE_ITEMS
    ? MAX_VISIBLE_ITEMS * ITEM_SIZE + 2 * LISTBOX_PADDING
    : itemCount * ITEM_SIZE + 2 * LISTBOX_PADDING;

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <FixedSizeList
          itemData={itemData}
          height={height}
          width="100%"
          itemSize={ITEM_SIZE}
          itemCount={itemCount}
          outerElementType={OuterElementType}
          innerElementType="ul"
        >
          {renderRow}
        </FixedSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

const TrainerSearchInput = ({
  allTrainers,
  onTrainerSelect,
  value,
  onChange,
}) => {
  const [searchText, setSearchText] = useState("");

  // Clear internal text when value is cleared externally
  useEffect(() => {
    if (!value) {
      setSearchText("");
    }
  }, [value]);

  const handleTrainerChange = (_, newValue, reason) => {
    if (reason !== "clear" && newValue) {
      onChange(newValue);
      setSearchText(newValue.label);
      onTrainerSelect(newValue);
    } else {
      onChange(null);
      setSearchText("");
    }
  };

  const handleInputChange = (_, newInputValue) => {
    setSearchText(newInputValue);
  };

  return (
    <div className="monSearchBar">
      <Autocomplete
        id="trainer-search-input"
        clearOnBlur={false}
        blurOnSelect
        options={allTrainers}
        ListboxComponent={ListboxComponent}
        getOptionLabel={(option) => option.label}
        value={value}
        onChange={handleTrainerChange}
        inputValue={searchText}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Trainer"
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
  canvasRef,
  selectedPokemon,
  setSelectedPokemon,
  handleShowSettings,
  allTrainers,
  onTrainerSelect,
  searchBarTrainer,
  setSearchBarTrainer,
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
      <TrainerSearchInput
        allTrainers={allTrainers}
        onTrainerSelect={onTrainerSelect}
        value={searchBarTrainer}
        onChange={setSearchBarTrainer}
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
