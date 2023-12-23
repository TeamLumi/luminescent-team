import path from 'path';
import fs from 'fs';
import {
  getPokemonIdFromFormMap,
  getGender,
  getGrassKnotPower,
  getImage,
  formatBaseStats,
  getPokemonIdFromMonsNoAndForm,
  createFormMap,
  getPokemonFormIndexById,
  FORM_MAP,
  FORM_MAP3,
} from './functions';
import { getPokemon } from './pokemon';

describe('Dex utils function tests', () => {
  it('Should return the form_no when provided accurate monsno and pokemon ID', () => {
    const result = getPokemonIdFromFormMap(3, 3); //Clone Venusaur
    const result2 = getPokemonIdFromFormMap(3, 0); //Venusaur
    const CLONE_VENUSAUR = 1013;
    const VENUSAUR = 3;
    expect(result).toBe(CLONE_VENUSAUR);
    expect(result2).toBe(VENUSAUR);
  });
  it('Should return undefined when provided a bad monsno or pokemon ID', () => {
    const result = getPokemonIdFromFormMap(9999, 0);
    expect(result).toBeUndefined();
  });
  describe('getGender()', () => {
    it('Should return M for a valid number', () => {
      const resultM = getGender(0);
      const MALE = 'M';
      expect(resultM).toBe(MALE);
    });
    it('Should return F for a valid number', () => {
      const resultF = getGender(254);
      const FEMALE = 'F';
      expect(resultF).toBe(FEMALE);
    });
    it('Should return N for a valid number', () => {
      const resultN = getGender(255);
      const NEUTRAL = 'N';
      expect(resultN).toBe(NEUTRAL);
    });
    it('Should return null otherwise', () => {
      expect(getGender(123)).toBeNull();
    });
  });

  describe('getGrassKnotPower', () => {
    it('should return 120 when weight is greater than or equal to 200', () => {
      expect(getGrassKnotPower(200)).toBe(120);
      expect(getGrassKnotPower(300)).toBe(120);
    });

    it('should return 100 when weight is greater than or equal to 100 but less than 200', () => {
      expect(getGrassKnotPower(100)).toBe(100);
      expect(getGrassKnotPower(150)).toBe(100);
      expect(getGrassKnotPower(199)).toBe(100);
    });

    it('should return 80 when weight is greater than or equal to 50 but less than 100', () => {
      expect(getGrassKnotPower(50)).toBe(80);
      expect(getGrassKnotPower(75)).toBe(80);
      expect(getGrassKnotPower(99)).toBe(80);
    });

    it('should return 60 when weight is greater than or equal to 25 but less than 50', () => {
      expect(getGrassKnotPower(25)).toBe(60);
      expect(getGrassKnotPower(35)).toBe(60);
      expect(getGrassKnotPower(49)).toBe(60);
    });

    it('should return 40 when weight is greater than or equal to 10 but less than 25', () => {
      expect(getGrassKnotPower(10)).toBe(40);
      expect(getGrassKnotPower(15)).toBe(40);
      expect(getGrassKnotPower(24)).toBe(40);
    });

    it('should return 20 when weight is less than 10', () => {
      expect(getGrassKnotPower(5)).toBe(20);
      expect(getGrassKnotPower(9)).toBe(20);
    });
  });
  describe('getImage', () => {
    test('should return the correct image URL with default values', () => {
      expect(getImage()).toEqual('pm0000_00_00_00_L.webp');
    });

    test('should return the correct image URL with specified monsno and default formindex', () => {
      expect(getImage(25)).toEqual('pm0025_00_00_00_L.webp');
    });

    test('should return the correct image URL with specified monsno and formindex', () => {
      expect(getImage(25, 3)).toEqual('pm0025_03_00_00_L.webp');
    });

    test('should pad monsno with leading zeros', () => {
      expect(getImage(123)).toEqual('pm0123_00_00_00_L.webp');
    });

    test('should pad formindex with leading zeros', () => {
      expect(getImage(25, 9)).toEqual('pm0025_09_00_00_L.webp');
    });
  });

  describe('formatBaseStats', () => {
    const p = {
      basic_hp: 80,
      basic_atk: 100,
      basic_def: 70,
      basic_spatk: 60,
      basic_spdef: 70,
      basic_agi: 90,
    };

    test('should return the correctly formatted base stats string', () => {
      expect(formatBaseStats(p)).toEqual('HP: 80 / ATK: 100 / DEF: 70 / SPA: 60 / SPD: 70 / SPE: 90');
    });
  });
  describe('getPokemonIdFromMonsNoAndForm', () => {
    test('should return the correct Pokemon ID with valid monsno and formno', () => {
      expect(getPokemonIdFromMonsNoAndForm(25, 0)).toEqual(25);
    });

    test('should return undefined with invalid monsno and formno', () => {
      expect(getPokemonIdFromMonsNoAndForm(-1, 0)).toBeUndefined();
    });

    test('should return the correct Pokemon ID for a different monsno and formno', () => {
      expect(getPokemonIdFromMonsNoAndForm(493, 1)).toEqual(1193);
    });
  });

  describe('createFormMap', () => {
    test('should add an ID to an existing form array', () => {
      const formMap = { 25: [1, 2, 3] };
      const currentPokemon = { monsno: 25, id: 4 };
      const expectedFormMap = { 25: [1, 2, 3, 4] };
      const actualFormMap = createFormMap(formMap, currentPokemon);
      expect(actualFormMap).toEqual(expectedFormMap);
    });

    test('should create a new form array if none exists for the monsno', () => {
      const formMap = { 25: [1, 2, 3] };
      const currentPokemon = { monsno: 700, id: 1 };
      const expectedFormMap = { 25: [1, 2, 3], 700: [1] };
      const actualFormMap = createFormMap(formMap, currentPokemon);
      expect(actualFormMap).toEqual(expectedFormMap);
    });
  });

  function getAllPokemonFormImageData(onlyValidPokemons = false, MODE = "2.0") {
    const form_map = MODE === "2.0" ? FORM_MAP : FORM_MAP3;
    const pokemonFormData = [];

    for (const entry of Object.entries(form_map)) {
      const monsno = entry[0];
      const pokemonForms = entry[1];

      for (let i = 0; i < pokemonForms.length; i++) {
        const pokemonForm = pokemonForms[i];
        const pokemon = getPokemon(pokemonForm, MODE);
        if (onlyValidPokemons && !pokemon.isValid) {
          continue;
        }
        const filename = getImage(monsno, getPokemonFormIndexById(monsno, pokemonForm, MODE));
        pokemonFormData.push([filename, pokemon.name]);
      }
    }

    return pokemonFormData;
  }

  test.skip.each([...getAllPokemonFormImageData(true)])('pokemon form image %s for %s exists', (filename, _, done) => {
    const imgFilePath = path.join(__dirname, '../../../static/img/', filename);
    fs.access(imgFilePath, fs.constants.F_OK, (err) => {
      let fileExists = true;
      if (err) {
        fileExists = false;
      }

      try {
        expect(fileExists).toBe(true);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  describe('3.0 Functions Tests', () => {
    const MODE = "3.0";
    test('should return the correct Pokemon ID for a different monsno and formno', () => {
      expect(getPokemonIdFromMonsNoAndForm(493, 1, MODE)).toEqual(1216);
    });
    it('Should return the form_no when provided accurate monsno and pokemon ID', () => {
      const result = getPokemonIdFromFormMap(3, 3, MODE); //Clone Venusaur
      const result2 = getPokemonIdFromFormMap(3, 0, MODE); //Venusaur
      const CLONE_VENUSAUR = 1028;
      const VENUSAUR = 3;
      expect(result).toBe(CLONE_VENUSAUR);
      expect(result2).toBe(VENUSAUR);
    });
    test.skip.each([...getAllPokemonFormImageData(true, MODE)])('pokemon form image %s for %s exists', (filename, _, done) => {
      const imgFilePath = path.join(__dirname, '../../../static/img/', filename);
      fs.access(imgFilePath, fs.constants.F_OK, (err) => {
        let fileExists = true;
        if (err) {
          fileExists = false;
        }

        try {
          expect(fileExists).toBe(true);
          done();
        } catch (err) {
          done(err);
        }
      });
    });
  })
});
