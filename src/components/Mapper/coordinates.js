import MapperCoordinates from './coordinates.json';

function sortByXThenYDescending(arr) {
    const seen = new Set();
    const unique = [];

    for (const item of arr) {
        const key = `${item.x},${item.y}`;
        if (!seen.has(key)) {
            seen.add(key);
            unique.push(item);
        }
    }

    return unique.sort((a, b) => {
        if (b.x !== a.x) return b.x - a.x;
        return b.y + a.y;
    });
}

const sortedCoordinates = sortByXThenYDescending(MapperCoordinates);

export const getLocationNames = () => {
    return MapperCoordinates.map(coord => coord.name);
};

export function getLocationCoordsFromName(name) {
    if (!name) {
        return null;
    }
    return MapperCoordinates.find(coord => coord.name === name);
};

export function getLocationCoordsFromZoneId(zoneId) {
    return MapperCoordinates.find(coord => coord.zoneId === zoneId);
};

const isXWithinBounds = (coords, x) => {
    const isWithinX = coords.x <= x && x <= coords.x + coords.width;
    return isWithinX;
};

const isYWithinBounds = (coords, y) => {
    const isWithinY = coords.y <= y && y <= coords.y + coords.height;
    return isWithinY;
};

export function getSelectedLocation(x, y) {
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

export function isLocationWithinBounds (location, mouseCoords) {
    const { x, y } = mouseCoords;
    const xWithinBounds = isXWithinBounds(location, x);
    const yWithinBounds = isYWithinBounds(location, y);

    return xWithinBounds && yWithinBounds;
};

export { sortedCoordinates };