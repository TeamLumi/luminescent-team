import { Typography } from '@mui/material';
import React from 'react';
import style from './styles.module.css';


function getColor(stat) {
  let width = Math.floor(stat * 200 / 200);
  if (width > 200) width = 200;
  let color = Math.floor(stat * 180 / 255);
  if (color > 360) color = 360;
  return { width, color }
}

export default function BaseStatsList(props) {
  const stats = ['HP:', 'Attack:', 'Defense:', 'Sp.Atk:', 'Sp.Def:', 'Speed:', 'Total:'];
  const { hp, atk, def, spa, spd, spe } = props.stats;
  const total = props.total;
  const statData = [
    hp,
    atk,
    def,
    spa,
    spd,
    spe,
    total
  ];

  return (
    <div className="col col--6">
      <div className="row">
        <Typography variant='h6'>Base Stats:</Typography>
      </div>
      <div className='row'>
        <div className='col col--2'>
          <ul style={{ textAlign: 'right', listStyle: 'none', margin: '0 0 0 5', padding: '0 0 0 0', wordWrap: 'normal' }}>
            <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>{stats[0]}</Typography>
            <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>{stats[1]}</Typography>
            <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>{stats[2]}</Typography>
            <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>{stats[3]}</Typography>
            <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>{stats[4]}</Typography>
            <Typography variant='subtitle1' sx={{ textAlign: 'right' }}>{stats[5]}</Typography>
          </ul>
        </div>
        <div className='col col--2'>
          <ul style={{ textAlign: 'left', listStyle: 'none', margin: '0 0 0 5', padding: '0 0 0 0', wordWrap: 'normal' }}>
            <Typography variant='subtitle1'>{statData[0]}</Typography>
            <Typography variant='subtitle1'>{statData[1]}</Typography>
            <Typography variant='subtitle1'>{statData[2]}</Typography>
            <Typography variant='subtitle1'>{statData[3]}</Typography>
            <Typography variant='subtitle1'>{statData[4]}</Typography>
            <Typography variant='subtitle1'>{statData[5]}</Typography>
          </ul>
        </div>
        <div className='col col--2'>
          <ul className={style.statBar} style={{ textAlign: 'left', listStyle: 'none', margin: '0 0 0 5', padding: '0 0 0 0', wordWrap: 'normal' }}>
            <span style={{
              display: 'block',
              width: `${Math.floor(getColor(statData[0]).width)}px`,
              background: `hsl(${getColor(statData[0]).color},85%,45%)`,
              backgroundColor: `hsl(${getColor(statData[0]).color},75%,35%)`,
              marginBottom: '10px',
              marginTop: '5px'
            }}></span>
            <span style={{
              display: 'block',
              width: `${Math.floor(getColor(statData[1]).width)}px`,
              background: `hsl(${getColor(statData[1]).color},85%,45%)`,
              backgroundColor: `hsl(${getColor(statData[1]).color},75%,35%)`,
              margin: '10px 0'
            }}></span>
            <span style={{
              display: 'block',
              width: `${Math.floor(getColor(statData[2]).width)}px`,
              background: `hsl(${getColor(statData[2]).color},85%,45%)`,
              backgroundColor: `hsl(${getColor(statData[2]).color},75%,35%)`,
              margin: '10px 0'
            }}></span>
            <span style={{
              display: 'block',
              width: `${Math.floor(getColor(statData[3]).width)}px`,
              background: `hsl(${getColor(statData[3]).color},85%,45%)`,
              backgroundColor: `hsl(${getColor(statData[3]).color},75%,35%)`,
              margin: '10px 0'
            }}></span>
            <span style={{
              display: 'block',
              width: `${Math.floor(getColor(statData[4]).width)}px`,
              background: `hsl(${getColor(statData[4]).color},85%,45%)`,
              backgroundColor: `hsl(${getColor(statData[4]).color},75%,35%)`,
              margin: '10px 0'
            }}></span>
            <span style={{
              display: 'block',
              width: `${Math.floor(getColor(statData[5]).width)}px`,
              background: `hsl(${getColor(statData[5]).color},85%,45%)`,
              backgroundColor: `hsl(${getColor(statData[5]).color},75%,35%)`,
              margin: '10px 0'
            }}></span>
          </ul>
        </div>
      </div>
    </div>
  )
}