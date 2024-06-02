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

import "./style.css";

export const EncounterTable = ({ encounterList, pokemon }) => {
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
            {encounterList.map((enc, index) => (
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
                <TableCell>{enc.encounterRate === "morning" ? "Morning" : enc.encounterType}</TableCell>
                <TableCell>{enc.encounterRate === "morning" ? "10%" : enc.encounterRate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  };
  return (
    <Typography sx={{display: "flex", justifyContent: "center"}}>Nothing to see here.</Typography>
  );
}
