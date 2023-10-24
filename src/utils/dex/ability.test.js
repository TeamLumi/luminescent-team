const {
  makeSmogonAbilityObject,
  getAbilityIdFromAbilityName,
  getAbilityString,
  getAbilityInfo,
} = require("./ability");

describe("Ability dex utils", () => {
  it("Should make a valid Smogon ability object", () => {
    const abilityObject = makeSmogonAbilityObject(1);
    const desiredObject = { 0: "Stench" };
    expect(abilityObject).toMatchObject(desiredObject);
  });
  it("Should throw an error when an invalid ability Id is supplied", () => {
    expect(() => makeSmogonAbilityObject(-1)).toThrow("Bad ability ID: -1");
  });

  it("Should return a valid numerical ID when supplied with a valid ability name.", () => {
    const abilityId = getAbilityIdFromAbilityName("Stench");
    const desiredResult = 1;
    expect(parseInt(abilityId)).not.toBeNaN();
    expect(typeof abilityId).toBe("number");
    expect(abilityId).toBe(desiredResult);
  });

  it("Should throw an error when supplied with an invalid ability Id.", () => {
    expect(() => getAbilityIdFromAbilityName(-1)).toThrow();
  });

  it("Should return a string when supplied with a valid ability Id.", () => {
    const abilityName = getAbilityString(1);
    const desiredResult = "Stench";
    expect(typeof abilityName).toBe("string");
    expect(abilityName).toBe(desiredResult);
  });

  it("Should return null when supplied with an invalid ability Id.", () => {
    const DUMMY_DATA = "woogly";
    expect(() => getAbilityString(DUMMY_DATA)).toThrow(
      `Bad ability ID: ${DUMMY_DATA}`
    );
  });

  it("Should return a string when supplied with a valid ability Id.", () => {
    const abilityInfo = getAbilityInfo(1);
    const desiredResult =
      "By releasing stench when attacking, this Pokémon may cause the target to flinch.";
    expect(typeof abilityInfo).toBe("string");
    expect(abilityInfo).toBe(desiredResult);
  });

  it('Should return "None" when supplied with an invalid ability Id.', () => {
    const abilityInfo = getAbilityInfo("woogly");
    const desiredResult = "None";
    expect(abilityInfo).toBe(desiredResult);
  });
});
