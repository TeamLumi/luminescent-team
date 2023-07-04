import util from 'util';
import { getEvolutionTree } from './evolution';

describe('Dex Utils Evolution Tests', () => {
  it('should return Pikachu Evolution Tree', () => {
    let evo = getEvolutionTree(25);
    console.log('Pikachu', util.inspect(evo, false, null, true));

    evo = getEvolutionTree(26);
    console.log('Raichu', util.inspect(evo, false, null, true));

    evo = getEvolutionTree(172);
    console.log('Pichu', util.inspect(evo, false, null, true));
  });
});
