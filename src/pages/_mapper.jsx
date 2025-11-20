import React from 'react';
import Layout from '@theme/Layout';
import { Mapper } from '../components/Mapper/Mapper';
import { GlobalState } from '../components/common/GlobalState';

const MapperPage = ({ pokemonList, pokemonListV, pokemonList3 }) => {
  return (
    <Layout>
      <GlobalState>
        <Mapper pokemonList={pokemonList} pokemonList3={pokemonList3} pokemonListV={pokemonListV} />
      </GlobalState>
    </Layout>
  )
}

export default MapperPage;
