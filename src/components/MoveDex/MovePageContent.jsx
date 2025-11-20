import React, { useEffect, useState } from 'react'
import Link from '@docusaurus/Link';
import { Box, Container, FormGroup, Typography, Checkbox, FormControlLabel, Card, CardHeader, CardContent } from '@mui/material';

import { MoveSearchBox } from './MoveSearchBox';
import { MovesetListItem } from '../Pokedex2/PokemonMovesetList';
import { PokemonAccordion } from '../Pokedex2/PokemonAccordion';
import { ImageWithFallback } from '../common/ImageWithFallback';

import { GAME_MODE_STRINGS, GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';
import { getImage } from '../../utils/dex';
import { getMoveProperties, searchForMovesOnPokemon } from '../../../plugins/pokedex-data-plugin/dex/moves';
import { getPokemonIdFromMonsNoAndForm } from '../../../plugins/pokedex-data-plugin/dex/functions';
import { getPokemonName } from '../../../plugins/pokedex-data-plugin/dex/name';
import { FLAG_STRINGS, LEARNSET_TYPES_MAP } from '../../../plugins/pokedex-data-plugin/dex/moveConstants';
import { useGlobalState } from '../common/GlobalState';
import ModeSwitch from '../common/ModeSwitch';

const MoveContainer = ({ gameMode, move }) => {
  return (
    <Box
      border={"2px solid var(--ifm-table-border-color)"}
      borderRadius={"5px"}
      padding={"15px"}
      margin={"1rem 0"}
    >
      {move?.name ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: `0.5fr 1.5fr 50px 47px 0.5fr 0.5fr 0.5fr`,
              sm: `0.3fr 1fr 54px 48px 0.3fr 0.3fr 0.2fr 2fr`,
              md: `0.3fr 0.8fr 90px 70px 0.3fr 0.3fr 0.2fr 2fr`,
            },
            alignItems: 'center',
            columnGap: '4px',
            rowGap: '8px',
            marginBottom: '8px',
          }}
        >
          <MovesetListItem move={move} />
        </Box>
      ) : (
        <Typography
          variant='h6'
          alignContent={"center"}
          textAlign={"center"}
        >
          {`This move doesn't exist in ${gameMode}`}
        </Typography>
      )}
    </Box>
  );
};

