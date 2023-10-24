const {
  generateMovesViaLearnset,
  getMoveId,
  getMoveString,
  isMoveNameSmogonCompatible,
  getEggMoves,
  getTechMachineLearnset,
  getMoveProperties,
  getPokemonLearnset,
  getTMCompatibility,
} = require("./moves");

describe("Dex Utils Move Getters", () => {
  describe("generateMovesViaLearnset", () => {
    it("should return the expected moves for Pikachu at level 20", () => {
      const monsNo = 25; // Pikachu
      const level = 20;
      const expectedMoves = ["Electro Ball", "Shock Wave", "Feint", "Spark"];
      const actualMoves = generateMovesViaLearnset(monsNo, level);
      expect(actualMoves).toEqual(expectedMoves);
    });

    it("should return the expected moves for Pikachu at level 15", () => {
      const monsNo = 25; // Pikachu
      const level = 15;
      const expectedMoves = [
        "Thunder Wave",
        "Double Kick",
        "Electro Ball",
        "Shock Wave",
      ];
      const actualMoves = generateMovesViaLearnset(monsNo, level);
      expect(actualMoves).toEqual(expectedMoves);
    });

    it("should return the expected moves for Bulbasaur at level 10", () => {
      const bulbasaurNo = 1;
      const expectedBulbasaurMoves = [
        "Growl",
        "Tackle",
        "Vine Whip",
        "Leech Seed",
      ];
      const actualMoves = generateMovesViaLearnset(bulbasaurNo, 10);
      expect(actualMoves).toEqual(expectedBulbasaurMoves);
    });

    describe("when given invalid arguments", () => {
      it.each([
        ["invalid monsNo", "a", 1, "Invalid Pokémon number"],
        ["negative monsNo", -1, 1, "Invalid Pokémon number"],
        ["monsNo not in learnset", 2899, 1, "Invalid Pokémon number"],
        ["invalid level", 1, "a", "Invalid level"],
        ["negative level", 1, -1, "Invalid level"],
      ])(
        "should throw an error with %s",
        (_scenario, monsno, level, expectedError) => {
          expect(() => generateMovesViaLearnset(monsno, level)).toThrow(
            expectedError
          );
        }
      );
    });
  });
  describe("getMoveId", () => {
    it.each([
      ["Tackle", 33],
      ["Thunderbolt", 85],
      ["Fire Blast", 126],
    ])(
      "should return the index of the move in the moveEnum array",
      (input, expected) => {
        expect(getMoveId(input)).toBe(expected);
      }
    );

    it.each([["foo"], [123], [null]])(
      "should throw an error if the move name is not found in the moveEnum array",
      (input) => {
        expect(() => getMoveId(input)).toThrowError(`Bad move name: ${input}`);
      }
    );
  });
  describe("isMoveNameSmogonCompatible", () => {
    test.each([
      [null, `Bad move string: ${null}`],
      [undefined, `Bad move string: ${undefined}`],
      [123, `Bad move string: 123`],
      ["", "Bad move string: "],
    ])("throws %s when given %s", (moveString, expected) => {
      expect(() => isMoveNameSmogonCompatible(moveString)).toThrow(expected);
    });

    test.each([
      ["swordsdance", false],
      ["Toxic Spikes", true],
      ["Stealth Rock", true],
    ])("returns %s when given %s", (moveString, expected) => {
      expect(isMoveNameSmogonCompatible(moveString)).toBe(expected);
    });
  });

  describe("getMoveString", () => {
    it("returns the correct move string for a valid id", () => {
      expect(getMoveString(1)).toBe("Pound");
      expect(getMoveString(2)).toBe("Karate Chop");
      expect(getMoveString(3)).toBe("Double Slap");
    });

    it("throws an error for an invalid id", () => {
      const DUMMY_DATA = null;
      expect(() => getMoveString(DUMMY_DATA)).toThrow(
        Error(`Bad move string found: ID - ${DUMMY_DATA}`)
      );
    });

    it("throws an error for an incompatible move string", () => {
      const incompatibleMoveId = 50000;
      const incompatibleMoveName = "undefined";
      expect(() => getMoveString(incompatibleMoveId)).toThrow(
        Error(
          `Incompatible move string found: ID - ${incompatibleMoveId}, String: ${incompatibleMoveName}`
        )
      );
    });
  });
  describe("getEggMoves", () => {
    it("returns an empty array for an invalid dexId", () => {
      expect(getEggMoves(9999)).toEqual([]);
    });

    it("returns an array of egg moves for a valid dexId", () => {
      const eggMoves = getEggMoves(1);
      expect(eggMoves).toContainEqual({ level: "egg", moveId: 130 });
    });

    it("returns an empty array for a dexId with no egg moves", () => {
      expect(getEggMoves(2)).toEqual([]);
    });
  });
  describe("getTMCompatibility", () => {
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

    it("returns the correct array for a decimal number", () => {
      expect(getTMCompatibility(3)).toStrictEqual(TM_LEARNSET);
    });

    it("returns a 32-character string for any input", () => {
      const learnsetArray = getTMCompatibility(8);
      expect(learnsetArray).toHaveLength(128);
    });
  });
  describe("getTechMachineLearnset", () => {
    it("returns an empty array when no TMs are learned", () => {
      expect(getTechMachineLearnset(0)).toEqual([]);
    });

    it("returns an array of TM moves when one or more TMs are learned", () => {
      const learnset = getTechMachineLearnset(3);
      expect(learnset).toContainEqual({ level: "tm", moveId: 92 });
      expect(learnset).toContainEqual({ level: "tm", moveId: 331 });
      expect(learnset).toHaveLength(33);
    });

    it("ignores TMs that the Pokémon cannot learn", () => {
      const learnset = getTechMachineLearnset(3);
      expect(learnset).not.toContainEqual({ level: "tm", moveId: 3 });
      expect(learnset).not.toContainEqual({ level: "tm", moveId: 4 });
    });
  });

  describe("getPokemonLearnset", () => {
    const invalidArgs = [undefined, null, -1, "foo"];
    const validArgs = [25, 201]; // Pikachu, Unown

    it.each(invalidArgs)(
      "returns an empty array when the argument is not a non-negative integer",
      (arg) => {
        expect(getPokemonLearnset(arg)).toEqual([]);
      }
    );

    it.each(validArgs)(
      "returns an array of moves when the argument is a valid Pokemon ID",
      (arg) => {
        const learnset = getPokemonLearnset(arg);
        expect(Array.isArray(learnset)).toBe(true);
      }
    );

    it("returns an empty array when the argument is a valid Pokemon ID with no learnset", () => {
      expect(getPokemonLearnset(0)).toEqual([]);
    });
  });

  describe("getMoveProperties", () => {
    test.each([
      [
        1,
        "Pound",
        "The target is physically pounded with a long tail, a foreleg, or the like.",
        0,
        1,
        56,
        40,
        100,
      ],
      [
        100,
        "Teleport",
        "The user switches places with another party Pokémon. It may also be used to warp to the last Pokémon Center visited. If a wild Pokémon uses this move, it flees.",
        13,
        0,
        32,
        0,
        101,
      ],
      [
        250,
        "Whirlpool",
        "The user traps the target in a violent swirling whirlpool for four to five turns.",
        10,
        2,
        24,
        35,
        85,
      ],
    ])(
      "returns the expected properties for moveId $moveId",
      (moveId, name, desc, type, damageType, maxPP, power, accuracy) => {
        expect(getMoveProperties(moveId)).toEqual({
          name,
          desc,
          type,
          damageType,
          maxPP,
          power,
          accuracy,
        });
      }
    );

    test("returns default values for an invalid moveId", () => {
      expect(getMoveProperties()).toEqual({
        name: "———",
        desc: "",
        type: 0,
        damageType: 0,
        maxPP: 0,
        power: 0,
        accuracy: 0,
      });
    });
  });
});
