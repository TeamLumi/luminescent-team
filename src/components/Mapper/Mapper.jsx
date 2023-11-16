import React, { useEffect, useRef, useState } from 'react';
import { useColorMode } from '@docusaurus/theme-common';

import { coordinates } from './coordinates';
import Encounters from './Encounters';
import './style.css';

import {
  getAreaEncounters,
  getTrainersFromZoneName,
  getFieldItemsFromZoneID,
  getHiddenItemsFromZoneID,
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
  getAllIncenseEncounters
} from '../../utils/dex/encounters';

function getSelectedLocation(x, y) {
  const location = coordinates.filter(coords => {
    return (coords.x <= x && x <= (coords.x + coords.w)) &&
      (coords.y <= y && y <= (coords.y + coords.h))
  });
  if (location.length === 0) return "";
  return location[0];
}

export default function Mapper() {
  const [currentCoordinates, setCoordinates] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [locationName, setLocationName] = useState("");
  const [encOptions, setEncOptions] = useState({
    swarm: false,
    radar: false,
    tod: "1",
    incense: false,
    rod: "1",
  });

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
  }, [encOptions])

  const handleOptionChange = (option, value) => {
    setEncOptions({
      ...encOptions,
      [option]: value,
    });
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
      if (encOptions.swarm) {
        allGroundEnc[0] = swarmEnc[0]
      }
      if (encOptions.radar) {
        allGroundEnc[9] = allGroundEnc[1]
        allGroundEnc[9].encounterRate = "4%"
        allGroundEnc[1] = radarEnc[0]
      }
      if (encOptions.tod === "2") {
        allGroundEnc[2] = todEnc[0]
        allGroundEnc[3] = todEnc[1]
      } else if (encOptions.tod === "3") {
        allGroundEnc[2] = todEnc[2]
        allGroundEnc[3] = todEnc[3]
      }
      if (encOptions.incense) {
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
      if (encOptions.incense) {
        allSurfEnc[1] = surfIncenseEnc[0]
      }
    }

    // This section is for the Rod Encounters only
    const rodEnc = getAllRodEncounters(areaEncounters, encOptions.rod)

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
  }, [encOptions])

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
          height="720px"
          width="1244px"
        >
          Your browser does not support the canvas element.
        </canvas>
        <div className="infoCol" style={{ position: 'absolute', top: "80px", left: "900px" }}>
          {`Last Clicked Coords: ${currentCoordinates.x}, ${currentCoordinates.y}`}
          <div>
            Selected Location: {locationName}
          </div>
        </div>
        <Encounters
          encOptions={encOptions}
          handleOptionChange={handleOptionChange}
          encounterList={encounterList}
          pokemon={null} // Stub out the pokemon to add it in when the mon selection is chosen
        />
      </div>
      <div>
        {`Current Coords: ${cursorPosition.x}, ${cursorPosition.y}`}
      </div>
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
    </div>
  );
}

