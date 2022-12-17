import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import * as materialUI from '@mui/material';
import { Spoiler } from 'react-spoiler-tag';

// Set the spoilers default properties
Spoiler.defaultProps = {
  revealedColor: 'transparent'
}

export default {
  // Re-use the default mapping
  ...MDXComponents,
  ...materialUI,
  spoiler: Spoiler,
};