import React from 'react';
import Layout from '@theme/Layout';
import { PokemonPageContent } from '../components/Pokedex2/PokemonPageContent';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function PokemonPage({ pokemon, pokemonList }) {
  // required for webpack SSR
  if (typeof pokemon === 'undefined' || typeof pokemonList === 'undefined') {
    return null;
  }

  const metaImage = useBaseUrl(`/img/${pokemon.imageSrc}`) || useBaseUrl(`/img/${pokemon.forms[0].imageSrc}`)

  return (
    <Layout
      title={pokemon.name}
      description="Pokémon Luminescent Version, A ROM Hack for Pokémon Brilliant Diamond and Shining Pearl"
    >
      <Head>
        <meta
          name="Pokémon Luminescent Version"
          property='og:image'
          content={metaImage}
        />
      </Head>
      <PokemonPageContent pokemon={pokemon} pokemonNames={pokemonList} />
    </Layout>
  );
}
