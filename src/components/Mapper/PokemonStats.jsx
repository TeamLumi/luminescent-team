import React, { Fragment, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { STATS, calcStat } from '../../core/pokemonStatCalculation';
import "./style.css";
import { getPokemonName } from '../../utils/dex';
import { getSmallestResponsiveStyle } from './Trainers';

function getStatBarValues(stat) {
  let width = Math.floor((stat * 140) / 200);
  if (width > 140) width = 140;
  let color = Math.floor((stat * 180) / 255);
  if (color > 360) color = 360;
  return { width, color };
}

const responsiveFontSize = { fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } };
const responsiveHeaderSize = { fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' } };

export const PokemonStats = ({ baseStats, trainerPokemon, smallest = false }) => {
  const pokemonIVs = {
    [STATS.HP]: trainerPokemon.ivhp, 
    [STATS.ATTACK] : trainerPokemon.ivatk,
    [STATS.DEFENSE] : trainerPokemon.ivdef,
    [STATS.SPECIAL_ATTACK] : trainerPokemon.ivspatk,
    [STATS.SPECIAL_DEFENSE] : trainerPokemon.ivspdef,
    [STATS.SPEED] : trainerPokemon.ivspeed,
  }
  const pokemonEVs = {
    [STATS.HP]: trainerPokemon.evhp, 
    [STATS.ATTACK] : trainerPokemon.evatk,
    [STATS.DEFENSE] : trainerPokemon.evdef,
    [STATS.SPECIAL_ATTACK] : trainerPokemon.evspatk,
    [STATS.SPECIAL_DEFENSE] : trainerPokemon.evspdef,
    [STATS.SPEED] : trainerPokemon.evspeed,
  }
  const pokemonStatValues = [
    { key: STATS.HP, label: 'HP:', value: baseStats.hp, isHpStat: true },
    { key: STATS.ATTACK, label: 'Attack:', value: baseStats.atk, isHpStat: false },
    { key: STATS.DEFENSE, label: 'Defense:', value: baseStats.def, isHpStat: false },
    { key: STATS.SPECIAL_ATTACK, label: 'Sp.Atk:', value: baseStats.spa, isHpStat: false },
    { key: STATS.SPECIAL_DEFENSE, label: 'Sp.Def:', value: baseStats.spd, isHpStat: false },
    { key: STATS.SPEED, label: 'Speed:', value: baseStats.spe, isHpStat: false },
  ];

  return (
    <Box
      className="statsContainer"
      sx={{
        height: "170px",
        ...getSmallestResponsiveStyle(smallest, "width", {
          xs: "250px",
          sm: "350px",
          md: "250px",
          lg: "350px"
        })
      }}
    >
      <Box
        display="grid"
        sx={{
          ...getSmallestResponsiveStyle(smallest, "gridTemplateColumns", {
            xs: 'repeat(4, 1fr)',
            sm: 'repeat(7, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(7, 1fr)' 
          })
        }}
        justifyItems={"center"}
      >
        <>
          <Box gridColumn="span 1"/>
          <Box gridColumn="span 1">
            <Typography sx={{ ...responsiveHeaderSize }}>Total:</Typography>
          </Box>
          <Box
            gridColumn="span 3"
            sx={{
              ...getSmallestResponsiveStyle(smallest, "display", {
                xs: 'none',
                sm: 'block',
                md: 'none',
                lg: 'block'
                })
              }}
            />
          <Box gridColumn="span 1">
            <Typography sx={{ ...responsiveHeaderSize }}>IVs:</Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography sx={{ ...responsiveHeaderSize }}>EVs:</Typography>
          </Box>
        </>
        {pokemonStatValues.map((stat) => {
          const statValue = calcStat(
            baseStats[stat.key],
            stat.key,
            stat.isHpStat,
            trainerPokemon.level,
            pokemonIVs[stat.key],
            pokemonEVs[stat.key],
            trainerPokemon.nature,
          )
          const { width, color } = getStatBarValues(statValue);

          return (
            <Fragment key={stat.label}>
              <Box gridColumn="span 1">
                <Typography sx={{ ...responsiveFontSize }} className='statValue'>
                  {`${stat.key.toUpperCase()}:`}
                </Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography
                  className='statValue'
                  sx={{
                    marginLeft: { xs: '10px', sm: smallest ? "10px" : '0' },
                    ...responsiveFontSize
                  }}
                >
                  {statValue}
                </Typography>
              </Box>
              <Box
                gridColumn="span 3"
                sx={{ 
                  ...getSmallestResponsiveStyle(smallest, "display", {
                    xs: 'none',
                    sm: 'block',
                    md: 'none',
                    lg: 'block'
                  })
                }}
                width="100%"
              >
                <Box sx={{ marginLeft: { xs: '16px', sm: smallest ? "16px" : '0' } }}>
                  <PokemonStatBar width={width} color={color} />
                </Box>
              </Box>
              <Box gridColumn="span 1">
                <Typography
                  className='statValue'
                  sx={{
                    marginLeft: { xs: '10px', sm: smallest ? "10px" : '0' },
                    ...responsiveFontSize
                  }}
                >
                  {pokemonIVs[stat.key]}
                </Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography
                  className='statValue'
                  sx={{
                    marginLeft: { xs: '10px', sm: smallest ? "10px" : '0' },
                    ...responsiveFontSize
                  }}
                >
                  {pokemonEVs[stat.key]}
                </Typography>
              </Box>
            </Fragment>
          );
        })}
      </Box>
    </Box>
  );
};

const PokemonStatBar = ({ width, color }) => {
  return (
    <span
      style={{
        display: 'block',
        width: `${Math.floor(width)}px`,
        background: `hsl(${color}, 85%, 45%)`,
        backgroundColor: `hsl(${color}, 75%, 35%)`,
        height: '12px',
        borderRadius: '2px',
        boxShadow: 'inset 1px 4px 0 rgb(255 255 255 / 40%), inset -1px -1px 0 rgb(0 0 0 / 30%)',
      }}
    />
  );
};
