import React, { useState } from 'react';
import style from './styles.module.css';
import { Box, Typography, Container } from '@mui/material';
import Type from './type';
import EvolutionGraph from './EvolutionGraph';
import { PokemonStats } from './PokemonStats';
import { PokemonSearchBox } from './PokemonSearchBox';
import { PokemonMovesetList } from './PokemonMovesetList';
import { PokemonAccordion } from './PokemonAccordion';
import { PokemonAlternativeFormsList } from './PokemonAlternativeFormsList';
import { PokemonAbilities } from './PokemonAbilities';
import { PokemonGenderRatio } from './PokemonGenderRatio';
import { PokemonEggGroups } from './PokemonEggGroups';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { PokemonItems } from './PokemonItems';
import { PokemonInfoButton } from './PokedexInfoButton';
import { getTechMachineLearnset } from '../../utils/dex/moves';
import { getPokemonMonsNoAndFormNoFromPokemonId } from '../../utils/dex/name';
import { PokemonLocations } from './PokemonLocations';

const tempLocationData = [
  {
    name: "Jubilife City",
    method: "Grass",
    level: 15,
    chance: "20%"
  },
  {
    name: "Lumiose City",
    method: "Sewers",
    level: 55,
    chance: "100%"
  },
  {
    name: "Jubilife City",
    method: "Grass",
    level: 15,
    chance: "20%"
  },
  {
    name: "Lumiose City",
    method: "Sewers",
    level: 55,
    chance: "100%"
  },
  {
    name: "Jubilife City",
    method: "Grass",
    level: 15,
    chance: "20%"
  },
  {
    name: "Lumiose City",
    method: "Sewers",
    level: 55,
    chance: "100%"
  },
];

function padNumberWithZeros(number) {
  const strNumber = String(number);
  const zerosToAdd = 4 - strNumber.length;
  
  if (zerosToAdd > 0) {
      return '0'.repeat(zerosToAdd) + strNumber;
  } else {
      return strNumber;
  }
}

