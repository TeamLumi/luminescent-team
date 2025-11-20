const STATUS_EFFECTS = { // Maps to the sickID in WazaTable
  0 : "None",
  1 : "Paralysis",
  2 : "Sleep",
  3 : "Freeze",
  4 : "Burn",
  5 : "Poison",
  6 : "Confusion",
  7 : "Infatuation",
  8 : "Bound",
  9 : "Nightmare",
  10 : "Curse",
  11 : "Taunt",
  12 : "Torment",
  13 : "Disable",
  14 : "Yawn",
  15 : "Heal Block",
  16 : "Gastro Acid",
  17 : "Identified",
  18 : "Leech Seed",
  19 : "Embargo",
  20 : "Perish Song",
  21 : "Rooted",
  22 : "Block",
  23 : "Encore",
  24 : "Throat Chop",
  25 : "Roost",
  26 : "WAZALOCK",
  27 : "TAMELOCK",
  28 : "KODAWARI",
  29 : "MUSTHIT",
  30 : "MUSTHIT_TARGET",
  31 : "FLYING",
  32 : "FLYING_CANCEL",
  33 : "Telekinesis",
  34 : "Sky Drop",
  35 : "HITRATIO_UP",
  36 : "Aqua Ring",
  37 : "FORCE_WAZATYPE",
  38 : "Powder",
  39 : "Uproar",
  40 : "Thrash",
  41 : "Laser Focus",
  42 : "Tar Shot",
  43 : "Octolock",
  44 : "Jaw Lock",
  65535 : "Special",
};

const MOVE_CATEGORIES = [
  "Deal Damage",
  "Status Affliction",
  "Stat Change",
  "Heal",
  "Damage + Status",
  "Status + Stat±",
  "Damage + Stat± (target)",
  "Damage + Stat± (self)",
  "Damage + Heal",
  "One Hit KO",
  "Field Effect",
  "Field Effect (target)",
  "Switch Out (target)",
  "Special"
];

const MOVE_TARGETING = [
  "Ally or Foe",
  "Self or Ally",
  "Ally Only",
  "Foe Only",
  "Allies and Foes",
  "All Foes",
  "Self and Allies",
  "Self Only",
  "Everyone",
  "Self (random)",
  "Everyone (field)",
  "All Foes (field)",
  "Self and Allies (field)",
  "Self (autotarget)"
];

const STATS_TO_CHANGE = [
  "None",
  "Attack",
  "Defense",
  "Special Attack",
  "Special Defense",
  "Speed",
  "Accuracy",
  "Evasiveness",
  "All Stats"
];

const FLAG_STRINGS =[
  "Makes Contact",
  "Two Turn Move",
  "Requires Recharge",
  "Protect Effective",
  "Magic Coat Effective",
  "Snatch Effective",
  "Mirror Move Effective",
  "Punch Move",
  "Sound Move",
  "Gravity Effective",
  "Thaws Frozen Targets",
  "Unlimited Range",
  "Heal Block Effective",
  "Ignores Substitute",
  "Fails in Sky Battle",
  "EFFECT_TO_FRIEND",
  "Dance Move",
  "Metronome Valid"
];

const SICK_CONT_STRINGS = [
  "None",
  "Permanent",
  "Turn Limit",
  "Attract",
  "Prevents Switch Out"
];

const CRITICAL_HIT_RATIO = {
  0: "1/24",
  1: "1/8",
  2: "1/2",
  3: "1/1", // Anything above 2 is 100% chance
  4: "1/1",
  5: "1/1",
  6: "1/1",
};

const DAMAGE_RECOVER_RATIO = {
  RECOIL50: "-50",
  RECOIL33: "-33",
  RECOIL25: "-25",
  HEAL0: "0",
  HEAL50: "50",
  HEAL75: "75",
  HEAL100: "100"
};

const FLINCH_RATIOS = {
  FLINCH0: "0",
  FLINCH1: "1",
  FLINCH10: "10",
  FLINCH20: "20",
  FLINCH30: "30",
  FLINCH100: "100",
};

const HP_RECOVER_RATIO = {
  HURT33: "-33",
  HURT25: "-25",
  HEAL50: "50",
  HEAL25: "25",
};

const STAT_EFFECT_CHANCE = [
  "0",
  "10",
  "20",
  "30",
  "40",
  "50",
  "70",
  "100",
];

const STATUS_MOVE = 0;
const PHYSICAL_MOVE = 1;
const SPECIAL_MOVE = 2;

const DAMAGE_TYPES = [
  "Status",
  "Physical",
  "Special"
];

const Z_MOVES = [
  "acid-downpour",
  "all-out-pummeling",
  "black-hole-eclipse",
  "bloom-doom",
  "breakneck-blitz",
  "continental-crush",
  "corkscrew-crash",
  "devastating-drake",
  "gigavolt-havoc",
  "hydro-vortex",
  "inferno-overdrive",
  "never-ending-nightmare",
  "savage-spin-out",
  "shattered-psyche",
  "subzero-slammer",
  "supersonic-skystrike",
  "tectonic-rage",
  "twinkle-tackle",
];

const LEARNSET_TYPES_MAP = {
  "level": "Level",
  "egg": "Egg Move",
  "tm": "TM",
  "tutor": "Tutor Move"
}

module.exports = {
  STATUS_EFFECTS,
  MOVE_CATEGORIES,
  MOVE_TARGETING,
  STATS_TO_CHANGE,
  FLAG_STRINGS,
  SICK_CONT_STRINGS,
  CRITICAL_HIT_RATIO,
  DAMAGE_TYPES,
  STATUS_MOVE,
  PHYSICAL_MOVE,
  SPECIAL_MOVE,
  DAMAGE_RECOVER_RATIO,
  FLINCH_RATIOS,
  HP_RECOVER_RATIO,
  STAT_EFFECT_CHANCE,
  Z_MOVES,
  LEARNSET_TYPES_MAP
};