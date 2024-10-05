import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useGlobalState } from "../common/GlobalState";
import Head from '@docusaurus/Head';
import { GAMEDATA2, GAMEDATA3, GAMEDATAV } from '../../../__gamedata';

const PokemonPageHeader = ({ pokemon, pokemon3, pokemonV }) => {
  const POKEMON_MODE_MAP = {
    [GAMEDATAV]: pokemonV,
    [GAMEDATA2]: pokemon,
    [GAMEDATA3]: pokemon3,
  };
  const [globalState] = useGlobalState();
  const { siteConfig } = useDocusaurusContext();
  const pokemonInfo = POKEMON_MODE_MAP[globalState.mode] ?? pokemon;
  const metaImage = 
    `https://luminescent.team${pokemonInfo.imageSrc}` ||
    `https://luminescent.team${pokemonInfo.forms[0].imageSrc}`;

  return (
    <Head>
      <meta property="description" content={pokemonInfo.dexDescription} />
      <meta property="og:title" content={pokemonInfo.name} data-rh="true" />
      <meta property="og:description" content={pokemonInfo.dexDescription} />
      <meta property="og:image" itemProp="image primaryImageOfPage" content={metaImage} />
      <meta name="og:site_name" content={siteConfig.title} />
      <meta property="twitter:title" content={pokemonInfo.name} data-rh="true" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:description" content={pokemonInfo.dexDescription} />
      <meta property="twitter:image" itemProp="image primaryImageOfPage" content={metaImage} />
    </Head>
  );
};

export default PokemonPageHeader;
