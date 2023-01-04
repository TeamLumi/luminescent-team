import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import {useColorMode} from '@docusaurus/theme-common';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function MDXContentWrapper(props) {
  const {colorMode} = useColorMode();

  return (
    <>
      <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
        <MDXContent {...props} />
      </ThemeProvider>
    </>
  );
}
