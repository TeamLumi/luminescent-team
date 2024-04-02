import React from 'react';
import { Typography, Box, Container, Button, useMediaQuery, useTheme } from '@mui/material';
import Link from '@docusaurus/Link';

import { LINK_KEYS, LOCATION_ICONS } from '../../utils/dex/encountersConstants';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { getPokemonName } from '../../utils/dex/name';

export const PokemonLocations = ({ locations, showMore, setShowMoreLocations, pokemonId }) => {
  if (locations === undefined) {
    return (
      <Container>
        <Typography fontSize="0.9rem">Data for this pokemon could not be found.</Typography>
      </Container>
    );
  }

  if (locations.length === 0) {
    return (
      <>
        <Box
          display="flex"
          justifyContent={{sm: "center", md: "center"}}
          width={{md: "80%", lg: "unset"}}
        >
          <Typography variant='h6'>Locations:</Typography>
        </Box>

        <Box sx={{
          display: "flex",
          alignItems: "center",
          height: {xs: "min-content", md: "min-content", lg: "244px"},
          padding: "12px !important",
          borderRadius: "5px",
          border: "2px solid var(--ifm-table-border-color)",
          }}
        >
          <Typography fontSize="0.9rem">
            {getPokemonName(pokemonId)} cannot be found in the wild. Try checking previous evolutions or alternative forms.
            <br/> <br/>
            If you have checked previous evolutions and believe this to be an error, please report it to the Discord.
          </Typography>
        </Box>
      </>
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
            pokemonId={pokemonId}
            showMore={showMore || locations.length < 5}
          />
        ))}
      </Container>
      {locations.length >= 5 && (
        <Box sx={{display: "flex", justifyContent: "center"}}>
          <Button onClick={() => setShowMoreLocations(!showMore)}>
            {showMore ? "Show Less" : "Show More"}
          </Button>
        </Box>
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

const LocationListItem = ({ location, pokemonId, showMore }) => {
  const theme = useTheme();
  const showIcon = showMore && useMediaQuery(theme.breakpoints.up("sm"));
  const locationMethod = location.method === "Legendaries" ? "Legends" : location.method
  const pokemonName = getPokemonName(pokemonId).toLowerCase().replace(" ", "-");

  return (
    <>
      <Box>
        <Typography>
          {location.name}
        </Typography>
      </Box>
      <Box display="flex">
        {showIcon &&
          (LOCATION_ICONS[location.method].map((icon) => (
            <ImageWithFallback
              key={icon}
              src={icon}
              fallbackSrc={"/img/404error.webp"}
              width={20}
              height={20}
              title={locationMethod}
              alt={locationMethod}
            />
          )))
        }
        <Typography>
          {location.link || LINK_KEYS.includes(location.method)
            ? location.link
              ? <Link to={location.link}>{locationMethod}</Link>
              : <Link
                  to={`/docs/special-events/${location.method.toLowerCase()}#${pokemonName}`}
                >
                  {locationMethod}
                </Link>
            : locationMethod}
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
