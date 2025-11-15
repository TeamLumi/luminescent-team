import React from 'react';
import MDXContent from '@theme-original/MDXContent';
import LumiReactThemeProvider from '../LumiThemeProvider';

export default function MDXContentWrapper(props) {
  return (
    <>
      <LumiReactThemeProvider>
        <MDXContent {...props} />
      </LumiReactThemeProvider>
    </>
  );
}
