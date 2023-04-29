import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PokedexFeatures from '@site/src/components/Pokedex';
import { useQuery } from '../hooks/useQuery';

export default function PokedexPage() {
  const { siteConfig } = useDocusaurusContext();
  const query = useQuery();
  const pokemonDexId = Math.floor(Number(query.get('pokemonId'))) || 0;

  return (
    <Layout
      title={siteConfig.title}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <PokedexFeatures pokemonDexId={pokemonDexId} />
    </Layout>
  );
}
