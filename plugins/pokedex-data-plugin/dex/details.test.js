import { getHeight, getWeight } from './details';

const TEST_POKEMON = 1; //Bulbasaur

describe('Dex details getters', () => {
  it('Should return a valid height in metric format', () => {
    const height = getHeight(TEST_POKEMON);
    const desiredResult = '0.71';
    expect(typeof height).toBe('string');
    expect(height).toBe(desiredResult);
  });

  it('Should return a height of 0 if an invalid pokemon ID is supplied', () => {
    const height = getHeight(-1);
    const desiredResult = '0.00';
    expect(typeof height).toBe('string');
    expect(height).toBe(desiredResult);
  });

  it('Should return a valid weight in metric format', () => {
    const weight = getWeight(TEST_POKEMON);
    const desiredResult = '6.89';
    expect(typeof weight).toBe('string');
    expect(weight).toBe(desiredResult);
  });

  it('Should return a weight of 0 if an invalid pokemon ID is supplied', () => {
    const weight = getWeight(-1);
    const desiredResult = '0';
    expect(typeof weight).toBe('string');
    expect(weight).toBe(desiredResult);
  });
});
