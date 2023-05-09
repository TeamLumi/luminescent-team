import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import * as materialUI from '@mui/material';
import Spoiler from './SpoilerTag/SpoilerTag';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  ...materialUI,
  Spoiler,
};
