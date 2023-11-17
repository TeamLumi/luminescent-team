import React from 'react';
import { PokemonStats } from './PokemonStats';
import { Box, Typography } from '@mui/material';
import './style.css';
import { getAbilityString, getItemString, getPokemonName } from '../../utils/dex';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { PokemonMoveType, TYPE_COLOR_MAP } from '../Pokedex2/PokemonMovesetList';

export const Trainers = ({ trainerList, pokemonList }) => {
  return (
    <div>
      Trainers: 
      {trainerList.length > 0 && trainerList.map((trainer, index) => (
        <>
          <div key={index}>
            {`${trainer.name}, ${trainer.route}`}
          </div>
          {trainer.team && trainer.team.map((pokemon, index) => {
            const pokemonInfo = pokemonList.find(p => p.id === pokemon.id)
            const baseStats = pokemonInfo.baseStats;
            return (
              <Box className='trainerMon' key={index}>
                <Box className='monDetails'>
                  <img src={useBaseUrl(`/img/${pokemonInfo.imageSrc}`)} height={64} />
                  <Typography>{getPokemonName(pokemon.id)}</Typography>
                  <Box display={"flex"}>
                    <Box width="55px">
                      <Typography>{TYPE_COLOR_MAP[pokemonInfo.type1].name}</Typography>
                    </Box>
                    {pokemonInfo.type1 !== pokemonInfo.type2 && (
                      <Box width="65px" >
                        <Typography>{TYPE_COLOR_MAP[pokemonInfo.type2].name}</Typography>
                      </Box>
                    )}
                  </Box>
                  <Typography>{`Lv. ${pokemon.level}`}</Typography>
                  <Typography>{`Nature: ${pokemon.nature}`}</Typography>
                  <Typography>{`Ability: ${pokemon.ability}`}</Typography>
                  <Typography>{`Item: ${pokemon.item}`}</Typography>
                  
                </Box>
                <Box className='stats'>
                  <PokemonStats baseStats={baseStats} trainerPokemon={pokemon}/>
                </Box>
              </Box>
            )
          })}
        </>
      ))}
    </div>
  )
};