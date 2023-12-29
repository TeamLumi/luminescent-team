const { PersonalTable } = require('../utils/dex/data');
const { PersonalTable3 } = require('../utils/dex/data3');

describe('Pokedex Ability Util Test', () => {
  const allPokemons = PersonalTable.Personal.map((p) => [p.monsno, p.id, p.tokusei1, p.tokusei2, p.tokusei3]);

  test.each([...allPokemons])(
    'every pokemon has 3 abilities | monsno: %s | id: %s',
    (monsno, id, ability1, ability2, abilityHidden) => {
      expect(ability1).not.toBeUndefined();
      expect(ability2).not.toBeUndefined();
      expect(abilityHidden).not.toBeUndefined();
    },
  );
});

describe('3.0 Pokedex Ability Util Test', () => {
  const allPokemons3 = PersonalTable3.Personal.map((p) => [p.monsno, p.id, p.tokusei1, p.tokusei2, p.tokusei3]);

  test.each([...allPokemons3])(
    'every pokemon has 3 abilities | monsno: %s | id: %s',
    (monsno, id, ability1, ability2, abilityHidden) => {
      expect(ability1).not.toBeUndefined();
      expect(ability2).not.toBeUndefined();
      expect(abilityHidden).not.toBeUndefined();
    },
  );
});
