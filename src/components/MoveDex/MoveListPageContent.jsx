import React, { useEffect, useState } from 'react'
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList } from 'react-window';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { usePluginData } from '@docusaurus/useGlobalData';
import {
  Box,
  Container,
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Button,
  Select,
  MenuItem,
  Typography,
  IconButton,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { PokemonAccordion } from '../Pokedex2/PokemonAccordion';
import { DMG_TYPE_ICONS, MoveIcon, PokemonMove, PokemonMoveType, TYPE_COLOR_MAP } from '../Pokedex2/PokemonMovesetList';
import MoveSearchInput from './MoveSearchInput';

import { normalizePokemonName } from '../../utils/dex/name';
import { DAMAGE_RECOVER_RATIO, FLINCH_RATIOS, HP_RECOVER_RATIO, MOVE_CATEGORIES, MOVE_TARGETING, PHYSICAL_MOVE, SPECIAL_MOVE, STAT_EFFECT_CHANCE, STATS_TO_CHANGE, STATUS_EFFECTS, STATUS_MOVE } from '../../../plugins/pokedex-data-plugin/dex/moveConstants';
import { DoubleArrow } from '@mui/icons-material';

export const defaultSearchTable = {
  name: { label: "", value: "" },
  type: { label: null, value: null },
  damageType: { label: null, value: null },
  power: { label: null, value: null },
  accuracy: { label: null, value: null },
  statusEffects: {
    status: { label: null, value: null },
    minDuration: { label: null, value: null },
    maxDuration: { label: null, value: null },
    rate: { label: null, value: null },
    sickCont: { label: null, value: null },
  },
  statChanges: {
    rate: { label: null, value: null },
    stages: { label: null, value: null },
    statType: { label: null, value: null },
  },
  critRatio: { label: null, value: null },
  moveClass: { label: null, value: null },
  priority: { label: null, value: null },
  minHitCount: { label: null, value: null },
  maxHitCount: { label: null, value: null },
  flinchChance: { label: null, value: null },
  healDamage: { label: null, value: null },
  hpRecover: { label: null, value: null },
  target: { label: null, value: null },
  flags: { label: null, value: null },
};

const setNestedKey = (obj, path, value) => {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!current[key]) current[key] = {}; // Ensure the path exists
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
};

