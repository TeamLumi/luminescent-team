import React from 'react';
import { Typography, Box, Container } from '@mui/material';

export const PokemonLocations = ({ locations }) => {
  if (locations === undefined) {
    return (
      <Container>
        <Typography fontSize="0.9rem">Data for this pokemon could not be found.</Typography>
      </Container>
    );
  }

  if (locations.length === 0) {
    return (
      <Container>
        <Typography fontSize="0.9rem">You cannot find this pokemon in this mode.</Typography>
      </Container>
    );
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent={{sm: "center", md: "center"}}
        width={{md: "80%", lg: "unset"}}
      >
        <Typography variant='h6'>Locations:</Typography>
      </Box>
      <Container
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr 1fr .5fr .5fr"
          },
          alignItems: "center",
          columnGap: "4px",
          rowGap: "8px",
          border: "2px solid var(--ifm-table-border-color)",
          borderRadius: "5px",
          padding: "12px !important",
          width: {md: "80%", lg: "unset"}
        }}
      >
        <LocationListHeader />
        {locations.map((location, i) => (
          <LocationListItem 
            key={`${location.name}-${i}`}
            location={location}
          />
        ))}
      </Container>
    </>
  )
};

const LocationListHeader = () => (
  <>
    <Box>
      <Typography fontSize="1.125rem">
        Name
      </Typography>
    </Box>
    <Box>
      <Typography fontSize="1.125rem">
        Method
      </Typography>
    </Box>
    <Box>
      <Typography display="flex" justifyContent="center" fontSize="1.125rem">
        Level
      </Typography>
    </Box>
    <Box>
      <Typography fontSize="1.125rem">
        Chance
      </Typography>
    </Box>
  </>
);

const LocationListItem = ({ location }) => {
  return (
    <>
      <Box>
        <Typography>
          {location.name}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {location.method}
        </Typography>
      </Box>
      <Box>
        <Typography display="flex" justifyContent="center">
          {location.level}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {location.chance}
        </Typography>
      </Box>
    </>
  )
};
