// @ts-check

const PersonalTable = require('../../__gamedata/PersonalTable.json');
const { getPokemonInfo } = require('./dex');
const { getEggGroupViaPokemonId, getEggGroupNameById } = require('./dex/egggroup');
const { getPokemonFormIds, getPokemonFormIndexById, getImage } = require('./dex/functions');
const { getEggMoves, getPokemonLearnset, getMoveProperties } = require('./dex/moves');
const { getPokemonName } = require('./dex/name');

/**
 * @param {Record<string, unknown>} options
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin<any>}
 */
function pokedexDataPlugin(context, options) {
  return {
    name: 'luminescent-pokedex-data-plugin',
    async loadContent() {
      const data = PersonalTable.Personal.map((p) => {
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
          pokemonInfo: getPokemonInfo(p.id),
          eggGroupNames: eggGroupNames,
          eggLearnset: getEggMoves(p.id),
          lvlLearnset: moveList,
          pokemonForms: pokemonForms,
        };
      });

      return {
        data: data,
      };
    },

    async contentLoaded({ content, actions }) {
      // TODO: create sub routes instead
      await Promise.all(
        content.data.map(async (data) => {
          const dataJson = await actions.createData(`lumi${data.pokemonId}.json`, JSON.stringify(data));
          actions.addRoute({
            path: `/${data.pokemonId}`,
            component: '@site/src/components/Pokemon/PokemonPage.jsx',
            exact: true,
            modules: {
              data: dataJson,
            },
          });
        }),
      );
    },
  };
}

module.exports = pokedexDataPlugin;
