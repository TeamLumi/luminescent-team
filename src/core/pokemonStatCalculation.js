const NATURE_MULTIPLIER = {
  LOW: 0.9,
  STANDARD: 1.0,
  HIGH: 1.1,
};

const IV = {
  MIN: 0,
  MAX: 31,
};

const EV = {
  MIN: 0,
  MAX: 255,
};

export const calcStat = (baseStat, isHP, level, natureMult, individualValue = 0, effortValue = 0) => {
  if (isHP) {
    if (baseStat === 1) return 1;
    return Math.floor(
      (Math.floor(2 * baseStat + individualValue + Math.floor(effortValue / 4) + 100) * level) / 100 + 10,
    );
  }
  let val = (Math.floor((Math.floor(2 * baseStat + individualValue + Math.floor(effortValue / 4)) * level) / 100 + 5)) *natureMult;

  return Math.floor(val);
};

export const calcMinNegStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, NATURE_MULTIPLIER.LOW, IV.MIN, EV.MIN);
};

export const calcMinStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, NATURE_MULTIPLIER.STANDARD, IV.MAX, EV.MIN);
};

export const calcMaxStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, NATURE_MULTIPLIER.STANDARD, IV.MAX, EV.MAX);
};

export const calcMaxPosStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, NATURE_MULTIPLIER.HIGH, IV.MAX, EV.MAX);
};
