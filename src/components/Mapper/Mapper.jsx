import React, { useEffect, useRef, useState } from 'react';
import { Box, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { useColorMode } from '@docusaurus/theme-common';

import { SearchBar } from './SearchBar';
import { RodButtons, TODButtons } from './Buttons';
import './style.css';

import { coordinates } from './coordinates';
import {
  getAreaEncounters,
  getTrainersFromZoneName,
  getFieldItemsFromZoneID,
  getHiddenItemsFromZoneID,
  getPokemonIdFromName
} from '../../utils/dex';
import { getZoneIdFromZoneName } from '../../utils/dex/location';
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
  getTODEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getRadarEncounter,
  getSurfingIncenseEncounter,
  getSwarmEncounter,
  getAllIncenseEncounters,
  getRoutesFromPokemonId
} from '../../utils/dex/encounters';
import { Trainers } from './Trainers';
import { PokemonAccordion } from '../Pokedex2/PokemonAccordion';

function getSelectedLocation(x, y) {
  const location = coordinates.filter(coords => {
    return (coords.x <= x && x <= (coords.x + coords.w)) &&
      (coords.y <= y && y <= (coords.y + coords.h))
  });
  if (location.length === 0) return "";
  return location[0];
}

const canvasDimensions = {
  width: 1244,
  height: 720
}

