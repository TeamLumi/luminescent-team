import * as React from 'react';
import { Typography } from '@mui/material';
import { useState } from 'react';
import {getEvolutionData} from '../../../dexUtils';


export default function EvolutionGraph(props) {
    const {dexId} = props;
    return (
        <div className='container'>
            <div className='row' style={{margin: 'auto', textAlign: 'center'}}>
            <span className='col col-12'>
                <Typography variant='h6' sx={{margin: 'auto'}}>Evolutions</Typography>
            </span>
        </div>
        <div className='row dexEvolutionContainer'>
            <div className='col col-3' style={{textAlign: 'center'}}>
                <img src='/img/pm0001_00_00_00_L.webp' alt="Stage 1 Evo"/>
            </div>
            <div className='col col-1' style={{textAlign: 'center'}}>
                <Typography variant='h6' sx={{verticalAlign: 'middle'}}>→</Typography>
            </div>
            <div className='col col-3' style={{textAlign: 'center'}}>
                <img src='/img/pm0002_00_00_00_L.webp' alt="Stage 2 Evo"/>
            </div>
            <div className='col col-1' style={{textAlign: 'center'}}>
                <Typography variant='h6'>→</Typography>
            </div>
            <div className='col col-3' style={{textAlign: 'center'}}>
                <img src='/img/pm0003_00_00_00_L.webp' alt="Stage 3 Evo"/>
            </div>
        </div>
        </div>
    )
}