// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { getPokemon } = require('./dex/pokemon');
const { FORM_MAP } = require('./dex/functions');
const { normalizePokemonName } = require('./dex/name');
const { GAMEDATA2, GAMEDATA3, GAMEDATAV } = require('../../__gamedata');

/**
 * @param {{path: string, routeBasePath: string, pokemonComponent: string, pokemonRedirectComponent: string, listComponent: string, wrapperComponent: string, mapComponent: string}} options
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {Promise<import('@docusaurus/types').Plugin<any>>}
 */
export default async function pokedexDataPlugin(context, options) {
  return {
    name: 'luminescent-pokedex-data-plugin',
    async loadContent() {
      const pokemonsV = Object.values(FORM_MAP[GAMEDATAV])
        .flat()
        .slice(1) // remove Egg
        .filter((id) => id !== -1) // ignore invalid id -1
        .map((id) => getPokemon(id, GAMEDATAV))
        .filter((p) => p.isValid);
      const pokemonListV = pokemonsV.map((p) => ({
        id: p.id,
        monsno: p.monsno,
        formno: p.formno,
        name: p.name,
        imageSrc: p.imageSrc,
        type1: p.type1Id,
        type2: p.type2Id,
        ability1: p.ability1,
        ability2: p.ability2,
        abilityH: p.abilityH,
        baseStats: p.baseStats,
        forms: p.forms,
      }));

      const pokemons = Object.values(FORM_MAP[GAMEDATA2])
        .flat()
        .slice(1) // remove Egg
        .filter((id) => id !== -1) // ignore invalid id -1
        .map((id) => getPokemon(id, GAMEDATA2))
        .filter((p) => p.isValid);
      const pokemonList = pokemons.map((p) => ({
        id: p.id,
        monsno: p.monsno,
        formno: p.formno,
        name: p.name,
        imageSrc: p.imageSrc,
        type1: p.type1Id,
        type2: p.type2Id,
        ability1: p.ability1,
        ability2: p.ability2,
        abilityH: p.abilityH,
        baseStats: p.baseStats,
        forms: p.forms,
      }));

      const pokemons3 = Object.values(FORM_MAP[GAMEDATA3])
        .flat()
        .slice(1) // remove Egg
        .filter((id) => id !== -1) // ignore invalid id -1
        .map((id) => getPokemon(id, GAMEDATA3))
        .filter((p3) => p3.isValid);
      const pokemonList3 = pokemons3.map((p3) => ({
        id: p3.id,
        monsno: p3.monsno,
        formno: p3.formno,
        name: p3.name,
        imageSrc: p3.imageSrc,
        type1: p3.type1Id,
        type2: p3.type2Id,
        ability1: p3.ability1,
        ability2: p3.ability2,
        abilityH: p3.abilityH,
        baseStats: p3.baseStats,
        forms: p3.forms,
      }));

      return {
        pokemons,
        pokemonList,
        pokemons3,
        pokemonList3,
        pokemonsV,
        pokemonListV,
      };
    },

    async contentLoaded({ content, actions }) {
      const pokedexPath = options.routeBasePath + options.path;
      const pokemonListJson = await actions.createData('pokemonList.json', JSON.stringify(content.pokemonList));
      const pokemonListJson3 = await actions.createData('3.0pokemonList.json', JSON.stringify(content.pokemonList3));
      const pokemonListJsonV = await actions.createData('vanillaBDSPPokemonList.json', JSON.stringify(content.pokemonListV));

      const pokemonListRoute = {
        path: pokedexPath,
        component: options.listComponent,
        exact: true,
        modules: {
          pokemonList: pokemonListJson,
          pokemonList3: pokemonListJson3,
          pokemonListV: pokemonListJsonV,
        },
      };

      actions.addRoute({
        path: options.routeBasePath + "mapper",
        component: options.mapComponent,
        exact: true,
        modules: {
          pokemonList: pokemonListJson,
          pokemonListV: pokemonListJsonV,
        }
      });

      const pokemonRedirectRoutes = [];
      const pokemonRoutes = [];
      await Promise.all(
        content.pokemons3.map(async (pokemon3) => {
          const pokemonName = normalizePokemonName(pokemon3.name, GAMEDATA3);
          const pokemonId3 = pokemon3.formno === 0 ? pokemon3.monsno : `${pokemon3.monsno}_${pokemon3.formno}`;
          const pokemonPath = `${pokedexPath}/${pokemonName}`;
          const pokemonJson3 = await actions.createData(`3.0lumi${pokemonId3}.json`, JSON.stringify(pokemon3));
          let pokemonJson = pokemonJson3;
          let pokemonJsonV = pokemonJson3;

          const pokemon = content.pokemons.find((p) => p.monsno === pokemon3.monsno && p.formno === pokemon3.formno);
          if (pokemon) {
            const pokemonId = pokemon.formno === 0 ? pokemon.monsno : `${pokemon.monsno}_${pokemon.formno}`;
            pokemonJson = await actions.createData(`lumi${pokemonId}.json`, JSON.stringify(pokemon));
          }

          const pokemonVanilla = content.pokemonsV.find((pV) => pV.monsno === pokemon3.monsno && pV.formno === pokemon3.formno);
          if (pokemonVanilla) {
            const pokemonIdV = pokemonVanilla.formno === 0 ? pokemonVanilla.monsno : `${pokemonVanilla.monsno}_${pokemonVanilla.formno}`;
            pokemonJsonV = await actions.createData(`VanillaBDSP${pokemonIdV}.json`, JSON.stringify(pokemonVanilla));
          }

          const redirectPathJson = await actions.createData(`lumi${pokemonName}.json`, JSON.stringify(pokemonPath));
          const redirectPathJson3 = await actions.createData(`3.0lumi${pokemonName}.json`, JSON.stringify(pokemonPath));
          const redirectPathJsonV = await actions.createData(`VanillaBDSP${pokemonName}.json`, JSON.stringify(pokemonPath));

          const newPokemonPath = pokemon3.formno === 0 ? pokemon3.monsno : `${pokemon3.monsno}_${pokemon3.formno}`;
          pokemonRedirectRoutes.push({
            path: `${pokedexPath}/${newPokemonPath}`,
            component: options.pokemonRedirectComponent,
            exact: true,
            modules: {
              redirectPath: redirectPathJson,
              redirectPath3: redirectPathJson3,
              redirectPathV: redirectPathJsonV,
            },
          });

          pokemonRoutes.push({
            path: pokemonPath,
            component: options.pokemonComponent,
            exact: true,
            modules: {
              pokemon: pokemonJson,
              pokemonList: pokemonListJson,
              pokemon3: pokemonJson3,
              pokemonList3: pokemonListJson3,
              pokemonV: pokemonJsonV,
              pokemonListV: pokemonListJsonV,
            },
          });
        }),
      );

      const subRoutes = [pokemonListRoute, ...pokemonRoutes, ...pokemonRedirectRoutes];
      actions.addRoute({
        path: pokedexPath,
        component: options.wrapperComponent,
        exact: false,
        routes: subRoutes,
      });

      actions.setGlobalData({
        path: options.path,
      });
    },
  };
}

const optionsSchema = Joi.object({
  path: Joi.string(),
  routeBasePath: Joi.string(),
  pokemonComponent: Joi.string(),
  pokemonRedirectComponent: Joi.string(),
  listComponent: Joi.string(),
  wrapperComponent: Joi.string(),
  mapComponent: Joi.string(),
});

pokedexDataPlugin.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(optionsSchema, options);
  return validatedOptions;
};
