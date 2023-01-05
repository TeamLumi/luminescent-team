import React from 'react';
import Paginator from '@theme-original/DocItem/Paginator';
import {useLocation} from '@docusaurus/router';

const disabledBases = [
  "docs"
]

export default function PaginatorWrapper(props) {
  const location = useLocation();

  // Check each disabled base and return null if in list
  for (let i = 0; i < disabledBases.length; i++) {
    const base = disabledBases[i];
    if (location.pathname.startsWith(`/${base}`)) {
      return null;
    }
  }

  // Otherwise return normally
  return (
    <>
      <Paginator {...props} />
    </>
  );
}
