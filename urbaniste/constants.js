const Resource = {
  BUILDING_MATERIAL: 'BUILDING_MATERIAL',
  COIN: 'COIN',
  LABOR: 'LABOR',
  WATER: 'WATER',
  ANY: '?'
};

const ProjectType = {
  INFRASTRUCTURE: 'INFRASTRUCTURE',
  AQUATIC: 'AQUATIC',
  COMMERCIAL: 'COMMERCIAL',
  CIVIC: 'CIVIC',
  DEFAULT: 'DEFAULT',
  CULTURAL: 'CULTURAL'
};

const Shape = {
	SINGLE: 'SINGLE',
	LINE_2: 'LINE_2',
	LINE_3: 'LINE_3',
	TRIANGLE_3: 'TRIANGLE_3',
	V3: 'V3',
	DIAMOND: 'DIAMOND',
	CANE: 'CANE',
	V5: 'V5',
	U: 'U',
	LINE_6: 'LINE_6',
  STAR: 'STAR',
  Y: 'Y',
	TRIANGLE_6: 'TRIANGLE_6'
};

const Building = {
  BRIDGE: 'BRIDGE',
  HARBOR: 'HARBOR',
  CANAL: 'CANAL',
  FERRY: 'FERRY',
  LIGHTHOUSE: 'LIGHTHOUSE',
  LOCK: 'LOCK',
  MARINA: 'MARINA',
  BOULEVARD: 'BOULEVARD',
  FOUNDRY: 'FOUNDRY',
  PRISON: 'PRISON',
  TRAMWAY: 'TRAMWAY',
  TUNNEL: 'TUNNEL',
  TENEMENT: 'TENEMENT',
  BAZAAR: 'BAZAAR',
  REFINERY: 'REFINERY',
  CASINO: 'CASINO',
  WATCHTOWER: 'WATCHTOWER',
  LOAN_OFFICE: 'LOAN_OFFICE',
  TAXHOUSE: 'TAXHOUSE',
  CEMETARY: 'CEMETARY',
  SHIPYARD: 'SHIPYARD',
  SEWERS: 'SEWERS',
  MONUMENT: 'MONUMENT',
  HOUSING_UNIT: 'HOUSING_UNIT',
  PLACE_CHARLES_DE_GAULLE: 'PLACE_CHARLES_DE_GAULLE',
  PARC_DE_BUTTES_CHAUMONT: 'PARC_DE_BUTTES_CHAUMONT',
  RUE_DE_RIVOLI: 'RUE_DE_RIVOLI',
  CITY_HALL: 'CITY_HALL',
  EMBASSY: 'EMBASSY',
  BOIS_VINCENNES: 'BOIS_VINCENNES',
  CATHEDRAL: 'CATHEDRAL',
  DOCKS: 'DOCKS',
  GUILD_HALL: 'GUILD_HALL',
  LE_HAVRE: 'LE_HAVRE',
  MUSEE_LOUVRE: 'MUSEE_LOUVRE',
  MUSEE_DORSAY: 'MUSEE_DORSAY',
  WATERWORKS: 'WATERWORKS'
};

const BoardSize = {
  small: {
    size: { groupRows: 2, groupCols: 3 },
    start: {
      2: [
        [{ row: 1, col: 1 }],
        [{ row: 4, col: 5 }]
      ]
    }
  },
  classic: {
    size: { groupRows: 3, groupCols: 4 },
    start: {
      2: [
        [{ row: 2, col: 1 }, { row: 6, col: 6 }],
        [{ row: 6, col: -1 }, { row: 2, col: 8 }]
      ]
    }
  }
};

const TileGroupSize = {
  rows: 3,
  cols: 3
};

const TileGroups = [
  [Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN],
  [Resource.COIN, Resource.LABOR, Resource.COIN, Resource.WATER, Resource.WATER, Resource.WATER, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.COIN],
  [Resource.COIN, Resource.WATER, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.WATER, Resource.LABOR],
  [Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.LABOR, Resource.COIN, Resource.WATER, Resource.LABOR, Resource.LABOR, Resource.LABOR],
  [Resource.BUILDING_MATERIAL, Resource.WATER, Resource.COIN, Resource.WATER, Resource.COIN, Resource.LABOR, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.LABOR],
  [Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.WATER, Resource.COIN, Resource.WATER, Resource.LABOR],
  [Resource.COIN, Resource.WATER, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.LABOR, Resource.LABOR, Resource.COIN],
  [Resource.LABOR, Resource.WATER, Resource.LABOR, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.BUILDING_MATERIAL],
  [Resource.BUILDING_MATERIAL, Resource.COIN, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.LABOR],
  [Resource.BUILDING_MATERIAL, Resource.WATER, Resource.COIN, Resource.COIN, Resource.LABOR, Resource.WATER, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.BUILDING_MATERIAL],
  [Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.COIN, Resource.COIN, Resource.WATER, Resource.LABOR],
  [Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.LABOR, Resource.WATER, Resource.LABOR, Resource.COIN, Resource.LABOR, Resource.LABOR, Resource.COIN]
];

