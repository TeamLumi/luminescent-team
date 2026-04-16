import React from 'react';
import Layout from '@theme/Layout';
import { Mapper } from '../components/Mapper/Mapper';
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
          <Mapper pokemonList={pokemonList} pokemonList3={pokemonList3} pokemonListV={pokemonListV} />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  );
};

export default MapperPage;
