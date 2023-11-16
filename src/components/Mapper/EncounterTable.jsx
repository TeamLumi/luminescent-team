import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

// Inside your component
export const EncounterTable = ({encounterList}) => {
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
          {encounterList && encounterList.map((enc, index) => (
            <TableRow key={index}>
              <TableCell>{enc.pokemonName}</TableCell>
              <TableCell>{enc.minLevel}</TableCell>
              <TableCell>{enc.encounterType}</TableCell>
              <TableCell>{enc.encounterRate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
