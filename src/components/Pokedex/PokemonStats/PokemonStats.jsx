import React, { Fragment, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

function getStatBarValues(stat) {
  let width = Math.floor((stat * 200) / 200);
  if (width > 200) width = 200;
  let color = Math.floor((stat * 180) / 255);
  if (color > 360) color = 360;
  return { width, color };
}

const NATURE_MULTIPLIER = {
  LOW: 0.9,
  STANDARD: 1.0,
  HIGH: 1.1,
};

const IV = {
  MIN: 0,
  MAX: 31,
};

const EV = {
  MIN: 0,
  MAX: 255,
};

const MIN_LEVEL = 1;
const MAX_LEVEL = 100;

function calcStat(baseStat, isHP, level, individualValue = 0, effortValue = 0, natureMult) {
  if (isHP) {
    if (baseStat === 1) return 1;
    return Math.floor(
      (Math.floor(2 * baseStat + individualValue + Math.floor(effortValue / 4) + 100) * level) / 100 + 10,
    );
  }
  let val = Math.floor((Math.floor(2 * baseStat + individualValue + Math.floor(effortValue / 4)) * level) / 100 + 5);

  if (natureMult && !isHP) {
    val *= natureMult;
  }

  return Math.floor(val);
}

const calcMinNegStat = (stat, isHp, level) => calcStat(stat, isHp, level, IV.MIN, EV.MIN, NATURE_MULTIPLIER.LOW);
const calcMinStat = (stat, isHp, level) => calcStat(stat, isHp, level, IV.MAX, EV.MIN, NATURE_MULTIPLIER.STANDARD);
const calcMaxStat = (stat, isHp, level) => calcStat(stat, isHp, level, IV.MAX, EV.MAX, NATURE_MULTIPLIER.STANDARD);
const calcMaxPosStat = (stat, isHp, level) => calcStat(stat, isHp, level, IV.MAX, EV.MAX, NATURE_MULTIPLIER.HIGH);

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
                <Typography>{stat.value}</Typography>
              </Box>
              <Box gridColumn="span 3">{<PokemonStatBar width={width} color={color} />}</Box>
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
                inputProps={{ min: MIN_LEVEL, max: MAX_LEVEL }}
                value={level}
                onChange={(e) => {
                  let value = parseInt(e.target.value);

                  if (value > MAX_LEVEL) value = MAX_LEVEL;
                  if (value < MIN_LEVEL) value = MIN_LEVEL;
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
