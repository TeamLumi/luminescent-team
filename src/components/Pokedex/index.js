import React, { useState } from 'react';
import style from './styles.module.css';
import { Box, Typography, Avatar, Container } from '@mui/material';
import { getPokemonInfo, getPokemonLearnset, getEggMoves } from '../../../dexUtils';
import Type from './type';
import EvolutionGraph from './EvolutionGraph';
import { PokemonStats } from './PokemonStats';
import { PokemonSearch } from './PokemonSearch';
import { PokemonMovesetList } from './PokemonMovesetList';
import { PokemonAccordion } from './PokemonAccordion';

export default function PokedexFeatures() {
  const [pokemonDexId, setPokemonDexId] = useState(1);
  const pokemonInfo = getPokemonInfo(pokemonDexId ?? 0);

  const learnset = getPokemonLearnset(pokemonDexId);
  const moveList = [];
  for (let i = 0; i < learnset.length; i += 2) {
    moveList.push({ level: learnset[i], moveId: learnset[i + 1] });
  }

  const tmLearnset = pokemonInfo.tmLearnset;
  const eggLearnset = getEggMoves(pokemonDexId);

  return (
    <Container>
      <Container>
        <Box display="flex" justifyContent="center" marginTop="16px">
          <PokemonSearch setPokemonDexId={setPokemonDexId} />
        </Box>
      </Container>
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
        <EvolutionGraph dexId={pokemonDexId} />
      </div>

      <Container>
        <PokemonAccordion title="Moves learnt via level-up" id="levelMoveset">
          <PokemonMovesetList moveset={moveList} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via Technical Machine" id="tmMoveset">
          <PokemonMovesetList moveset={tmLearnset} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via breeding" id="eggMoveset">
          <PokemonMovesetList moveset={eggLearnset} />
        </PokemonAccordion>
      </Container>
    </Container>
  );
}
