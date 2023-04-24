import { Box, Typography } from '@mui/material';
import React from 'react';
import { POKEMON_MOVE_LEVEL_TYPE, getMoveProperties } from '../../../dexUtils';

const DMG_TYPE_ICONS = {
  0: '/img/status_dmg_type.png',
  1: '/img/phys_dmg_type.png',
  2: '/img/special_dmg_type.png',
};

const TYPE_COLOR_MAP = {
  0: { name: 'Normal', color: '#929da3' },
  1: { name: 'Fighting', color: '#ce436a' },
  2: { name: 'Flying', color: '#8caadc' },
  3: { name: 'Poison', color: '#ac66c8' },
  4: { name: 'Ground', color: '#d97946' },
  5: { name: 'Rock', color: '#c7b887' },
  6: { name: 'Bug', color: '#90c127' },
  7: { name: 'Ghost', color: '#4e6caa' },
  8: { name: 'Steel', color: '#518ea3' },
  9: { name: 'Fire', color: '#ff9d54' },
  10: { name: 'Water', color: '#4f92d6' },
  11: { name: 'Grass', color: '#65bd55' },
  12: { name: 'Electric', color: '#fad143' },
  13: { name: 'Psychic', color: '#f97175' },
  14: { name: 'Ice', color: '#72cfbd' },
  15: { name: 'Dragon', color: '#116ac4' },
  16: { name: 'Dark', color: '#5b5464' },
  17: { name: 'Fairy', color: '#eb92e4' },
};

const responsiveFontSize = { fontSize: { xs: '0.5rem', sm: '0.6rem', md: '0.9rem', lg: '1rem' } };

export const PokemonMovesetList = ({ moveset, movesetPrefix, pokemonDexId }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `0.5fr 1.5fr 50px 47px 0.5fr 0.5fr 0.5fr`,
          sm: `0.3fr 1fr 54px 48px 0.3fr 0.3fr 0.2fr 2fr`,
          md: `0.3fr 0.8fr 90px 70px 0.3fr 0.3fr 0.2fr 2fr`,
        },
        gridTemplateRows: `repeat(${moveset.length}, 40px)`,
        alignItems: 'center',
        columnGap: '4px',
        rowGap: '8px',
        marginBottom: '8px',
      }}
    >
      {moveset.map((move, i) => (
        <MovesetListItem
          key={`${pokemonDexId}-${movesetPrefix}-move-${move.moveId}-${i}`}
          moveLevel={move.level}
          move={getMoveProperties(move.moveId)}
        />
      ))}
    </Box>
  );
};

const MoveIcon = ({ moveIconType }) => {
  if (typeof moveIconType === 'number') {
    return (
      <Typography sx={{ textAlign: 'center', fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' } }}>
        {moveIconType}
      </Typography>
    );
  }

  if (moveIconType === POKEMON_MOVE_LEVEL_TYPE.EGG) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" width={{ xs: '18px', sm: '26px', md: '32px' }}>
        <img src="/img/pm0000_00_00_00_L.webp" alt="Egg Move" />
      </Box>
    );
  }

  if (moveIconType === POKEMON_MOVE_LEVEL_TYPE.TM) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" width={{ xs: '30px', sm: '40px' }}>
        <img src="/img/Item_TM.webp" alt="Technical Machine" />
      </Box>
    );
  }

  return null;
};

const MovesetListItem = ({ moveLevel, move }) => {
  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center">
        <MoveIcon moveIconType={moveLevel} />
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
        <img src={DMG_TYPE_ICONS[move.damageType]} alt="Damage Type" width="100%" />
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
        <Typography sx={{ ...responsiveFontSize }}>{move.maxPP}</Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Typography variant="body1" sx={{ ...responsiveFontSize }}>
          {move.desc}
        </Typography>
      </Box>
    </>
  );
};

const PokemonMoveType = ({ typeName, typeColor }) => {
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
