import { POKEMON_FORM_ID_MAP, getPokemonFormIndexById, getPokemonImageFilename } from './pokemonFormSelector';
import fs from 'fs';
import path from 'path';

test('pokemon Venusaur should have 4 different forms', () => {
  const venusaurMonsno = 3;
  const venusaurIds = POKEMON_FORM_ID_MAP[venusaurMonsno];

  expect(getPokemonFormIndexById(venusaurMonsno, venusaurIds[0].pokemonId)).toBe(0);
  expect(getPokemonFormIndexById(venusaurMonsno, venusaurIds[1].pokemonId)).toBe(1);
  expect(getPokemonFormIndexById(venusaurMonsno, venusaurIds[2].pokemonId)).toBe(2);
  expect(getPokemonFormIndexById(venusaurMonsno, venusaurIds[3].pokemonId)).toBe(3);
  expect(getPokemonFormIndexById(venusaurMonsno, venusaurIds[4])).toBe(-1);
});

test('get pokemon form index with not linked pokemonId should return -1', () => {
  const monsno = 25;
  const pokemonId = -1;

  expect(getPokemonFormIndexById(monsno, pokemonId)).toBe(-1);
});

test.each([
  [0, 0, 'pm0000_00_00_00_L.webp'],
  [4, 0, 'pm0004_00_00_00_L.webp'],
  [7, 2, 'pm0007_02_00_00_L.webp'],
  [1, 10, 'pm0001_10_00_00_L.webp'],
  [25, 2, 'pm0025_02_00_00_L.webp'],
  [282, 6, 'pm0282_06_00_00_L.webp'],
  [1036, 1, 'pm1036_01_00_00_L.webp'],
])('get pokemon image file name', (monsno, formIndex, filename) => {
  expect(getPokemonImageFilename(monsno, formIndex)).toBe(filename);
});

function getAllPokemonFormImageData() {
  const pokemonFormData = [];

  for (const entry of Object.entries(POKEMON_FORM_ID_MAP)) {
    const monsno = entry[0];
    const pokemonForms = entry[1];

    for (let i = 0; i < pokemonForms.length; i++) {
      const pokemonForm = pokemonForms[i];
      const filename = getPokemonImageFilename(monsno, getPokemonFormIndexById(monsno, pokemonForm.pokemonId));
      pokemonFormData.push([filename, pokemonForm.formName]);
    }
  }

  return pokemonFormData;
}
test('get pokemon form index with no formIndex should take the default index at 0', () => {
  const [monsno,image] = [0, 'pm0000_00_00_00_L.webp']
  expect(getPokemonImageFilename(monsno)).toBe(image);
});
test.skip.each([...getAllPokemonFormImageData()])('pokemon form image %s for %s exists', (filename, formName, done) => {
  const imgFilePath = path.join(__dirname, '../../static/img/', filename);
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
