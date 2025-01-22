import { Box, Button, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { MoveSearchBox } from './MoveSearchBox';
import { MovesetListItem } from '../Pokedex2/PokemonMovesetList';
import { searchForMovesOnPokemon } from '../../../plugins/pokedex-data-plugin/dex/moves';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { getImage } from '../../utils/dex';
import { getPokemonIdFromMonsNoAndForm } from '../../../plugins/pokedex-data-plugin/dex/functions';
import { getPokemonName } from '../../../plugins/pokedex-data-plugin/dex/name';
import Link from '@docusaurus/Link';

const MoveContainer = ({ gameMode, move }) => {
  return (
    <Box
      display="grid"
      border={"2px solid var(--ifm-table-border-color)"}
      borderRadius={"5px"}
      padding={"15px"}
      margin={"1rem 0"}
      gridTemplateColumns={"1fr 11fr"}
    >
      <Typography sx={{ margin: "1rem 0" }}>{gameMode}</Typography>
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

const PokemonContainer = () => {
  return (
    <>
    </>
  );
};

const MovePageContent = ({ move2, move3, moveV, movesList }) => {
  const [moveName, setMoveName] = useState(move3.name);

  const combineLearnsetsByMode = (data) => {
    const combinedData = {};

    // Iterate through each mode
    Object.entries(data).forEach(([mode, entries]) => {
      entries.forEach(({ id, learnsets }) => {
        // Ensure the ID exists in the combinedData
        if (!combinedData[id]) {
          combinedData[id] = { id };
        }

        // Add the mode and its learnsets
        if (!combinedData[id][mode]) {
          combinedData[id][mode] = [];
        }
        combinedData[id][mode].push(...learnsets);

        // Deduplicate the learnsets for this mode
        combinedData[id][mode] = [...new Set(combinedData[id][mode])];
      });
    });

    // Convert combinedData back to an array
    return Object.values(combinedData);
  };

  const validMovesV = searchForMovesOnPokemon(moveV.moveId, GAMEDATAV);
  const validMoves2 = searchForMovesOnPokemon(move2.moveId, GAMEDATA2);  
  const validMoves3 = searchForMovesOnPokemon(move3.moveId, GAMEDATA3);

  const movesetLists = combineLearnsetsByMode({
    [GAMEDATAV]: validMovesV,
    [GAMEDATA2]: validMoves2,
    [GAMEDATA3]: validMoves3
  });

  return (
    <Container>
      <Container>
        <Box
          sx={{
            display: { xs: "grid", sm: "flex" },
            gridTemplate: {
              xs: `"a b"
                   "c c"`,
              sm: "unset"
            },
            gap: { xs: ".5rem", sm: "unset" },
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          <MoveSearchBox movesList={movesList} moveName={moveName} />
        </Box>
      </Container>
      <Container>
        <MoveContainer gameMode={"Vanilla BDSP"} move={moveV} />
        <MoveContainer gameMode={"Luminescent 2.1.1F"} move={move2} />
        <MoveContainer gameMode={"Re: Illuminated"} move={move3} />
      </Container>
      <Container>
        <Box
          display="grid"
          gridTemplateColumns={{
            mx: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
            lg: "1fr 1fr 1fr 1fr",
          }}
        >
          {movesetLists.map((moveset) => {
            const [monsNo, formNo] = moveset.id.split("-");
            const pokemonId = getPokemonIdFromMonsNoAndForm(parseInt(monsNo), parseInt(formNo), GAMEDATA3);
            const pokemonPath = parseInt(formNo) === 0 ? monsNo : `${monsNo}_${formNo}`;

            return (
              <Box
                key={moveset.id}
                display="grid"
                gridTemplateColumns=".5fr 1.5fr"
                rowGap="16px"
                height="min-content"
                alignSelf="center"
                border="2px solid var(--ifm-table-border-color)"
                borderRadius="5px"
                margin={{ xs: "8px 0px", sm: "8px" }}
                padding="8px"
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
                <Box alignContent="center">
                  <Link to={`/pokedex/${pokemonPath}`}>
                    <Typography>{getPokemonName(pokemonId, GAMEDATA3)}</Typography>
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
                  sx={{
                    display: "grid",
                    gridTemplateColumns: ".75fr .75fr",
                    padding: "8px"
                  }}
                >
                  <Box gridColumn="span 2">
                    {"How to Learn it:"}
                  </Box>
                  {moveset?.[GAMEDATAV] && (
                    <>
                      <Box>
                        {GAMEDATAV}
                      </Box>
                      <Box>
                        {moveset?.[GAMEDATAV]?.map(
                          (moveType) => (<li key={`${GAMEDATAV}-${moveType}`}>{`${moveType}`}</li>))
                          || ""
                        }
                      </Box>
                    </>
                  )}
                  {moveset?.[GAMEDATA2] && (
                    <>
                      <Box>
                        {GAMEDATA2}
                      </Box>
                      <Box>
                        {moveset?.[GAMEDATA2]?.map(
                          (moveType) => (<li key={`${GAMEDATA2}-${moveType}`}>{`${moveType}`}</li>))
                          || ""
                        }
                      </Box>
                    </>
                  )}
                  {moveset?.[GAMEDATA3] && (
                    <>
                      <Box>
                        {GAMEDATA3}
                      </Box>
                      <Box>
                        {moveset?.[GAMEDATA3]?.map(
                          (moveType) => (<li key={`${GAMEDATA3}-${moveType}`}>{`${moveType}`}</li>))
                          || ""
                        }
                      </Box>
                    </>
                  )}                  
                </Box>
              </Box>
            )
          })}

        </Box>
      </Container>
    </Container>
  );
};

export default MovePageContent;
