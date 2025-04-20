import React, { useEffect, useRef, useState } from 'react';

import {
  sortedCoordinates,
  getSelectedLocation,
} from './coordinates';
import { SearchBar } from './SearchBar';
import { MapperTabPanel } from './TabPanel/MapperTabPanel';
import SettingsModal from './Settings/SettingsModal';
import './style.css';

import {
  getAreaEncounters,
  getTrainersFromZoneId,
  getFieldItemsFromZoneID,
  getHiddenItemsFromZoneID,
  getPokemonIdFromName
} from '../../utils/dex';
import {
  getFixedShops,
  getItemPrice,
  getItemString,
  getRegularShopItems,
  getScriptItems,
  getFixedShopsItems,
  getHeartScaleShopItems
} from '../../utils/dex/item';
import {
  getAllGroundEncounters,
  getTimeOfDayEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getRadarEncounter,
  getSurfingIncenseEncounter,
  getSwarmEncounter,
  getAllIncenseEncounters,
  getMapperRoutesFromPokemonId,
  getAllHoneyTreeEncounters,
  getEventEncounters,
} from '../../utils/dex/encounters';
import TrainersModal from './Trainers/TrainersModal';
import { Canvas, Image, Rect } from '@bucky24/react-canvas/build/main';
import { Location } from './Location';
import mapperImage from "../../../static/img/new_small_mapper.png";

const canvasDimensions = {
  width: 1280,
  height: 720
}

const versionNumber = "Beta 1.2.0";

export const CLEAR_MODE = {
  HIGHLIGHT: "highlight",
  SELECT: "select",
  ENCOUNTER: "enc",
}

