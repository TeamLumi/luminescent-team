import React, { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';

const PokemonPanel = ({ id, selectedTab, children }) => {
  return (
    <div role="tabpanel" hidden={selectedTab !== id} id={`pokemon-tab-${id}`}>
      {children}
    </div>
  );
};

const PokemonTabs = ({ tabNames, selectedTab, handleTabChange  }) => {
  return (
    <Tabs
      value={selectedTab}
      onChange={handleTabChange}
      sx={{
        "& button": { borderRadius: 2, },
        "& button:hover": { backgroundColor: "var(--ifm-color-primary-dark)", color: "var(--mui-palette-primary-contrastText)" },
        "& button:active": { backgroundColor: "var(--ifm-color-primary-light)", color: "var(--mui-palette-primary-contrastText)" },
        "& button.Mui-selected": { backgroundColor: "var(--ifm-color-primary)", color: "var(--mui-palette-primary-contrastText)" }
      }}
    >
      {tabNames.map((tabName, i) => (
        <Tab label={tabName} id={`pokemon-tab-${i}`} key={`pokemon-tab-${i}`} />
      ))}
    </Tabs>
  );
};

const PokemonTabPanel = ({
  tabNames,
  children
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <Box>
      <PokemonTabs tabNames={tabNames} selectedTab={selectedTab} handleTabChange={handleTabChange}/>
      {children.map((child, i) => (
        <PokemonPanel id={i} selectedTab={selectedTab} key={`pokemon-panel-${i}`}>
          {child}
        </PokemonPanel>
      ))}
    </Box>
  );
};

export default PokemonTabPanel;
