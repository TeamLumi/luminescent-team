import {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  parseTmLearnsetSection,
} from './moves';

describe('Dex Utils Move Getters', () => {
  /**
    FAIL  src/utils/dex/moves.test.js

  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.       
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    luminescent-team\node_modules\@babel\runtime\helpers\esm\createForOfIteratorHelperLoose.js:1
    ({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
                                                                                      ^^^^^^

    SyntaxError: Cannot use import statement outside a module

      14 | function generateMovesViaLearnset(monsNo, level) {
      15 |   /**
    > 16 |    * In BDSP, a trainer's Pokemon, when provided no moves,
         |                                                               ^
      17 |    * will use the four most recent moves in the learnset.
      18 |    /
      19 |

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1495:14)
      at Object.<anonymous> (src/utils/dex/moves.js:16:63)
      at Object.require (src/utils/dex/moves.test.js:1:1) 
     */
});
