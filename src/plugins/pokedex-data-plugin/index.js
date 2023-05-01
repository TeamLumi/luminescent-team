const PersonalTable = require('../../../__gamedata/PersonalTable.json');
const { getPokemonInfo } = require('./dex');
const { getEggGroupViaPokemonId, getEggGroupNameById } = require('./dex/egggroup');
const { getEggMoves, getPokemonLearnset, getMoveProperties } = require('./dex/moves');

module.exports = async function pokedexDataPlugin(context, options) {
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

        return {
          pokemonId: p.id,
          pokemonInfo: getPokemonInfo(p.id),
          eggGroupNames: eggGroupNames,
          eggLearnset: getEggMoves(p.id),
          lvlLearnset: moveList,
        };
      });
      return {
        data: data,
      };
    },
    async contentLoaded({ content, actions }) {
      // TODO: create sub routes instead
      for (const data of content.data) {
        const dataJson = await actions.createData(`lumi${data.pokemonId}.json`, JSON.stringify(data));

        actions.addRoute({
          path: `/pokemon/${data.pokemonId}`,
          component: '@site/src/components/Pokemon/PokemonPage.jsx',
          exact: true,
          modules: {
            data: dataJson,
          },
        });
      }
    },
  };
};
