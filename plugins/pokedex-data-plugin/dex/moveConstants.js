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

const FLAG_STRINGS = [
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
  3: "1/1",
  4: "1/1"
}

module.exports = {
  STATUS_EFFECTS,
  MOVE_CATEGORIES,
  MOVE_TARGETING,
  STATS_TO_CHANGE,
  FLAG_STRINGS,
  SICK_CONT_STRINGS,
  CRITICAL_HIT_RATIO,
};