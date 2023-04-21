import { Box, List, ListItem, Typography } from '@mui/material';
import React from 'react';
import { getMoveProperties } from '../../../dexUtils';

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

const responsiveFontSize = { fontSize: { xs: '0.7rem', sm: '0.8rem', md: '1rem' } };

// interface props {
//   moveset: {
//     level: 'egg' | 'tm' | number;
//     moveId: number
//   }[]
// }

export const MovesetList = ({ moveset }) => {
  return (
    <List>
      {moveset.map((move) => (
        <MovesetListItem key={`move-${move.moveId}`} moveId={move.moveId} moveLevel={move.level} />
      ))}
    </List>
  );
};

const MoveIcon = ({ moveIconType }) => {
  if (typeof moveIconType === 'number') {
    return <Typography sx={{ textAlign: 'center', ...responsiveFontSize }}>{moveIconType}</Typography>;
  }

  if (moveIconType === 'egg') {
    return <img src="/img/pm0000_00_00_00_L.webp" alt="Egg Move" width="30px" height="35px" />;
  }

  if (moveIconType === 'tm') {
    return <img src="/img/Item_TM.webp" alt="Technical Machine" width="35px" height="35px" />;
  }

  return null;
};

const MovesetListItem = ({ moveLevel, moveId }) => {
  const move = getMoveProperties(moveId);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '18px 92px 56px 48px 50px 50px 24px',
          sm: '35px 105px 80px 56px 50px 50px 24px 1fr',
          md: '35px 120px 30px 80px 64px 56px 72px 30px 500px',
        },
        gridTemplateAreas: {
          xs: '"icon name type dmg_type power accuracy pp"',
          sm: '"icon name type dmg_type power accuracy pp desc"',
          md: '"icon name . type dmg_type power accuracy pp desc"',
        },
        alignItems: 'center',
        columnGap: {
          xs: '2px',
          sm: '6px',
        },
        marginBottom: '8px',
      }}
    >
      <Box gridArea="icon">
        <MoveIcon moveIconType={moveLevel} />
      </Box>

      <Box gridArea="name">
        <Typography sx={{ fontWeight: 700, ...responsiveFontSize }}>{move.name}</Typography>
      </Box>

      <Box gridArea="type">
        <PokemonMoveType typeColor={TYPE_COLOR_MAP[move.type].color} typeName={TYPE_COLOR_MAP[move.type].name} />
      </Box>

      <Box gridArea="dmg_type" display="flex" alignItems="center">
        <img src={DMG_TYPE_ICONS[move.damageType]} alt="Damage Type" />
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gridArea="power">
        {move.power > 0 && (
          <>
            <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>Power</Typography>
            <Typography sx={{ ...responsiveFontSize }}>{move.power}</Typography>
          </>
        )}
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gridArea="accuracy">
        <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>Accuracy</Typography>
        <Typography sx={{ ...responsiveFontSize }}>{move.accuracy === 101 ? '--' : move.accuracy}</Typography>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center" gridArea="pp">
        <Typography sx={{ fontStyle: 'italic', ...responsiveFontSize }}>PP</Typography>
        <Typography sx={{ ...responsiveFontSize }}>{move.maxPP}</Typography>
      </Box>

      <Box sx={{ display: { xs: 'none', sm: 'block' } }} gridArea="desc">
        <Typography variant="body1" sx={{ ...responsiveFontSize }}>
          {move.desc}
        </Typography>
      </Box>
    </Box>
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
            xs: '0.6rem',
            sm: '0.7rem',
            md: '0.9rem',
          },
        }}
      >
        {typeName}
      </Typography>
    </Box>
  );
};
