import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { coordinates } from './coordinates';
import { getAreaEncounters, getTrainersFromZoneName } from '../../utils/dex';

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
  const [encounterList, setEncounterList] = useState("");
  const [trainerList, setTrainerList] = useState("");

  const myCanvas = useRef();

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
      setLocationName(location.name ? location.name : "")
      setEncounterList(getAreaEncounters(location.name ? location.name : ""))
      setTrainerList(getTrainersFromZoneName(location.name ? location.name : ""))
    };

    myCanvas.current.addEventListener('click', handleClick);
    myCanvas.current.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component is unmounted
    return () => {
      myCanvas.current.removeEventListener('click', handleClick);
      myCanvas.current.addEventListener('mousemove', handleMouseMove);
    };
  }, [])

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
      </div>
      <div className="infoCol">
        {`Last Clicked Coords: ${currentCoordinates.x}, ${currentCoordinates.y}`}
      </div>
      <div>
      {`Current Coords: ${cursorPosition.x}, ${cursorPosition.y}`}
      </div>
      <div>
        Selected Route: {locationName}
      </div>
      <div>
        Encounter List: 
        {encounterList && encounterList.map((enc, index) => (
          <div key={index}>
            {`${enc.pokemonName}, ${enc.encounterType}, ${enc.encounterRate}`}
          </div>
        ))}
      </div>
      <div>
        Trainers: 
        {trainerList && trainerList.map((trainer, index) => (
          <div key={index}>
            {`${trainer.team_name}, ${trainer.trainerType}, ${trainer.route}`}
          </div>
        ))}
      </div>
      
    </div>
  );
}