const Directions = [
  { row: 0, col: 1 },
  { row: 1, col: 0 },
  { row: 0, col: -1 },
  { row: -1, col: 0 },
  { row: 1, col: -1 },
  { row: -1, col: 1 }
];

const DefaultShopProjectTypes = [
  ProjectType.INFRASTRUCTURE,
  ProjectType.AQUATIC,
  ProjectType.COMMERCIAL,
  ProjectType.CIVIC,
  ProjectType.DEFAULT,
  ProjectType.CULTURAL,
  ProjectType.CULTURAL,
  ProjectType.CULTURAL,
];

const ShapePositions = {
  [Shape.SINGLE]: [
    [{ row: 0, col: 0 }]
  ],
  [Shape.LINE_2]: [
    [{ row: 0, col: 0 }, { row: -1, col: 1 }],
    [{ row: 0, col: 0 }, { row: 0, col: 1 }],
    [{ row: 0, col: 0 }, { row: 1, col: 0 }],
    [{ row: 0, col: 0 }, { row: 1, col: -1 }],
    [{ row: 0, col: 0 }, { row: 0, col: -1 }],
    [{ row: 0, col: 0 }, { row: -1, col: 0 }]
  ],
  [Shape.LINE_3]: [
    [{ row: -1, col: 1 }, { row: 0, col: 0 }, { row: 1, col: -1 }],
    [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }],
    [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }]
  ],
  [Shape.TRIANGLE_3]: [
    [{ row: 0, col: 0 }, { row: -1, col: 0 }, { row: -1, col: 1 }],
    [{ row: 0, col: 0 }, { row: -1, col: 1 }, { row: 0, col: 1 }],
    [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }],
    [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: -1 }],
    [{ row: 0, col: 0 }, { row: 1, col: -1 }, { row: 0, col: -1 }],
    [{ row: 0, col: 0 }, { row: 0, col: -1 }, { row: -1, col: 0 }]
  ],
  [Shape.V3]: [
    [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: 1 }],
    [{ row: -1, col: 1 }, { row: 0, col: 0 }, { row: 1, col: 0 }],
    [{ row: 0, col: 1 }, { row: 0, col: 0 }, { row: 1, col: -1 }],
    [{ row: 1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: -1 }],
    [{ row: 1, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 0 }],
    [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 1 }]
  ],
  [Shape.DIAMOND]: [
    [{ row: 0, col: 0 }, { row: -1, col: 0 }, { row: -1, col: 1 }, { row: -2, col: 1 }],
    [{ row: 0, col: 0 }, { row: -1, col: 1 }, { row: 0, col: 1 }, { row: -1, col: 2 }],
    [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 1 }],
    [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: -1 }, { row: 2, col: -1 }],
    [{ row: 0, col: 0 }, { row: 1, col: -1 }, { row: 0, col: -1 }, { row: 1, col: -2 }],
    [{ row: 0, col: 0 }, { row: 0, col: -1 }, { row: -1, col: 0 }, { row: -1, col: -1 }]
  ],
  [Shape.CANE]: [
    [{ row: -1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
    [{ row: -1, col: 1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }],
    [{ row: 0, col: 1 }, { row: 0, col: 0 }, { row: 1, col: -1 }, { row: 2, col: -2 }],
    [{ row: 1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: -1 }, { row: 0, col: -2 }],
    [{ row: 1, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 0 }, { row: -2, col: 0 }],
    [{ row: 0, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 1 }, { row: -2, col: 2 }]
  ],
  [Shape.V5]: [
    [{ row: -2, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
    [{ row: -2, col: 2 }, { row: -1, col: 1 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }],
    [{ row: 0, col: 2 },  { row: 0, col: 1 },  { row: 0, col: 0 }, { row: 1, col: -1 }, { row: 2, col: -2 }],
    [{ row: 2, col: 0 },  { row: 1, col: 0 },  { row: 0, col: 0 }, { row: 0, col: -1 }, { row: 0, col: -2 }],
    [{ row: 2, col: -2 }, { row: 1, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 0 }, { row: -2, col: 0 }],
    [{ row: 0, col: -2 }, { row: 0, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 1 }, { row: -2, col: 2 }]
  ],
  [Shape.U]: [
    [{ row: -2, col: 1 }, { row: -1, col: 0 }, { row: 0, col: 0 },  { row: 0, col: 1 }, { row: -1, col: 2 }],
    [{ row: -1, col: 2 }, { row: -1, col: 1 }, { row: 0, col: 0 },  { row: 1, col: 0 }, { row: 1, col: 1 }],
    [{ row: 1, col: 1 }, { row: 0, col: 1 }, { row: 0, col: 0 },  { row: 1, col: -1 }, { row: 2, col: -1 }],
    [{ row: 2, col: -1 }, { row: 1, col: 0 }, { row: 0, col: 0 },  { row: 0, col: -1 }, { row: 1, col: -2 }],
    [{ row: 1, col: -2 }, { row: 1, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 0 }, { row: -1, col: -1 }],
    [{ row: -1, col: -1 }, { row: 0, col: -1 }, { row: 0, col: 0 }, { row: -1, col: 1 }, { row: -2, col: 1 }]
  ],
  [Shape.LINE_6]: [
    [{ row: -3, col: 3 }, { row: -2, col: 2 }, { row: -1, col: 1 }, { row: 0, col: 0 }, { row: 1, col: -1 }, { row: 2, col: -2 }],
    [{ row: 0, col: -2 }, { row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }, { row: 0, col: 3 }],
    [{ row: -2, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }, { row: 3, col: 0 }],
    [{ row: -2, col: 2 }, { row: -1, col: 1 }, { row: 0, col: 0 }, { row: 1, col: -1 }, { row: 2, col: -2 }, { row: 3, col: -3 }],
    [{ row: 0, col: -3 }, { row: 0, col: -2 }, { row: 0, col: -1 }, { row: 0, col: 0 }, { row: 0, col: 1 }, { row: 0, col: 2 }],
    [{ row: -3, col: 0 }, { row: -2, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 0 }, { row: 1, col: 0 }, { row: 2, col: 0 }]
  ],
  [Shape.STAR]: [
    [{ row: 0, col: 0 }, { row: -1, col: 0 }, { row: -1, col: 1 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 1, col: -1 }, { row: 0, col: -1 }]
  ],
  [Shape.Y]: [
    [{ row: 0, col: 0 }, { row: -1, col: 0 }, { row: 0, col: 1 }, { row: 1, col: -1 }],
    [{ row: 0, col: 0 }, { row: -1, col: 1 }, { row: 1, col: 0 }, { row: 0, col: -1 }]
  ],
  [Shape.TRIANGLE_6]: [
    [{ row: 0, col: 0 }, { row: -1, col: 0 }, { row: -1, col: 1 }, { row: -2, col: 0 }, { row: -2, col: 1 }, { row: -2, col: 2 }],
    [{ row: 0, col: 0 }, { row: -1, col: 1 }, { row: 0, col: 1 }, { row: -2, col: 2 }, { row: -1, col: 2 }, { row: 0, col: 2 }],
    [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 1, col: 0 }, { row: 0, col: 2 }, { row: 1, col: 1 }, { row: 2, col: 0 }],
    [{ row: 0, col: 0 }, { row: 1, col: 0 }, { row: 1, col: -1 }, { row: 2, col: 0 }, { row: 2, col: -1 }, { row: 2, col: -2 }],
    [{ row: 0, col: 0 }, { row: 1, col: -1 }, { row: 0, col: -1 }, { row: 2, col: -2 }, { row: 1, col: -2 }, { row: 0, col: -2 }],
    [{ row: 0, col: 0 }, { row: 0, col: -1 }, { row: -1, col: 0 }, { row: 0, col: -2 }, { row: -1, col: -1 }, { row: -2, col: 0 }]
  ]
};

export {
  Resource,
  ProjectType,
  Shape,
  Building,
  BoardSize,
  TileGroupSize,
  TileGroups,
  Directions,
  DefaultShopProjectTypes,
  ShapePositions
};
