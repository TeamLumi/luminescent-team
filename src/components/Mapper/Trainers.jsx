import React, { useState } from 'react';
import { Autocomplete, Box, MenuItem, Select, TextField, Typography } from '@mui/material';

import { PokemonStats } from './PokemonStats';
import { getMoveProperties, getPokemonName } from '../../utils/dex';
import { PokemonMoveType, TYPE_COLOR_MAP } from '../Pokedex2/PokemonMovesetList';
import { ImageWithFallback } from '../common/ImageWithFallback';

import './style.css';

const responsiveFontSize = { fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } };
export const getSmallestResponsiveStyle = (smallest, property, values) => {
  // This just makes it a bit easier to organize the properties with all 4 sizes
  const responsiveStyles = {};

  responsiveStyles[property] = {
    xs: values.xs,
    sm: smallest ? values.xs : values.sm,
    md: smallest ? values.xs : values.md,
    lg: smallest ? values.xs : values.lg,
  };

  return responsiveStyles;
};


export const TrainerDropdown = ({ trainer, setTrainer, trainerList, smallest }) => {
  const defaultTrainer = {
    team_name: ""
  }
  return (
    <Box
      className="trainer-dropdown"
      sx={{
        marginLeft: smallest ? ".5rem" : {
          xs: "10rem",
          sm: "16rem",
          md: "28rem",
          lg: "35.875rem",
        },
        marginTop: "1rem",
        ...getSmallestResponsiveStyle(smallest, "width", {
          xs: "12rem",
          sm: "14rem",
          md: "21rem",
          lg: "30rem"
        }),
        position: smallest ? "unset" : "absolute",
        width: smallest ? "95%" : "30%",
      }}
    >
      <Autocomplete
        id="trainer-input"
        options={[defaultTrainer, ...trainerList]}
        getOptionLabel={(option) => option.team_name}
        defaultValue={defaultTrainer}
        value={trainer}
        onChange={(e, value) => setTrainer(value)}
        renderInput={(params) => (
          <TextField
            {...params}
            type="search"
            label="Select Trainer"
          />
        )}
      />
    </Box>
  );
};

export const Trainers = ({ pokemonList, selectedTrainer, smallest = false }) => {
  return (
    <div>
      {selectedTrainer && (
        <Box
          className="trainerBox"
          sx={{
            ...getSmallestResponsiveStyle(smallest, "gridTemplateColumns", {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
            }),
            width : {
              xs: smallest ? "416px" : '400px',
              sm: smallest ? "416px" : '520px',
              md: smallest ? "416px" : '802px',
              lg: smallest ? "416px" : '1060px',
            },
            marginLeft: {sm: "unset"},
            margin: smallest ? "unset" : "10px",
            maxHeight: { sm: "unset", md: smallest ? "528px" : "300px" },
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {selectedTrainer.team && selectedTrainer.team.map((pokemon, index) => {
            const pokemonInfo = pokemonList.find(p => p.id === pokemon.id)
            const baseStats = pokemonInfo.baseStats;
            return (
              <Box
                className='trainerMon'
                key={index}
                sx={{
                  ...getSmallestResponsiveStyle(smallest, "width", {
                    xs: "396px",
                    sm: "515px",
                    md: "396px",
                    lg: "515px",
                  }),
                  ...getSmallestResponsiveStyle(smallest, "height", {
                    xs: "260px",
                    sm: "280px",
                    md: "260px",
                    lg: "280px",
                  })
                }}
              >
                <Box
                  className='monDetails'
                  sx={{
                    ...getSmallestResponsiveStyle(smallest, "width", {
                      xs: "145px",
                      sm: "165px",
                      md: "145px",
                      lg: "165px"
                    })
                  }}
                >
                  <ImageWithFallback
                    alt={pokemonInfo.name}
                    src={`/img/${pokemonInfo.imageSrc}`}
                    fallbackSrc={`/img/pm0000_00_00_00_L.webp`}
                    style={{ objectFit: 'contain', marginTop: '8px' }}
                    width="64px"
                    height="64px"
                  />
                  <Typography sx={{ ...responsiveFontSize }}>
                    {`${getPokemonName(pokemon.id)} Lv. ${pokemon.level}`}
                  </Typography>
                  <Box display={"flex"}>
                    <Box
                      sx={{
                        ...getSmallestResponsiveStyle(smallest, "width", {
                          xs: "65px",
                          sm: "72px",
                          md: "65px",
                          lg: "72px"
                        })
                      }}
                      marginLeft="5px"
                    >
                      <PokemonMoveType
                        typeName={TYPE_COLOR_MAP[pokemonInfo.type1].name}
                        typeColor={TYPE_COLOR_MAP[pokemonInfo.type1].color}
                        fontSize={[".7rem", ".875rem"]}
                        smallest={smallest}
                      />
                    </Box>
                    {pokemonInfo.type1 !== pokemonInfo.type2 && (
                      <Box
                        sx={{
                          ...getSmallestResponsiveStyle(smallest, "width", {
                            xs: "65px",
                            sm: "72px",
                            md: "65px",
                            lg: "72px"
                          })
                        }}
                        marginLeft="5px"
                      >
                        <PokemonMoveType
                          typeName={TYPE_COLOR_MAP[pokemonInfo.type2].name}
                          typeColor={TYPE_COLOR_MAP[pokemonInfo.type2].color}
                          fontSize={[".7rem", ".875rem"]}
                          smallest={smallest}
                        />
                      </Box>
                    )}
                  </Box>
                  <Typography sx={{ ...responsiveFontSize }}>
                    {`Nature: ${pokemon.nature}`}
                  </Typography>
                  <Typography sx={{ ...responsiveFontSize }}>
                    {`Ability: ${pokemon.ability}`}
                  </Typography>
                  <Typography sx={{ ...responsiveFontSize }}>
                    {`Item: ${pokemon.item}`}
                  </Typography>
                </Box>
                <Box
                  className='stats'
                  sx={{
                    ...getSmallestResponsiveStyle(smallest, "width", {
                      xs: "250px",
                      sm: "350px",
                      md: "250px",
                      lg: "350px"
                    })
                  }}
                >
                  <PokemonStats baseStats={baseStats} trainerPokemon={pokemon} smallest={smallest} />
                  <Box
                    className='moveList'
                    sx={{
                      ...getSmallestResponsiveStyle(smallest, "width", {
                        xs: "250px",
                        sm: "350px",
                        md: "250px",
                        lg: "350px"
                      }),
                      ...getSmallestResponsiveStyle(smallest, "height", {
                        xs: "84px",
                        sm: "104px",
                        md: "84px",
                        lg: "104px"
                      })
                    }}
                  >
                    {pokemon.moves.map((move, index) => {
                      const moveInfo = getMoveProperties(move);
                      return (
                        <Box
                          key={`${move}-${index}`}
                          sx={{
                            ...getSmallestResponsiveStyle(smallest, "width", {
                              xs: "110px",
                              sm: "160px",
                              md: "110px",
                              lg: "160px"
                            })
                          }}
                          margin="5px 2px 2.5px"
                        >
                          <PokemonMoveType
                            typeName={moveInfo.name}
                            typeColor={TYPE_COLOR_MAP[moveInfo.type].color}
                            fontSize={[".7rem", ".875rem"]}
                            smallest={smallest}
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
      )}
    </div>
  )
};