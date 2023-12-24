// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { getPokemon } = require('./dex/pokemon');
const { FORM_MAP, FORM_MAP3 } = require('./dex/functions');
const { normalizePokemonName } = require('./dex/name');

/**
 * @param {{path: string, routeBasePath: string, pokemonComponent: string, pokemonRedirectComponent: string, listComponent: string, wrapperComponent: string}} options
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin<any>}
 */
function pokedexDataPlugin(context, options) {
  return {
    name: 'luminescent-pokedex-data-plugin',
    async loadContent() {
      const pokemons = Object.values(FORM_MAP)
        .flat()
        .slice(1) // remove Egg
        .map((id) => getPokemon(id))
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
      }));
      const pokemons3 = Object.values(FORM_MAP3)
        .flat()
        .slice(1) // remove Egg
        .map((id) => getPokemon(id, "3.0"))
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
      }));

      return {
        pokemons,
        pokemonList,
        pokemons3,
        pokemonList3,
      };
    },

    async contentLoaded({ content, actions }) {
      const pokedexPath = options.routeBasePath + options.path;
      const pokemonListJson = await actions.createData('pokemonList.json', JSON.stringify(content.pokemonList));
      const pokemonListJson3 = await actions.createData('3.0pokemonList.json', JSON.stringify(content.pokemonList3));

      const pokemonListRoute = {
        path: pokedexPath,
        component: options.listComponent,
        exact: true,
        modules: {
          pokemonList: pokemonListJson,
          pokemonList3: pokemonListJson3,
        },
      };

      const pokemonRedirectRoutes = [];
      const pokemonRoutes = [];
      await Promise.all([
        ...content.pokemons3.map(async (pokemon3) => {
          const pokemonName = normalizePokemonName(pokemon3.name);
          const pokemonId = pokemon3.formno === 0 ? pokemon3.monsno : `${pokemon3.monsno}_${pokemon3.formno}`;
          const pokemonSlug = pokemon3.isBaseForm ? pokemonName : pokemonId;
          const pokemonPath = `${pokedexPath}/${pokemonSlug}`;
          const pokemonJson3 = await actions.createData(`3.0lumi${pokemon3.id}.json`, JSON.stringify(pokemon3));
          let pokemonJson = pokemonJson3;

          const pokemon = content.pokemons.find((p) => p.monsno === pokemon3.monsno && p.formno === pokemon3.formno);
          if (pokemon) {
            pokemonJson = await actions.createData(`lumi${pokemon.id}.json`, JSON.stringify(pokemon));
          }

          if (pokemon3.isBaseForm) {
            const redirectPathJson = await actions.createData(`lumi${pokemonName}.json`, JSON.stringify(pokemonPath));
            const redirectPathJson3 = await actions.createData(`3.0lumi${pokemonName}.json`, JSON.stringify(pokemonPath));
            const newPokemonPath = pokemon3.formno === 0 ? pokemon3.monsno : `${pokemon3.monsno}_${pokemon3.formno}`;
            pokemonRedirectRoutes.push({
              path: `${pokedexPath}/${newPokemonPath}`,
              component: options.pokemonRedirectComponent,
              exact: true,
              modules: {
                redirectPath: redirectPathJson,
                redirectPath3: redirectPathJson3,
              },
            });
          }

          pokemonRoutes.push({
            path: pokemonPath,
            component: options.pokemonComponent,
            exact: true,
            modules: {
              pokemon: pokemonJson,
              pokemonList: pokemonListJson,
              pokemon3: pokemonJson3,
              pokemonList3: pokemonListJson3,
            },
          });
        }),
      ]);

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
});

pokedexDataPlugin.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(optionsSchema, options);
  return validatedOptions;
};

module.exports = pokedexDataPlugin;
