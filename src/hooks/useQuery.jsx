import React from 'react';
import { useLocation } from '@docusaurus/router';

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
