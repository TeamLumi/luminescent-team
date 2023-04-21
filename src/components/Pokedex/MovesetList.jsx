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
    return <Typography textAlign="center">{moveIconType}</Typography>;
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
    <ListItem>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '35px 150px 92px 64px 50px 70px 24px',
            sm: '35px 150px 92px 64px 50px 70px 24px 1fr',
          },
          gridTemplateAreas: {
            xs: '"icon name type dmg_type power accuracy pp"',
            sm: '"icon name type dmg_type power accuracy pp desc"',
          },
          alignItems: 'center',
          columnGap: '24px',
        }}
      >
        <Box gridArea="icon">
          <MoveIcon moveIconType={moveLevel} />
        </Box>
        <Box gridArea="name">
          <Typography>{move.name}</Typography>
        </Box>
        <Box gridArea="type">
          <PokemonMoveType typeColor={TYPE_COLOR_MAP[move.type].color} typeName={TYPE_COLOR_MAP[move.type].name} />
        </Box>
        <Box gridArea="dmg_type">
          <img
            src={DMG_TYPE_ICONS[move.damageType]}
            style={{ float: 'right' }}
            width="64px"
            height="36px"
            alt="Damage Type"
          />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gridArea="power">
          {move.power > 0 && (
            <>
              <Typography>Power</Typography>
              <Typography>{move.power}</Typography>
            </>
          )}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gridArea="accuracy">
          <Typography>Accuracy</Typography>
          <Typography>{move.accuracy === 101 ? '--' : move.accuracy}</Typography>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" gridArea="pp">
          <Typography>PP</Typography>
          <Typography>{move.maxPP}</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }} gridArea="desc">
          <Typography>{move.desc}</Typography>
        </Box>
      </Box>
    </ListItem>
  );
};

const PokemonMoveType = ({ typeName, typeColor }) => {
  return (
    <Box
      sx={{
        padding: '4px',
        background: typeColor,
        textAlign: 'center',
        lineHeight: 1.25,
        fontWeight: 700,
        borderColor: 'hsl(0 0% 0% / 0.2)',
        borderStyle: 'solid',
        borderRadius: '0.25rem',
        textShadow:
          '0 1px 0 #000,0 0 1px rgba(0,0,0,.6),0 0 2px rgba(0,0,0,.7),0 0 3px rgba(0,0,0,.8),0 0 4px rgba(0,0,0,.9)',
      }}
    >
      <Box
        sx={{
          color: '#fff',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {typeName}
      </Box>
    </Box>
  );
};
