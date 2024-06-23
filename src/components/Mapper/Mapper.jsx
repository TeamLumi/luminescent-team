import React, { useEffect, useRef, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import useIsBrowser from '@docusaurus/useIsBrowser';

import {
  MapperCoordinates,
  getLocationCoordsFromName,
  getLocationCoordsFromZoneId,
  getSelectedLocation,
  isLocationExactlyEqual
} from './coordinates';
import { SearchBar } from './SearchBar';
import { RodButtons, TimeOfDayButtons } from './Encounters/Buttons';
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
  getMapperRoutesFromPokemonId
} from '../../utils/dex/encounters';
import TrainersModal from './Trainers/TrainersModal';

const canvasDimensions = {
  width: 1280,
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
  const isBrowser = useIsBrowser();
  if (!isBrowser) {
    return null;
  }
  const [rect, setRect] = useState(null);
  const [hoveredZone, setHoveredZone] = useState(null);
  const [selectedZone, setSelectedZone] = useState(null);
  const [selectedZoneId, setSelectedZoneId] = useState(null);
  const locationId = useRef("");
  const [encOptions, setEncOptions] = useState({
    swarm: false,
    radar: false,
    timeOfDay: "1",
    incense: false,
    rod: "1",
  });

  const [selectedPokemon, setSelectedPokemon] = useState(pokemonList[0] || '');
  const [pokemonName, setPokemonName] = useState('');
  const completedPokemonName = useDebouncedValue(pokemonName, 1500);

  const selectedRef = useRef(selectedZone);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    if (selectedRef.current !== selectedZone) {
      setSelectedTrainer(null);
      selectedRef.current = selectedZone;
    }
  }, [selectedZone]);

  const [showTrainerModal, setShowTrainerModal] = useState(false);
  const openTrainerModal = () => {
    setShowTrainerModal(true);
  };
  const closeTrainerModal = () => {
    setShowTrainerModal(false);
  };

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
    hov: { r: 247, g: 100, b: 200, a: 0.7 },
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
    const context = canvasRef.current.getContext('2d', {willReadFrequently: true});
    const image = new Image();
    image.src = require('@site/static/img/new_small_mapper.png').default;
    image.onload = () => {
      context.drawImage(image, 0, 0);
      drawOverlay(context);
    };

  }, []) // Empty dependency array means this effect runs once after the initial render

  function drawOverlay(ctx) {
    MapperCoordinates.forEach(coord => {
      // Draw zone outlines
      ctx.beginPath();
      ctx.moveTo(coord.x, coord.y);
      ctx.lineTo(coord.x + coord.width, coord.y);
      ctx.lineTo(coord.x + coord.width, coord.y + coord.height);
      ctx.lineTo(coord.x, coord.y + coord.height);
      ctx.closePath();
      ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  };

  /** Listener Events for the Canvas updates */
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
    const locationCheck = { x: location.x, y: location.y, width: location.width, height: location.height}

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
    drawRect(location, CLEAR_MODE.SELECT);
    previousRectangle.select = { x: location.x, y: location.y, width: location.width, height: location.height };
    locationId.current = location.zoneId;

    setEncounterList(setAllEncounters(location.zoneId));
    setTrainerList(getTrainersFromZoneId(location.zoneId));

    setFieldItems(getFieldItemsFromZoneID(location.zoneId));
    setHiddenItems(getHiddenItemsFromZoneID(location.zoneId));
    setShopItems(getRegularShopItems(location.zoneId));
    setScriptItems(getScriptItems(location.zoneId));
    setFixedShops(getFixedShops(location.zoneId));
    setHeartScaleShop(getHeartScaleShopItems(location.zoneId));
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
    const locations = getMapperRoutesFromPokemonId(selectedName.id);
    const locationChecks = locations.map(([locationName, zoneId]) => {
      const zoneLocationCoords = getLocationCoordsFromZoneId(zoneId);
      const locationCoords = getLocationCoordsFromName(locationName);
      if (zoneLocationCoords) {
        const locationCheck = {
          name: locationName,
          x: zoneLocationCoords.x,
          y: zoneLocationCoords.y,
          width: zoneLocationCoords.width,
          height: zoneLocationCoords.height,
          zoneId: zoneLocationCoords.zoneId,
          zone: "",
        };
        return locationCheck
      } else if (locationCoords) {
        const locationCheck = {
          name: locationName,
          x: locationCoords.x,
          y: locationCoords.y,
          width: locationCoords.width,
          height: locationCoords.height,
          zoneId: location.zoneId,
          location: "",
        };
        return locationCheck
      }
      return null;
    });
    const prevLocations = previousRectangle.enc // There are multiple rectangles that are highlighted
    const prevSelected = previousRectangle.select;
    if (prevLocations) {
      for (const locationIndex in prevLocations) {
        if (
          prevSelected &&
          !isLocationExactlyEqual(
            prevLocations[locationIndex],
            prevSelected
          )
        ) {
          clearRect(CLEAR_MODE.ENCOUNTER, prevLocations[locationIndex]);
        } else {
          clearRect(CLEAR_MODE.ENCOUNTER, prevLocations[locationIndex]);
        }
      }
      previousRectangle.enc = null;
    }

    for (const locationIndex in locationChecks) {
      const location = locationChecks[locationIndex];
      if (location) {
        if (location.zoneId !== locationId.current && location.name !== hoveredZone) {
          drawRect(location, CLEAR_MODE.ENCOUNTER);
        } else if (location.name === hoveredZone) {
          drawRect(location);
        } else if (location.zoneId === locationId.current) {
          drawRect(location, CLEAR_MODE.SELECT);
        }
      }
    }
  };

  const updateColorSettings = (event) => {
    const newColorSettings = event.detail;
    colorSettings = newColorSettings;
    const prevLocations = previousRectangle.enc // There are multiple rectangles that are highlighted
    const prevHighlight = previousRectangle.highlight;
    const prevSelected = previousRectangle.select;
    if (prevLocations) {
      for (const locationIndex in prevLocations) {
        if (
          prevHighlight &&
          isLocationExactlyEqual(
            prevLocations[locationIndex],
            prevHighlight
          )
        ) {
          clearRect(CLEAR_MODE.HIGHLIGHT);
          setHoveredZone(null);
          previousRectangle.highlight = null;
        }
        if (
          prevSelected &&
          !isLocationExactlyEqual(
            prevLocations[locationIndex],
            prevSelected
          )
        ) {
          clearRect(CLEAR_MODE.ENCOUNTER, prevLocations[locationIndex]);
        } else {
          clearRect(CLEAR_MODE.ENCOUNTER, prevLocations[locationIndex]);
        }
      }
      previousRectangle.enc = null;
    }
    if (previousRectangle.select !== null) {
      const location = previousRectangle.select;
      drawRect(location, CLEAR_MODE.SELECT);
    }
    setPokemonName("Bulbasaur");
    setSelectedPokemon(pokemonList[0])
  }

  const handleClick = (event) => {
    if(rect === null) {
      console.error('Bad Rect:', rect, canvasRef.current)
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
    if (previousRectangle.enc !== null) {
      const selectedEnc = previousRectangle.enc.find(
        (encLocation) => {
          return (isLocationExactlyEqual(location, encLocation));
        }
      )
      if (selectedEnc) {
        clearRect(CLEAR_MODE.ENCOUNTER, selectedEnc);
      }
    }
    if(previousRectangle.select !== null) {
      clearRect(CLEAR_MODE.SELECT);
    }
    drawRect(location, CLEAR_MODE.SELECT); // Change the fill color
    previousRectangle.select = { x: location.x, y: location.y, width: location.width, height: location.height };

    locationId.current = location.zoneId;
    setSelectedZone(location.name);
    setSelectedZoneId(location.zoneId)
    setEncounterList(setAllEncounters(location.zoneId));
    setTrainerList(getTrainersFromZoneId(location.zoneId));

    setFieldItems(getFieldItemsFromZoneID(location.zoneId));
    setHiddenItems(getHiddenItemsFromZoneID(location.zoneId));
    setShopItems(getRegularShopItems(location.zoneId));
    setScriptItems(getScriptItems(location.zoneId));
    setFixedShops(getFixedShops(location.zoneId));
    setHeartScaleShop(getHeartScaleShopItems(location.zoneId));
  };

  function handleMouseMove(event) {
    if(rect === null) {//Shouldn't happen but let's make sure
      return setRect(canvasRef.current.getBoundingClientRect());
    }

    // This system allows mobile users to make use of the mapper too
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    let scrollTop = window.scrollY || document.documentElement.scrollTop;

    const mouseX = event.clientX - rect.left + scrollLeft;
    const mouseY = event.clientY - rect.top + scrollTop;

    const location = getSelectedLocation(mouseX, mouseY);
    if (location && location.zoneId !== locationId.current) {
      setHoveredZone(location.name);
      drawRect(location); // Change the fill color
    } else if (location && location.zoneId === locationId.current) {
      // This prevents the selected location from being highlighted by the hover color
      drawRect(location, CLEAR_MODE.SELECT);
    } else {
      if (location && previousRectangle.enc !== null) {
        const hoveredEnc = previousRectangle.enc.find(
          (encLocation) => {
            return (isLocationExactlyEqual(location, encLocation));
          }
        )
        if (hoveredEnc) {
          clearRect(CLEAR_MODE.ENCOUNTER, hoveredEnc);
        }
      }
      setHoveredZone(null);
      if (previousRectangle.highlight !== null) {
        clearRect(CLEAR_MODE.HIGHLIGHT);
        previousRectangle.highlight = null;
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

  useEffect(() => {
    const canvas = canvasRef.current;
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
    if(locationId !== null) {
      setEncounterList(setAllEncounters(locationId.current))
    }
  }, [encOptions, selectedZoneId])

  useEffect(() => {
    setLocationList(getMapperRoutesFromPokemonId(getPokemonIdFromName(completedPokemonName)))
  }, [completedPokemonName])

  useEffect(() => {
    setTrainerList(getTrainersFromZoneId(selectedZoneId) || []) ;
  }, [selectedZoneId])

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
      return {GroundEnc: [], SurfEnc: [], RodEnc: []};
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

    return{GroundEnc: allGroundEnc, SurfEnc: allSurfEnc, RodEnc: rodEnc}
  }

  function getHoverFillStyle() {
    const { r, g, b, a } = colorSettings.hov;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function getSelFillStyle() {
    const { r, g, b, a } = colorSettings.sel;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function getEncFillStyle() {
    const { r, g, b, a } = colorSettings.enc;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function drawRect(location, mode=CLEAR_MODE.HIGHLIGHT) {
    //If there was no previous rectangle, don't clear it
    if(previousRectangle[mode] !== null && mode !== CLEAR_MODE.ENCOUNTER) {
      clearRect(mode);
    }
    const { x, y, width, height } = location;

    const modeMap = {
      highlight: getHoverFillStyle(),
      select: getSelFillStyle(),
      enc: getEncFillStyle()
    };

    const ctx = canvasRef.current.getContext('2d', {willReadFrequently: true});

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

  function clearRect(mode=CLEAR_MODE.HIGHLIGHT, encLocation) { // coords defined for Encounters
    //Clears the old location and restores the image data at that position.
    const ctx = canvasRef.current.getContext('2d', {willReadFrequently: true});
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
      }
      ctx.putImageData(originalImageData[mode], x, y);
    } else {
      const { x, y, width, height } = encLocation;
      const location = getSelectedLocation(x, y);
      if (!location) {
        throw new Error("Try again with your location bozo :P");
      }
      const { zoneId } = location;
      const prevRectangleDataIndex = previousRectangle.enc.findIndex((rect) =>
        isLocationExactlyEqual(rect, encLocation)
      );
      const ogImageData = originalImageData.enc[prevRectangleDataIndex];
      if (zoneId !== locationId.current) {
        ctx.clearRect(x, y, width, height);
        ctx.putImageData(ogImageData, x, y);
      } else {
        ctx.clearRect(x, y, width, height);
        drawRect(encLocation, CLEAR_MODE.SELECT);
      }
    }
  }

  return (
    <div className="mapper">
      <header style={{display: "flex", justifyContent: "center", marginTop: "1rem"}}>
        <h2 style={{width: "fit-content"}}>Luminescent Platinum Mapper (Beta 1.0.0)</h2>
      </header>
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
        />
      </div>
      <SearchBar
        canvasDimensions={canvasDimensions}
        pokemonList={pokemonList}
        debouncedText={pokemonName}
        handleDebouncedTextChange={handlePokemonNameChange}
        locationName={selectedZone}
        setLocationName={setSelectedZone}
        setLocationZoneId={setSelectedZoneId}
        canvasRef={canvasRef.current}
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
        canvasRef={canvasRef.current}
      />
    </div>
  );
}
