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
import {
  getItemImageUrl,
  getItemInfo,
  getItemPocket,
  getItemString,
  getTMImageUrl,
  getTMInfoFromItemNo
} from '../../../../plugins/pokedex-data-plugin/dex/item';
import { ImageWithFallback } from '../../common/ImageWithFallback';
import { getTypeName } from '../../../../plugins/pokedex-data-plugin/dex/types';
import { GROUP_NAMES } from '../../../../plugins/pokedex-data-plugin/dex/itemConstants';

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
            <TableCell width="74px">Icon</TableCell>
            <TableCell>Name</TableCell>
            <TableCell width={"50%"}>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {itemList.map((item, index) => {
            let itemName = "";
            let itemSource = "";
            const itemDescription = getItemInfo(item);
            const tmInfo = getTMInfoFromItemNo(item)
            if (tmInfo) {
              itemName = `TM${tmInfo.tmNo} ${tmInfo.name}`;
              itemSource = getTMImageUrl(getTypeName(tmInfo.type));
            } else {
              itemName = getItemString(item);
              itemSource = getItemImageUrl(itemName);
            }
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
                <TableCell>{itemDescription}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default ItemTable;
