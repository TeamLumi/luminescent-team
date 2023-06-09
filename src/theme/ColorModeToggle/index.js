import React, { useEffect } from 'react';
import ColorModeToggle from '@theme-original/ColorModeToggle';
import { useColorScheme } from '@mui/material';

export default function ColorModeToggleWrapper(props) {
  const { setMode } = useColorScheme();
  const { value } = props;

  useEffect(() => {
    setMode(value);
  }, [value]);

  return (
    <>
      <ColorModeToggle {...props} />
    </>
  );
}
