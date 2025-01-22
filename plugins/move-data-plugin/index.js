// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { GAMEDATA2, GAMEDATA3, GAMEDATAV, MovesTable } = require('../../__gamedata');
const { getMoveProperties } = require('../pokedex-data-plugin/dex/moves');
const { normalizePokemonName } = require('../pokedex-data-plugin/dex/name');
const { getTypeName } = require('../pokedex-data-plugin/dex/types');

/**
 * @param {{path: string, routeBasePath: string, moveComponent: string, moveListComponent: string, wrapperComponent: string}} options
 * @param {import('@docusaurus/types').LoadContext} context
 * @returns {import('@docusaurus/types').Plugin<any>}
 */

function moveDexDataPlugin(context, options) {
  return {
    name: 'luminescent-movedex-data-plugin',
    async loadContent() {
      const movesV = MovesTable[GAMEDATAV].Waza.slice(1).map(
        (move) => getMoveProperties(move.wazaNo, GAMEDATAV)
      );

      const moves2 = MovesTable[GAMEDATA2].Waza.slice(1).map(
        (move) => getMoveProperties(move.wazaNo, GAMEDATA2)
      );

      const moves3 = MovesTable[GAMEDATA3].Waza.slice(1).map(
        (move) => getMoveProperties(move.wazaNo, GAMEDATA3)
      );
      const movesList3 = moves3.map((m) => ({
        id: m.moveId,
        name: m.name,
        type: m.type,
        typeName: getTypeName(m.type),
      }));

      return {
        movesV,
        moves2,
        moves3,
        movesList3,
      };
    },

    async contentLoaded({ content, actions }) {
      const moveDexPath = options.routeBasePath + options.path;
      const movesListJson = await actions.createData('movesList.json', JSON.stringify(content.movesList3));

      const movesListRoute = {
        path: moveDexPath,
        component: options.moveListComponent,
        exact: true,
        modules: {
          movesList: movesListJson,
        }
      };

      const moveRoutes = [];
      await Promise.all(
        content.moves3.map(async (move3) => {
          const moveName = normalizePokemonName(move3.name, GAMEDATA3);
          const movePath = `${moveDexPath}/${moveName}`;

          const moveJson3 = await actions.createData(`3.0lumi${moveName}.json`, JSON.stringify(move3));
          let moveJson2 = null;
          let moveJsonV = null;

          const move2 = content.moves2.find((m2) => m2.name === move3.name);
          if (move2) {
            moveJson2 = await actions.createData(`2.0lumi${moveName}.json`, JSON.stringify(move2));
          }

          const moveV = content.movesV.find((mV) => mV.name === move3.name);
          if (moveV) {
            moveJsonV = await actions.createData(`VanilaBDSP${moveName}.json`, JSON.stringify(moveV));
          }

          moveRoutes.push({
            path: movePath,
            component: options.moveComponent,
            exact: true,
            modules: {
              move2: moveJson2,
              move3: moveJson3,
              moveV: moveJsonV,
              moveList: movesListJson,
            },
          });
        }),
      );

      const subRoutes = [movesListRoute, ...moveRoutes];
      actions.addRoute({
        path: moveDexPath,
        component: options.wrapperComponent,
        exact: false,
        routes: subRoutes,
      });

      actions.setGlobalData({
        path: options.path
      });
    },
  };
}

const optionsSchema = Joi.object({
  path: Joi.string(),
  routeBasePath: Joi.string(),
  moveComponent: Joi.string(),
  moveListComponent: Joi.string(),
  wrapperComponent: Joi.string(),
});

moveDexDataPlugin.validateOptions = ({ options, validate }) => {
  const validatedOptions = validate(optionsSchema, options);
  return validatedOptions;
};

module.exports = moveDexDataPlugin;
