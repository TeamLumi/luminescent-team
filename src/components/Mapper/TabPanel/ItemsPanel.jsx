import React from 'react';
import { Box, Typography } from "@mui/material";
import "../style.css"
import { PokemonAccordion } from '../../Pokedex2/PokemonAccordion';
import ItemTable from '../Items/ItemTable';

const ItemsPanel = ({ itemsList, selectedItem = "" }) => { // Might add an Item Finder dropdown in the future still unsure
  return (
    <Box className="item-panel">
      <Typography
        variant="h5"
        sx={{display: "flex", justifyContent: "center", margin: "8px 0px 8px"}}
      >
        Items
      </Typography>
      <Box className='encAccordions'>
        <PokemonAccordion title="Field Items" id="fieldItems">
          <ItemTable itemList={itemsList.field} selectedItem={selectedItem} />
        </PokemonAccordion>
        <PokemonAccordion title="Hidden Items" id="hiddenItems">
          <ItemTable itemList={itemsList.hidden} selectedItem={selectedItem} />
        </PokemonAccordion>
        <PokemonAccordion title="Scripted Items" id="scriptedItems">
          <ItemTable itemList={itemsList.scripted} selectedItem={selectedItem} />
        </PokemonAccordion>
      </Box>
    </Box>
  );
};

export default ItemsPanel;