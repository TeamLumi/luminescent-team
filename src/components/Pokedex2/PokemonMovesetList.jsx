import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import useBaseUrl from '@docusaurus/useBaseUrl';

const DMG_TYPE_ICONS = {
  0: '/img/status_dmg_type.png',
  1: '/img/phys_dmg_type.png',
  2: '/img/special_dmg_type.png',
};

export const TYPE_COLOR_MAP = {
  0: { name: 'Normal', color: '#929da3', iconFilename: 'Normal.webp' },
  1: { name: 'Fighting', color: '#ce436a', iconFilename: 'Fighting.webp' },
  2: { name: 'Flying', color: '#8caadc', iconFilename: 'Flying.webp' },
  3: { name: 'Poison', color: '#ac66c8', iconFilename: 'Poison.webp' },
  4: { name: 'Ground', color: '#d97946', iconFilename: 'Ground.webp' },
  5: { name: 'Rock', color: '#c7b887', iconFilename: 'Rock.webp' },
  6: { name: 'Bug', color: '#90c127', iconFilename: 'Bug.webp' },
  7: { name: 'Ghost', color: '#4e6caa', iconFilename: 'Ghost.webp' },
  8: { name: 'Steel', color: '#518ea3', iconFilename: 'Steel.webp' },
  9: { name: 'Fire', color: '#ff9d54', iconFilename: 'Fire.webp' },
  10: { name: 'Water', color: '#4f92d6', iconFilename: 'Water.webp' },
  11: { name: 'Grass', color: '#65bd55', iconFilename: 'Grass.webp' },
  12: { name: 'Electric', color: '#fad143', iconFilename: 'Electric.webp' },
  13: { name: 'Psychic', color: '#f97175', iconFilename: 'Psychic.webp' },
  14: { name: 'Ice', color: '#72cfbd', iconFilename: 'Ice.webp' },
  15: { name: 'Dragon', color: '#116ac4', iconFilename: 'Dragon.webp' },
  16: { name: 'Dark', color: '#5b5464', iconFilename: 'Dark.webp' },
  17: { name: 'Fairy', color: '#eb92e4', iconFilename: 'Fairy.webp' },
};

const responsiveFontSize = { fontSize: { xs: '0.6rem', sm: '0.75rem', md: '0.9rem', lg: '1rem' } };

export const PokemonMovesetList = ({ moveset, movesetPrefix, pokemonDexId }) => {
  if (moveset.length === 0) {
    return (
      <Container>
        <Typography fontSize="0.9rem">There are no moves here.</Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `0.5fr 1.5fr 50px 47px 0.5fr 0.5fr 0.5fr`,
          sm: `0.3fr 1fr 54px 48px 0.3fr 0.3fr 0.2fr 0.2fr 1.8fr`,
          md: `0.3fr 0.8fr 90px 70px 0.3fr 0.3fr 0.2fr 0.2fr 1.8fr`,
        },
        alignItems: 'start',
        columnGap: '4px',
        rowGap: '8px',
        marginBottom: '8px',
      }}
    >
      {moveset.map((move, i) => (
        <MovesetListItem
          key={`${pokemonDexId}-${movesetPrefix}-move-${move.move.moveId}-${i}`}
          moveLevel={move.level}
          move={move.move}
        />
      ))}
    </Box>
  );
};

const MoveIcon = ({ moveIconType, moveTypeId }) => {
  if (typeof moveIconType === 'number') {
    return (
      <Typography sx={{ textAlign: 'center', fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' } }}>
        {moveIconType}
      </Typography>
    );
  }

  if (moveIconType === 'egg') {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" width={{ xs: '18px', sm: '26px', md: '32px' }}>
        <img src={useBaseUrl('/img/pm0000_00_00_00_L.webp')} alt="Egg Move" />
      </Box>
    );
  }

  if (moveIconType === 'tm') {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" width={{ xs: '30px', sm: '40px' }}>
        <img src={useBaseUrl(`/img/tms/${TYPE_COLOR_MAP[moveTypeId].iconFilename}`)} alt="Technical Machine" />
      </Box>
    );
  }

  return null;
};

const MovesetListItem = ({ key, moveLevel, move }) => {
  return (
    <React.Fragment key={key}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <MoveIcon moveIconType={moveLevel} moveTypeId={move.type} />
      </Box>

      <Box>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' } }}>
          {move.name}
        </Typography>
      </Box>

      <Box>
        <PokemonMoveType typeColor={TYPE_COLOR_MAP[move.type].color} typeName={TYPE_COLOR_MAP[move.type].name} />
      </Box>

      <Box display="flex" alignItems="center">
        <img src={useBaseUrl(DMG_TYPE_ICONS[move.damageType])} alt="Damage Type" width="100%" />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        {move.power > 0 && (
          <>
            <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>Power</Typography>
            <Typography sx={{ ...responsiveFontSize }}>{move.power}</Typography>
          </>
        )}
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>Accuracy</Typography>
        <Typography sx={{ ...responsiveFontSize }}>{move.accuracy === 101 ? '--' : move.accuracy}</Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>PP</Typography>
        <Typography sx={{ ...responsiveFontSize }}>{move.basePP}</Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>Max</Typography>
        <Typography sx={{ ...responsiveFontSize }}>{move.maxPP}</Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography variant="body1" sx={{ ...responsiveFontSize }}>
          {move.desc}
        </Typography>
      </Box>
    </React.Fragment>
  );
};

export const PokemonMoveType = ({ typeName, typeColor }) => {
  return (
    <Box
      sx={{
        padding: '4px',
        background: typeColor,
        borderColor: 'hsl(0 0% 0% / 0.2)',
        borderStyle: 'solid',
        borderRadius: '0.25rem',
      }}
    >
      <Typography
        sx={{
          width: '100%',
          color: '#fff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.25,
          textAlign: 'center',
          fontWeight: 700,
          textShadow:
            '0 1px 0 #000,0 0 1px rgba(0,0,0,.6),0 0 2px rgba(0,0,0,.7),0 0 3px rgba(0,0,0,.8),0 0 4px rgba(0,0,0,.9)',
          fontSize: {
            xs: '0.5rem',
            sm: '0.6rem',
            md: '1rem',
          },
        }}
      >
        {typeName}
      </Typography>
    </Box>
  );
};
