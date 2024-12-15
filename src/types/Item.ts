interface Item {
  name: string;
	description: string;
	colloq: string;
  plaintext: string;
  from: string[];
  into?: string[];
	image: ChampionImage;
  gold: {
    base: number;
    purchasable: boolean;
    total: number
    sell: number;
  };
  tags: string[];
  maps: {
    [mapCode: number]: boolean
  };
  stats: {
		[statsCode: string]: number;
  };
	effect?: {
		[effectCode: string]: string;
  };
  depth?: number;
}
