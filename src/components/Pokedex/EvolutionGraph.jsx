import * as React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * WIP, styling and logic implementation is TBD
 */
export default function EvolutionGraph() {
  return (
    <div className="container">
      <div className="row" style={{ margin: 'auto', textAlign: 'center' }}>
        <span className="col col-12">
          <Typography variant="h6" sx={{ margin: 'auto' }}>
            Evolutions
          </Typography>
        </span>
      </div>

      <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <img src="/img/pm0001_00_00_00_L.webp" alt="Stage 1 Evo" />
        <Typography variant="h6">→</Typography>
        <img src="/img/pm0002_00_00_00_L.webp" alt="Stage 2 Evo" />
        <Typography variant="h6">→</Typography>
        <img src="/img/pm0003_00_00_00_L.webp" alt="Stage 3 Evo" />
      </Box>
    </div>
  );
}
