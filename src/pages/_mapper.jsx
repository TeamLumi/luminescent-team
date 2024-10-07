import React from 'react';
import Layout from '@theme/Layout';
import { Mapper } from '../components/Mapper/Mapper';
import { GlobalState } from '../components/common/GlobalState';

const MapperPage = ({ pokemonList }) => {
  return (
    <Layout>
      <GlobalState>
        <Mapper pokemonList={pokemonList} />
      </GlobalState>
    </Layout>
  )
}

export default MapperPage;
