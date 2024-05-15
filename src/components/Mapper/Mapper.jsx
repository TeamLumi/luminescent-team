import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import { useColorMode } from '@docusaurus/theme-common';

import { coordinates, getLocationCoordsFromName } from './coordinates';
import Encounters from './Encounters';
import { SearchBar } from './SearchBar';
import { RodButtons, TimeOfDayButtons } from './Buttons';
import SettingsModal from './SettingsModal';
import './style.css';

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
  getTimeOfDayEncounters,
  getAllRodEncounters,
  getAllSurfingEncounters,
  getRadarEncounter,
  getSurfingIncenseEncounter,
  getSwarmEncounter,
  getAllIncenseEncounters,
  getRoutesFromPokemonId
} from '../../utils/dex/encounters';
  
function getSelectedLocation(x, y) {
  const isXWithinBounds = (coords, x) => {
    const isWithinX = coords.x <= x && x <= coords.x + coords.w;
    return isWithinX;
  };

  const isYWithinBounds = (coords, y) => {
    const isWithinY = coords.y <= y && y <= coords.y + coords.h;
    return isWithinY;
  };

  let selectedLocation = null;

  for (let i = 0; i < coordinates.length; i++) {
    const coords = coordinates[i];
    const xWithinBounds = isXWithinBounds(coords, x);
    const yWithinBounds = isYWithinBounds(coords, y);

    if (xWithinBounds && yWithinBounds) {
      selectedLocation = coords;
      break; // Stop loop once a location is found
    }
  }

  return selectedLocation;
}

const canvasDimensions = {
  width: 1244,
  height: 720
}

