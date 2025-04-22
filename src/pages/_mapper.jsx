import React from 'react';
import Layout from '@theme/Layout';

import { GlobalState } from '../components/common/GlobalState';
import { Mapper } from '../components/Mapper/Mapper';
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

function MapperPage ({ pokemonList }) {
  // required for webpack SSR
  if (typeof pokemonList === 'undefined') {
    return null;
  }

  return (
    <Layout>
      <LumiReactThemeProvider>
        <GlobalState>
          <Mapper pokemonList={pokemonList} />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};

export default MapperPage;