const ExtendedMoveContainer = ({ gameMode, move }) => {
  if (!move?.name) {
    return null;
  }
  let hitCount = `${move.minHitCount}-${move.maxHitCount}`
  if (move.minHitCount === 0 && move.maxHitCount === 0) {
    hitCount = "0"
  } else if (move.minHitCount === 2 && move.maxHitCount === 2) {
    hitCount = "2"
  } else if (move.minHitCount === 3 && move.maxHitCount === 3) {
    hitCount = "3"
  }
  return (
    <Box sx={{ display: { sm: "grid"}, gridTemplateAreas: { sm: "'a a' 'b d' 'c d'", md: "'a d' 'b d' 'c d'" }}}>
      <Card sx={{gridArea: "a"}} variant='outlined'>
        <CardHeader title="Stat Changes" />
        {move.statChanges.some(stat => stat.statType !== "None") ? (
          <CardContent sx={{
            display:"grid",
            gridTemplateColumns:"1fr 2fr 1fr 1.5fr",
            justifyItems:"center"
          }}>
            <Typography></Typography>
            <Typography>Stat Type</Typography>
            <Typography>Stages</Typography>
            <Typography>% Chance</Typography>

            <Typography>Stat 1</Typography>
            <Typography>{move.statChanges[0].statType}</Typography>
            <Typography>{move.statChanges[0].stages}</Typography>
            <Typography>{move.statChanges[0].rate}</Typography>

            {move.statChanges[1].statType !== "None" && (
              <>
                <Typography>Stat 2</Typography>
                <Typography>{move.statChanges[1].statType}</Typography>
                <Typography>{move.statChanges[1].stages}</Typography>
                <Typography>{move.statChanges[1].rate}</Typography>
              </>
            )}

            {move.statChanges[2].statType !== "None" && (
              <>
                <Typography>Stat 3</Typography>
                <Typography>{move.statChanges[2].statType}</Typography>
                <Typography>{move.statChanges[2].stages}</Typography>
                <Typography>{move.statChanges[2].rate}</Typography>
              </>
            )}
          </CardContent>
        ) : <CardContent>{"This move doesn't change stats"}</CardContent>}
      </Card>
      <Card sx={{gridArea: "b"}} variant='outlined'>
        <CardHeader title="Status Affliction" />
        {move.statusEffects.status !== "None" ? (
          <CardContent>
            <Typography>{`Status: ${move.statusEffects.status}`}</Typography>
            <Typography>{`Affliction Rate: ${move.statusEffects.rate}`}</Typography>
            <Typography>{`Status Type: ${move.statusEffects.sickCont}`}</Typography>
            <Typography>
              {`Duration: ${move.statusEffects.minDuration}-${move.statusEffects.maxDuration} turns`}
            </Typography>
          </CardContent>
        ) : <CardContent>{"This move doesn't inflict status"}</CardContent>}
      </Card>
      <Card sx={{gridArea: "c"}} variant='outlined'>
        <CardHeader title="Misc" />
        <CardContent>
          <Typography>{`Move Id: ${move.moveId}`}</Typography>
          <Typography>{`Move Class: ${move.moveClass}`}</Typography>
          <Typography>{`Priority: ${move.priority}`}</Typography>
          <Typography>{`Hit Count: ${hitCount} hit(s)`}</Typography>
          <Typography>{`Base Crit Ratio: ${move.critRatio}`}</Typography>
          <Typography>{`Flinch Chance: ${move.flinchChance}%`}</Typography>
          <Typography>{`Damage Healed: ${move.healDamage}%`}</Typography>
          <Typography>{`HP Recovery: ${move.hpRecover}%`}</Typography>
          <Typography>{`Targeting: ${move.target}`}</Typography>
        </CardContent>
      </Card>
      <Card sx={{gridArea: "d"}} variant='outlined'>
        <CardHeader title="Flags" />
        <CardContent>
          <FormGroup>
            {move.moveFlags.map((flag, index) => {
              if (index > 17) {
                return null;
              }
              const flagName = FLAG_STRINGS[index];
              return (
                <FormControlLabel
                  key={`move-flag-${index}`}
                  control={<Checkbox checked={flag} />}
                  label={flagName}
                />
              )
            })}
          </FormGroup>
        </CardContent>
      </Card>
    </Box>
  );
}

const MoveLearnBox = ({ mode, moveset }) => {
  return (
    <>
      {moveset?.learnsets && (
        <>
          <Typography marginLeft={"1rem"}>
            {moveset?.learnsets?.map(
              (moveType) => (<li key={`${mode}-${moveType}`}>{`${LEARNSET_TYPES_MAP[moveType]}`}</li>))
              || ""
            }
          </Typography>
        </>
      )}
    </>
  )
};

const PokemonMovesetContainer = ({ moveset, gameMode }) => {
  const [monsNo, formNo] = moveset.id.split("-");
  const pokemonId = getPokemonIdFromMonsNoAndForm(parseInt(monsNo), parseInt(formNo), gameMode);
  const pokemonPath = parseInt(formNo) === 0 ? monsNo : `${monsNo}_${formNo}`;

  return (
    <Box
      key={moveset.id}
      display="grid"
      gridTemplateColumns=".75fr 1.5fr"
      rowGap="16px"
      height="min-content"
      border="2px solid var(--ifm-table-border-color)"
      borderRadius="5px"
      margin={{ xs: "8px 0px", sm: "8px" }}
      padding="8px"
      alignSelf={"start"}
      sx={{
        // If you don't split them up like this, then they will
        // have overlapping values and overwrite each other

        // sm: 2 columns
        "@media (min-width: 600px)": {
          "&:nth-of-type(2n)": {
            margin: "8px 0px 8px 8px", // Rightmost in 2-column rows
          },
          "&:nth-of-type(2n-1)": {
            margin: "8px 8px 8px 0px", // Leftmost in 2-column rows
          },
        },

        // md: 3 columns
        "@media (min-width: 900px)": {
          "&:nth-of-type(3n)": {
            margin: "8px 0px 8px 8px", // Rightmost in 3-column rows
          },
          "&:nth-of-type(3n-2)": {
            margin: "8px 8px 8px 0px", // Leftmost in 3-column rows
          },
          "&:nth-of-type(3n-1)": {
            margin: "8px", // Middle element in 3-column rows
          },
        },

        // lg: 4 columns
        "@media (min-width: 1200px)": {
          "&:nth-of-type(4n)": {
            margin: "8px 0px 8px 8px", // Rightmost in 4-column rows
          },
          "&:nth-of-type(4n-3)": {
            margin: "8px 8px 8px 0px", // Leftmost in 4-column rows
          },
          "&:nth-of-type(4n-2), &:nth-of-type(4n-1)": {
            margin: "8px", // Middle elements in 4-column rows
          },
        },
      }}
    >
      <Box margin={"auto"} textAlign={"center"}>
        <Link to={`/pokedex/${pokemonPath}`}>
          <Typography>{getPokemonName(pokemonId, gameMode)}</Typography>
        </Link>
        <ImageWithFallback
          alt={moveset.id}
          src={getImage(monsNo, formNo)}
          fallbackSrc={getImage(monsNo, 0)}
          style={{ objectFit: 'contain', marginTop: '8px' }}
          width="64px"
          height="64px"            
        />
      </Box>
      <Box
        sx={{ padding: "8px", paddingTop: "0px" }}
      >
        <Box>
          {"How to Learn it:"}
        </Box>
        <MoveLearnBox mode={gameMode} moveset={moveset} />
      </Box>
    </Box>
  );
};

