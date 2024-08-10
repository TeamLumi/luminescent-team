import React from "react";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useGlobalState } from "../common/GlobalState";
import { Helmet } from "react-helmet";

const PokemonPageHeader = ({ pokemon, pokemon3 }) => {
  const [globalState, updateMode] = useGlobalState();
  const { siteConfig } = useDocusaurusContext();
  const pokemonInfo = globalState.mode === "2.0" ? pokemon : pokemon3;
  const metaImage = 
    `https://luminescent.team${pokemonInfo.imageSrc}` ||
    `https://luminescent.team${pokemonInfo.forms[0].imageSrc}`;

  return (
    <Helmet>
      <meta property="description" content={pokemonInfo.dexDescription} />
      <meta property="og:title" content={pokemonInfo.name} data-rh="true" />
      <meta property="og:description" content={pokemonInfo.dexDescription} />
      <meta property="og:image" itemProp="image primaryImageOfPage" content={metaImage} />
      <meta name="og:site_name" content={siteConfig.title} />
      <meta property="twitter:title" content={pokemonInfo.name} data-rh="true" />
      <meta name="twitter:card" content="summary" />
      <meta property="twitter:description" content={pokemonInfo.dexDescription} />
      <meta property="twitter:image" itemProp="image primaryImageOfPage" content={metaImage} />
    </Helmet>
  );
};

export default PokemonPageHeader;
