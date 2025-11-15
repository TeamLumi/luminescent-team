import React, { useEffect, useRef, useState } from "react";
import { Rect, Text } from "@bucky24/react-canvas";
import { isLocationWithinBounds } from "./coordinates";
import { CLEAR_MODE } from "./Mapper";

export const Location = ({
  location,
  mouseCoords,
  selectedLocation,
  encounterLocations,
  colors
}) => {
  const isSelected = selectedLocation === location.zoneId;
  const isMouseOver = isLocationWithinBounds({
    ...location,
    x: location.x + 2,
    y: location.y + 2,
    width: location.width - 2,
    height: location.height - 2,
  }, mouseCoords);
  const isEncounter = encounterLocations.some(arr => arr[1] === location.zoneId);

  const fill = isSelected || isMouseOver || isEncounter;
  const showText = isMouseOver;

  function getHoverFillStyle() {
    const { r, g, b, a } = colors.hov;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function getSelFillStyle() {
    const { r, g, b, a } = colors.sel;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  function getEncFillStyle() {
    const { r, g, b, a } = colors.enc;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }

  let color = colors.default;
  if (isSelected) {
    color = getSelFillStyle();
  } else if (isMouseOver) {
    color = getHoverFillStyle();
  } else if (isEncounter) {
    color = getEncFillStyle();
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
        <Text
          x={location.x + location.width + 2}
          y={location.y - 2}
          font="18px Arial"
          background
          backgroundColor={'rgba(255, 255, 255, 0.8)'}
        >
          {location.name}
        </Text>
      )}
    </>
  );
};
