import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { PokemonPageContent } from '../components/Pokedex2/PokemonPageContent';
import Head from '@docusaurus/Head';
import { getDexDescription } from '../utils/dex';
import { GlobalState } from '../components/common/GlobalState';

export default function PokemonPage({ pokemon, pokemonList, pokemon3, pokemonList3 }) {
  const { siteConfig } = useDocusaurusContext();
  // required for webpack SSR
  if (typeof pokemon === 'undefined' || typeof pokemonList === 'undefined') {
    return null;
  }
  const metaImage = 
    `https://luminescent.team/img/pkm/${pokemon.imageSrc}` ||
    `https://luminescent.team/img/pkm/${pokemon.forms[0].imageSrc}`;

  return (
    <Layout
      description={pokemon.dexDescription}
    >
      <GlobalState>
        <Head>
          <meta property="og:title" content={pokemon.name} data-rh="true" />
          <meta name="og:site_name" content={siteConfig.title} />
          <meta name="twitter:card" content="summary" />
          <meta property='og:image' itemProp="image primaryImageOfPage" content={metaImage}/>
        </Head>
        <PokemonPageContent pokemon={pokemon} pokemonNames={pokemonList} pokemon3={pokemon3} pokemonNames3={pokemonList3} />
      </GlobalState>
    </Layout>
  );
}