function useDebouncedValue(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const Mapper = ({ pokemonList }) => {
  const [rect, setRect] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const locationName = useRef("");
  const [encOptions, setEncOptions] = useState({
    swarm: false,
    radar: false,
    timeOfDay: "1",
    incense: false,
    rod: "1",
  });

  const [pokemonName, setPokemonName] = useState('');
  const completedPokemonName = useDebouncedValue(pokemonName, 1500);

  let originalImageData = {
    highlight: {},
    select: {},
    enc: {},
  };
  let previousRectangle = {
    highlight: null,
    select: null,
    enc: null,
  };

  let colorSettings = {
    hov: { r: 247, g: 148, b: 72, a: 0.7 },
    sel: { r: 72, g: 113, b: 247, a: 0.8 },
    enc: { r: 247, g: 0, b: 0, a: 0.7 },
  }

  const [locationList, setLocationList] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [colors, setColors] = useState({
    hov: { r: 247, g: 148, b: 72, a: 0.7 },
    sel: { r: 72, g: 113, b: 247, a: 0.8 },
    enc: { r: 247, g: 0, b: 0, a: 0.7 },
  });

  const [encounterList, setEncounterList] = useState({GroundEnc: [], SurfEnc: [], RodEnc: []});
  const [trainerList, setTrainerList] = useState([]);
  const [fieldItemsList, setFieldItems] = useState([]);
  const [hiddenItemsList, setHiddenItems] = useState([]);
  const [shopItemsList, setShopItems] = useState([]);
  const [scriptItemsList, setScriptItems] = useState([]);
  const [fixedShopList, setFixedShops] = useState([]);
  const [heartScaleShopList, setHeartScaleShop] = useState([]);

  const canvasRef = useRef(null);
  const CLEAR_MODE = {
    HIGHLIGHT: "highlight",
    SELECT: "select",
    ENCOUNTER: "enc",
  }
  //Component onMount
  useEffect(() => {
    console.log('Mounting...')
    const context = canvasRef.current.getContext('2d');
    const image = new Image();
    image.src = require('@site/static/img/sinnoh-updated.png').default;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      drawOverlay(context);
    };
    console.log('Finish Mounting...', rect, canvasRef)

  }, []) // Empty dependency array means this effect runs once after the initial render

  const updateLocationDataFromDropdown = (event) => {
    // This is using the custom event that was created by the SearchBar
    // After adding a listener, this is used to directly interact with the canvas
    // This CANNOT pull the state from a useState or other async func.
    // You must add a customEvent alongside where a state is updated
    const selectedName = event.detail;
    if (!selectedName) {
      return;
    }
    const location = getLocationCoordsFromName(selectedName);
    const locationCheck = { x: location.x, y: location.y, w: location.w, h: location.h}

    for (let key in previousRectangle) {
      if (previousRectangle[key] === locationCheck && previousRectangle[key] !== null) {
        // This is to delete any highlights that are present in the current area
        // specifically enc highlights when that comes up.
        clearRect(key);
      }
    }
    if(previousRectangle.select !== null) {
      clearRect(CLEAR_MODE.SELECT);
    }
    drawRect(location.x, location.y, location.w, location.h, CLEAR_MODE.SELECT);
    previousRectangle.select = { x: location.x, y: location.y, w: location.w, h: location.h };
    locationName.current = location.name;

    setEncounterList(setAllEncounters(location.name));
    setTrainerList(getTrainersFromZoneName(location.name));

    const zoneId = getZoneIdFromZoneName(location.name);
    setFieldItems(getFieldItemsFromZoneID(zoneId));
    setHiddenItems(getHiddenItemsFromZoneID(zoneId));
    setShopItems(getRegularShopItems(zoneId));
    setScriptItems(getScriptItems(zoneId));
    setFixedShops(getFixedShops(zoneId));
    setHeartScaleShop(getHeartScaleShopItems(zoneId));
  };

  const updatePokemonLocationsFromDropdown = (event) => {
    // This is using the custom event that was created by the SearchBar
    // After adding a listener, this is used to directly interact with the canvas
    // This CANNOT pull the state from a useState or other async func.
    // You must add a customEvent alongside where a state is updated
    const selectedName = event.detail;
    if (!selectedName) {
      return;
    }
    const locations = getRoutesFromPokemonId(selectedName.id);
    const locationChecks = locations.map((locationName) => {
      const locationCoords = getLocationCoordsFromName(locationName);
      if (locationCoords) {
        const locationCheck = { x: locationCoords.x, y: locationCoords.y, w: locationCoords.w, h: locationCoords.h};
        return locationCheck
      }
      return null;
    });
    const prevLocations = previousRectangle.enc // There are multiple rectangles that are highlighted
    const prevHighlight = previousRectangle.highlight;
    if (prevLocations) {
      for (const locationIndex in prevLocations) {
        const {x, y, width, height} = prevLocations[locationIndex];
        if (
          prevHighlight.x === x &&
          prevHighlight.y === y &&
          prevHighlight.width === width &&
          prevHighlight.height === height
        ) {
          clearRect(CLEAR_MODE.HIGHLIGHT);
          setHoveredZone(null);
          previousRectangle.highlight = null;
        }
        clearRect(CLEAR_MODE.ENCOUNTER, x, y, width, height);
      }
      previousRectangle.enc = null;
    }

    for (const locationIndex in locationChecks) {
      const location = locationChecks[locationIndex];
      if (location) {
        if (location.name !== locationName.current && location.name !== hoveredZone) {
          drawRect(location.x, location.y, location.w, location.h, CLEAR_MODE.ENCOUNTER);
        } else if (location.name === hoveredZone) {
          drawRect(location.x, location.y, location.w, location.h);
        } else if (location.name === locationName.current) {
          drawRect(location.x, location.y, location.w, location.h, CLEAR_MODE.SELECT);
        }
      }
    }
  };

  const updateColorSettings = (event) => {
    const newColorSettings = event.detail;
    colorSettings = newColorSettings;
    if (previousRectangle.select !== null) {
      const location = previousRectangle.select;
      drawRect(location.x, location.y, location.width, location.height, CLEAR_MODE.SELECT);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log('Canvas effect has fired')
    if (canvas) {
      // Get the bounding rectangle of the canvas
      const r = canvas.getBoundingClientRect();
      setRect(r);

      // The passLocationNameToParent event was required so that the child could update the DOM
      // This listener is created in the SearchBar.jsx and is listened to here
      // This is how you would allow a useState from react to partially interact with the canvas
      // Partially because useState is async and this is direct dom manipulation.
      const eventListener = (locationNameEvent) => updateLocationDataFromDropdown(locationNameEvent);
      const pokemonLocationsListener = (pokemonName) => updatePokemonLocationsFromDropdown(pokemonName);
      const colorListener = (changeColorSettings) => updateColorSettings(changeColorSettings);

      canvas.addEventListener('click', handleClick);
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      canvas.addEventListener('passLocationNameToParent', eventListener);
      canvas.addEventListener('passPokemonNameLocation', pokemonLocationsListener);
      canvas.addEventListener('changeColorSettings', colorListener);

      // Clean up the event listener when the component is unmounted
      return () => {
        canvas.removeEventListener('click', handleClick);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('passLocationNameToParent', eventListener);
        canvas.removeEventListener('passPokemonNameLocation', pokemonLocationsListener);
        canvas.removeEventListener('changeColorSettings', colorListener);
      };
    }
  }, [canvasRef.current]); // Add canvasRef.current to the dependency array

  useEffect(() => {
    if(locationName !== null) {
      setEncounterList(setAllEncounters(locationName.current))
    }
  }, [encOptions])

  useEffect(() => {
    setLocationList(getRoutesFromPokemonId(getPokemonIdFromName(completedPokemonName)))
  }, [completedPokemonName])

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

  const handleClick = (event) => {
    if(rect === null) {
      console.log('Bad Rect:', rect, canvasRef.current)
      return setRect(canvasRef.current.getBoundingClientRect());
    }

    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    const x = event.clientX - rect.left + scrollLeft;
    const y = event.clientY - rect.top + scrollTop;
 
    const location = getSelectedLocation( x,y )
    if(location === null || location.length === 0) return;
    
    if (previousRectangle.highlight !== null) {
      // Make sure to clear any lower hierarchy rects before setting higher ones
      // If this is not done, the lower mode's highlight will be set as the previous state for the higher mode
      // Here's how the bug would come up:
      // 1. Hover over an area.
      // 2. Select that area.
      // 3. Hover over a different area.
      // 4. Select that different area.
      // 5. From this you'll see how the first area selected will have the hover color.
      // This will also affect any future areas in the same way.
      // We want the old selected area to not have the hover's color.
      // See clearRect for hierarchy info.
      clearRect(CLEAR_MODE.HIGHLIGHT);
    }
    if(previousRectangle.select !== null) {
      clearRect(CLEAR_MODE.SELECT);
    }
    drawRect(location.x, location.y, location.w, location.h, CLEAR_MODE.SELECT); // Change the fill color
    previousRectangle.select = { x: location.x, y: location.y, w: location.w, h: location.h };

    locationName.current = location.name;
    setSelectedZone(location.name);
    setEncounterList(setAllEncounters(location.name));
    setTrainerList(getTrainersFromZoneName(location.name));

    const zoneId = getZoneIdFromZoneName(location.name);
    setFieldItems(getFieldItemsFromZoneID(zoneId));
    setHiddenItems(getHiddenItemsFromZoneID(zoneId));
    setShopItems(getRegularShopItems(zoneId));
    setScriptItems(getScriptItems(zoneId));
    setFixedShops(getFixedShops(zoneId));
    setHeartScaleShop(getHeartScaleShopItems(zoneId));
  };

  const { colorMode, setColorMode } = useColorMode();

  function createEncounterObject(ground, surf, rod) {
    return {GroundEnc: ground, SurfEnc: surf, RodEnc: rod};
  }

  const setAllEncounters = (location_name) => {
    const areaEncounters = getAreaEncounters(location_name);

    if (!areaEncounters) {
      return createEncounterObject([], [], []);
    }

    const allGroundEnc = getAllGroundEncounters(areaEncounters);
    const swarmEnc = getSwarmEncounter(areaEncounters);
    const radarEnc = getRadarEncounter(areaEncounters);
    const timeOfDayEnc = getTimeOfDayEncounters(areaEncounters);
    const incenseEnc = getAllIncenseEncounters(areaEncounters);
    const allSurfEnc = getAllSurfingEncounters(areaEncounters);
    const surfIncenseEnc = getSurfingIncenseEncounter(areaEncounters);

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
      if (encOptions.incense && incenseEnc.length > 0) {
        allGroundEnc[10] = allGroundEnc[4]
        allGroundEnc[11] = allGroundEnc[5]
        allGroundEnc[10].encounterRate = "1%"
        allGroundEnc[11].encounterRate = "1%"
        allGroundEnc[4] = incenseEnc[0]
        allGroundEnc[5] = incenseEnc[1]
      }
    }

    // This section is for the surfing encounters only
    if(allSurfEnc.length > 0) {
      if (encOptions.incense) {
        allSurfEnc[1] = surfIncenseEnc[0]
      }
    }

    // This section is for the Rod Encounters only
    const rodEnc = getAllRodEncounters(areaEncounters, encOptions.rod)

    return{GroundEnc: allGroundEnc, SurfEnc: allSurfEnc, RodEnc: rodEnc}
  }

  function drawOverlay(ctx) {
    coordinates.forEach(coord => {
      // Draw zone outlines
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);
      ctx.lineTo(coord.x + coord.w, coord.y);
      ctx.lineTo(coord.x + coord.w, coord.y + coord.h);
      ctx.lineTo(coord.x, coord.y + coord.h);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  };

  function getHoverFillStyle() {
    return `rgba(${colorSettings.hov.r}, ${colorSettings.hov.g}, ${colorSettings.hov.b}, ${colorSettings.hov.a})`;
  }

  function getSelFillStyle() {
    return `rgba(${colorSettings.sel.r}, ${colorSettings.sel.g}, ${colorSettings.sel.b}, ${colorSettings.sel.a})`;
  }

  function getEncFillStyle() {
    return `rgba(${colorSettings.enc.r}, ${colorSettings.enc.g}, ${colorSettings.enc.b}, ${colorSettings.enc.a})`;
  }

  function drawRect(x, y, width, height, mode=CLEAR_MODE.HIGHLIGHT) {
    //If there was no previous rectangle, don't clear it
    if(previousRectangle[mode] !== null && mode !== CLEAR_MODE.ENCOUNTER) {
      clearRect(mode);
    }

    const modeMap = {
      highlight: getHoverFillStyle(),
      select: getSelFillStyle(),
      enc: getEncFillStyle()
    };

    const ctx = canvasRef.current.getContext('2d');

    //Store the important data
    if (mode === CLEAR_MODE.ENCOUNTER) {
      if (previousRectangle[mode] !== null) {
        previousRectangle[mode] = [...previousRectangle[mode], {x, y, width, height}];
        originalImageData[mode] = [...originalImageData[mode], ctx.getImageData(x, y, width, height)];
      } else {
        previousRectangle[mode] = [{x, y, width, height}];
        originalImageData[mode] = [ctx.getImageData(x, y, width, height)];
      }
    } else {
      previousRectangle[mode] = {x, y, width, height};
      originalImageData[mode] = ctx.getImageData(x, y, width, height);
    }

    //Draw the rectangle
    ctx.fillStyle = modeMap[mode];
    ctx.fillRect(x, y, width, height);
  }

  function clearRect(mode=CLEAR_MODE.HIGHLIGHT, x, y, width, height) { // coords defined for Encounters
    //Clears the old location and restores the image data at that position.
    const ctx = canvasRef.current.getContext('2d');
    if (mode !== CLEAR_MODE.ENCOUNTER) {
      const {x, y, width, height} = previousRectangle[mode];
      ctx.clearRect(x, y, width, height);
      if (mode === CLEAR_MODE.SELECT) {
        // This adds a hierarchy of which highlights override others
        // In order to do this, it will first clear the lower mode's rect
        // Then it will set that lower mode's rect to null
        // This way it won't clear the higher mode's rect when the lower mode is called again
        // The hierarchy will be 1: Select, 2: Highlight, 3: Encounter.
        
        if (previousRectangle.highlight !== null) {
          clearRect(CLEAR_MODE.HIGHLIGHT);
          previousRectangle.highlight = null;
        }
        // if (previousRectangle.enc !== null) {
        //   const foundRectangleIndex = previousRectangle.enc.findIndex((rect) =>
        //     rect.x === x && rect.y === y && rect.width === width && rect.height === height
        //   );

        //   if (foundRectangleIndex >= 0) {
        //     const { prevX, prevY, prevW, prevH } = previousRectangle.enc[foundRectangleIndex]
        //     clearRect(CLEAR_MODE.ENCOUNTER, prevX, prevY, prevW, prevH)
        //     previousRectangle.enc.splice(foundRectangleIndex, 1);
        //     drawRect(prevX, prevY, prevW, prevH, CLEAR_MODE.SELECT);
        //   }
        // }
      }
      ctx.putImageData(originalImageData[mode], x, y);
    } else {
      const location = getSelectedLocation(x, y);
      if (!location) {
        return;
      }
      const { name } = location;
      const prevRectangleDataIndex = previousRectangle.enc.findIndex((rect) =>
        rect.x === x && rect.y === y && rect.width === width && rect.height === height
      );
      const ogImageData = originalImageData.enc[prevRectangleDataIndex];
      if (name !== locationName.current) {
        ctx.clearRect(x, y, width, height);
        ctx.putImageData(ogImageData, x, y);
      } else {
        ctx.clearRect(x, y, width, height);
        ctx.putImageData(originalImageData.select, x, y);
        drawRect(x, y, width, height, CLEAR_MODE.SELECT);
      }
    }
  }

  function handleMouseMove(event) {
    if(rect === null) {//Shouldn't happen but let's make sure
      return setRect(canvasRef.current.getBoundingClientRect());
    }

    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    const mouseX = event.clientX - rect.left + scrollLeft;
    const mouseY = event.clientY - rect.top + scrollTop;

    const location = getSelectedLocation(mouseX, mouseY);
    if (location && location.name !== locationName.current) {
      setHoveredZone(location.name);
      drawRect(location.x, location.y, location.w, location.h); // Change the fill color
    } else if (location && location.name === locationName.current) {
      // This prevents the selected location from being highlighted by the hover color
      drawRect(location.x, location.y, location.w, location.h, CLEAR_MODE.SELECT);
    } else {
      setHoveredZone(null);
      if (previousRectangle.highlight !== null) {
        clearRect(CLEAR_MODE.HIGHLIGHT);
      }
      if (previousRectangle.enc !== null) {
        clearRect(CLEAR_MODE.ENCOUNTER);
      }
    }
  }

  const handleMouseLeave = () => {
    // Clear the hovered zone when mouse leaves
    setHoveredZone(null);
    if (previousRectangle.highlight !== null) {
      clearRect(CLEAR_MODE.HIGHLIGHT);
    }
    if (previousRectangle.enc !== null) {
      clearRect(CLEAR_MODE.ENCOUNTER);
    }
  };

  return (
    <div className="content">
      <div
        className="canvasCol"
        style={{gridTemplate: `${canvasDimensions.height}px / ${canvasDimensions.width}px auto`}}
      >
        <canvas
          ref={canvasRef}
          height={`${canvasDimensions.height}px`}
          width={`${canvasDimensions.width}px`}
        >
          Your browser does not support the canvas element.
        </canvas>
        <Encounters
          encOptions={encOptions}
          handleOptionChange={handleOptionChange}
          encounterList={encounterList}
          pokemon={pokemonName}
        />
      </div>
      <SearchBar
        canvasDimensions={canvasDimensions}
        pokemonList={pokemonList}
        debouncedText={pokemonName}
        handleDebouncedTextChange={handlePokemonNameChange}
        locationName={selectedZone}
        setLocationName={setSelectedZone}
        canvasRef={canvasRef.current}
      />
      <IconButton color="primary" aria-label="settings" onClick={handleShowSettings}>
        <SettingsIcon />
      </IconButton>
      <div>
        Trainers: 
        {trainerList && trainerList.map((trainer, index) => (
          <div key={index}>
            {`${trainer.team_name}, ${trainer.trainerType}, ${trainer.route}`}
          </div>
        ))}
      </div>
      <div>
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
      </div>
      <SettingsModal
        colors={colors}
        setColors={setColors}
        showModal={showSettings}
        onHide={handleCloseSettings}
      />
    </div>
  );
}
