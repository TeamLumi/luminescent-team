import React from 'react';
import { PokemonStats } from './PokemonStats';
import { Box, Typography } from '@mui/material';
import './style.css';
import { getAbilityString, getItemString, getMoveProperties, getPokemonName } from '../../utils/dex';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { PokemonMoveType, TYPE_COLOR_MAP } from '../Pokedex2/PokemonMovesetList';

export const Trainers = ({ trainerList, pokemonList }) => {
  return (
    <div>
      Trainers: 
      {trainerList.length > 0 && trainerList.map((trainer, index) => (
        <>
          <div key={index}>
            {`${trainer.team_name}`}
          </div>
          <Box className="trainerBox">
            {trainer.team && trainer.team.map((pokemon, index) => {
              const pokemonInfo = pokemonList.find(p => p.id === pokemon.id)
              const baseStats = pokemonInfo.baseStats;
              return (
                <Box className='trainerMon' key={index}>
                  <Box className='monDetails'>
                    <img src={useBaseUrl(`/img/${pokemonInfo.imageSrc}`)} height={64} />
                    <Typography>{`${getPokemonName(pokemon.id)} Lv. ${pokemon.level}`}</Typography>
                    <Box display={"flex"}>
                      <Box width="72px" marginLeft="5px">
                        <PokemonMoveType
                          typeName={TYPE_COLOR_MAP[pokemonInfo.type1].name}
                          typeColor={TYPE_COLOR_MAP[pokemonInfo.type1].color}
                          fontSize={".825rem"}
                        />
                      </Box>
                      {pokemonInfo.type1 !== pokemonInfo.type2 && (
                        <Box width="72px" marginLeft="5px">
                          <PokemonMoveType
                            typeName={TYPE_COLOR_MAP[pokemonInfo.type2].name}
                            typeColor={TYPE_COLOR_MAP[pokemonInfo.type2].color}
                            fontSize={".825rem"}
                          />
                        </Box>
                      )}
                    </Box>
                    <Typography>{`Nature: ${pokemon.nature}`}</Typography>
                    <Typography>{`Ability: ${pokemon.ability}`}</Typography>
                    <Typography>{`Item: ${pokemon.item}`}</Typography>
                  </Box>
                  <Box className='stats'>
                    <PokemonStats baseStats={baseStats} trainerPokemon={pokemon}/>
                    <Box className='moveList'>
                      {pokemon.moves.map((move, index) => {
                        const moveInfo = getMoveProperties(move);
                        console.log(moveInfo.type);
                        return (
                          <Box key={`${move}-${index}`} width="160px" margin="5px">
                            <PokemonMoveType
                              typeName={moveInfo.name}
                              typeColor={TYPE_COLOR_MAP[moveInfo.type].color}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              )
            })}
          </Box>
        </>
      ))}
    </div>
  )
};