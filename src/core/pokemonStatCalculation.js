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

export const STATS = {
  HP: "hp",
  ATTACK: "atk",
  DEFENSE: "def",
  SPECIAL_ATTACK: "spa",
  SPECIAL_DEFENSE: "spd",
  SPEED: "spe",
}

const natureModifiers = {
  Hardy: { increased: null, decreased: null },
  Lonely: { increased: STATS.ATTACK, decreased: STATS.DEFENSE },
  Brave: { increased: STATS.ATTACK, decreased: STATS.SPEED },
  Adamant: { increased: STATS.ATTACK, decreased: STATS.SPECIAL_ATTACK },
  Naughty: { increased: STATS.ATTACK, decreased: STATS.SPECIAL_DEFENSE },
  Bold: { increased: STATS.DEFENSE, decreased: STATS.ATTACK },
  Docile: { increased: null, decreased: null },
  Relaxed: { increased: STATS.DEFENSE, decreased: STATS.SPEED },
  Impish: { increased: STATS.DEFENSE, decreased: STATS.SPECIAL_ATTACK },
  Lax: { increased: STATS.DEFENSE, decreased: STATS.SPECIAL_DEFENSE },
  Timid: { increased: STATS.SPEED, decreased: STATS.ATTACK },
  Hasty: { increased: STATS.SPEED, decreased: STATS.DEFENSE },
  Serious: { increased: null, decreased: null },
  Jolly: { increased: STATS.SPEED, decreased: STATS.SPECIAL_ATTACK },
  Naive: { increased: STATS.SPEED, decreased: STATS.SPECIAL_DEFENSE },
  Modest: { increased: STATS.SPECIAL_ATTACK, decreased: STATS.ATTACK },
  Mild: { increased: STATS.SPECIAL_ATTACK, decreased: STATS.DEFENSE },
  Quiet: { increased: STATS.SPECIAL_ATTACK, decreased: STATS.SPEED },
  Bashful: { increased: null, decreased: null },
  Rash: { increased: STATS.SPECIAL_ATTACK, decreased: STATS.SPECIAL_DEFENSE },
  Calm: { increased: STATS.SPECIAL_DEFENSE, decreased: STATS.ATTACK },
  Gentle: { increased: STATS.SPECIAL_DEFENSE, decreased: STATS.DEFENSE },
  Sassy: { increased: STATS.SPECIAL_DEFENSE, decreased: STATS.SPEED },
  Careful: { increased: STATS.SPECIAL_DEFENSE, decreased: STATS.SPECIAL_ATTACK },
  Quirky: { increased: null, decreased: null },
};

function calculateHpStat(baseStat, iv, ev, level) {
  const firstLayer = (2 * baseStat) + iv + Math.floor(ev / 4);
  const secondLayer = firstLayer * level;
  const thirdLayer = secondLayer / 100;
  const lastLayer = Math.floor(thirdLayer) + level + 10;
  return lastLayer;
}

export const calcStat = (baseStat, currentStat, isHP, level, iv = 0, ev = 0, nature) => {
  if (isHP) {
    if (baseStat === 1) return 1;
    return calculateHpStat(baseStat, iv, ev, level);
  }

  let val = Math.floor((Math.floor(2 * baseStat + iv + Math.floor(ev / 4)) * level) / 100 + 5);

  let natureMult = NATURE_MULTIPLIER.NORMAL
  if (currentStat === natureModifiers[nature].increased) {
    natureMult = NATURE_MULTIPLIER.HIGH
    val *= natureMult
  } else if(currentStat === natureModifiers[nature].decreased) {
    natureMult = NATURE_MULTIPLIER.LOW
    val *= natureMult
  }

  return Math.floor(val);
};

export const calcMinNegStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, IV.MIN, EV.MIN, NATURE_MULTIPLIER.LOW);
};

export const calcMinStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, IV.MAX, EV.MIN, NATURE_MULTIPLIER.STANDARD);
};

export const calcMaxStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, IV.MAX, EV.MAX, NATURE_MULTIPLIER.STANDARD);
};

export const calcMaxPosStat = (stat, isHp, level) => {
  return calcStat(stat, isHp, level, IV.MAX, EV.MAX, NATURE_MULTIPLIER.HIGH);
};