const MoveListPageContent = ({ movesList }) => {
  const [moves, setMoves] = useState(movesList);
  const [searchTable, setSearchTable] = useState({
    ...defaultSearchTable,
  });
  const [filterOpen, setFilterDrawerOpen] = useState(false);

  const handleChange = (path, value) => {
    setSearchTable((prevState) => {
      const updatedState = { ...prevState };
      setNestedKey(updatedState, path, value);
      return updatedState;
    });
  };

  const clearAllFilters = () => {
    setSearchTable({
      ...defaultSearchTable,
      statChanges: { // For some reason, React isn't able to see this deep into an object to tell it to default back to a state
        rate: { label: null, value: null },
        stages: { label: null, value: null },
        statType: { label: null, value: null },
      },
      statusEffects: {
        status: { label: null, value: null },
        minDuration: { label: null, value: null },
        maxDuration: { label: null, value: null },
        rate: { label: null, value: null },
        sickCont: { label: null, value: null },
      }
    });
  }

  return (
    <>
      <Container sx={{ flex: '1 1 auto', display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" flexDirection="column" flex="1 1 auto">
          <Typography variant="h2" component="h1">
            Moves
          </Typography>

          <Box
            sx={{
              display: { xs: "grid", sm: "flex" },
              gridTemplate: {
                xs: `"a b"
                    "c c"`,
                sm: "unset"
              },
              gap: { xs: ".5rem", sm: "unset" },
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <MoveSearchInput
              movesList={movesList}
              setMoves={setMoves}
              searchTable={searchTable}
              handleChange={handleChange}
            />
            <Button onClick={() => setFilterDrawerOpen(true)}>
              Open Filters
            </Button>
          </Box>

          <Box flex="1 1 auto" paddingY="12px" minHeight={{ xs: '60vh', sm: '60vh' }}>
            <AutoSizer>
              {({ height, width }) => (
                <FixedSizeList itemCount={moves.length} itemSize={60} height={height} width={width}>
                  {({ index, style }) => <MoveListEntry move={moves[index]} style={style} />}
                </FixedSizeList>
              )}
            </AutoSizer>
          </Box>
        </Box>
      </Container>
      <MoveFilterDrawer
        filterOpen={filterOpen}
        setFilterDrawerOpen={setFilterDrawerOpen}
        clearAllFilters={clearAllFilters}
        searchTable={searchTable}
        handleChange={handleChange}
      />
    </>
  );
};

const MoveFilterDrawer = ({
  filterOpen,
  setFilterDrawerOpen,
  clearAllFilters,
  searchTable,
  handleChange,
}) => {

  const DisplayValues = ({ data, prefix = "" }) => {
    return (
      <>
        {Object.entries(data).map(([key, value]) => {
          const fullKey = prefix ? `${prefix}.${key}` : key;

          // Skip if value is null
          if (value?.value === null || fullKey === "name") {
            return null;
          }

          // If value is an object but doesn't have a 'value' property, recurse into it
          if (value && typeof value === "object" && !("value" in value)) {
            // Check if the nested object has any non-null values
            const hasNestedValues = Object.values(value).some(
              (nestedValue) => nestedValue?.value !== null
            );
            return hasNestedValues ? (
              <React.Fragment key={fullKey}>
                <DisplayValues
                  data={value}
                  prefix={fullKey}
                />
              </React.Fragment>
            ) : null;
          }

          // Display key-value pair for objects with 'label' and 'value' props
          return (
            <Box key={fullKey} sx={{ margin: "8px 0" }}>
              <Button onClick={() => handleChange(fullKey, {value: null, label: null})}>
                <CloseIcon sx={{ marginRight: "8px" }} /> {value.label}
              </Button>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <Drawer
      open={filterOpen}
      onClose={() => setFilterDrawerOpen(false)}
      anchor="right"
      sx={{ maxWidth: "50%"}}
    >
      <Box role="presentation" height="100%" sx={{minWidth: "350px"}}>
        <Box
          display="flex"
          sx={{padding: "1rem", justifyContent: "space-between", alignItems: "center"}}
        >
          <Typography variant="h5">Filter Menu</Typography>
          <Button color='error' onClick={clearAllFilters}>Clear Filters</Button>
          <IconButton onClick={() => setFilterDrawerOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <Box display="flex" flexWrap="wrap" maxWidth="350px">
          <DisplayValues data={searchTable} />
        </Box>
        <PokemonAccordion title={"Move Type"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {Object.entries(TYPE_COLOR_MAP).map(([typeId, typeObject]) => {
              return (
                <Button
                  key={`filter-${typeObject.name}-option`}
                  onClick={() => handleChange("type", {value: typeId, label: typeObject.name})}
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
        <PokemonAccordion title={"Category"}>
          <Button
            onClick={() => handleChange(
              "damageType",
              {value: `${STATUS_MOVE}`, label: "Status Move"}
            )}
          >
            <img
              src={useBaseUrl(DMG_TYPE_ICONS[STATUS_MOVE])}
              alt="Status Move"
              title="Status Move"
              width="100%"
            />
          </Button>
          <Button
            onClick={() => handleChange(
              "damageType",
              {value: `${PHYSICAL_MOVE}`, label: "Physical Move"}
            )}
          >
            <img
              src={useBaseUrl(DMG_TYPE_ICONS[PHYSICAL_MOVE])}
              alt="Physical Move"
              title="Physical Move"
              width="100%"
            />
          </Button>
          <Button
            onClick={() => handleChange(
              "damageType",
              {value: `${SPECIAL_MOVE}`, label: "Special Move"}
            )}
          >
            <img
              src={useBaseUrl(DMG_TYPE_ICONS[SPECIAL_MOVE])}
              alt="Special Move"
              title="Special Move"
              width="100%"
            />
          </Button>
        </PokemonAccordion>
        <PokemonAccordion title={"Power"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "0-25", label: "0-25 Power"})}
            >
              {"0-25"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "26-50", label: "26-50 Power"})}
            >
              {"26-50"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "51-75", label: "51-75 Power"})}
            >
              {"51-75"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "76-100", label: "76-100 Power"})}
            >
              {"76-100"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "101-125", label: "101-125 Power"})}
            >
              {"101-125"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "126-150", label: "126-150 Power"})}
            >
              {"126-150"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("power", {value: "151-250", label: "151+ Power"})}
            >
              {"151+"}
            </Button>
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Accuracy"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "0-60", label: "<= 60% Accuracy"})}
            >
              {"<= 60%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "69-70", label: "70% Accuracy"})}
            >
              {"70%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "74-75", label: "75%-75% Accuracy"})}
            >
              {"75%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "79-80", label: "80%-80% Accuracy"})}
            >
              {"80%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "84-85", label: "85% Accuracy"})}
            >
              {"85%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "89-90", label: "90% Accuracy"})}
            >
              {"90%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "94-95", label: "95% Accuracy"})}
            >
              {"95%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "99-100", label: "100% Accuracy"})}
            >
              {"100%"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("accuracy", {value: "100-101", label: "Perfect Accuracy"})}
            >
              {"Never Misses"}
            </Button>
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Status Effect"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {Object.entries(STATUS_EFFECTS).map(([effectId, effect]) => {
              return (
                <Button
                  key={`status-effect-filter-${effectId}`}
                  variant='outlined'
                  onClick={() => handleChange(
                    "statusEffects.status",
                    {value: effect, label: effect}
                  )}
                >
                  {effect}
                </Button>
              );
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Stat Change"}>
          <Typography display="flex" justifyContent="center">Stat Type</Typography>
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
            {STATS_TO_CHANGE.map((stat) => {
              return (
                <Button
                  key={`stat-type-${stat}`}
                  variant='outlined'
                  onClick={() => handleChange("statChanges.statType", {value: stat, label: `Change ${stat}`})}
                >
                  {`Change ${stat}`}
                </Button>
              )
            })}
          </Box>

          <Typography display="flex" justifyContent="center">Stages</Typography>
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
            <Button
              variant='outlined'
              onClick={() => handleChange("statChanges.stages", {value: "-2", label: "-2 Stat"})}
            >
              {"-2 Stat"}
            </Button>
            <Button
              variant='outlined'
              onClick={() => handleChange("statChanges.stages", {value: "-1", label: "-1 Stat"})}
            >
              {"-1 Stat"}
            </Button>
            <Button
              variant='outlined'
              onClick={() => handleChange("statChanges.stages", {value: "0", label: "No Stat Change"})}
            >
              {"+0 Stat"}
            </Button>
            <Button
              variant='outlined'
              onClick={() => handleChange("statChanges.stages", {value: "1", label: "+1 Stat"})}
            >
              {"+1 Stat"}
            </Button>
            <Button
              variant='outlined'
              onClick={() => handleChange("statChanges.stages", {value: "2", label: "+2 Stat"})}
            >
              {"+2 Stat"}
            </Button>
            <Button
              variant='outlined'
              onClick={() => handleChange("statChanges.stages", {value: "3", label: "+3 Stat"})}
            >
              {"+3 Stat"}
            </Button>
          </Box>

          <Typography display="flex" justifyContent="center">Chance of Stat Change</Typography>
          <Divider variant="middle" sx={{
            marginTop:".5rem",
            marginBottom:"1rem",
          }}/>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {STAT_EFFECT_CHANCE.map((statPercent) => {
              return (
                <Button
                  key={`stat-change-chance-${statPercent}`}
                  variant='outlined'
                  onClick={() => handleChange("statChanges.rate", {value: statPercent, label: `${statPercent}% Stat Change`})}
                >
                  {`${statPercent}% Chance`}
                </Button>
              )
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Priority"}>
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr">
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "5", label: "+5 Prio"})}
            >
              {"+5"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "4", label: "+4 Prio"})}
            >
              {"+4"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "3", label: "+3 Prio"})}
            >
              {"+3"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "2", label: "+2 Prio"})}
            >
              {"+2"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "1", label: "+1 Prio"})}
            >
              {"+1"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "0", label: "No Prio"})}
            >
              {"0"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "-1", label: "-1 Prio"})}
            >
              {"-1"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "-3", label: "-3 Prio"})}
            >
              {"-3"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "-4", label: "-4 Prio"})}
            >
              {"-4"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "-5", label: "-5 Prio"})}
            >
              {"-5"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "-6", label: "-6 Prio"})}
            >
              {"-6"}
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleChange("priority", {value: "-7", label: "-7 Prio"})}
            >
              {"-7"}
            </Button>
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Hit Count"}>
          <Button onClick={() => {handleChange("maxHitCount", {value: "2", label: "2 hits"})}} >
            2 Times
          </Button>
          <Button onClick={() => {handleChange("maxHitCount", {value: "3", label: "3 hits"})}} >
            3 Times
          </Button>
          <Button onClick={() => {
            handleChange("minHitCount", {value: "2", label: "Min 2 hits"})
            handleChange("maxHitCount", {value: "5", label: "Max 5 hits"})
          }}>
            2-5 Times
          </Button>
        </PokemonAccordion>
        <PokemonAccordion title={"Crit Ratio"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            <Button variant='outlined' onClick={() => {handleChange("critRatio", {value: "1/24", label: "4.2% Crit"})}}>
              {"4.2% Chance"}
            </Button>
            <Button variant='outlined' onClick={() => {handleChange("critRatio", {value: "1/8", label: "12.5% Crit"})}}>
              {"12.5% Chance (1)"}
            </Button>
            <Button variant='outlined' onClick={() => {handleChange("critRatio", {value: "1/2", label: "50% Crit"})}}>
              {"50% Chance (2)"}
            </Button>
            <Button variant='outlined' onClick={() => {handleChange("critRatio", {value: "1/1", label: "100% Crit"})}}>
              {"100% Chance (3 and above)"}
            </Button>
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Flinch Chance"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {Object.values(FLINCH_RATIOS).map(flinchChance => {
              return (
                <Button
                  key={`flinch-chance-${flinchChance}`}
                  variant='outlined'
                  onClick={() => handleChange("flinchChance", {value: flinchChance, label: `${flinchChance}% Flinch`})}
                >
                  {`${flinchChance}% Chance`}
                </Button>
              )
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Heal/Recoil Damage"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {Object.values(DAMAGE_RECOVER_RATIO).map(damageRatio => {
              return (
                <Button
                  key={`damage-ratio${damageRatio}`}
                  variant='outlined'
                  onClick={() => handleChange("healDamage", {value: damageRatio, label: `${damageRatio} Damage`})}
                >
                  {`${damageRatio}% Damage`}
                </Button>
              )
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"HP Recovery"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {Object.values(HP_RECOVER_RATIO).map(hpRecoverRatio => {
              return (
                <Button
                  key={`recover-ratio${hpRecoverRatio}`}
                  variant='outlined'
                  onClick={() => handleChange("hpRecover", {value: hpRecoverRatio, label: `${hpRecoverRatio} Recovered`})}
                >
                  {`${hpRecoverRatio}% Recovered`}
                </Button>
              )
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Targeting"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {MOVE_TARGETING.map((target, index) => {
              return (
                <Button
                  key={`target-${index}`}
                  variant='outlined'
                  onClick={() => handleChange("target", {value: target, label: `Target ${target}`})}
                >
                  {`Target ${target}`}
                </Button>
              );
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Move Class"}>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            {MOVE_CATEGORIES.map((moveClass, index) => {
              return (
                <Button
                  key={`moveClass-${index}`}
                  variant='outlined'
                  onClick={() => handleChange("moveClass", {value: moveClass, label: `${moveClass}`})}
                >
                  {`${moveClass}`}
                </Button>
              );
            })}
          </Box>
        </PokemonAccordion>
        <PokemonAccordion title={"Flags"}>
          <Typography>Coming Soon.</Typography>
        </PokemonAccordion>
      </Box>
      <Box
        bottom="0"
        right="0"
        backgroundColor="var(--ifm-background-color)"
        borderTop="2px solid var(--ifm-table-border-color)"
        zIndex="2"
        padding="25px"
        position="sticky"
        justifyContent="end"
        display="flex"
      >
        <Button
          width="50%"
          variant='contained'
          onClick={() => setFilterDrawerOpen(false)}
          endIcon={<DoubleArrow fontSize='large' />}
          color='success'
        >
          Save Changes
        </Button>
      </Box>
    </Drawer>
  )
}

const MoveListEntry = ({ move, style }) => {
  const { path } = usePluginData('luminescent-movedex-data-plugin');
  const movePath = normalizePokemonName(move.name);

  return (
    <a href={useBaseUrl(`${path}/${movePath}`)} style={{ ...style, textDecoration: 'none' }}>
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemIcon>
            <MoveIcon moveIconType={'tm'} moveTypeId={move.type} />
          </ListItemIcon>
          <Box display="flex" flexDirection="row" marginX="8px">
            <Box width="80px">
              <PokemonMoveType
                typeName={TYPE_COLOR_MAP[move.type].name}
                typeColor={TYPE_COLOR_MAP[move.type].color}
              />
            </Box>
          </Box>
          <Typography>{move.name}</Typography>
        </ListItemButton>
      </ListItem>
    </a>
  );
};


export default MoveListPageContent;