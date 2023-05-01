import React from 'react';
import style from './styles.module.css';
import { Typography } from '@mui/material';

const TYPECOLOR_MAP = {
    'Normal': { '--type-color': '#929da3', padding: '2px' },
    'Fighting': { '--type-color': '#ce436a', padding: '2px' },
    'Flying': { '--type-color': '#8caadc', padding: '2px' },
    'Poison': { '--type-color': '#ac66c8', padding: '2px' },
    'Ground': { '--type-color': '#d97946', padding: '2px' },
    'Rock': { '--type-color': '#c6b887', padding: '2px' },
    'Bug': { '--type-color': '#90c127', padding: '2px' },
    'Steel': { '--type-color': '#518ea3', padding: '2px' },
    'Fire': { '--type-color': '#ff9d54', padding: '2px' },
    'Water': { '--type-color': '#4f92d6', padding: '2px' },
    'Grass': { '--type-color': '#65bd55', padding: '2px' },
    'Electric': { '--type-color': '#fad143', padding: '2px' },
    'Psychic': { '--type-color': '#f97175', padding: '2px' },
    'Ice': { '--type-color': '#72cfbd', padding: '2px' },
    'Dragon': { '--type-color': '#116ac4', padding: '2px' },
    'Dark': { '--type-color': '#5b5464', padding: '2px' },
    'Ghost': { '--type-color': '#4e6caa', padding: '2px' },
    'Fairy': { '--type-color': '#eb92e4', padding: '2px' },
}


export default function Type(props) {
    if (!props.type1 || !props.type2) return (
        <div>Error acquiring types: {props.type1}, {props.type2} </div>
    )

    if (props.type1 === props.type2) {
        return (
            <Typography variant="h6" component="h6" style={{ padding: '4px', gap: '0.25rem', display: 'flex-wrap' }}>
                Types: <br />
                <div className={style.typeBg} style={TYPECOLOR_MAP[props.type1]}>
                    <div className={style.bTransparent}>
                        {props.type1}
                    </div>
                </div>
            </Typography>
        )
    }

    return (
        <Typography variant="h6" component="h6" className={style.flex}>
            <p style={{ width: '100%' }}>Types: </p>
            <div className={style.typeBg} style={TYPECOLOR_MAP[props.type1]}>
                <div className={style.bTransparent}>
                    {props.type1}
                </div>
            </div>
            <div className={style.typeBg} style={TYPECOLOR_MAP[props.type2]}>
                <div className={style.bTransparent}>
                    {props.type2}
                </div>
            </div>
        </Typography>
    )
}
