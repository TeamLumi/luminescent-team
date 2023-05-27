// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { getPokemon } = require('./dex/pokemon');
const { FORM_MAP } = require('./dex/functions');

/**
 * @param {{path: string, routeBasePath: string, pokemonComponent: string, listComponent: string, wrapperComponent: string}} options
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
      const pokemonListJson = await actions.createData('pokemonList.json', JSON.stringify(content.pokemonList));

      const pokemonListRoute = {
        path: options.routeBasePath + options.path,
        component: options.listComponent,
        exact: true,
        modules: {
          pokemonList: pokemonListJson,
        },
      };
      const pokemonRoutes = await Promise.all(
        content.pokemons.map(async (pokemon) => {
          const pokemonJson = await actions.createData(`lumi${pokemon.id}.json`, JSON.stringify(pokemon));
          return {
            path: options.routeBasePath + `${options.path}/${pokemon.id}`,
            component: options.pokemonComponent,
            exact: true,
            modules: {
              pokemon: pokemonJson,
              pokemonList: pokemonListJson,
            },
          };
        }),
      );

      const subRoutes = [pokemonListRoute, ...pokemonRoutes];
      actions.addRoute({
        path: options.routeBasePath + options.path,
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
  listComponent: Joi.string(),
  wrapperComponent: Joi.string(),
});

pokedexDataPlugin.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(optionsSchema, options);
  return validatedOptions;
};

module.exports = pokedexDataPlugin;
