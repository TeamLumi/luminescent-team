import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {
  Box,
  Button,
  Typography,
  Divider,
  Switch,
  FormGroup,
  FormControlLabel,
  switchClasses,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { PokemonAccordion } from '../Pokedex2/PokemonAccordion';
import {
  DMG_TYPE_ICONS,
  PokemonMoveType,
  TYPE_COLOR_MAP
} from '../Pokedex2/PokemonMovesetList';

import {
  DAMAGE_RECOVER_RATIO,
  FLAG_STRINGS,
  FLINCH_RATIOS,
  HP_RECOVER_RATIO,
  MOVE_CATEGORIES,
  MOVE_TARGETING,
  PHYSICAL_MOVE,
  SPECIAL_MOVE,
  STAT_EFFECT_CHANCE,
  STATS_TO_CHANGE,
  STATUS_EFFECTS,
  STATUS_MOVE
} from '../../../plugins/pokedex-data-plugin/dex/moveConstants';
import { FilterDrawer } from '../common/FilterDrawer';

export const MoveFilterDrawer = ({
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
          if (value?.value === null || fullKey === "name" || fullKey === "id") {
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
              <Button onClick={() => handleChange(fullKey, {value: null, label: value.label})}>
                <CloseIcon sx={{ marginRight: "8px" }} /> {value.label}
              </Button>
            </Box>
          );
        })}
      </>
    );
  };

  return (
    <FilterDrawer
      filterOpen={filterOpen}
      setFilterDrawerOpen={setFilterDrawerOpen}
      clearAllFilters={clearAllFilters}
      searchTable={searchTable}
    >
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
          <Button onClick={() => {
            handleChange("minHitCount", {value: null, label: null})
            handleChange("maxHitCount", {value: "2", label: "2 hits"})
          }}>
            2 Times
          </Button>
          <Button onClick={() => {
            handleChange("minHitCount", {value: null, label: null})
            handleChange("maxHitCount", {value: "3", label: "3 hits"})
          }}>
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
                  onClick={() => handleChange("healDamage", {value: damageRatio, label: `${damageRatio}% Damage`})}
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
                  onClick={() => handleChange("hpRecover", {value: hpRecoverRatio, label: `${hpRecoverRatio}% Recovered`})}
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
          <Typography display="flex" justifyContent="center">Click twice to search the opposite.</Typography>
          <Divider variant="middle" sx={{
            marginTop:".5rem",
            marginBottom:".5rem",
          }}/>
          <Box
            display="flex"
            flexWrap="wrap"
            maxWidth="350px"
            justifyContent="center"
          >
            <FormGroup>
              {FLAG_STRINGS.map((flag, flagIndex) => {
                let color = "default";
                if (searchTable.moveFlags[flagIndex].value === null) {
                  color = "default";
                } else if (searchTable.moveFlags[flagIndex].value === true) {
                  color = "success";
                } else if (searchTable.moveFlags[flagIndex].value === false) {
                  color = "error";
                }
                return (
                  <FormControlLabel
                    key={`flag-switch-${flagIndex}`}
                    control={
                      <Switch
                        checked={searchTable.moveFlags[flagIndex]?.value ?? false}
                        onChange={(event) => {
                          const label = event.target.checked ? flag : `Not ${flag}`;
                          return handleChange(`moveFlags.${flagIndex}`, { value: event.target.checked, label: label });
                        }}
                        sx={
                          color === "error" && ({
                            [`& .${switchClasses.track}`]: {
                              backgroundColor: "var(--mui-palette-error-main)"
                            },
                            [`&.${switchClasses.switchBase}`]: {
                              color: "var(--mui-palette-error-main)",
                              "&:hover": {
                                backgroundColor: "var(--mui-palette-error-main)",
                              },
                            },
                            [`& .${switchClasses.thumb}`]: {
                              backgroundColor: "var(--mui-palette-error-main)",
                            },
                          })
                        }
                      />
                    }
                    label={flag}
                  />
                );
              })}
            </FormGroup>
          </Box>
        </PokemonAccordion>
    </FilterDrawer>
  )
}
