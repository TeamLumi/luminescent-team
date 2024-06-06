import { calcMinNegStat, calcMinStat, calcMaxPosStat, calcMaxStat, calcStat} from './pokemonStatCalculation';
describe('calculate HP stat with default values for IV and EV at 0', () => {
  test('with base stat 45, level 100, nature multiplier 1.1', () => {
    expect(calcStat(45, true, 100, 1.0) ).toBe( 200 );
  });
  test('with base stat 45, level 100, nature multiplier 1.0', () => {
    expect(calcStat(45, false, 100, 1.0) ).toBe( 95 );
  });
  test('with base stat 1, level 100, nature multiplier 1.0', () => {
    expect(calcStat(1, true, 100, 1.0) ).toBe( 1 );
  });
  test('with base stat 1, level 100, nature multiplier 1.0', () => {
    expect(calcStat(1, false, 100, 1.0) ).toBe( 7 );
  });
});
describe('calculate min neg stat', () => {
  test('with hp stat, level 100', () => {
    const stat = calcMinNegStat(45, true, 100);
    expect(stat).toBe(200);
  });

  test('with hp stat, level 50', () => {
    const stat = calcMinNegStat(45, true, 50);
    expect(stat).toBe(105);
  });

  test('without hp stat, level 100', () => {
    const stat = calcMinNegStat(49, false, 100);
    expect(stat).toBe(92);
  });

  test('without hp stat, level 50', () => {
    const stat = calcMinNegStat(49, false, 50);
    expect(stat).toBe(48);
  });
});
describe('calculate min stat', () => {
  test('with hp stat, level 100', () => {
    const stat = calcMinStat(45, true, 100);
    expect(stat).toBe(231);
  });

  test('with hp stat, level 50', () => {
    const stat = calcMinStat(45, true, 50);
    expect(stat).toBe(120);
  });

  test('without hp stat, level 100', () => {
    const stat = calcMinStat(49, false, 100);
    expect(stat).toBe(134);
  });

  test('without hp stat, level 50', () => {
    const stat = calcMinStat(49, false, 50);
    expect(stat).toBe(69);
  });
});

describe('calculate max pos stat', () => {
  test('with hp stat, level 100', () => {
    const stat = calcMaxPosStat(45, true, 100);
    expect(stat).toBe(294);
  });

  test('with hp stat, level 50', () => {
    const stat = calcMaxPosStat(45, true, 50);
    expect(stat).toBe(152);
  });

  test('without hp stat, level 100', () => {
    const stat = calcMaxPosStat(49, false, 100);
    expect(stat).toBe(216);
  });

  test('without hp stat, level 50', () => {
    const stat = calcMaxPosStat(49, false, 50);
    expect(stat).toBe(111);
  });
});

describe('calculate max stat', () => {
  test('with hp stat, level 100', () => {
    const stat = calcMaxStat(45, true, 100);
    expect(stat).toBe(294);
  });

  test('with hp stat, level 50', () => {
    const stat = calcMaxStat(45, true, 50);
    expect(stat).toBe(152);
  });

  test('without hp stat, level 100', () => {
    const stat = calcMaxStat(49, false, 100);
    expect(stat).toBe(197);
  });

  test('without hp stat, level 50', () => {
    const stat = calcMaxStat(49, false, 50);
    expect(stat).toBe(101);
  });
});
