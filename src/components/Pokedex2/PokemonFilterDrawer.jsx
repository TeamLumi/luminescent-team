import React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';

import { FilterDrawer } from '../common/FilterDrawer';
import { PokemonAccordion } from './PokemonAccordion';
import { PokemonMoveType, TYPE_COLOR_MAP } from './PokemonMovesetList';
import { split255Into8Inner, STAT_RANGES } from './pokedexConstants';

export const PokemonFilterDrawer = ({
  filterOpen,
  setFilterDrawerOpen,
  clearAllFilters,
  searchTable,
  handleChange,
}) => {
    return (
        <FilterDrawer
            filterOpen={filterOpen}
            setFilterDrawerOpen={setFilterDrawerOpen}
            clearAllFilters={clearAllFilters}
            searchTable={searchTable}
            handleChange={handleChange}
        >
        <PokemonAccordion title={"Pokemon Type"}>
            <Typography display="flex" justifyContent="center">Type 1</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="flex"
                flexWrap="wrap"
                maxWidth="350px"
                justifyContent="center"
                marginBottom="1rem"
            >
                {Object.entries(TYPE_COLOR_MAP).map(([typeId, typeObject]) => {
                    return (
                        <Button
                            key={`filter-${typeObject.name}-option`}
                            onClick={() => handleChange("types.type1", {value: typeId, label: typeObject.name})}
                        >
                            <PokemonMoveType
                                typeName={typeObject.name}
                                typeColor={typeObject.color}
                            />
                        </Button>
                    );
                })}
            </Box>

            <Typography display="flex" justifyContent="center">Type 2</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="flex"
                flexWrap="wrap"
                maxWidth="350px"
                justifyContent="center"
                marginBottom="1rem"
            >
                {Object.entries(TYPE_COLOR_MAP).map(([typeId, typeObject]) => {
                    return (
                        <Button
                            key={`filter-${typeObject.name}-option`}
                            onClick={() => handleChange("types.type2", {value: typeId, label: typeObject.name})}
                        >
                            <PokemonMoveType
                                typeName={typeObject.name}
                                typeColor={typeObject.color}
                            />
                        </Button>
                    );
                })}
            </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Base Stats"}>
            <Typography display="flex" justifyContent="center">HP</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="grid"
                maxWidth="350px"
                gridTemplateColumns={"1fr 1fr 1fr"}
                marginBottom="1rem"
            >
                <StatRangeButtons statKey={"baseStats.hp"} handleChange={handleChange}/>
            </Box>

            <Typography display="flex" justifyContent="center">Attack</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="grid"
                maxWidth="350px"
                gridTemplateColumns={"1fr 1fr 1fr"}
                marginBottom="1rem"
            >
                <StatRangeButtons statKey={"baseStats.atk"} handleChange={handleChange}/>
            </Box>

            <Typography display="flex" justifyContent="center">Defense</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="grid"
                maxWidth="350px"
                gridTemplateColumns={"1fr 1fr 1fr"}
                marginBottom="1rem"
            >
                <StatRangeButtons statKey={"baseStats.def"} handleChange={handleChange}/>
            </Box>

            <Typography display="flex" justifyContent="center">Special Attack</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="grid"
                maxWidth="350px"
                gridTemplateColumns={"1fr 1fr 1fr"}
                marginBottom="1rem"
            >
                <StatRangeButtons statKey={"baseStats.spa"} handleChange={handleChange}/>
            </Box>

            <Typography display="flex" justifyContent="center">Special Defense</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="grid"
                maxWidth="350px"
                gridTemplateColumns={"1fr 1fr 1fr"}
                marginBottom="1rem"
            >
                <StatRangeButtons statKey={"baseStats.spd"} handleChange={handleChange}/>
            </Box>

            <Typography display="flex" justifyContent="center">Speed</Typography>
            <Divider variant="middle" sx={{
                marginTop:".5rem",
                marginBottom:"1rem",
            }}/>
            <Box
                display="grid"
                maxWidth="350px"
                gridTemplateColumns={"1fr 1fr 1fr"}
                marginBottom="1rem"
            >
                <StatRangeButtons statKey={"baseStats.spe"} handleChange={handleChange}/>
            </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Ability"}>
            <Box display="grid" gridTemplateColumns="1fr 1fr 1fr">
                <Button
                    variant="outlined"
                    onClick={() => handleChange("ability", {value: "5", label: "Ability 5"})}
                >
                    {"Ability 5"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleChange("ability", {value: "10", label: "Ability 10"})}
                >
                    {"Ability 10"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleChange("ability", {value: "12", label: "Ability 12"})}
                >
                    {"Ability 12"}
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => handleChange("ability", {value: "13", label: "Ability 13"})}
                >
                    {"Ability 13"}
                </Button>
            </Box>
        </PokemonAccordion>

    </FilterDrawer>
  )
}

const StatRangeButtons = ({ statKey, handleChange }) => (
    <>
        {STAT_RANGES.map(range => (
            <Button
                key={`${statKey}-${range}`}
                variant="outlined"
                onClick={() =>
                    handleChange(statKey, {
                        value: range,
                        label: `${range} ${statKey.split(".")[1].toUpperCase()}`,
                    })
                }
            >
                {range}
            </Button>
        ))}
    </>
);