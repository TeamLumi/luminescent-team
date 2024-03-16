export const ENC_TYPES = {
  "ground_mons": "Walking",
  "tairyo": "Swarm",
  "day": "Day",
  "night": "Night",
  "swayGrass": "Radar",
  "water_mons": "Surfing",
  "boro_mons": "Old Rod",
  "ii_mons": "Good Rod",
  "sugoi_mons": "Super Rod",
};

export const GRASS = ENC_TYPES["ground_mons"];
export const ROD_ENC =  [
  ENC_TYPES["boro_mons"],
  ENC_TYPES["ii_mons"],
  ENC_TYPES["sugoi_mons"]
];
export const SURF_ENC = ENC_TYPES["water_mons"];
export const SURF_INCENSE = "Surfing Incense";
export const INCENSE = "Incense";
export const TIME_OF_DAY_ENC = ["Day", "Night"];
export const RADAR_ENC = ENC_TYPES["swayGrass"];
export const SWARM_ENC = ENC_TYPES["tairyo"];
export const HONEY = "Honey Tree";

export const GREAT_MARSH_MAP = {
  "Great Marsh - Area 1": "Great Marsh - Areas 1-2",
  "Great Marsh - Area 2": "Great Marsh - Areas 1-2",
  "Great Marsh - Area 3": "Great Marsh - Areas 3-4",
  "Great Marsh - Area 4": "Great Marsh - Areas 3-4",
  "Great Marsh - Area 5": "Great Marsh - Areas 5-6",
  "Great Marsh - Area 6": "Great Marsh - Areas 5-6",
}

const TRADE = "Trade";
const GIFTS = "Gifts";
const LEGENDARIES = "Legendaries";
const STATIC = "Static";

export const LINK_KEYS = [
  TRADE,
  GIFTS,
  LEGENDARIES,
  STATIC
]

export const LOCATION_ICONS = {
  Morning: ["/img/custom/morning.webp"],
  Day: ["/img/custom/sun.webp"],
  Night: ["/img/custom/moon.webp"],
  [ROD_ENC[0]]: ["/img/Old_Rod.webp"],
  [ROD_ENC[1]]: ["/img/Good_Rod.webp"],
  [ROD_ENC[2]]: ["/img/Super_Rod.webp"],
  [SWARM_ENC]: ["/img/custom/swarms.webp"],
  [RADAR_ENC]: ["/img/Radar.webp"],
  [INCENSE]: ["/img/Incense.webp"],
  Walking: ["/img/custom/grass.webp"],
  [SURF_ENC]: ["/img/custom/surf.webp"],
  [SURF_INCENSE]: ["/img/custom/surf.webp", "/img/Incense.webp"],
  [TRADE]: ["/img/custom/trade.webp"],
  [GIFTS]: ["/img/custom/mysterygift.webp"],
  [LEGENDARIES]: ["/img/custom/legendary.webp"],
  [STATIC]: ["/img/custom/static.webp"],
  "Daily Trophy Garden": ["/img/custom/trophy.webp"],
  "Daily Great Marsh": ["/img/custom/greatmarsh.webp", "/img/custom/randomchance.webp"],
  "Honey Tree": ["img/Item_Honey.webp"],
}