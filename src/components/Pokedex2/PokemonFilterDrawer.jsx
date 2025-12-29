import React, { useMemo, useState } from 'react';
import { Autocomplete, Box, Button, Divider, TextField, Typography } from '@mui/material';

import { FilterDrawer } from '../common/FilterDrawer';
import { PokemonAccordion } from './PokemonAccordion';
import { PokemonMoveType, TYPE_COLOR_MAP } from './PokemonMovesetList';
import { STAT_RANGES } from './pokedexConstants';
import { getAllAbilities } from '../../../plugins/pokedex-data-plugin/dex/ability';
import { useGlobalState } from '../common/GlobalState';
import { getAllItems } from '../../../plugins/pokedex-data-plugin/dex/item';
import { EGG_GROUPS } from '../../../plugins/pokedex-data-plugin/dex/egggroup';

export const PokemonFilterDrawer = ({
    filterOpen,
    setFilterDrawerOpen,
    clearAllFilters,
    searchTable,
    handleChange,
}) => {
    const [globalState, updateMode] = useGlobalState();
    const ablityList = useMemo(() => getAllAbilities(globalState.mode), [globalState.mode]);
    const itemList = useMemo(() => getAllItems(globalState.mode), [globalState.mode]);

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
                <Autocomplete
                    id="ability-input"
                    options={[{ name: "", id: "" }, ...ablityList]}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => {
                        return option.id === value.id;
                    }}
                    value={{ id: searchTable.ability.value, name: searchTable.ability.label.replace(/^Ability:\s*/, '') }}
                    defaultValue={{ name: "", id: "" }}
                    onChange={(e, abilityObj) => handleChange("ability", { value: abilityObj.id, label: `Ability: ${abilityObj.name}` })}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Filter By Ability"
                        />
                    )}
                />
            </PokemonAccordion>
            <PokemonAccordion title={"Item"}>
                <Autocomplete
                    id="item-input"
                    options={[{ name: "", id: "" }, ...itemList]}
                    getOptionLabel={(option) => option.name}
                    isOptionEqualToValue={(option, value) => {
                        return option.id === value.id;
                    }}
                    value={{ id: searchTable.item.value, name: searchTable.item.label.replace(/^Held Item:\s*/, '') }}
                    onChange={(e, itemObj) => handleChange("item", { value: itemObj.id, label: `Held Item: ${itemObj.name}` })}
                    disableClearable
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Filter By Item"
                        />
                    )}
                />
            </PokemonAccordion>
            <PokemonAccordion title={"Egg Groups"}>
                <Typography display="flex" justifyContent="center">Egg Group 1</Typography>
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
                    {Object.values(EGG_GROUPS).map((eggGroupName) => {
                        return (
                            <Button
                                key={`filter-${eggGroupName}-option`}
                                variant="outlined"
                                onClick={() => handleChange("eggGroups.eggGroup1", {value: eggGroupName, label: eggGroupName})}
                            >
                                {eggGroupName}
                            </Button>
                        );
                    })}
                </Box>

                <Typography display="flex" justifyContent="center">Egg Group 2</Typography>
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
                    {Object.values(EGG_GROUPS).map((eggGroupName) => {
                        return (
                            <Button
                                key={`filter-${eggGroupName}-option`}
                                variant="outlined"
                                onClick={() => handleChange("eggGroups.eggGroup2", {value: eggGroupName, label: eggGroupName})}
                            >
                                {eggGroupName}
                            </Button>
                        );
                    })}
                </Box>
            </PokemonAccordion>
            <Typography textAlign={"center"} marginTop={"1rem"}>More Filters Coming Soon TM</Typography>
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