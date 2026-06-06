import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { GlobalState } from '../components/common/GlobalState';
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

const MapperPage = ({ pokemonList, pokemonListV, pokemonList3 }) => {
  // required for webpack SSR
  if (typeof pokemonList === 'undefined') {
    return null;
  }
  return (
    <Layout>
      <LumiReactThemeProvider>
        <GlobalState>
          <BrowserOnly fallback={<div>Loading mapper...</div>}>
            {() => {
              const { Mapper } = require('../components/Mapper/Mapper');
              return <Mapper pokemonList={pokemonList} pokemonList3={pokemonList3} pokemonListV={pokemonListV} />;
            }}
          </BrowserOnly>
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};

export default MapperPage;
