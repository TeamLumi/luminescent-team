// @ts-check

const PersonalTable = require('../../__gamedata/PersonalTable.json');
const basePokemonNames = require('../../__gamedata/english_ss_monsname.json');
const formPokemonNames = require('../../__gamedata/english_ss_zkn_form.json');

const POKEMON_NAME_MAP = PersonalTable.Personal.reduce(createPokemonMap, {});
function createPokemonMap(pokemonNameMap, currentPokemon) {
  try {
    const { id } = currentPokemon;

    const baseFormName = basePokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof baseFormName === 'string' && baseFormName.length > 0) {
      pokemonNameMap[id] = baseFormName;
      return pokemonNameMap;
    }

    const alternateFormName = formPokemonNames.labelDataArray[id]?.wordDataArray[0]?.str;
    if (typeof alternateFormName === 'string' && alternateFormName.length > 0) {
      pokemonNameMap[id] = alternateFormName;
      return pokemonNameMap;
    }

    pokemonNameMap[id] = getFormNameOfProblematicPokemon(id);
    return pokemonNameMap;
  } catch (e) {
    throw Error(`${currentPokemon.id} - ${e}`);
  }
}

function getFormNameOfProblematicPokemon(id = 0) {
  switch (id) {
    case 1242:
      return 'Ash-Greninja';
    case 1285:
      return 'Meowstic-F';
    case 1310:
      return 'Rockruff Own-Tempo';
    case 1441:
      return 'Indeedee-F';
    case 1454:
      return 'Basculegion-F';
    case 1456:
      return 'Oinkologne-F';
    default:
      throw Error(`Bad Pokemon ID in PokemonNameMap: ${id}`);
  }
}

/**
 * @param {Record<string, unknown>} options
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin<any>}
 */
function LumiDataPlugin(context, options) {
  return {
    name: 'luminescent-pokedex-data-plugin',
    async loadContent() {
      return {
        pokemonNames: Object.values(POKEMON_NAME_MAP),
      };
    },

    async contentLoaded({ content, actions }) {
      const dataJson = await actions.createData('data.json', JSON.stringify(content));

      actions.addRoute({
        path: '/dex2',
        component: '@site/src/pages/_dex2.jsx',
        exact: true,
        modules: {
          data: dataJson,
        },
      });
    },
  };
}

module.exports = LumiDataPlugin;
