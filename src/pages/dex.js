import React, { useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PokedexFeatures from '@site/src/components/Pokedex';
import { PokemonSearch } from '../components/Pokedex/PokemonSearch';

export default function PokedexPage() {
  const { siteConfig } = useDocusaurusContext();
  const [pokemonDexId, setPokemonDexId] = useState(1);

  return (
    <Layout
      title={siteConfig.title}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <PokemonSearch setPokemonDexId={setPokemonDexId} />
      <PokedexFeatures dexId={pokemonDexId} />
    </Layout>
  );
}
