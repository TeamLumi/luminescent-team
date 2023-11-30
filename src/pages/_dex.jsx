import React from 'react';
import Layout from '@theme/Layout';
import { PokemonPageContent } from '../components/Pokedex2/PokemonPageContent';
import Head from '@docusaurus/Head';
import { getDexDescription } from '../utils/dex';

export default function PokemonPage({ pokemon, pokemonList }) {
  // required for webpack SSR
  if (typeof pokemon === 'undefined' || typeof pokemonList === 'undefined') {
    return null;
  }
  const metaImage = 
    `https://luminescent.team/img/${pokemon.imageSrc}` ||
    `https://luminescent.team/img/${pokemon.forms[0].imageSrc}`;

  return (
    <Layout
      title={pokemon.name}
      description={getDexDescription(pokemon.id)}
    >
      <Head>
        <meta name="twitter:card" content="summary" />
        <meta property='og:image' itemProp="image primaryImageOfPage" content={metaImage}/>
      </Head>
      <PokemonPageContent pokemon={pokemon} pokemonNames={pokemonList} />
    </Layout>
  );
}
