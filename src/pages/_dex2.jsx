import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PokedexFeatures2 from '@site/src/components/Pokedex/PokedexFeatures2';

export default function PokedexPage({ data }) {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={siteConfig.title}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <PokedexFeatures2 data={data} />
    </Layout>
  );
}
