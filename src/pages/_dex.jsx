import React from 'react';
import Layout from '@theme/Layout';
import { PokemonPageContent } from '../components/Pokedex/PokemonPageContent';

export default function PokemonPage({ data, pokemonNames }) {
  return (
    <Layout
      title={data.pokemonInfo.name}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <PokemonPageContent data={data} pokemonNames={pokemonNames} />
    </Layout>
  );
}
