import React, { useEffect, useRef, useState } from "react";
import { Rect, Text } from "@bucky24/react-canvas";
import { isLocationWithinBounds } from "./coordinates";
import { CLEAR_MODE } from "./Mapper";

export const Location = ({
  location,
  mouseCoords,
  selectedLocation,
  encounterLocations
}) => {
  const isSelected = selectedLocation === location.zoneId;
  const isMouseOver = isLocationWithinBounds({
    ...location,
    x: location.x + 2,
    y: location.y - 2,
    width: location.width - 2,
    height: location.height - 2,
  }, mouseCoords);
  const isEncounter = encounterLocations.some(arr => arr[1] === location.zoneId);

  const fill = isSelected || isMouseOver || isEncounter;
  const showText = isMouseOver;

  const colorMap = {
    selected: "#00FFFF",
    hover: "#FFF",
    encounter: "#FF00FF",
    default: "transparent",
  };

  let color = colorMap.default;
  if (isSelected) {
    color = colorMap.selected;
  } else if (isMouseOver) {
    color = colorMap.hover;
  } else if (isEncounter) {
    color = colorMap.encounter;
  }

  return (
    <>
      <Rect
        x={location.x + 1}
        y={location.y + 1}
        x2={location.x + location.width - 1}
        y2={location.y + location.height - 1}
        color={color}
        fill={fill}
      />
      {showText && (
        <Text x={location.x + location.width + 2} y={location.y - 2} font="18px Arial">
          {location.name}
        </Text>
      )}
    </>
  );
};
