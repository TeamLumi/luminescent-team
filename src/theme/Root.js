import React from 'react';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material';

// Integrating MUI with docusuraus: https://webreaper.dev/blog/material-ui-theme-with-docusaurus/
export default function Root({ children }) {
  return (
    <>
      <InitColorSchemeScript />
      <CssVarsProvider>{children}</CssVarsProvider>
    </>
  );
}
