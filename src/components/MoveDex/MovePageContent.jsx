import { Box, Container, Typography } from '@mui/material';
import React, { useState } from 'react'
import { MoveSearchBox } from './MoveSearchBox';
import { MovesetListItem } from '../Pokedex2/PokemonMovesetList';

const MovePageContent = ({ move2, move3, moveV, movesList }) => {
  const [moveName, setMoveName] = useState(move3.name);
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
        <Box
          display="grid"
          border={"2px solid var(--ifm-table-border-color)"}
          borderRadius={"5px"}
          padding={"15px"}
          margin={"1rem 0"}
          gridTemplateColumns={"1fr 11fr"}
        >
          <Typography sx={{ margin: "1rem 0" }}>Vanilla BDSP</Typography>
          {moveV?.name ? (
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
              <MovesetListItem move={moveV} />
            </Box>
          ) : (
            <Typography
              variant='h6'
              alignContent={"center"}
              textAlign={"center"}
            >
              {`This move doesn't exist in Vanilla`}
            </Typography>
          )}
        </Box>

        <Box
          display="grid"
          border={"2px solid var(--ifm-table-border-color)"}
          borderRadius={"5px"}
          padding={"15px"}
          margin={"1rem 0"}
          gridTemplateColumns={"1fr 11fr"}
        >
          <Typography sx={{ margin: "1rem 0" }}>Luminescent 2.1F</Typography>
          {move2?.name ? (
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
              <MovesetListItem move={move2} />
            </Box>
          ) : (
            <Typography
              variant='h6'
              alignContent={"center"}
              textAlign={"center"}
            >
              {`This move doesn't exist in 2.1F`}
            </Typography>
          )}
        </Box>

        <Box
          display="grid"
          border={"2px solid var(--ifm-table-border-color)"}
          borderRadius={"5px"}
          padding={"15px"}
          margin={"1rem 0"}
          gridTemplateColumns={"1fr 11fr"}
        >
          <Typography sx={{ margin: "1rem 0" }}>Re: Illuminated</Typography>
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
            <MovesetListItem move={move3} />
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default MovePageContent;
