import * as React from 'react';
import { TextField, Typography } from '@mui/material';
import { useState } from 'react';

const NATURE_MULTIPLIER = {
  LOW: 0.9,
  STANDARD: 1.0,
  HIGH: 1.1
};

const IV = {
  MIN: 0,
  MAX: 31
}

const EV = {
  MIN: 0,
  MAX: 255
}

function calcStat(baseStat, isHP, level, individualValue = 0, effortValue = 0, natureMult) {
  if (isHP) {
    if (baseStat === 1) return 1;
    return Math.floor(
      Math.floor(
        2 * baseStat + individualValue + Math.floor(effortValue / 4) + 100
      ) * level / 100 + 10
    );
  }
  let val = Math.floor(
    Math.floor(
      2 * baseStat + individualValue + Math.floor(effortValue / 4)
    ) * level / 100 + 5
  );

  if (natureMult && !isHP) {
    val *= natureMult;
  }

  return Math.floor(val);
}

const min = 1;
const max = 100;

function getStats(stat, isHp, level) {
  const minNeg = calcStat(stat, isHp, level, IV.MIN, EV.MIN, NATURE_MULTIPLIER.LOW);
  const min = calcStat(stat, isHp, level, IV.MAX, EV.MIN, NATURE_MULTIPLIER.STANDARD);
  const max = calcStat(stat, isHp, level, IV.MAX, EV.MAX, NATURE_MULTIPLIER.STANDARD);
  const maxPos = calcStat(stat, isHp, level, IV.MAX, EV.MAX, NATURE_MULTIPLIER.STANDARD);
  return [
    minNeg,
    min,
    max,
    maxPos
  ]
}

export default function BaseStatCalculations(props) {
  const [level, setLevel] = useState(100);
  const { hp, atk, def, spa, spd, spe } = props.stats;

  const hpStats = getStats(hp, true, level);
  const atkStats = getStats(atk, false, level);
  const defStats = getStats(def, false, level);
  const spatkStats = getStats(spa, false, level);
  const spdefStats = getStats(spd, false, level);
  const speStats = getStats(spe, false, level);

  const stats = [
    hpStats,
    atkStats,
    defStats,
    spatkStats,
    spdefStats,
    speStats
  ]

  const headers = [
    'min-',
    'min',
    'max',
    'max+'
  ]

  return (
    <div className="col col-6">
      <div className="row">
        {headers.map((head, i) => (
          <div className='col col-1' key={i}>
            <Typography variant='h6'>{head}</Typography>
          </div>
        ))
        }
      </div>
      {headers.map((head, i) => (
        <div className="row" key={i}>
          <div className='col col-1'>
            {stats[i][0]}
          </div>
          <div className='col col-1'>
            {stats[i][1]}
          </div>
          <div className='col col-1'>
            {stats[i][2]}
          </div>
          <div className='col col-1'>
            {stats[i][3]}
          </div>
        </div>
      ))
      }
      <div className='row'>
        <div className='col col-2'>
          <Typography variant="body1" component="p" sx={{marginTop: '10px', float: 'left'}}>at level</Typography>
          <TextField
            sx={{marginTop: '10px', float: 'right', color: 'inherit'}}
            type="number"
            size='small'
            inputProps={{ min, max }}
            value={level}
            onChange={(e) => {
              let value = parseInt(e.target.value);

              if (value > max) value = max;
              if (value < min) value = min;
              setLevel(value);
            }}
            label="Level"
            InputLabelProps={{style: {color: 'inherit'}}}
            InputProps={{style: {color: 'inherit'}}}
          />
          </div>
        <div className='col col-4'>

        </div>
      </div>
    </div>
  )
}