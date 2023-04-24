import React, { Fragment, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { calcMaxPosStat, calcMaxStat, calcMinNegStat, calcMinStat } from '../../core/pokemonStatCalculation';

const POKEMON_MIN_LEVEL = 1;
const POKEMON_MAX_LEVEL = 100;

function getStatBarValues(stat) {
  let width = Math.floor((stat * 200) / 200);
  if (width > 200) width = 200;
  let color = Math.floor((stat * 180) / 255);
  if (color > 360) color = 360;
  return { width, color };
}

export const PokemonStats = ({ baseStats, baseStatsTotal }) => {
  const [level, setLevel] = useState(100);
  const pokemonStatValues = [
    { label: 'HP:', value: baseStats.hp, isHpStat: true },
    { label: 'Attack:', value: baseStats.atk, isHpStat: false },
    { label: 'Defense:', value: baseStats.def, isHpStat: false },
    { label: 'Sp.Atk:', value: baseStats.spa, isHpStat: false },
    { label: 'Sp.Def:', value: baseStats.spd, isHpStat: false },
    { label: 'Speed:', value: baseStats.spe, isHpStat: false },
  ];

  return (
    <div className="container" style={{ marginTop: '25px' }}>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={1}>
        <>
          <Box gridColumn="span 7">
            <Typography variant="h6">Base Stats:</Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
              min-
            </Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
              min
            </Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
              max
            </Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'block' } }}>
              max+
            </Typography>
          </Box>
          <Box gridColumn="span 1" />
        </>

        {pokemonStatValues.map((stat) => {
          const { width, color } = getStatBarValues(stat.value);

          return (
            <Fragment key={stat.label}>
              <Box gridColumn="span 1">
                <Typography textAlign="right">{stat.label}</Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography sx={{ marginLeft: { xs: '10px', sm: '0' } }}>{stat.value}</Typography>
              </Box>
              <Box gridColumn="span 3">
                <Box sx={{ marginLeft: { xs: '16px', sm: '0' } }}>
                  <PokemonStatBar width={width} color={color} />
                </Box>
              </Box>
              <Box gridColumn="span 2" />
              <Box gridColumn="span 1">
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {calcMinNegStat(stat.value, stat.isHpStat, level)}
                </Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {calcMinStat(stat.value, stat.isHpStat, level)}
                </Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {calcMaxStat(stat.value, stat.isHpStat, level)}
                </Typography>
              </Box>
              <Box gridColumn="span 1">
                <Typography sx={{ display: { xs: 'none', sm: 'block' } }}>
                  {calcMaxPosStat(stat.value, stat.isHpStat, level)}
                </Typography>
              </Box>
              <Box gridColumn="span 1" />
            </Fragment>
          );
        })}

        <>
          <Box gridColumn="span 1">
            <Typography textAlign="right">Total:</Typography>
          </Box>
          <Box gridColumn="span 1">
            <Typography>{baseStatsTotal}</Typography>
          </Box>
          <Box gridColumn="span 5" />
          <Box gridColumn="span 4">
            <Box alignItems="center" justifyContent="center" sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Typography variant="body1" component="p" marginRight="12px">
                at level
              </Typography>
              <TextField
                sx={{ marginTop: '10px', float: 'right', color: 'inherit' }}
                type="number"
                size="small"
                inputProps={{ min: POKEMON_MIN_LEVEL, max: POKEMON_MAX_LEVEL }}
                value={level}
                onChange={(e) => {
                  let value = parseInt(e.target.value);

                  if (value > POKEMON_MAX_LEVEL) value = POKEMON_MAX_LEVEL;
                  if (value < POKEMON_MIN_LEVEL) value = POKEMON_MIN_LEVEL;
                  setLevel(value);
                }}
                label="Level"
                InputLabelProps={{ style: { color: 'inherit' } }}
                InputProps={{ style: { color: 'inherit' } }}
              />
            </Box>
          </Box>
        </>
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
        height: '18px',
        borderRadius: '2px',
        boxShadow: 'inset 1px 4px 0 rgb(255 255 255 / 40%), inset -1px -1px 0 rgb(0 0 0 / 30%)',
      }}
    />
  );
};
