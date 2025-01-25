import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { TextField } from '@mui/material';
import Fuse from 'fuse.js';

import { defaultSearchTable } from './MoveListPageContent';

const MoveSearchInput = ({ movesList, setMoves, searchTable, handleChange }) => {
  const extractKeys = (obj, parentKey = "") => {
    let keys = [];
    Object.keys(obj).forEach((key) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (obj[key] && typeof obj[key] === "object" && !("value" in obj[key])) {
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
          actualValue = `="${actualValue}"`
        }
        queryList.push({ [fullKey]: actualValue });
      }
    });
  };

  const fuzzySearch = useCallback(() => {
    const queryList = []
    buildQueryList(searchTable, queryList);
    if (queryList.length === 0) return movesList; // Return all moves if no filters are applied

    const results = fuse.search({ $and: queryList });
    return results.map((r) => r.item);
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