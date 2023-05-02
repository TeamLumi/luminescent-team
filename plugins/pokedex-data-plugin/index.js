// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { PersonalTable } = require('../../__gamedata');
const { getPokemonInfo } = require('./dex/info');
const { getEggGroupViaPokemonId, getEggGroupNameById } = require('./dex/egggroup');
const { getPokemonFormIds, getPokemonFormIndexById, getImage } = require('./dex/functions');
const { getEggMoves, getPokemonLearnset, getMoveProperties } = require('./dex/moves');
const { getPokemonName } = require('./dex/name');

/**
 * @param {{path: string, pokemonComponent: string, listComponent: string, wrapperComponent: string}} options
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin<any>}
 */
function pokedexDataPlugin(context, options) {
  return {
    name: 'luminescent-pokedex-data-plugin',
    async loadContent() {
      const pokemons = PersonalTable.Personal.map((p) => {
        const eggGroupNames = getEggGroupViaPokemonId(p.id).map((eggId) => getEggGroupNameById(eggId));
        const learnset = getPokemonLearnset(p.id);

        const moveList = [];
        for (let i = 0; i < learnset.length; i += 2) {
          moveList.push({ level: learnset[i], move: getMoveProperties(i + 1) });
        }

        const pokemonForms = getPokemonFormIds(p.monsno).map((id) => {
          const formIndex = getPokemonFormIndexById(p.monsno, id);
          return {
            name: getPokemonName(id),
            filename: getImage(p.monsno, formIndex),
          };
        });

        return {
          pokemonId: p.id,
          pokemonInfo: getPokemonInfo(p.monsno, p.id),
          eggGroupNames: eggGroupNames,
          eggLearnset: getEggMoves(p.id),
          lvlLearnset: moveList,
          pokemonForms: pokemonForms,
        };
      });

      const pokemonNames = pokemons.map((p) => ({ id: p.pokemonId, name: p.pokemonInfo.name }));

      return {
        pokemons: pokemons,
        pokemonNames: pokemonNames,
      };
    },

    async contentLoaded({ content, actions }) {
      const pokemonNamesJson = await actions.createData(
        'pokemonNames.json',
        JSON.stringify(content.pokemonNames, null, 2),
      );

      const pokemonListRoute = {
        path: options.path,
        component: options.listComponent,
        exact: true,
        modules: {
          pokemonNames: pokemonNamesJson,
        },
      };
      const pokemonRoutes = await Promise.all(
        content.pokemons.map(async (pokemon) => {
          const dataJson = await actions.createData(`lumi${pokemon.pokemonId}.json`, JSON.stringify(pokemon));
          return {
            path: `${options.path}/${pokemon.pokemonId}`,
            component: options.pokemonComponent,
            exact: true,
            modules: {
              data: dataJson,
              pokemonNames: pokemonNamesJson,
            },
          };
        }),
      );

      const subRoutes = [pokemonListRoute, ...pokemonRoutes];
      actions.addRoute({
        path: options.path,
        component: options.wrapperComponent,
        exact: false,
        routes: subRoutes,
      });
    },
  };
}

const optionsSchema = Joi.object({
  path: Joi.string(),
  pokemonComponent: Joi.string(),
  listComponent: Joi.string(),
  wrapperComponent: Joi.string(),
});

pokedexDataPlugin.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(optionsSchema, options);
  return validatedOptions;
};

module.exports = pokedexDataPlugin;
