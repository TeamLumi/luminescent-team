import { Box, Button, Container, Typography } from '@mui/material';
import React, { useState } from 'react'
import { MoveSearchBox } from './MoveSearchBox';
import { MovesetListItem } from '../Pokedex2/PokemonMovesetList';
import { searchForMovesOnPokemon } from '../../../plugins/pokedex-data-plugin/dex/moves';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';

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
  const [movesets, setMovesets] = useState({[GAMEDATAV]: [], [GAMEDATA2]: [], [GAMEDATA3]: []});

  const handleClick = () => {
    const validMovesV = searchForMovesOnPokemon(moveV.moveId, GAMEDATAV);
    const validMoves2 = searchForMovesOnPokemon(move2.moveId, GAMEDATA2);  
    const validMoves3 = searchForMovesOnPokemon(move3.moveId, GAMEDATA3);

    setMovesets({
      [GAMEDATAV]: validMovesV,
      [GAMEDATA2]: validMoves2,
      [GAMEDATA3]: validMoves3
    });
  };

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
        <Button onClick={handleClick}>Fetch Moves</Button>
      </Container>
    </Container>
  );
};

export default MovePageContent;
