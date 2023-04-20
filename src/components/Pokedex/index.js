import React, { useState } from 'react';
import style from './styles.module.css';
import { Grid, Typography, Avatar } from '@mui/material';
import { getPokemonInfo, getPokemonLearnset, getEggMoves } from '../../../dexUtils';
import Type from './type';
import PokedexAccordion from './pokedexAccordion';
import EvolutionGraph from './EvolutionGraph';
import { PokemonStats } from './PokemonStats/PokemonStats';

export default function PokedexFeatures(props) {
  const pokemonInfo = getPokemonInfo(props.dexId ?? 0);
  const [expanded, setExpanded] = useState('panel1');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const learnset = getPokemonLearnset(props.dexId);
  const moveList = [];
  for (let i = 0; i < learnset.length; i += 2) {
    moveList.push({ level: learnset[i], moveId: learnset[i + 1] });
  }

  const tmLearnset = pokemonInfo.tmLearnset;
  const eggLearnset = getEggMoves(props.dexId);

  return (
    <div>
      <div className="container">
        <div className="row">
          <Typography variant="h2" component="h3" sx={{ paddingLeft: '16px' }}>
            {pokemonInfo.name}
          </Typography>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col col-4">
            <Avatar
              alt={pokemonInfo.name}
              src={pokemonInfo.imageSrc}
              sx={{ width: 80, height: 80, textAlign: 'center', margin: '16px' }}
            ></Avatar>
          </div>
          <div className="col col-4">
            <Type type1={pokemonInfo.type1} type2={pokemonInfo.type2} />
          </div>
          <div className="col col-4">
            <Typography variant="h6" component="h6">
              <p className={style.flex}>Size:</p>
              {pokemonInfo.height}m, {pokemonInfo.weight}kg
              <br />
              <span style={{ fontSize: '0.8rem' }}>
                <i>Grass Knot: {pokemonInfo.grassKnotPower}</i>
              </span>
            </Typography>
          </div>
        </div>
      </div>
      <PokemonStats baseStats={pokemonInfo.baseStats} baseStatsTotal={pokemonInfo.baseStatsTotal} />
      <div className="container">
        <EvolutionGraph dexId={props.dexId} />
      </div>
      <Grid item xs={12}>
        <PokedexAccordion
          dexId={props.dexId}
          learnset={moveList}
          panelId="panel1"
          headerId="panel1bh-header"
          ariaLabel="panel1bh-content"
          expanded={expanded}
          handleChange={handleChange}
          learnsetName="Moves learnt via level-up"
        />
        <PokedexAccordion
          dexId={props.dexId}
          learnset={tmLearnset}
          panelId="panel2"
          headerId="panel2bh-header"
          ariaLabel="panel2bh-content"
          expanded={expanded}
          handleChange={handleChange}
          learnsetName="Moves learnt via Technical Machine"
        />
        <PokedexAccordion
          dexId={props.dexId}
          learnset={eggLearnset}
          panelId="panel3"
          headerId="panel3bh-header"
          ariaLabel="panel3bh-content"
          expanded={expanded}
          handleChange={handleChange}
          learnsetName="Moves learnt via breeding"
        />
      </Grid>
    </div>
  );
}
