const PersonalTable = require('../../../__gamedata/PersonalTable.json');
const { getPokemonInfo } = require('./dex');

module.exports = async function pokedexDataPlugin(context, options) {
  return {
    name: 'luminescent-pokedex-data-plugin',
    async loadContent() {
      const data = PersonalTable.Personal.map((p) => {
        return {
          pokemonId: p.id,
          pokemonInfo: getPokemonInfo(p.id),
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
