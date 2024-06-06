import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PokedexFeatures from '@site/src/components/Pokedex';

export default function PokedexPage() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="A ROM Hack for Pokémon Brilliant Diamond."
    >
      <PokedexFeatures />
    </Layout>
  );
}
