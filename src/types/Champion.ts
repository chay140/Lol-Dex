interface Champion {
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  tags: string[];
  partype: string;
  info: ChampionInfo;
  image: ChampionImage;
  stats: ChampionStats;
  version: string;
}

interface ChampionDetail extends Omit<Champion, "version"> {
  skins: ChampionSkin[];
  lore: string;
  allytips: string[];
  enemytips: string[];
  spells: ChampionSpell[];
  passive: {
    name: string;
    description: string;
    image: ChampionImage;
  };
  recommended: [];
}

interface ChampionImage {
  full: string;
  sprite: string;
  group: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface ChampionInfo {
  [infoKey: string]: number;
}

interface ChampionStats {
  [statKey: string]: number;
}

interface ChampionSkin {
  id: string;
  num: number;
  name: string;
  chromas: boolean;
}

interface ChampionSpell {
  id: string;
  name: string;
  description: string;
  tooltip: string;
  leveltip: {
    [leveltipCode: string]: string[];
  };
  maxrank: number;
  cooldown: number[];
  cooldownBurn: string;
  cost: number[];
  costBurn: string;
  datavalues: {}; // 빈 객체
  effect: (null | number[])[];
  effectBurn: (null | string)[];
  vars: [];
  costType: string;
  maxammo: string;
  range: number[];
  rangeBurn: string;
  image: ChampionImage;
  resource: string;
}
