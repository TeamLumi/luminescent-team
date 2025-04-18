import React from 'react';
import Layout from '@theme/Layout';
import { Mapper } from '../components/Mapper/Mapper';
import { GlobalState } from '../components/common/GlobalState';
import LumiReactThemeProvider from '../theme/LumiThemeProvider';

const MapperPage = ({ pokemonList }) => {
  return (
    <Layout>
      <LumiReactThemeProvider>
        <GlobalState>
          <Mapper pokemonList={pokemonList} />
        </GlobalState>
      </LumiReactThemeProvider>
    </Layout>
  )
}

export default MapperPage;
