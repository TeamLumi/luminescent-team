import React, { useCallback, useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Fuse from 'fuse.js';

const MoveSearchInput = ({ movesList, setMoves }) => {
  const fuse = new Fuse(movesList, { keys: ['name'] });
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);

  const fuzzySearch = useCallback((query) => {
    if (!query) {
      return movesList;
    }

    const result = fuse.search(query);
    return result.map((r) => r.item);
  });

  useEffect(() => {
    const timer = setTimeout(() => setText(debouncedText), 100);
    return () => clearTimeout(timer);
  }, [debouncedText]);

  useEffect(() => {
    setMoves(fuzzySearch(text));
  }, [text]);

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