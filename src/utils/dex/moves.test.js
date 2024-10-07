import {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  getTMCompatibility,
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
      const incompatibleMoveName = 'undefined';
      expect(() => getMoveString(incompatibleMoveId)).toThrow(
        Error(`Incompatible move string found: ID - ${incompatibleMoveId}, String: ${incompatibleMoveName}`),
      );
    });
  });
  describe('getEggMoves', () => {
    it('returns an empty array for an invalid dexId', () => {
      expect(getEggMoves(9999)).toEqual([]);
    });

    it('returns an array of egg moves for a valid dexId', () => {
      const eggMoves = getEggMoves(1);
      expect(eggMoves).toContainEqual({
        level: "egg",
        move: {
          accuracy: 100,
          damageType: 1,
          desc: "The user tucks in its head to raise its Defense stat on the first turn, then rams the target on the next turn.",
          maxPP: 16,
          moveId: 130,
          name: "Skull Bash",
          power: 130,
          type: 0,
        },
      });
    });

    it('returns an empty array for a dexId with no egg moves', () => {
      expect(getEggMoves(2)).toEqual([]);
    });
  });
  describe('getTMCompatibility', () => {
    const TM_LEARNSET = [
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      true,
      true,
      true,
      false,
      false,
      false,
      true,
      true,
      true,
      false,
      true,
      true,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
    ];

    it('returns the correct array for a decimal number', () => {
      expect(getTMCompatibility(3)).toStrictEqual(TM_LEARNSET);
    });

    it('returns a 32-character string for any input', () => {
      const learnsetArray = getTMCompatibility(8);
      expect(learnsetArray).toHaveLength(128);
    });
  });
  describe('getTechMachineLearnset', () => {
    it('returns an empty array when no TMs are learned', () => {
      expect(getTechMachineLearnset(0)).toEqual([]);
    });

    it('returns an array of TM moves when one or more TMs are learned', () => {
      const learnset = getTechMachineLearnset(3);
      expect(learnset).toStrictEqual([
        {
          level: 'tm',
          move: {
            moveId: 46,
            name: 'Roar',
            desc: 'The target is scared off, and a different Pokémon is dragged out. In the wild, this ends a battle against a single Pokémon.',
            type: 0,
            damageType: 0,
            maxPP: 32,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 92,
            name: 'Toxic',
            desc: 'A move that leaves the target badly poisoned. Its poison damage worsens every turn.',
            type: 3,
            damageType: 0,
            maxPP: 16,
            power: 0,
            accuracy: 90
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 331,
            name: 'Bullet Seed',
            desc: 'The user forcefully shoots seeds at the target two to five times in a row.',
            type: 11,
            damageType: 1,
            maxPP: 48,
            power: 25,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 237,
            name: 'Hidden Power',
            desc: 'A unique attack that varies in type depending on the Pokémon using it.',
            type: 0,
            damageType: 2,
            maxPP: 24,
            power: 60,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 241,
            name: 'Sunny Day',
            desc: 'The user intensifies the sun for five turns, powering up Fire-type moves. It lowers the power of Water-type moves.',
            type: 9,
            damageType: 0,
            maxPP: 8,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 63,
            name: 'Hyper Beam',
            desc: 'The target is attacked with a powerful beam. The user can’t move on the next turn.',
            type: 0,
            damageType: 2,
            maxPP: 8,
            power: 150,
            accuracy: 90
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 113,
            name: 'Light Screen',
            desc: 'A wondrous wall of light is put up to reduce damage from special attacks for five turns.',
            type: 13,
            damageType: 0,
            maxPP: 48,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 182,
            name: 'Protect',
            desc: 'This move enables the user to protect itself from all attacks. Its chance of failing rises if it is used in succession.',
            type: 0,
            damageType: 0,
            maxPP: 16,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 202,
            name: 'Giga Drain',
            desc: 'A nutrient-draining attack. The user’s HP is restored by half the damage taken by the target.',
            type: 11,
            damageType: 2,
            maxPP: 16,
            power: 75,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 219,
            name: 'Safeguard',
            desc: 'The user creates a protective field that prevents status conditions for five turns.',
            type: 0,
            damageType: 0,
            maxPP: 40,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 76,
            name: 'Solar Beam',
            desc: 'In this two-turn attack, the user gathers light, then blasts a bundled beam on the next turn.',
            type: 11,
            damageType: 2,
            maxPP: 16,
            power: 120,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 89,
            name: 'Earthquake',
            desc: 'The user sets off an earthquake that strikes every Pokémon around it.',
            type: 4,
            damageType: 1,
            maxPP: 16,
            power: 100,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 104,
            name: 'Double Team',
            desc: 'By moving rapidly, the user makes illusory copies of itself to raise its evasiveness.',
            type: 0,
            damageType: 0,
            maxPP: 24,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 188,
            name: 'Sludge Bomb',
            desc: 'Unsanitary sludge is hurled at the target. This may also poison the target.',
            type: 3,
            damageType: 2,
            maxPP: 16,
            power: 90,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 263,
            name: 'Facade',
            desc: 'This attack move doubles its power if the user is poisoned, burned, or paralyzed.',
            type: 0,
            damageType: 1,
            maxPP: 32,
            power: 70,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 156,
            name: 'Rest',
            desc: 'The user goes to sleep for two turns. This fully restores the user’s HP and heals any status conditions.',
            type: 13,
            damageType: 0,
            maxPP: 16,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 213,
            name: 'Attract',
            desc: 'If it is the opposite gender of the user, the target becomes infatuated and less likely to attack.',
            type: 0,
            damageType: 0,
            maxPP: 24,
            power: 0,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 412,
            name: 'Energy Ball',
            desc: 'The user draws power from nature and fires it at the target. This may also lower the target’s Sp. Def stat.',
            type: 11,
            damageType: 2,
            maxPP: 16,
            power: 90,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 206,
            name: 'False Swipe',
            desc: 'A restrained attack that prevents the target from fainting. The target is left with at least 1 HP.',
            type: 0,
            damageType: 1,
            maxPP: 64,
            power: 40,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 203,
            name: 'Endure',
            desc: 'The user endures any attack with at least 1 HP. Its chance of failing rises if it is used in succession.',
            type: 0,
            damageType: 0,
            maxPP: 16,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 416,
            name: 'Giga Impact',
            desc: 'The user charges at the target using every bit of its power. The user can’t move on the next turn.',
            type: 0,
            damageType: 1,
            maxPP: 8,
            power: 150,
            accuracy: 90
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 148,
            name: 'Flash',
            desc: 'The user flashes a light that lowers the target’s accuracy. It can also be used to illuminate caves.',
            type: 0,
            damageType: 0,
            maxPP: 32,
            power: 0,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 14,
            name: 'Swords Dance',
            desc: 'A frenetic dance to uplift the fighting spirit. This sharply raises the user’s Attack stat.',
            type: 0,
            damageType: 0,
            maxPP: 32,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 214,
            name: 'Sleep Talk',
            desc: 'While it is asleep, the user randomly uses one of the moves it knows.',
            type: 0,
            damageType: 0,
            maxPP: 16,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 447,
            name: 'Grass Knot',
            desc: 'The user snares the target with grass and trips it. The heavier the target, the greater the move’s power.',
            type: 11,
            damageType: 2,
            maxPP: 32,
            power: 1,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 207,
            name: 'Swagger',
            desc: 'The user enrages and confuses the target. However, this also sharply raises the target’s Attack stat.',
            type: 0,
            damageType: 0,
            maxPP: 24,
            power: 0,
            accuracy: 85
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 164,
            name: 'Substitute',
            desc: 'The user creates a substitute for itself using some of its HP. The substitute serves as the user’s decoy.',
            type: 0,
            damageType: 0,
            maxPP: 16,
            power: 0,
            accuracy: 101
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 15,
            name: 'Cut',
            desc: 'The target is cut with a scythe or claw. It’s also one of the Pokétch’s hidden moves.',
            type: 11,
            damageType: 1,
            maxPP: 40,
            power: 60,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 70,
            name: 'Strength',
            desc: 'The target is slugged with a punch thrown at maximum power. It’s also one of the Pokétch’s hidden moves.',
            type: 0,
            damageType: 1,
            maxPP: 24,
            power: 100,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 249,
            name: 'Rock Smash',
            desc: 'The user attacks with a punch that may lower the target’s Defense stat. It’s also one of the Pokétch’s hidden moves.',
            type: 1,
            damageType: 1,
            maxPP: 24,
            power: 60,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 431,
            name: 'Rock Climb',
            desc: 'A charging attack that may also leave the foe confused. It’s also one of the Pokétch’s hidden moves.',
            type: 5,
            damageType: 1,
            maxPP: 16,
            power: 80,
            accuracy: 95
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 523,
            name: 'Bulldoze',
            desc: 'The user strikes everything around it by stomping down on the ground. This lowers the Speed stats of those hit.',
            type: 4,
            damageType: 1,
            maxPP: 32,
            power: 60,
            accuracy: 100
          }
        },
        {
          level: 'tm',
          move: {
            moveId: 526,
            name: 'Work Up',
            desc: 'The user is roused, and its Attack and Sp. Atk stats increase.',
            type: 0,
            damageType: 0,
            maxPP: 48,
            power: 0,
            accuracy: 101
          }
        }
      ]);
      expect(learnset).toHaveLength(33);
    });

    it('ignores TMs that the Pokémon cannot learn', () => {
      const learnset = getTechMachineLearnset(3);
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
          name,
          moveId,
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
        name: '———',
        moveId: 0,
        desc: '',
        type: 0,
        damageType: 0,
        maxPP: 0,
        power: 0,
        accuracy: 0,
      });
    });
  });
});
