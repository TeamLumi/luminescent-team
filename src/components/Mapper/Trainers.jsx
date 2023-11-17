import React from 'react';
import { PokemonStats } from './PokemonStats';
import { Box } from '@mui/material';
import './style.css';
import { getPokemonName } from '../../utils/dex';

export const Trainers = ({ trainerList, pokemonList }) => {
  console.log(trainerList);
  return (
    <div>
      Trainers: 
      {trainerList.length > 0 && trainerList.map((trainer, index) => (
        <>
          <div key={index}>
            {`${trainer.team_name}, ${trainer.trainerType}, ${trainer.route}`}
          </div>
          {trainer.team && trainer.team.map((pokemon, index) => {
            const pokemonInfo = pokemonList.find(p => p.id === pokemon.id)
            const baseStats = pokemonInfo.baseStats;
            return (
              <Box className='stats' key={index}>
                <PokemonStats baseStats={baseStats} trainerPokemon={pokemon}/>
              </Box>
            )
          })}
        </>
      ))}
    </div>
  )
};