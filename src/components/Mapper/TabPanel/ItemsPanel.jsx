import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import { Box, Typography } from "@mui/material";

import { PokemonAccordion } from '../../Pokedex2/PokemonAccordion';
import ItemTable from '../Items/ItemTable';
import "../style.css"

const ItemsPanel = ({ itemsList, selectedItem = "" }) => { // Might add an Item Finder dropdown in the future still unsure
  const { colorMode, setColorMode } = useColorMode();
  const modeChangeTextColor = colorMode === "dark" ? "#F5FBF5" : "#000000";
  return (
    <Box className="item-panel">
      <Typography
        variant="h5"
        sx={{display: "flex", justifyContent: "center", margin: "8px 0px 8px"}}
      >
        Items
      </Typography>
      <Box className='itemAccordions'>
        <PokemonAccordion
          disabled={itemsList.field.length === 0}
          title="Field Items"
          id="fieldItems"
          bgColor={"success.main"}
          textColor={itemsList.field.length !== 0 ? "#F5FBF5" : modeChangeTextColor}
        >
          <ItemTable itemList={itemsList.field} selectedItem={selectedItem} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={itemsList.hidden.length === 0}
          title="Hidden Items"
          id="hiddenItems"
          bgColor={"primary.dark"}
          textColor={itemsList.hidden.length !== 0 ? "#F5FBF5" : modeChangeTextColor}
        >
          <ItemTable itemList={itemsList.hidden} selectedItem={selectedItem} />
        </PokemonAccordion>
        <PokemonAccordion
          disabled={itemsList.scripted.length === 0}
          title="Scripted Items"
          id="scriptedItems"
          bgColor={"warning.main"}
          textColor={itemsList.scripted.length === 0 && colorMode === "dark" ? "#F5FBF5" : "#000000"}
        >
          <ItemTable itemList={itemsList.scripted} selectedItem={selectedItem} />
        </PokemonAccordion>
      </Box>
    </Box>
  );
};

export default ItemsPanel;