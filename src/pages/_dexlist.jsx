import React from 'react';
import Layout from '@theme/Layout';
import { Container, Typography } from '@mui/material';

const PokedexListPage = ({ pokemonList }) => {
  return (
    <Layout
      title="Pokedex"
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl"
    >
      <Container>
        <Typography variant="h1">Pokemons</Typography>
        <ul>
          {pokemonList.map((pokemon) => (
            <li key={`pokemon-${pokemon.id}`}>
              <a href={`/dex/${pokemon.id}`}>{pokemon.name}</a>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default PokedexListPage;
