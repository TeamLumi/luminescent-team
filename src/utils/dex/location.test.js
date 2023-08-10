import { getEncounterLocations } from './location.cjs';

describe('Dex utils encounter Location getter tests', () => {
  it('should throw an error for an invalid pokemonId number', () => {
    expect(() => {
      getEncounterLocations('9999');
    }).toThrow('Bad pokemon ID: 9999');
  });

  it('should return an array of locations and encounters for a simple Pokemon (any)', () => {
    const input = '25'; // Pokemon ID for Pikachu
    const result = getEncounterLocations(input);
    expect(Array.isArray(result)).toBe(true);

    // Assert that each item in the array has a 'location' property and 'encounters' property.
    result.forEach((item) => {
      expect(item).toHaveProperty('location');
      expect(item).toHaveProperty('encounters');

      expect(Array.isArray(item.encounters)).toBe(true);

      // Assert that each item in the 'encounters' array has 'type', 'level', and 'rate' properties
      item.encounters.forEach((encounter) => {
        expect(encounter).toHaveProperty('type');
        expect(encounter).toHaveProperty('level');
        expect(encounter).toHaveProperty('rate');
      });
    });
  });

  it('should return expected data for specific locations', () => {
    const input = '25'; // Pokemon ID for Pikachu
    const result = getEncounterLocations(input);

    // Test specific properties of each item in the array.
    const expectedLocation1 = 'Trophy Garden';
    const expectedEncounters1 = [
      {
        type: 'ground_mons',
        level: 26,
        rate: 20,
      },
    ];
    expect(result[0].location).toBe(expectedLocation1);
    expect(result[0].encounters).toEqual(expectedEncounters1);

    const expectedLocation2 = 'Route 204 (South)';
    const expectedEncounters2 = [
      {
        type: 'Incense',
        level: 7,
        rate: 20,
      },
    ];
    expect(result[1].location).toBe(expectedLocation2);
    expect(result[1].encounters).toEqual(expectedEncounters2);
  });
});
