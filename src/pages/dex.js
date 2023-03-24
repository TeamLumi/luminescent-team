import React, {useState} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import PokedexFeatures from '@site/src/components/Pokedex';
import { Autocomplete, TextField } from '@mui/material';
import { getPokemonNames, getPokemonIdFromName } from '../../dexUtils';


const MAX_CURRENT_POKEMON = 493;

function PokemonInfoSection(props) {
  if(props.dexId === 0 || !props.dexId) {
    return <div>No Pokemon Selected.</div>
  }

  return <PokedexFeatures dexId={props.dexId} />
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [pokemonDexId, setPokemonDexId] = useState(1);
  const pokemonNames = getPokemonNames(MAX_CURRENT_POKEMON);
  const [inputValue, setInputValue] = React.useState('');

  const onPokedexValueChange = (event, newValue) => {
    const pokemonId = getPokemonIdFromName(newValue);
    setPokemonDexId(pokemonId);
  };
  
  const onSelectedPokemonInputChange = (event, newValue) => {
    return setInputValue(newValue)
  }


  function renderInput(params) {
    const sx = {color: 'inherit'};
    return (
      <TextField {...params} sx={sx} InputLabelProps={{style: { color: 'inherit' }}} label='Pokemon'/>
    )
  }

  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Pokemon Luminescent Version, A ROM Hack for Pokemon Brilliant Diamond and Shining Pearl">
      <Autocomplete
        disablePortal
        id="pokemonIdSelector"
        options={pokemonNames}
        sx={{width: 300, color: 'inherit'}}
        renderInput={renderInput}
        onChange={onPokedexValueChange}
        inputValue={inputValue}
        onInputChange={onSelectedPokemonInputChange}
      />
      <PokemonInfoSection dexId={pokemonDexId}/>
    </Layout>
  );
}