export const Mapper = ({ pokemonList }) => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedZone, setSelectedZone] = useState("");

  const [encounterLocations, setEncounterLocations] = useState([]);
  const [encOptions, setEncOptions] = useState({
    swarm: false,
    radar: false,
    timeOfDay: "1",
    incense: false,
    rod: "1",
  });

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [pokemonName, setPokemonName] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState(null);
  const [trainerList, setTrainerList] = useState([]);
  const [showTrainerModal, setShowTrainerModal] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [colors, setColors] = useState({
    hov: { r: 247, g: 100, b: 200, a: 0.7 },
    sel: { r: 72, g: 113, b: 247, a: 0.8 },
    enc: { r: 247, g: 0, b: 0, a: 0.7 },
    default: "transparent"
  });

  const [encounterList, setEncounterList] = useState({
    GroundEnc: [],
    SurfEnc: [],
    RodEnc: [],
    honey: [],
    event: [],
  });
  const [fieldItemsList, setFieldItems] = useState([]);
  const [hiddenItemsList, setHiddenItems] = useState([]);
  const [shopItemsList, setShopItems] = useState([]);
  const [scriptItemsList, setScriptItems] = useState([]);
  const [fixedShopList, setFixedShops] = useState([]);
  const [heartScaleShopList, setHeartScaleShop] = useState([]);

  const locationId = useRef(null);
  useEffect(() => {
    if(locationId !== null) {
      setEncounterList(setAllEncounters(locationId.current))
    }
  }, [encOptions]);

  useEffect(() => {
    setEncounterLocations(getMapperRoutesFromPokemonId(selectedPokemon?.id));
  }, [selectedPokemon]);

  const openTrainerModal = () => {
    setShowTrainerModal(true);
  };
  const closeTrainerModal = () => {
    setShowTrainerModal(false);
  };

  const handleOptionChange = (option, value) => {
    setEncOptions({
      ...encOptions,
      [option]: value,
    });
  };

  const handlePokemonNameChange = (pokemonName) => {
    setPokemonName(pokemonName);
  };

  const handleShowSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  const setAllEncounters = (zoneId) => {
    const areaEncounters = getAreaEncounters(zoneId);
    if (!areaEncounters) {
      return {
        GroundEnc: [],
        SurfEnc: [],
        RodEnc: [],
        honey: [],
        event: [],
      };
    }

    const allGroundEnc = getAllGroundEncounters(areaEncounters);
    const swarmEnc = getSwarmEncounter(areaEncounters);
    const radarEnc = getRadarEncounter(areaEncounters);
    const timeOfDayEnc = getTimeOfDayEncounters(areaEncounters);
    const incenseEnc = getAllIncenseEncounters(areaEncounters);
    const allSurfEnc = getAllSurfingEncounters(areaEncounters);
    const surfIncenseEnc = getSurfingIncenseEncounter(areaEncounters);
    const honeyTreeEnc = getAllHoneyTreeEncounters(areaEncounters);
    const eventEncounters = getEventEncounters(areaEncounters);

    // This section is for the grass encounters only
    if (allGroundEnc.length > 0) {
      if (encOptions.swarm) {
        allGroundEnc[0] = swarmEnc[0]
      }
      if (encOptions.radar) {
        allGroundEnc[9] = allGroundEnc[1]
        allGroundEnc[9].encounterRate = "4%"
        allGroundEnc[1] = radarEnc[0]
      }
      if (encOptions.timeOfDay === "2") {
        allGroundEnc[2] = timeOfDayEnc[0]
        allGroundEnc[3] = timeOfDayEnc[1]
      } else if (encOptions.timeOfDay === "3") {
        allGroundEnc[2] = timeOfDayEnc[2]
        allGroundEnc[3] = timeOfDayEnc[3]
      }
      if (encOptions.incense) {
        if (incenseEnc.length > 0) {
          allGroundEnc[10] = allGroundEnc[4]
          allGroundEnc[11] = allGroundEnc[5]
          allGroundEnc[10].encounterRate = "1%"
          allGroundEnc[11].encounterRate = "1%"
          allGroundEnc[4] = incenseEnc[0]
          allGroundEnc[5] = incenseEnc[1]
        } else {
          console.error("This Route should have Incense Encounters but doesn't", zoneId)
        }
      }
    }

    // This section is for the surfing encounters only
    if(allSurfEnc.length > 0) {
      if (encOptions.incense) {
        if (surfIncenseEnc.length > 0) {
          allSurfEnc[1] = surfIncenseEnc[0]
        } else {
          console.error("This Route doesn't have Surf Incense Encounters but should:", zoneId);
        }
      }
    }

    // This section is for the Rod Encounters only
    const rodEnc = getAllRodEncounters(areaEncounters, encOptions.rod)

    return{
      GroundEnc: allGroundEnc,
      SurfEnc: allSurfEnc,
      RodEnc: rodEnc,
      honey: honeyTreeEnc,
      event: eventEncounters,
    }
  }

  const handleNewMouseMove = ({ x, y, button }) => {
    setMouseCoords({ x, y });
  };

  const handleMouseUpClick = ({ x, y }) => {
    const location = getSelectedLocation(x, y);
    if (location) {
      setSelectedLocation(location.zoneId);
      locationId.current = location.zoneId;
      setTrainerList(getTrainersFromZoneId(location.zoneId) || []);
      setEncounterList(setAllEncounters(location.zoneId) || []);
      setSelectedZone(location.name);
      setFieldItems(getFieldItemsFromZoneID(location.zoneId));
      setHiddenItems(getHiddenItemsFromZoneID(location.zoneId));
      setShopItems(getRegularShopItems(location.zoneId));
      setScriptItems(getScriptItems(location.zoneId));
      setFixedShops(getFixedShops(location.zoneId));
      setHeartScaleShop(getHeartScaleShopItems(location.zoneId));
    } else {
      setSelectedLocation(null);
      locationId.current = null;
      setTrainerList([]);
      setSelectedZone("");
      setFieldItems([]);
      setHiddenItems([]);
      setShopItems([]);
      setScriptItems([]);
      setFixedShops([]);
      setHeartScaleShop([]);
    }
  };

  const handleSetLocationZoneId = (zoneId) => {
    const newZoneId = zoneId ?? null;
    setSelectedLocation(newZoneId);
    locationId.current = newZoneId;
    setTrainerList(getTrainersFromZoneId(newZoneId));
    setEncounterList(setAllEncounters(newZoneId) || []);
    setFieldItems(getFieldItemsFromZoneID(newZoneId));
    setHiddenItems(getHiddenItemsFromZoneID(newZoneId));
    setShopItems(getRegularShopItems(newZoneId));
    setScriptItems(getScriptItems(newZoneId));
    setFixedShops(getFixedShops(newZoneId));
    setHeartScaleShop(getHeartScaleShopItems(newZoneId));
  };

  return (
    <div className="mapper">
      <header style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
        <h2 style={{width: "fit-content"}}>Luminescent Platinum Mapper ({versionNumber})</h2>
      </header>
      <div
        className="canvasCol"
        style={{gridTemplate: `${canvasDimensions.height}px / ${canvasDimensions.width}px auto`}}
      >
        <Canvas
          width={canvasDimensions.width}
          height={canvasDimensions.height}
          onMouseMove={handleNewMouseMove}
          onMouseUp={handleMouseUpClick}
          captureAllKeyEvents={false}
        >
          <Image
            x={0}
            y={0}
            width={canvasDimensions.width}
            height={canvasDimensions.height}
            src={mapperImage}
          />
          {sortedCoordinates.map((location, locationIndex) => (
            <>
              <Location
                key={`${location.zoneId}-${locationIndex}`}
                location={location}
                mouseCoords={mouseCoords}
                selectedLocation={selectedLocation}
                encounterLocations={encounterLocations}
                colors={colors}
              />
              <Rect
                key={`outline-${location.zoneId}-${locationIndex}`}
                x={location.x}
                y={location.y}
                x2={location.x + location.width}
                y2={location.y + location.height}
                color={"#000"}
                fill={false}
              />
            </>
          ))}
        </Canvas>
        <MapperTabPanel
          encOptions={encOptions}
          handleOptionChange={handleOptionChange}
          encounterList={encounterList}
          pokemonName={pokemonName}
          pokemonList={pokemonList}
          trainerList={trainerList}
          selectedTrainer={selectedTrainer}
          setSelectedTrainer={setSelectedTrainer}
          openTrainerModal={openTrainerModal}
          routeId={selectedLocation}
        />
      </div>
      <SearchBar
        canvasDimensions={canvasDimensions}
        pokemonList={pokemonList}
        handleDebouncedTextChange={handlePokemonNameChange}
        locationName={selectedZone}
        setLocationName={setSelectedZone}
        setLocationZoneId={handleSetLocationZoneId}
        selectedPokemon={selectedPokemon}
        setSelectedPokemon={setSelectedPokemon}
        handleShowSettings={handleShowSettings}
      />
      <TrainersModal
        showModal={showTrainerModal}
        onHide={closeTrainerModal}
        pokemonList={pokemonList}
        selectedTrainer={selectedTrainer}
      />
      {/* <div>
        Field Items: 
        {fieldItemsList && fieldItemsList.map((fieldItem, index) => (
          <div key={index}>
            {`${getItemString(fieldItem)}`}
          </div>
        ))}
      </div>
      <div>
        Hidden Items: 
        {hiddenItemsList && hiddenItemsList.map((hiddenItem, index) => (
          <div key={index}>
            {`${getItemString(hiddenItem)}`}
          </div>
        ))}
      </div>
      <div>
        Scripted Items: 
        {scriptItemsList && scriptItemsList.map((scriptItem, index) => (
          <div key={index}>
            {`${getItemString(scriptItem)}`}
          </div>
        ))}
      </div>
      <div>
        Shop Items:
        {shopItemsList && shopItemsList.map((shopItem, index) => (
          <div key={index}>
            {`${getItemString(shopItem.ItemNo)} `}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pok%C3%A9mon_Dollar_sign.svg/73px-Pok%C3%A9mon_Dollar_sign.svg.png"
              height="12px"
              style={{filter: colorMode === "dark" ? "invert(80%)" : "invert(0%)"}}
            />
            {` ${getItemPrice(shopItem.ItemNo)}`}
            {shopItem.BadgeNum > 0 && (
              ` (${shopItem.BadgeNum}+ Badges)`
            )}
          </div>
        ))}
      </div>
      <div>
        {fixedShopList && fixedShopList.map((section, index) => (
          <div key={index}>
            {`${section.sectionTitle} Items:`}
            {section.items && section.items.map((shop, itemIndex) => (
              <div key={itemIndex}>
                {getFixedShopsItems(shop).map((itemNo, itemNoIndex) => (
                  <div key={itemNoIndex}>
                    {`${getItemString(itemNo)} `}
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Pok%C3%A9mon_Dollar_sign.svg/73px-Pok%C3%A9mon_Dollar_sign.svg.png"
                      height="12px"
                      style={{filter: colorMode === "dark" ? "invert(80%)" : "invert(0%)"}}
                    />
                    {` ${getItemPrice(itemNo)}`}

                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div>
        Heart Scale Shop Items: 
        {heartScaleShopList && heartScaleShopList.map((heartScaleItem, index) => (
          <div key={index}>
            {`${getItemString(heartScaleItem.ItemNo)} Price: ${heartScaleItem.Price} Heart Scale(s)`}
          </div>
        ))}
      </div> */}
      <SettingsModal
        colors={colors}
        setColors={setColors}
        showModal={showSettings}
        onHide={handleCloseSettings}
      />
    </div>
  );
}
