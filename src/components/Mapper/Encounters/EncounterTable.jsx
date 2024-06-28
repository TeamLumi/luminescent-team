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
  Typography,
  Link
} from '@mui/material';

import "../style.css";
import { LINK_KEYS } from '../../../utils/dex/encountersConstants';

const EncounterTable = ({ encounterList, pokemon }) => {
  const { colorMode, setColorMode } = useColorMode();
  const highlightColor =
    colorMode === 'dark' ? 'highlight-dark-row' : 'highlight-light-row';
  if (encounterList.length > 0) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pokemon</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {encounterList.map((enc, index) => {
              const pokemonName = enc.pokemonName.toLowerCase().replace(" ", "-");
              const encounterType = enc.encounterRate === "morning" ? "Morning" : enc.encounterType;
              let encLink = null;
              const specialLink = enc.link !== null;
              const isLink = LINK_KEYS.includes(enc.encounterType);
              if (specialLink) {
                encLink = enc.link;
              } else if (isLink) {
                encLink = `/docs/special-events/${enc.encounterType.toLowerCase()}#${pokemonName}`;
              }
              return (
                <TableRow
                  key={index}
                  className={enc.pokemonName === pokemon ? highlightColor : ""}
                >
                  <TableCell>{enc.pokemonName}</TableCell>
                  <TableCell>
                    {enc.minLevel !== enc.maxLevel
                      ? `${enc.minLevel} - ${enc.maxLevel}`
                      : enc.minLevel}
                  </TableCell>
                  <TableCell component={encLink ? "a" : TableCell} href={encLink ? encLink : undefined}>
                    {encounterType}
                  </TableCell>
                  <TableCell>{enc.encounterRate === "morning" ? "10%" : enc.encounterRate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };
  return (
    <Typography sx={{display: "flex", justifyContent: "center"}}>Nothing to see here.</Typography>
  );
};

export default EncounterTable;