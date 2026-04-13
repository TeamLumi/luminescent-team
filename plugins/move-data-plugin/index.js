// @ts-check
const { Joi } = require('@docusaurus/utils-validation');

const { GAMEDATA2, GAMEDATA3, GAMEDATAV, MovesTable } = require('../../__gamedata');
const { getMoveProperties } = require('../pokedex-data-plugin/dex/moves');
const { normalizePokemonName } = require('../pokedex-data-plugin/dex/name');
const { getTypeName } = require('../pokedex-data-plugin/dex/types');
const { Z_MOVES } = require('../pokedex-data-plugin/dex/moveConstants');

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
        (move) => getMoveProperties(move.wazaNo, GAMEDATAV, true)
      );

      const moves2 = MovesTable[GAMEDATA2].Waza.slice(1).map(
        (move) => getMoveProperties(move.wazaNo, GAMEDATA2, true)
      );

      const moves3 = MovesTable[GAMEDATA3].Waza.slice(1).map(
        (move) => getMoveProperties(move.wazaNo, GAMEDATA3, true)
      );

      const firstZMoveMap = Object.fromEntries(Z_MOVES.map(z => [z, 0]));

      const movesListV = movesV
        .filter(m => {
          if (!Z_MOVES.includes(m.movePath)) return true;

          if (firstZMoveMap[m.movePath] === 0) {
            firstZMoveMap[m.movePath] = 1;
            return true; // keep first
          }

          return false; // skip duplicates
        })
        .map(m => ({
          ...m,
          id: m.moveId,
          name: m.name,
          type: m.type,
          typeName: getTypeName(m.type, GAMEDATAV),
        }));

      const movesList2 = moves2
        .filter(m => {
          if (!Z_MOVES.includes(m.movePath)) return true;

          if (firstZMoveMap[m.movePath] === 0) {
            firstZMoveMap[m.movePath] = 1;
            return true; // keep first
          }

          return false; // skip duplicates
        })
        .map(m => ({
          ...m,
          id: m.moveId,
          name: m.name,
          type: m.type,
          typeName: getTypeName(m.type, GAMEDATA2),
        }));

      const movesList3 = moves3
        .filter(m => {
          if (!Z_MOVES.includes(m.movePath)) return true;

          if (firstZMoveMap[m.movePath] === 0) {
            firstZMoveMap[m.movePath] = 1;
            return true; // keep first
          }

          return false; // skip duplicates
        })
        .map(m => ({
          ...m,
          id: m.moveId,
          name: m.name,
          type: m.type,
          typeName: getTypeName(m.type, GAMEDATA3),
        }));

      return {
        movesV,
        moves2,
        moves3,
        movesListV,
        movesList2,
        movesList3,
      };
    },

    async contentLoaded({ content, actions }) {
      const moveDexPath = options.routeBasePath + options.path;
      const movesListVJson = await actions.createData('movesListV.json', JSON.stringify(content.movesListV));
      const movesList2Json = await actions.createData('movesList2.json', JSON.stringify(content.movesList2));
      const movesList3Json = await actions.createData('movesList3.json', JSON.stringify(content.movesList3));

      const movesListRoute = {
        path: moveDexPath,
        component: options.moveListComponent,
        exact: true,
        modules: {
          movesListV: movesListVJson,
          movesList2: movesList2Json,
          movesList3: movesList3Json,
        }
      };

      const moveRoutes = [];
      const zMoveMap = {};
      for (const item of Z_MOVES) {
        zMoveMap[item] = 0;
      }
      await Promise.all(
        content.moves3.map(async (move3) => {
          if (Z_MOVES.includes(move3.movePath)) {
            if (zMoveMap[move3.movePath] === 1) {
              return
            }
            zMoveMap[move3.movePath] += 1
          }
          const movePath = `${moveDexPath}/${move3.movePath}`;

          const moveJson3 = await actions.createData(`3.0lumi-${move3.movePath}.json`, JSON.stringify(move3));
          let moveJson2 = null;
          let moveJsonV = null;

          const move2 = content.moves2.find((m2) => m2.name === move3.name);
          if (move2) {
            moveJson2 = await actions.createData(`2.0lumi-${move3.movePath}.json`, JSON.stringify(move2));
          }

          const moveV = content.movesV.find((mV) => mV.name === move3.name);
          if (moveV) {
            moveJsonV = await actions.createData(`VanilaBDSP-${move3.movePath}.json`, JSON.stringify(moveV));
          }

          moveRoutes.push({
            path: movePath,
            component: options.moveComponent,
            exact: true,
            modules: {
              move2: moveJson2,
              move3: moveJson3,
              moveV: moveJsonV,
              moveListV: movesListVJson,
              moveList2: movesList2Json,
              moveList3: movesList3Json,
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