export const PokemonPageContent = ({ pokemon, pokemonNames }) => {
  const [monsNo, formNo] = getPokemonMonsNoAndFormNoFromPokemonId(pokemon.id)
  const [showMoreLocations, setShowMoreLocations] = useState(false);
  return (
    <Container>
      <Container>
        <Box display="flex" justifyContent="center" marginTop="16px">
          <PokemonSearchBox pokemonNames={pokemonNames} pokemonId={pokemon.id} />
          <PokemonInfoButton />
        </Box>
      </Container>
      <div className="container">
        <div className="row">
          <Typography variant="h6" display="flex" sx={{ paddingLeft: '16px', paddingBottom: '12px', alignItems: "end"}}>
            {`#${padNumberWithZeros(monsNo)}: `}
          </Typography>
          <Typography variant="h2" display="flex" sx={{ paddingLeft: '8px', alignItems: "end"}}>
            {` ${pokemon.name}`}
          </Typography>
        </div>
      </div>
      <div className="container">
        <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1}>
          <Box className={style.pokeColumn} gridColumn="span 1">
            <ImageWithFallback
              alt={pokemon.name}
              src={`/img/${pokemon.imageSrc}`}
              fallbackSrc={`/img/${pokemon.forms[0].imageSrc}`}
              style={{ objectFit: 'contain', margin: '16px' }}
              width="80px"
              height="80px"
            />
          </Box>
          <Box className={style.pokeColumn} gridColumn="span 1">
            <Type type1={pokemon.type1} type2={pokemon.type2} />
          </Box>
          <Box className={style.pokeColumn} gridColumn="span 1">
            <Typography variant="h6" component="h6">
              <p className={style.flex}>Size:</p>
              {pokemon.height}m, {pokemon.weight}kg
              <br />
              <span style={{ fontSize: '0.8rem' }}>
                <i>Grass Knot: {pokemon.grassKnotPower}</i>
              </span>
            </Typography>
          </Box>
        </Box>
      </div>

      <Container>
        <PokemonAbilities
          abilityName1={pokemon.ability1}
          abilityName2={pokemon.ability2}
          abilityNameHidden={pokemon.abilityH}
        />
      </Container>

      <Container>
        <Box
          display="grid"
          gridTemplateColumns={{
            sm: "1fr", 
            md: "repeat(2, 1fr)",
            lg: showMoreLocations ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
          }}
          justifyContent={{
            sm: "center",
            md: "unset",
          }}
          justifyItems={{
            sm: "center",
            md: "unset",
          }}
          gap={1}
          marginTop="25px"
          marginBottom="12px"
        >
          <Box gridColumn="span 1" width={{sm: "80%", md: "unset"}} className={style.secondPokeColumn}>
            <PokemonStats baseStats={pokemon.baseStats} baseStatsTotal={pokemon.baseStatsTotal} />
          </Box>
          <Box display={{xs: "none", sm: "none", md: "none", lg: showMoreLocations ? "none" : "unset"}}>
            <PokemonLocations
              locations={tempLocationData}
              showMore={showMoreLocations}
              setShowMoreLocations={setShowMoreLocations}
            />
          </Box>
          <Box width={{sm: "80%", md: "unset"}} gridColumn="span 1">
            <Box display="flex" justifyContent="center">
              <Typography variant='h6'>Additional Info:</Typography>
            </Box>
            <Container
              sx={{
                border: "2px solid var(--ifm-table-border-color)",
                borderRadius: "5px",
                height: "244px", // TODO Set this to be smaller when in mobile
                padding: "12px !important"
              }}
            >
              <PokemonItems pokemonId={pokemon.id}/>
              <PokemonEggGroups eggGroupNames={pokemon.eggGroupNames} sx={{ marginTop: '16px' }} />
              <PokemonGenderRatio genderDecimalValue={pokemon.genderDecimalValue} sx={{ marginTop: '16px' }} />
            </Container>
          </Box>
          <Box
            display={{xs: "grid", lg: showMoreLocations ? "grid" : "none"}}
            justifyItems="center"
            gridColumn={{sm: "span 1", md: "span 2", lg: showMoreLocations ? "span 2" : "unset"}}
            width={{sm: "80%", md: "unset"}}
          >
            <PokemonLocations
              locations={tempLocationData}
              showMore={showMoreLocations}
              setShowMoreLocations={setShowMoreLocations}
            />
          </Box>
        </Box>
      </Container>

      <Container>
        <EvolutionGraph pokemonID={pokemon.id}/>
      </Container>

      <Container>
        <PokemonAlternativeFormsList pokemonForms={pokemon.forms} />
      </Container>

      <Container>
        <PokemonAccordion title="Moves learnt via level-up" id="levelMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.level} movesetPrefix="levelup" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via Technical Machine" id="tmMoveset">
          <PokemonMovesetList moveset={getTechMachineLearnset(pokemon.id)} movesetPrefix="tm" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via breeding" id="eggMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.egg} movesetPrefix="egg" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
        <PokemonAccordion title="Moves learnt via Tutor" id="eggMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.tutor} movesetPrefix="tutor" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
      </Container>

      <Container>
        <Box style={{marginTop: '50px', marginBottom: '10px'}}>
          <Typography variant="overline">
            <b>Credits:</b><br/>
          </Typography>
          <Typography variant="caption">
            Design based on the application by the <a href="https://github.com/Zarel/Pokemon-Showdown-Dex/graphs/contributors">Smogon Dex Team</a>, which can be found <a href="https://dex.pokemonshowdown.com/">here.</a><br/>
            Specific credits for the full Pokédex application go to Denmark, Glup and A-A-ron from Team Luminescent. Smogon Dex Team credits are as follows:<br/> Zarel, Marty-D, scheibo, KrisXV, Karthik99999, AnnikaCodes, SadisticMystic, pyuk-bot, mia-pi-git, penpexgit, asgdf and jakobw.<br/>
            This is the only section of the site where external inspiration was used.
          </Typography>
        </Box>
      </Container>
    </Container>
  );
};