export const Mapper = ({ pokemonList }) => {
  const [currentCoordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [locationName, setLocationName] = useState("");
  const [pokemon, setPokemon] = useState(''); // State for debounced text

  const [locationList, setLocationList] = useState([]);

  const [swarm, setSwarm] = useState(false);
  const [radar, setRadar] = useState(false);
  const [tod, setTOD] = useState("1");
  const [incense, setIncense] = useState(false);
  const [surfIncense, setSurfIncense] = useState(false);
  const [rod, setRod] = useState("1") // This sets the rod to 0 aka the Old Rod. Good Rod is 1 and Super Rod is 2

  const [encounterList, setEncounterList] = useState({GroundEnc: [], SurfEnc: [], RodEnc: []});
  const [trainerList, setTrainerList] = useState([]);
  const [fieldItemsList, setFieldItems] = useState([]);
  const [hiddenItemsList, setHiddenItems] = useState([]);
  const [shopItemsList, setShopItems] = useState([]);
  const [scriptItemsList, setScriptItems] = useState([]);
  const [fixedShopList, setFixedShops] = useState([]);
  const [heartScaleShopList, setHeartScaleShop] = useState([]);

  useEffect(() => {
    setEncounterList(setAllEncounters(locationName))
  }, [swarm, radar, tod, incense, surfIncense, rod])

  useEffect(() => {
    setLocationList(getRoutesFromPokemonId(getPokemonIdFromName(pokemon)))
  }, [pokemon])

  useEffect(() => {
    setTrainerList(getTrainersFromZoneName(locationName) || []) ;
  }, [locationName])

  const handleTODChange = (event, nextView) => {
    setTOD(event.target.value);
  };

  const handleRodChange = (event, nextView) => {
    setRod(event.target.value);
  };

  const handleChange = (callback) => (event) => {
    callback(event.target.checked);
  };

  const handlePokemonChange = (text) => {
    setPokemon(text);
  };

  const myCanvas = useRef();
  const { colorMode, setColorMode } = useColorMode();

  const setAllEncounters = (location_name) => {
    const areaEncounters = getAreaEncounters(location_name)
    if (!areaEncounters) {
      return {GroundEnc: [], SurfEnc: [], RodEnc: []}
    }
    const allGroundEnc = getAllGroundEncounters(areaEncounters);
    const swarmEnc = getSwarmEncounter(areaEncounters);
    const radarEnc = getRadarEncounter(areaEncounters);
    const todEnc = getTODEncounters(areaEncounters);
    const incenseEnc = getAllIncenseEncounters(areaEncounters);
    const allSurfEnc = getAllSurfingEncounters(areaEncounters);
    const surfIncenseEnc = getSurfingIncenseEncounter(areaEncounters);

    // This section is for the grass encounters only
    if (Object.keys(allGroundEnc).length !== 0) {
      if (swarm) {
        allGroundEnc[0] = swarmEnc[0]
      }
      if (radar) {
        allGroundEnc[9] = allGroundEnc[1]
        allGroundEnc[9].encounterRate = "4%"
        allGroundEnc[1] = radarEnc[0]
      }
      if (tod === "2") {
        allGroundEnc[2] = todEnc[0]
        allGroundEnc[3] = todEnc[1]
      } else if (tod === "3") {
        allGroundEnc[2] = todEnc[2]
        allGroundEnc[3] = todEnc[3]
      }
      if (incense) {
        allGroundEnc[10] = allGroundEnc[4]
        allGroundEnc[11] = allGroundEnc[5]
        allGroundEnc[10].encounterRate = "1%"
        allGroundEnc[11].encounterRate = "1%"
        allGroundEnc[4] = incenseEnc[0]
        allGroundEnc[5] = incenseEnc[1]
      }
    }
    
    // This section is for the surfing encounters only
    if(Object.keys(allSurfEnc).length !== 0) {
      if (surfIncense) {
        allSurfEnc[1] = surfIncenseEnc[0]
      }
    }

    // This section is for the Rod Encounters only
    const rodEnc = getAllRodEncounters(areaEncounters, rod)

    return{GroundEnc: allGroundEnc, SurfEnc: allSurfEnc, RodEnc: rodEnc}
  }

  useEffect(() => {
    const context = myCanvas.current.getContext('2d');
    const image = new Image();
    image.src = require('@site/static/img/sinnoh-updated.png').default;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      drawOverlay(context);
    };

    const handleClick = (event) => {
      const rect = myCanvas.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setCoordinates({ x,y });
      const location = getSelectedLocation( x,y )
      const location_name = location.name ? location.name : ""
      setLocationName(location_name);
      setEncounterList(setAllEncounters(location_name));
      setTrainerList(getTrainersFromZoneName(location_name));

      const zoneId = getZoneIdFromZoneName(location_name);
      setFieldItems(getFieldItemsFromZoneID(zoneId));
      setHiddenItems(getHiddenItemsFromZoneID(zoneId));
      setShopItems(getRegularShopItems(zoneId));
      setScriptItems(getScriptItems(zoneId));
      setFixedShops(getFixedShops(zoneId));
      setHeartScaleShop(getHeartScaleShopItems(zoneId));
    };

    myCanvas.current.addEventListener('click', handleClick);
    myCanvas.current.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component is unmounted
    return () => {
      myCanvas.current.removeEventListener('click', handleClick);
      myCanvas.current.addEventListener('mousemove', handleMouseMove);
    };
  }, [swarm, radar, tod, incense, surfIncense, rod, pokemon])

  function handleMouseMove(event) {
    const rect = myCanvas.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCursorPosition({ x, y });
  }

  function drawOverlay(ctx) {
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)'; // Red with 50% opacity

    coordinates.forEach(coord => {
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);
      ctx.lineTo(coord.x + coord.w, coord.y);
      ctx.lineTo(coord.x + coord.w, coord.y + coord.h);
      ctx.lineTo(coord.x, coord.y + coord.h);
      ctx.closePath();
      ctx.stroke();
    });
  }

  return (
    <div className="content">
      <div className="canvasCol">
        <canvas
          ref={myCanvas}
          height={`${canvasDimensions.height}px`}
          width={`${canvasDimensions.width}px`}
        >
          Your browser does not support the canvas element.
        </canvas>
        <SearchBar
          canvasDimensions={canvasDimensions}
          pokemonList={pokemonList}
          debouncedText={pokemon}
          handleDebouncedTextChange={handlePokemonChange}
          locationName={locationName}
          setLocationName={setLocationName}
        />
      </div>
      {/* <div>
        {`Current Coords: ${cursorPosition.x}, ${cursorPosition.y}`}
        <br />
        {`Last Clicked Coords: ${currentCoordinates.x}, ${currentCoordinates.y}`}
      </div>
      <div className="buttonControl">
        <div>
          {TODButtons(tod, handleTODChange)}
        </div>
        <div>
          {RodButtons(rod, handleRodChange)}
        </div>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={swarm}
                onChange={handleChange(setSwarm)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Swarm"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={radar}
                onChange={handleChange(setRadar)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
              }
            label="Radar"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={incense}
                onChange={handleChange(setIncense)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Incense"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={surfIncense}
                onChange={handleChange(setSurfIncense)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Surf Incense"
          />
        </FormGroup>
      </div>
      <div>
        Grass Encounter List:
        {encounterList.GroundEnc && encounterList.GroundEnc.map((enc, index) => (
          <div key={index}>
            {`${enc.pokemonName}, ${enc.encounterType}, ${enc.encounterRate}`}
          </div>
        ))}
      </div>
      <div>
        Surfing Encounter List:
        {encounterList.SurfEnc && encounterList.SurfEnc.map((enc, index) => (
          <div key={index}>
            {`${enc.pokemonName}, ${enc.encounterType}, ${enc.encounterRate}`}
          </div>
        ))}
      </div>
      <div>
        Rod Encounter List:
        {encounterList.RodEnc && encounterList.RodEnc.map((enc, index) => (
          <div key={index}>
            {`${enc.pokemonName}, ${enc.encounterType}, ${enc.encounterRate}`}
          </div>
        ))}
      </div> */}
      <PokemonAccordion
        title={"Trainers"}
        id={"trainers"}
        sx={{
          maxWidth: "1100px",
          minWidth: "400px",
          width: "fit-content"
        }}
      >
        <Trainers trainerList={trainerList} pokemonList={pokemonList} />
      </PokemonAccordion>
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
    </div>
  );
}
