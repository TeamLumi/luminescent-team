import React, { useState } from 'react';
import style from './styles.module.css';
import { Box, Typography, Container, Button, Modal } from '@mui/material';
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

export const PokemonPageContent = ({ pokemon, pokemonNames }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Container>
        <Box display="flex" justifyContent="center" marginTop="16px">
          <PokemonSearchBox pokemonNames={pokemonNames} pokemonId={pokemon.id} />
          <Button variant="contained" onClick={handleOpen}>?</Button>
          <Modal open={open} onClose={handleClose}>
            <Box style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'var(--ifm-color-content-inverse)',
              color: 'var(--ifm-color-content)',
              padding: '16px',
              borderRadius: '8px',
              border: 'var(--ifm-table-border-width) solid var(--ifm-table-border-color)',
            }}
            >
              <Typography variant="h6">
This site documents all Pokémon available in Luminescent Platinum 2.0F, including their types, abilities, stats, evolution methods, forms, wild held items, and movesets. It currently does not include locations, but you may use our <a href="https://docs.google.com/spreadsheets/d/1a-NSfEgtt8kAr1cXwKkmY2SylYMs2tUG5tMSIhK0-OY/edit">Pokémon Locations by Route documentation</a> or the Pokédex channel in our <a href="https://discord.gg/luminescent">Discord</a> to access that information in the meanwhile.
<br/><br/>
For your convenience:
<ul>
  <li>Clicking on an Ability will list its effects on the same page.</li>
  <li>Clicking on item rates will also show you what they change to when a Pokémon with Frisk or Super Luck are at the front of the party.</li>
</ul>
Planned Changes:
<ul>
  <li>Encounter locations to the Pokédex displayed here.</li>
  <li>A comparison toggle to view vanilla BDSP stats to against any changes we have made.</li>
</ul>
Please keep an eye on this main page to see what other features may become available.
</Typography>
            </Box>
          </Modal>
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
            <ImageWithFallback
              alt={pokemon.name}
              src={`/img/${pokemon.imageSrc}`}
              fallbackSrc={`/img/${pokemon.forms[0].imageSrc}`}
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
      <div className="container" style={{marginBottom: '16px'}}>
        <EvolutionGraph pokemonID={pokemon.id}/>
      </div>

      <Container>
        <PokemonAlternativeFormsList pokemonForms={pokemon.forms} />
      </Container>

      <Container>
        <Box display="flex" sx={{ flexDirection: { xs: 'column', sm: 'row', marginBottom: '16px' } }}>
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
        <PokemonAccordion title="Moves learnt via Tutor" id="eggMoveset">
          <PokemonMovesetList moveset={pokemon.learnset.tutor} movesetPrefix="tutor" pokemonDexId={pokemon.id} />
        </PokemonAccordion>
      </Container>

      <Container>
        <Box style={{marginTop: '50px', marginBottom: '10px'}}>
          <Typography variant="overline">
            <b>Credits:</b>
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
