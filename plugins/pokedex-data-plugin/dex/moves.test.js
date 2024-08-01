import {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  getTutorMoves
} from './moves';

describe('Dex Utils Move Getters', () => {
  describe('generateMovesViaLearnset', () => {
    it('should return the expected moves for Pikachu at level 20', () => {
      const monsNo = 25; // Pikachu
      const level = 20;
      const expectedMoves = ['Electro Ball', 'Shock Wave', 'Feint', 'Spark'];
      const actualMoves = generateMovesViaLearnset(monsNo, level);
      expect(actualMoves).toEqual(expectedMoves);
    });

    it('should return the expected moves for Pikachu at level 15', () => {
      const monsNo = 25; // Pikachu
      const level = 15;
      const expectedMoves = ['Thunder Wave', 'Double Kick', 'Electro Ball', 'Shock Wave'];
      const actualMoves = generateMovesViaLearnset(monsNo, level);
      expect(actualMoves).toEqual(expectedMoves);
    });

    it('should return the expected moves for Bulbasaur at level 10', () => {
      const bulbasaurNo = 1;
      const expectedBulbasaurMoves = ['Growl', 'Tackle', 'Vine Whip', 'Leech Seed'];
      const actualMoves = generateMovesViaLearnset(bulbasaurNo, 10);
      expect(actualMoves).toEqual(expectedBulbasaurMoves);
    });

    describe('when given invalid arguments', () => {
      it.each([
        ['invalid monsNo', 'a', 1, 'Invalid Pokémon number'],
        ['negative monsNo', -1, 1, 'Invalid Pokémon number'],
        ['monsNo not in learnset', 2899, 1, 'Invalid Pokémon number'],
        ['invalid level', 1, 'a', 'Invalid level'],
        ['negative level', 1, -1, 'Invalid level'],
      ])('should throw an error with %s', (_scenario, monsno, level, expectedError) => {
        expect(() => generateMovesViaLearnset(monsno, level)).toThrow(expectedError);
      });
    });
  });
  describe('getMoveId', () => {
    it.each([
      ['Tackle', 33],
      ['Thunderbolt', 85],
      ['Fire Blast', 126],
    ])('should return the index of the move in the moveEnum array', (input, expected) => {
      expect(getMoveId(input)).toBe(expected);
    });

    it.each([['foo'], [123], [null]])(
      'should throw an error if the move name is not found in the moveEnum array',
      (input) => {
        expect(() => getMoveId(input)).toThrowError(`Bad move name: ${input}`);
      },
    );
  });
  describe('isMoveNameSmogonCompatible', () => {
    test.each([
      [null, `Bad move string: ${null}`],
      [undefined, `Bad move string: ${undefined}`],
      [123, `Bad move string: 123`],
      ['', 'Bad move string: '],
    ])('throws %s when given %s', (moveString, expected) => {
      expect(() => isMoveNameSmogonCompatible(moveString)).toThrow(expected);
    });

    test.each([
      ['swordsdance', false],
      ['Toxic Spikes', true],
      ['Stealth Rock', true],
    ])('returns %s when given %s', (moveString, expected) => {
      expect(isMoveNameSmogonCompatible(moveString)).toBe(expected);
    });
  });

  describe('getMoveString', () => {
    it('returns the correct move string for a valid id', () => {
      expect(getMoveString(1)).toBe('Pound');
      expect(getMoveString(2)).toBe('Karate Chop');
      expect(getMoveString(3)).toBe('Double Slap');
    });

    it('throws an error for an invalid id', () => {
      const DUMMY_DATA = null;
      expect(() => getMoveString(DUMMY_DATA)).toThrow(Error(`Bad move string found: ID - ${DUMMY_DATA}`));
    });

    it('throws an error for an incompatible move string', () => {
      const incompatibleMoveId = 50000;
      expect(() => getMoveString(incompatibleMoveId)).toThrow(
        Error(`Incompatible move string found: ID - ${incompatibleMoveId}`),
      );
    });
  });
  describe('getEggMoves', () => {
    it('returns an empty array for an invalid dexId', () => {
      expect(getEggMoves(9999)).toEqual([]);
    });

    it('returns an array of egg moves for a valid dexId', () => {
      const eggMoves = getEggMoves(1);

      expect(eggMoves).toHaveLength(14);
      eggMoves.forEach((move) => {
        expect(move).toMatchSnapshot();
      });
    });

    it('returns an empty array for a dexId with no egg moves', () => {
      expect(getEggMoves(2)).toEqual([]);
    });
  });
  describe('getTechMachineLearnset', () => {
    it('returns an empty array when no TMs are learned', () => {
      expect(getTechMachineLearnset(0, 0, 0, 0)).toEqual([]);
    });

    it('returns an array of TM moves when one or more TMs are learned', () => {
      const pokemonId = 1 // Bulbasaur
      const learnset = getTechMachineLearnset(pokemonId);

      expect(learnset).toHaveLength(27);
      learnset.forEach((move) => {
        expect(move).toMatchSnapshot();
      });
    });

    it('ignores TMs that the Pokémon cannot learn', () => {
      const pokemonId = 1 // Bulbasaur
      const learnset = getTechMachineLearnset(pokemonId);
      expect(learnset).not.toContainEqual({ level: 'tm', moveId: 3 });
      expect(learnset).not.toContainEqual({ level: 'tm', moveId: 4 });
    });
  });

  describe('getPokemonLearnset', () => {
    const invalidArgs = [undefined, null, -1, 'foo'];
    const validArgs = [25, 201]; // Pikachu, Unown

    it.each(invalidArgs)('returns an empty array when the argument is not a non-negative integer', (arg) => {
      expect(getPokemonLearnset(arg)).toEqual([]);
    });

    it.each(validArgs)('returns an array of moves when the argument is a valid Pokemon ID', (arg) => {
      const learnset = getPokemonLearnset(arg);
      expect(Array.isArray(learnset)).toBe(true);
    });

    it('returns an empty array when the argument is a valid Pokemon ID with no learnset', () => {
      expect(getPokemonLearnset(0)).toEqual([]);
    });
  });

  describe('getMoveProperties', () => {
    test.each([
      [1, 'Pound', 'The target is physically pounded with a long tail, a foreleg, or the like.', 0, 1, 56, 40, 100],
      [
        100,
        'Teleport',
        'The user switches places with another party Pokémon. It may also be used to warp to the last Pokémon Center visited. If a wild Pokémon uses this move, it flees.',
        13,
        0,
        32,
        0,
        101,
      ],
      [
        250,
        'Whirlpool',
        'The user traps the target in a violent swirling whirlpool for four to five turns.',
        10,
        2,
        24,
        35,
        85,
      ],
    ])(
      'returns the expected properties for moveId $moveId',
      (moveId, name, desc, type, damageType, maxPP, power, accuracy) => {
        expect(getMoveProperties(moveId)).toEqual({
          moveId,
          name,
          desc,
          type,
          damageType,
          maxPP,
          power,
          accuracy,
        });
      },
    );

    test('returns default values for an invalid moveId', () => {
      expect(getMoveProperties()).toEqual({
        moveId: 0,
        name: '———',
        desc: '',
        type: 0,
        damageType: 0,
        maxPP: 0,
        power: 0,
        accuracy: 0,
      });
    });
  });
  describe('getTutorMoves', () => {
    // Test case 1: monsno === 0
    it('returns an empty array when monsno is 0', () => {
      const result = getTutorMoves(0);
      expect(result).toEqual([]);
    });
  
    // Test case 2: !Object.hasOwn(tutorMoves, monsno)
    it('returns an empty array when monsno does not exist in tutorMoves', () => {
      const result = getTutorMoves(9999); // Assuming 9999 doesn't exist in tutorMoves
      expect(result).toEqual([]);
    });
  
    // Test case 3: !Object.hasOwn(tutorMoves[monsno], formno)
    it('returns an empty array when formno does not exist for monsno in tutorMoves', () => {
      const result = getTutorMoves(1, 3); // Assuming formno 3 doesn't exist for monsno 1
      expect(result).toEqual([]);
    });
  
    // Test case 4: Valid input, monsno and formno exist in tutorMoves
    it('returns an array of tutor moves for valid monsno and formno', () => {
      const expectedResult = [
          {
            "move": {
              "accuracy": 95,
              "damageType": 2,
              "desc": "The user attacks and captures opposing Pokémon using an electric net. This lowers their Speed stats.",
              "maxPP": 24,
              "moveId": 527,
              "name": "Electroweb",
              "power": 55,
              "type": 12,
            },
            "moveLevel": 0,
        },
        {
          "move": {
            "accuracy": 101,
            "damageType": 0,
            "desc": "The user hardens its body’s surface like iron, sharply raising its Defense stat.",
            "maxPP": 24,
            "moveId": 334,
            "name": "Iron Defense",
            "power": 0,
            "type": 8,
          },
          "moveLevel": 0,
      }];
      
      const result = getTutorMoves(11, 0);
      expect(result).toEqual(expectedResult);
    });
  });
});
