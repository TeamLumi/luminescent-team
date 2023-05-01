import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

export default function PokemonPage({ data }) {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <ul>
        {data.pokemons.map((p) => (
          <li key={p.id}>{p.id}</li>
        ))}
      </ul>
    </Layout>
  );
}
