// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { getPokemon } = require('./dex/pokemon');
const { FORM_MAP } = require('./dex/functions');
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
        name: p.name,
        imageSrc: p.imageSrc,
        type1: p.type1Id,
        type2: p.type2Id,
        ability1: p.ability1,
        ability2: p.ability2,
        abilityH: p.abilityH,
        baseStats: p.baseStats,
      }));

      return {
        pokemons,
        pokemonList,
      };
    },

    async contentLoaded({ content, actions }) {
      const pokedexPath = options.routeBasePath + options.path;
      const pokemonListJson = await actions.createData('pokemonList.json', JSON.stringify(content.pokemonList));

      const pokemonListRoute = {
        path: pokedexPath,
        component: options.listComponent,
        exact: true,
        modules: {
          pokemonList: pokemonListJson,
        },
      };

      const pokemonRedirectRoutes = [];
      const pokemonRoutes = [];

      await Promise.all(
        content.pokemons.map(async (pokemon) => {
          const pokemonName = normalizePokemonName(pokemon.name);
          const pokemonSlug = pokemon.isBaseForm ? pokemonName : pokemon.id;
          const pokemonPath = `${pokedexPath}/${pokemonSlug}`;
          const pokemonJson = await actions.createData(`lumi${pokemon.id}.json`, JSON.stringify(pokemon));

          if (pokemon.isBaseForm) {
            const redirectPathJson = await actions.createData(`lumi${pokemonName}.json`, JSON.stringify(pokemonPath));
            pokemonRedirectRoutes.push({
              path: `${pokedexPath}/${pokemon.id}`,
              component: options.pokemonRedirectComponent,
              exact: true,
              modules: {
                redirectPath: redirectPathJson,
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
});

pokedexDataPlugin.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(optionsSchema, options);
  return validatedOptions;
};

module.exports = pokedexDataPlugin;
