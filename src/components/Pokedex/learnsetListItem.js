import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { getMoveProperties } from '../../../dexUtils';
import { ListItem, ListItemText } from '@mui/material';
import {getType} from '../../../dexUtils';

const DMG_TYPE = ['/img/status_dmg_type.png', '/img/phys_dmg_type.png', '/img/special_dmg_type.png'];
const TYPECOLOR_MAP = [
  { '--type-color': '#929da3', float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#ce436a',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#8caadc',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#ac66c8',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#d97946',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#c6b887',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#90c127',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#4e6caa',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#518ea3',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#ff9d54',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#4f92d6',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#65bd55',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#fad143',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#f97175',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#72cfbd',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#116ac4',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#5b5464',float: 'left', width: '50%', margin: '3px'},
  { '--type-color': '#eb92e4',float: 'left', width: '50%', margin: '3px'},
];

function LevelDisplay(props) {
  const level = props.level;
  if(level === 'egg') return (
    <img src="/img/pm0000_00_00_00_L.webp" alt="Egg Move" width='30px' height='35px'/>
  );
  if(level === 'tm') return (
    <img src="/img/Item_TM.webp" alt="Technical Machine" width='35px' height='35px'/>
  );
  return level;
}

export default function LearnsetListItem(props) {
  const { level, moveId } = props;
  const {
    name,
    desc,
    type,
    damageType, //0 = Status, 1 = Physical, 2 = Special
    maxPP,
    power,
    accuracy
  } = getMoveProperties(moveId);

  return (
    <ListItem key={props.myKey}>
      <ListItemText>
        <div className='row'>
          <span className={clsx('col col--1', styles.tagCol)}><LevelDisplay level={level} /></span>
          <span className={clsx('col col--2', styles.moveNameCol)}>{name}</span>
          <span className={clsx('col col--2', styles.typeCol)}>
            <div className={clsx(styles.typeBg)} style={TYPECOLOR_MAP[type]}>
              <div className={styles.bTransparent}>
                {getType(type)}
              </div>
            </div>
            <img src={DMG_TYPE[damageType]} style={{float: 'right' }} width='64px' height='36px' alt="Damage Type"/>
          </span>
          {power ? (
            <span className={clsx('col col--1', styles.labelCol)}>
              <em>Power</em>
              <br />
              {power}
            </span>
          ) : (
            <span className={clsx('col col--1', styles.labelCol)}>
            </span>
          )
          }
          <span className={clsx('col col--1', styles.accLabelCol)}>
            <em>Accuracy</em>
            <br />
            {accuracy === 101 ? '--' : accuracy}
          </span>
          <span className={clsx('col col--1', styles.ppLabelCol)}>
            <em>PP</em>
            <br />
            {maxPP}
          </span>
          <span className={clsx('col col--3')} style={{whiteSpace: 'pre-wrap'}}>
            {desc}
          </span>
        </div>
      </ListItemText>
    </ListItem>
  )
}