import React from 'react';
import Layout from '@theme/Layout';
import { Mapper } from '../components/Mapper/Mapper';

const MapperPage = ({ pokemonList }) => {
  return (
    <Layout>
      <Mapper pokemonList={pokemonList} />
    </Layout>
  )
}

export default MapperPage;
