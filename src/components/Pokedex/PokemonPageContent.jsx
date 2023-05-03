import React from 'react';
import style from './styles.module.css';
import { Box, Typography, Container } from '@mui/material';
import Type from './type';
import EvolutionGraph from './EvolutionGraph';
import { PokemonStats } from './PokemonStats';
import { PokemonSearch } from './PokemonSearch';
import { PokemonMovesetList } from './PokemonMovesetList';
import { PokemonAccordion } from './PokemonAccordion';
import { PokemonAlternativeFormsList } from './PokemonAlternativeFormsList';
import { PokemonAbilities } from './PokemonAbilities';
import { PokemonGenderRatio } from './PokemonGenderRatio';
import { PokemonEggGroups } from './PokemonEggGroups';

export const PokemonPageContent = ({ pokemon, pokemonNames }) => {
  return (
    <Container>
      <Container>
        <Box display="flex" justifyContent="center" marginTop="16px">
          <PokemonSearch pokemonNames={pokemonNames} pokemonId={pokemon.id} />
        </Box>
      </Container>
      <div className="container">
        <div className="row">
          <Typography variant="h2" component="h3" sx={{ paddingLeft: '16px' }}>
            {pokemon.name}
          </Typography>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col col-4">
            <img
              alt={pokemon.name}
              src={`/img/${pokemon.imageSrc}`}
              style={{ objectFit: 'contain', margin: '16px' }}
              width="80px"
              height="80px"
            />
          </div>
          <div className="col col-4">
            <Type type1={pokemon.type1} type2={pokemon.type2} />
          </div>
          <div className="col col-4">
            <Typography variant="h6" component="h6">
              <p className={style.flex}>Size:</p>
              {pokemon.height}m, {pokemon.weight}kg
              <br />
              <span style={{ fontSize: '0.8rem' }}>
                <i>Grass Knot: {pokemon.grassKnotPower}</i>
              </span>
            </Typography>
          </div>
        </div>
      </div>

      <Container>
        <PokemonAbilities
          abilityName1={pokemon.ability1}
          abilityName2={pokemon.ability2}
          abilityNameHidden={pokemon.abilityH}
        />
      </Container>

      <PokemonStats baseStats={pokemon.baseStats} baseStatsTotal={pokemon.baseStatsTotal} />
      <div className="container">
        <EvolutionGraph />
      </div>

      <Container>
        <PokemonAlternativeFormsList pokemonForms={pokemon.forms} />
      </Container>

      <Container>
        <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <PokemonEggGroups eggGroupNames={pokemon.eggGroupNames} sx={{ marginRight: '16px' }} />
          <PokemonGenderRatio genderDecimalValue={pokemon.genderDecimalValue} />
        </Box>
      </Container>

      <Container>
        <PokemonAccordion title="Moves learnt via level-up" id="levelMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.level} movesetPrefix="levelup" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via Technical Machine" id="tmMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.tm} movesetPrefix="tm" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via breeding" id="eggMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.egg} movesetPrefix="egg" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
      </Container>
    </Container>
  );
};
