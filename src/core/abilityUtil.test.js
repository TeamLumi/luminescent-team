const { PersonalTable } = require('../../__gamedata');

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
