import React from 'react';
import { useColorMode } from '@docusaurus/theme-common';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from '@mui/material';

import "../style.css";
import { getItemImageUrl, getItemString } from '../../../../plugins/pokedex-data-plugin/dex/item';
import { ImageWithFallback } from '../../common/ImageWithFallback';

const ItemTable = ({ itemList, selectedItem }) => {
  const { colorMode, setColorMode } = useColorMode();
  const highlightColor =
    colorMode === 'dark' ? 'highlight-dark-row' : 'highlight-light-row';
  if (itemList.length === 0) {
    return (
      <Typography sx={{display: "flex", justifyContent: "center"}}>Nothing to see here.</Typography>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Icon</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((item, index) => {
            const itemName = getItemString(item);
            const itemSource = getItemImageUrl(itemName);
            return (
              <TableRow
                key={index}
                className={itemName === selectedItem ? highlightColor : ""}
              >
                <TableCell>
                  <ImageWithFallback
                    alt={itemName}
                    src={itemSource}
                    fallbackSrc={`/img/404error.webp`}
                    width="40px"
                    height="40px"
                  />
                </TableCell>
                <TableCell>{itemName}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.description}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ItemTable;
