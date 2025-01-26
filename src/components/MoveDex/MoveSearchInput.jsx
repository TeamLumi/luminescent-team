import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import Fuse from 'fuse.js';

import { defaultSearchTable } from './MoveListPageContent';

const moveFlags = (movesList, flags) => {
  // Filters movesList based on the flags array
  return movesList.filter((move) => {
    return flags.every((flag, index) => {
      if (flag.value === null) return true; // Skip if flag is not set
      return move.moveFlags[index] === flag.value;
    });
  });
};

function getPowerAccuracyFilter(searchTable, finalResults) {
  if (searchTable?.power.value) {
    const range = searchTable.power.value.split("-");

    if (range.length === 2) {
      const [minValue, maxValue] = range.map(Number); // Convert to numbers
      finalResults = finalResults.filter((item) => {
        const power = Number(item.power); // Convert item.power to a number
        return !isNaN(power) && power > minValue && power <= maxValue; // Ensure power is valid
      });
    } else {
      console.warn("Invalid range format for power filter:", searchTable.power.value);
    }
  }
  if (searchTable?.accuracy.value) {
    const range = searchTable.accuracy.value.split("-");

    if (range.length === 2) {
      const [minValue, maxValue] = range.map(Number); // Convert to numbers
      finalResults = finalResults.filter((item) => {
        const accuracy = Number(item.accuracy); // Convert item.accuracy to a number
        return !isNaN(accuracy) && accuracy > minValue && accuracy <= maxValue; // Ensure accuracy is valid
      });
    } else {
      console.warn("Invalid range format for accuracy filter:", searchTable.accuracy.value);
    }
  }
  if (searchTable.statChanges?.rate.value) {
    finalResults = finalResults.filter((move) => {
      return move.statChanges.some((sc) => sc.rate === parseInt(searchTable.statChanges.rate.value))
    });
  }
  if (searchTable.statChanges?.stages.value) {
    finalResults = finalResults.filter((move) => {
      return move.statChanges.some((sc) => sc.stages === parseInt(searchTable.statChanges.stages.value))
    });
  }
  if (searchTable.statChanges?.statType.value) {
    finalResults = finalResults.filter((move) => {
      return move.statChanges.some((sc) => sc.statType === searchTable.statChanges.statType.value)
    });
  }
  if (searchTable.moveFlags.some((flag) => flag.value !== null)) {
    finalResults =  moveFlags(finalResults, searchTable.moveFlags);
  }
  return finalResults;
}

const MoveSearchInput = ({ movesList, setMoves, searchTable, handleChange }) => {
  const extractKeys = (obj, parentKey = "") => {
    let keys = [];
    Object.keys(obj).forEach((key) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (Array.isArray(obj[key])) {
        // Handle arrays (e.g., moveFlags)
        obj[key].forEach((_, index) => {
          keys.push(`${fullKey}.${index}.value`); // Add keys for each index
        });
      } else if (obj[key] && typeof obj[key] === "object" && !("value" in obj[key])) {
        keys.push(...extractKeys(obj[key], fullKey));
      } else {
        keys.push(fullKey); // Add key to list
      }
    });
    return keys;
  };

  // Extract all keys from the search table
  const fuseKeys = useMemo(() => extractKeys(defaultSearchTable), []);
  const fuse = useMemo(() => (
    new Fuse(movesList, { keys: fuseKeys, useExtendedSearch: true })
  ), [movesList, fuseKeys]);
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  const handleTextChange = (value) => {
    setText(value);
    handleChange("name", {value: value, label: null});
  };

  const buildQueryList = (obj, queryList, parentKey = "") => {
    Object.keys(obj).forEach((key) => {
      if (key === "power" || key === "accuracy" || key === "statChanges" || key === "moveFlags") {
        return;
      }

      const value = obj[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (value && typeof value === "object" && !("value" in value)) {
        // Recursively handle nested objects without a 'value' property
        buildQueryList(value, queryList, fullKey);
      } else if (value?.value !== null && value?.value !== "") {
        // Add to query list if 'value' property is not null or undefined
        let actualValue = value?.value;
        if (typeof actualValue === "string") {
          actualValue = actualValue.trim();
        }
        if (fullKey !== "name") {
          // The = makes an exact match for the specific values.
          // Since every value besides the name is controlled, we want to be exact.
          // The quotation marks are keys that have a space between them
          // In useExtendedSearch mode spaces are counted as an "and" operator
          actualValue = `="${actualValue}"`
        }
        queryList.push({ [fullKey]: actualValue });
      }
    });
  };

  const fuzzySearch = useCallback(() => {
    const queryList = []
    buildQueryList(searchTable, queryList);
    if (queryList.length === 0) {
      return getPowerAccuracyFilter(searchTable, movesList)
    }; // Return all moves if no filters are applied

    const results = fuse.search({ $and: queryList });
    let finalResults = results.map((r) => r.item);
    return getPowerAccuracyFilter(searchTable, finalResults);
  }, [fuse, searchTable, movesList]);

  useEffect(() => {
    const timer = setTimeout(() => handleTextChange(debouncedText), 500);
    return () => clearTimeout(timer);
  }, [debouncedText]);

  useEffect(() => {
    setMoves(fuzzySearch());
  }, [fuzzySearch, setMoves]);

  useEffect(() => {
    if (searchTable.name?.value !== undefined) {
      setDebouncedText(searchTable.name.value);
    }
  }, [searchTable.name]);

  return (
    <TextField
      id="move-search-input"
      type="search"
      label="Search Moves"
      fullWidth={true}
      value={debouncedText}
      onChange={(e) => setDebouncedText(e.target.value)}
    />
  );
};

export default MoveSearchInput;