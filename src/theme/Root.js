import React from 'react';
import { getInitColorSchemeScript } from '@mui/material';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';

// Integrating MUI with docusuraus: https://webreaper.dev/blog/material-ui-theme-with-docusaurus/
export default function Root({ children }) {
  return (
    <>
      {getInitColorSchemeScript()}
      <CssVarsProvider>{children}</CssVarsProvider>
    </>
  );
}
