import MapperCoordinates from './coordinates.json';

export const getLocationNames = () => {
    return MapperCoordinates.map(coord => coord.name);
};

export function getLocationCoordsFromName(name) {
    return MapperCoordinates.find(coord => coord.name === name);
};

export function getLocationCoordsFromZoneId(zoneId) {
    return MapperCoordinates.find(coord => coord.zoneId === zoneId);
};

export function getSelectedLocation(x, y) {
    const isXWithinBounds = (coords, x) => {
        const isWithinX = coords.x <= x && x <= coords.x + coords.width;
        return isWithinX;
    };

    const isYWithinBounds = (coords, y) => {
        const isWithinY = coords.y <= y && y <= coords.y + coords.height;
        return isWithinY;
    };

    let selectedLocation = null;

    for (let i = 0; i < MapperCoordinates.length; i++) {
        const coords = MapperCoordinates[i];
        const xWithinBounds = isXWithinBounds(coords, x);
        const yWithinBounds = isYWithinBounds(coords, y);

        if (xWithinBounds && yWithinBounds) {
            selectedLocation = coords;
            break; // Stop loop once a location is found
        }
    }

    return selectedLocation;
}

export function isLocationExactlyEqual(location, comparedLocation) {
    const { x, y, width, height } = location;
    return (
      comparedLocation.x === x &&
      comparedLocation.y === y &&
      comparedLocation.width === width &&
      comparedLocation.height === height
    )
}

export { MapperCoordinates };