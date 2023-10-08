import { convertGenderRatioFromDecimal } from './genderRatioConverter';

describe('Gender Ratio Converter', () => {
  test.each([
    [254, 0.0, 100.0],
    [225, 11.46, 88.54],
    [191, 24.90, 75.10],

    [127, 50.20, 49.80],
    [63, 75.49, 24.51],
    [31, 88.14, 11.86],
    [0, 100, 0],
  ])('convert decimal value %s', (decimalValue, malePercentage, femalePercentage) => {
    const ratio = convertGenderRatioFromDecimal(decimalValue);
    expect(ratio.male).toEqual(malePercentage);
    expect(ratio.female).toEqual(femalePercentage);
  });
});
