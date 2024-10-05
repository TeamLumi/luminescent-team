import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { ImageWithFallback } from '../common/ImageWithFallback';
import Link from '@docusaurus/Link';

export const PokemonAlternativeFormsList = ({ pokemonForms }) => {
  return pokemonForms.length > 1 ? (
    <Box>
      <Typography fontSize="2rem">Alternative Forms</Typography>
      <Container>
        <Box display="flex" flexWrap="wrap">
          {pokemonForms.map((form, i) => {
            // /img/pkm/pm0142_01_00_00_L.webp
            const monsnoFromUrl = form.imageSrc.split("/")[3].split(".")[0];
            // pm0142_01_00_00_L

            const monsno = parseInt(monsnoFromUrl.split("_")[0].replace(/\D/g, ''), 10);
            const formno = parseInt(monsnoFromUrl.split("_")[1]);
            const pokemonPath = formno === 0 ? monsno : `${monsno}_${formno}`;
            return (
              <Box key={`${form.name}-${i}`} display="flex" alignItems="center" margin="4px 16px 16px 4px">
                <ImageWithFallback
                  src={form.imageSrc}
                  fallbackSrc={pokemonForms[0].imageSrc}
                  height={30}
                />
                <Link to={`/pokedex/${pokemonPath}`}>
                  <Typography marginLeft="8px">
                    {form.name}
                  </Typography>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  ) : null;
};