const MovePageContent = ({ move2, move3, moveV, movesList }) => {
  const MOVE_MODE_MAP = {
    [GAMEDATAV]: moveV,
    [GAMEDATA2]: move2,
    [GAMEDATA3]: move3
  }
  const [globalState, updateMode] = useGlobalState();

  const [move, setMove] = useState(MOVE_MODE_MAP[globalState.mode]);
  const [validMoves, setValidMoves] = useState(
    searchForMovesOnPokemon(MOVE_MODE_MAP[globalState.mode].moveId, globalState.mode)
  );

  useEffect(() => {
    setMove(MOVE_MODE_MAP[globalState.mode]);
    setValidMoves(searchForMovesOnPokemon(MOVE_MODE_MAP[globalState.mode].moveId, globalState.mode));
  }, [globalState.mode]);

  // const combineLearnsetsByMode = (data) => {
  //   const combinedData = {};

  //   // Iterate through each mode
  //   Object.entries(data).forEach(([mode, entries]) => {
  //     entries.forEach(({ id, learnsets }) => {
  //       // Ensure the ID exists in the combinedData
  //       if (!combinedData[id]) {
  //         combinedData[id] = { id };
  //       }

  //       // Add the mode and its learnsets
  //       if (!combinedData[id][mode]) {
  //         combinedData[id][mode] = [];
  //       }
  //       combinedData[id][mode].push(...learnsets);

  //       // Deduplicate the learnsets for this mode
  //       combinedData[id][mode] = [...new Set(combinedData[id][mode])];
  //     });
  //   });

  //   // Convert combinedData back to an array
  //   return Object.values(combinedData);
  // };

  // const validMovesV = searchForMovesOnPokemon(moveV.moveId, GAMEDATAV);
  // const validMoves2 = searchForMovesOnPokemon(move2.moveId, GAMEDATA2);  
  // const validMoves3 = searchForMovesOnPokemon(move3.moveId, GAMEDATA3);

  // const movesetLists = combineLearnsetsByMode({
  //   [GAMEDATAV]: validMovesV,
  //   [GAMEDATA2]: validMoves2,
  //   [GAMEDATA3]: validMoves3
  // });

  return (
    <Container>
      <Container
        sx={{
          position: "sticky",
          top: "75px",
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            gridTemplate: {
              xs: `"a a"
                   "c c"`,
              sm: "unset"
            },
            gap: { xs: ".5rem", sm: "unset" },
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <MoveSearchBox movesList={movesList} moveName={move3.name} />
          <ModeSwitch />          
        </Box>
      </Container>
      <Container>
        <MoveContainer gameMode={GAME_MODE_STRINGS[globalState.mode]} move={move} />
        <ExtendedMoveContainer gameMode={globalState.mode} move={move} />
      </Container>
      <Container>
        <Typography variant='h4' textAlign={"center"} margin={".5rem"}>Pokemon that can learn {move3.name}:</Typography>
        <Box
          display="grid"
          gridTemplateColumns={{
            mx: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          }}
        >
          {validMoves.map((moveset, index) => {
            return (
              <PokemonMovesetContainer
                key={`moveset-container-${moveset.id}-${index}`}
                moveset={moveset}
                gameMode={globalState.mode}
              />
            );
          })}
        </Box>
      </Container>
    </Container>
  );
};

export default MovePageContent;
