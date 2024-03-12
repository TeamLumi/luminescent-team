import React from 'react';
import { Typography, Box, Container, Button } from '@mui/material';
import { LINK_KEYS } from '../../utils/dex/encountersConstants';
import Link from '@docusaurus/Link';

export const PokemonLocations = ({ locations, showMore, setShowMoreLocations, pokemonName }) => {
  if (locations === undefined) {
    return (
      <Container>
        <Typography fontSize="0.9rem">Data for this pokemon could not be found.</Typography>
      </Container>
    );
  }

  if (locations.length === 0) {
    return (
      <Box sx={{display: "flex", alignItems: "center", height: "100%"}}>
        <Typography fontSize="0.9rem">
          Data for this Pokemon could not be found. Try checking previous evolutions. If you have checked previous evolutions, please report this on the Discord.
        </Typography>
      </Box>
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
            xs: "1.5fr 1fr .75fr .5fr"
          },
          alignItems: "center",
          columnGap: "4px",
          rowGap: "8px",
          borderRadius: "5px",
          padding: "12px !important",
          width: {md: "80%", lg: showMore ? "80%" : "unset"},
          maxHeight: showMore || locations.length < 5 ? "unset" : "244px",
          overflow: "hidden",
          WebkitMaskImage: showMore || locations.length < 5 ? "unset" : "linear-gradient(to bottom, black 75%, transparent 100%)",
          maskImage: showMore || locations.length < 5 ? "unset" : "linear-gradient(to bottom, black 75%, transparent 100%)",
          borderImage: showMore || locations.length < 5 ? "unset" : "linear-gradient(to bottom, var(--ifm-table-border-color) 2px, transparent 2px) 0 0 100%",
          border: "2px solid var(--ifm-table-border-color)", // Add this line      
        }}
      >
        <LocationListHeader />
        {locations.map((location, i) => (
          <LocationListItem 
            key={`${location.name}-${i}`}
            location={location}
            pokemonName={pokemonName}
          />
        ))}
      </Container>
      {locations.length >= 5 && (
        <Button sx={{justifySelf: "center"}} onClick={() => setShowMoreLocations(!showMore)}>
          {showMore ? "Show Less" : "Show More"}
        </Button>
      )}
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
      <Typography display="flex" justifyContent="center" fontSize="1.125rem">
        Chance
      </Typography>
    </Box>
  </>
);

const LocationListItem = ({ location, pokemonName }) => {
  return (
    <>
      <Box>
        <Typography>
          {location.name}
        </Typography>
      </Box>
      <Box>
        <Typography>
          {location.link || LINK_KEYS.includes(location.method)
            ? location.link
              ? <Link to={location.link}>{location.method}</Link>
              : <Link
                  to={`/docs/special-events/${location.method.toLowerCase()}#${pokemonName}`}
                >
                  {location.method}
                </Link>
            : location.method}
        </Typography>
      </Box>
      <Box>
        <Typography display="flex" justifyContent="center">
          {location.minLevel !== location.maxLevel ?
            `${location.minLevel} - ${location.maxLevel}` :
            location.minLevel
          }
        </Typography>
      </Box>
      <Box>
        <Typography display="flex" justifyContent="center">
          {Math.ceil(location.chance)}%
        </Typography>
      </Box>
    </>
  )
};
