import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Head from '@docusaurus/Head';
import { useGlobalState } from '../components/common/GlobalState';

const PokemonPageHeader = ({ pokemon, pokemon3 }) => {
  const [globalState] = useGlobalState();
  const { siteConfig } = useDocusaurusContext();
  const pokemonInfo = globalState.mode === "2.0" ? pokemon : pokemon3;
  const metaImage = 
    `https://luminescent.team${pokemonInfo.imageSrc}` ||
    `https://luminescent.team${pokemonInfo.forms[0].imageSrc}`;

  return (
    <Head>
      <meta property="og:title" content={pokemonInfo.name} data-rh="true" />
      <meta name="og:site_name" content={siteConfig.title} />
      <meta name="twitter:card" content="summary" />
      <meta property='og:image' itemProp="image primaryImageOfPage" content={metaImage} />
    </Head>
  );
};

export default PokemonPageHeader;
