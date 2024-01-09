import React, { Fragment, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { STATS, calcStat } from '../../core/pokemonStatCalculation';
import "./style.css";
import { getPokemonName } from '../../utils/dex';

function getStatBarValues(stat) {
  let width = Math.floor((stat * 140) / 200);
  if (width > 140) width = 140;
  let color = Math.floor((stat * 180) / 255);
  if (color > 360) color = 360;
  return { width, color };
}

export const PokemonStats = ({ baseStats, trainerPokemon }) => {
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
  const hpStat = calcStat(
    baseStats.hp,
    pokemonStatValues[0].key,
    pokemonStatValues[0].isHpStat,
    trainerPokemon.level,
    pokemonIVs[pokemonStatValues[0].key],
    pokemonEVs[pokemonStatValues[0].key],
    trainerPokemon.nature
  )
  return (
    <div className="container">
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" justifyItems={"center"}>
        <>
          <Box gridColumn="span 1"/>
          <Box gridColumn="span 1">
            <Typography variant='h6'>Total:</Typography>
          </Box>
          <Box gridColumn="span 3" />
          <Box gridColumn="span 1">
            <Typography variant='h6'>IVs:</Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography variant='h6'>EVs:</Typography>
          </Box>
        </>
        {pokemonStatValues.map((stat) => {
          const { width, color } = getStatBarValues(stat.value);
          const statValue = calcStat(
            baseStats[stat.key],
            stat.key,
            stat.isHpStat,
            trainerPokemon.level,
            pokemonIVs[stat.key],
            pokemonEVs[stat.key],
            trainerPokemon.nature,
            getPokemonName(trainerPokemon.id)
          )

          return (
            <Fragment key={stat.label}>
              <Box gridColumn="span 1">
                <Typography className='statValue' >{`${stat.key.toUpperCase()}:`}</Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography className='statValue' sx={{ marginLeft: { xs: '10px', sm: '0' } }}>{statValue}</Typography>
              </Box>
              <Box gridColumn="span 3" width="100%">
                <Box sx={{ marginLeft: { xs: '16px', sm: '0' } }}>
                  <PokemonStatBar width={width} color={color} />
                </Box>
              </Box>
              <Box gridColumn="span 1">
                <Typography className='statValue' sx={{ marginLeft: { xs: '10px', sm: '0' } }}>{pokemonIVs[stat.key]}</Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography className='statValue' sx={{ marginLeft: { xs: '10px', sm: '0' } }}>{pokemonEVs[stat.key]}</Typography>
              </Box>
            </Fragment>
          );
        })}
      </Box>
    </div>
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
