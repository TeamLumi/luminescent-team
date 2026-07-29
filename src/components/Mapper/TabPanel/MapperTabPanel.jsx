import React from 'react';

import PokemonTabPanel from './PokemonTabs';
import EncountersPanel from './EncountersPanel';
import TrainersPanel from './TrainersPanel';
import ItemsPanel from './ItemsPanel';
import ShopsPanel from './ShopsPanel';

export const MapperTabPanel = ({
  encOptions,
  handleOptionChange,
  encounterList,
  pokemonName,
  trainerList,
  pokemonList,
  selectedTrainer,
  setSelectedTrainer,
  openTrainerModal,
  routeId,
  selectedTab,
  onTabChange,
}) => {
  return (
    <PokemonTabPanel tabNames={["Encounters", "Trainers", "Items", "Shops"]} selectedTab={selectedTab} onTabChange={onTabChange}>
      <EncountersPanel
        encOptions={encOptions}
        handleOptionChange={handleOptionChange}
        encounterList={encounterList}
        pokemon={pokemonName}
        routeId={routeId}
      />
      <TrainersPanel
        selectedTrainer={selectedTrainer}
        setSelectedTrainer={setSelectedTrainer}
        trainerList={trainerList}
        pokemonList={pokemonList}
        openTrainerModal={openTrainerModal}
      />
      <ItemsPanel />
      <ShopsPanel />
    </PokemonTabPanel>
  );
};
