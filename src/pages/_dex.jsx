import React from 'react';
import Layout from '@theme/Layout';
import { PokemonPageContent } from '../components/Pokedex2/PokemonPageContent';
import Head from '@docusaurus/Head';

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
      description="A ROM Hack for Pokémon Brilliant Diamond"
    >
      <Head>
        <meta
          property='og:image'
          content={metaImage}
        />
        <meta
          property="twitter:image"
          content="https://discord.com/assets/652f40427e1f5186ad54836074898279.png"
        />
      </Head>
      <PokemonPageContent pokemon={pokemon} pokemonNames={pokemonList} />
    </Layout>
  );
}
