import React from 'react';
import { Box, Typography } from '@mui/material';
import { getPokemon } from "../../../plugins/pokedex-data-plugin/dex/pokemon";
import useBaseUrl from '@docusaurus/useBaseUrl';
import { getItemImageUrl } from '../../../plugins/pokedex-data-plugin/dex/item';

export const PokemonItems = ({ pokemonId }) => {
  const pokeInfo = getPokemon(pokemonId)
  const item1 = pokeInfo.item1
  const item2 = pokeInfo.item2
  const item3 = pokeInfo.item3

  const noItems = item1 === "None" && item2 === item1 && item3 === item1
  const allItems = item1 !== "None" && item2 === item1 && item3 === item1

  return (
    <Box display="grid" gridTemplateColumns="repeat(5, 1fr)" gap={1}>
      <>
        <Box gridColumn="span 5">
          <Typography sx={{ fontWeight: 800, fontSize: '0.8rem' }}>Wild Held Items:</Typography>
        </Box>
      </>
      {(item1 !== "None" && !allItems) && (<ItemContainer item={item1} percentage={50} />)}
      {(item3 !== "None" && !allItems) && (<ItemContainer item={item3} percentage={45} />)}
      {(item2 !== "None" && !allItems) && (<ItemContainer item={item2} percentage={5} />)}
      {noItems && (
        <>
          <Box gridColumn="span 5">
            <Typography >This pokemon does not hold an item in the wild</Typography>
          </Box>
        </>
      )}
      {allItems && (
        <ItemContainer item={item1} percentage={100} />
      )}
    </Box>
  );
};

const ItemContainer = ({item, percentage}) => {
  return (
    <>
      <Box gridColumn="span 2" display="flex" alignItems={"center"} sx={{marginLeft: "16px"}}>
        <Typography >{percentage}%: {item}</Typography>
      </Box>
      <Box gridColumn="span 2">
        <img
          key={item}
          src={useBaseUrl(`${getItemImageUrl(item)}`)}
          alt={item}
          title={item}
          width="30px"
        />
      </Box>
      <Box gridColumn="span 1" />
    </>
  )
}