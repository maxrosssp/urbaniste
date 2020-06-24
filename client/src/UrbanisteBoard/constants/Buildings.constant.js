import { Building, ProjectType } from '../../../../urbaniste/constants';
import ProjectTypes from './ProjectTypes.constant';

export default {
  [Building.BRIDGE]: {
    name: Building.BRIDGE,
    label: 'Bridge',
    class: 'bridge',
    type: ProjectTypes[ProjectType.AQUATIC],
    description: ''
  },
  [Building.HARBOR]: {
    name: Building.HARBOR,
    label: 'Harbor',
    class: 'harbor',
    type: ProjectTypes[ProjectType.AQUATIC],
    description: ''
  },
  [Building.CANAL]: {
    name: Building.CANAL,
    label: 'Canal',
    class: 'canal',
    type: ProjectTypes[ProjectType.AQUATIC],
    description: ''
  },
  [Building.FERRY]: {
    name: Building.FERRY,
    label: 'Ferry',
    class: 'ferry',
    type: ProjectTypes[ProjectType.AQUATIC],
    description: 'Must be placed adjacent to a body of water. Place a marker adjacent to that body of water.'
  },
  [Building.LIGHTHOUSE]: {
    name: Building.LIGHTHOUSE,
    label: 'Lighthouse',
    shortLabel: 'Light H.',
    class: 'lighthouse',
    type: ProjectTypes[ProjectType.AQUATIC],
    description: 'Must be built adjacent to a body of water. You can place markers within 2 hexes of this structure as if they were adjacent.'
  },
  [Building.LOCK]: {
    name: Building.LOCK,
    label: 'Lock',
    class: 'lock',
    type: ProjectTypes[ProjectType.AQUATIC],
    description: 'You can place markers adjacent to water tiles that are adjacent to this structure.'
  },
  [Building.BOULEVARD]: {
    name: Building.BOULEVARD,
    label: 'Boulevard',
    shortLabel: 'Blvd.',
    class: 'boulevard',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE],
    description: ''
  },
  [Building.PLAZA]: {
    name: Building.PLAZA,
    label: 'Plaza',
    class: 'plaza',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE],
    description: 'Take an extra turn after building this structure.'
  },
  [Building.PRISON]: {
    name: Building.PRISON,
    label: 'Prison',
    class: 'prison',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE],
    description: 'Remove up to one friendly or enemy marker adjacent to each of your prisons, including this one.'
  },
  [Building.TRAMWAY]: {
    name: Building.TRAMWAY,
    label: 'Tramway',
    class: 'tramway',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE],
    description: 'Move an adjacent friendly or enemy marker to an unclaimed, non-water tile adjacent to this structure.'
  },
  [Building.TUNNEL]: {
    name: Building.TUNNEL,
    label: 'Tunnel',
    class: 'tunnel',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE],
    description: 'Must be build adjacent to exactly one enemy structure. Place a marker on an unclaimed (non-water) tile adjacent to that structure. Do not collect that resource.'
  },
  [Building.TENEMENT]: {
    name: Building.TENEMENT,
    label: 'Tenement',
    shortLabel: 'Tnmt.',
    class: 'tenement',
    type: ProjectTypes[ProjectType.COMMERCIAL],
    description: 'Costs one less for each tenement structure you already control.'
  },
  [Building.BAZAAR]: {
    name: Building.BAZAAR,
    label: 'Bazaar',
    class: 'bazaar',
    type: ProjectTypes[ProjectType.COMMERCIAL],
    description: 'Costs one less per adjacent building. Cost cannot be less than zero.'
  },
  [Building.REFINERY]: {
    name: Building.REFINERY,
    label: 'Refinery',
    shortLabel: 'Rfny.',
    class: 'refinery',
    type: ProjectTypes[ProjectType.COMMERCIAL],
    description: 'Costs 3 of the same resource. For each tile that this structure is build over, gain a resource of that type.'
  },
  [Building.CASINO]: {
    name: Building.CASINO,
    label: 'Casino',
    class: 'casino',
    type: ProjectTypes[ProjectType.COMMERCIAL],
    description: 'Steal up to two resources of your choice from an adjacent enemy.'
  },
  [Building.WATCHTOWER]: {
    name: Building.WATCHTOWER,
    label: 'Watchtower',
    shortLabel: 'W. Tower',
    class: 'watchtower',
    type: ProjectTypes[ProjectType.COMMERCIAL],
    description: 'Enemies may not build structures or place markers adjacent to this structure.'
  },
  [Building.LOAN_OFFICE]: {
    name: Building.LOAN_OFFICE,
    label: 'Loan Office',
    shortLabel: 'Loan O.',
    class: 'loan-office',
    type: ProjectTypes[ProjectType.COMMERCIAL],
    description: 'Gain three resources of the same type.'
  },
  [Building.TAXHOUSE]: {
    name: Building.TAXHOUSE,
    label: 'Taxhouse',
    shortLabel: 'Tax H.',
    class: 'taxhouse',
    type: ProjectTypes[ProjectType.CIVIC],
    description: ''
  },
  [Building.CEMETARY]: {
    name: Building.CEMETARY,
    label: 'Cemetary',
    shortLabel: 'Cmty.',
    class: 'cemetary',
    type: ProjectTypes[ProjectType.CIVIC],
    description: ''
  },
  [Building.SHIPYARD]: {
    name: Building.SHIPYARD,
    label: 'Shipyard',
    shortLabel: 'S. Yard',
    class: 'shipyard',
    type: ProjectTypes[ProjectType.CIVIC],
    description: 'Must be build over one friend tile, one enemy tile, and one water tile.'
  },
  [Building.SEWERS]: {
    name: Building.SEWERS,
    label: 'Sewers',
    class: 'sewers',
    type: ProjectTypes[ProjectType.CIVIC],
    description: ''
  },
  [Building.MONUMENT]: {
    name: Building.MONUMENT,
    label: 'Monument',
    shortLabel: 'Mnmt.',
    class: 'monument',
    type: ProjectTypes[ProjectType.CIVIC],
    description: 'Replace an enemy marker within two hexes of this structure with a friendly marker.'
  },
  [Building.HOUSING_UNIT]: {
    name: Building.HOUSING_UNIT,
    label: 'Housing Unit',
    shortLabel: 'H. Unit',
    class: 'housing-unit',
    type: ProjectTypes[ProjectType.DEFAULT],
    description: ''
  },
  [Building.PLACE_CHARLES_DE_GAULLE]: {
    name: Building.PLACE_CHARLES_DE_GAULLE,
    label: 'Place Charles de Gaulle',
    shortLabel: 'Place CG',
    class: 'charles-de-gaulle',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: ''
  },
  [Building.PARC_DE_BUTTES_CHAUMONT]: {
    name: Building.PARC_DE_BUTTES_CHAUMONT,
    label: 'Parc de Buttes Chaumont',
    shortLabel: 'Parc BC',
    class: 'buttes-chaumont',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: ''
  },
  [Building.RUE_DE_RIVOLI]: {
    name: Building.RUE_DE_RIVOLI,
    label: 'Rue de Rivoli',
    shortLabel: 'Rivoli',
    class: 'rue-rivoli',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: ''
  },
  [Building.CITY_HALL]: {
    name: Building.CITY_HALL,
    label: 'City Hall',
    shortLabel: 'C. Hall',
    class: 'city-hall',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 1 VP for each adjacent structure.'
  },
  [Building.EMBASSY]: {
    name: Building.EMBASSY,
    label: 'Embassy',
    shortLabel: 'Emb.',
    class: 'embassy',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 1 VP for each adjacent friendly or enemy non-embassy structure.'
  },
  [Building.TOUR_EIFFEL]: {
    name: Building.TOUR_EIFFEL,
    label: 'Tour Eiffel',
    shortLabel: 'Eiffel',
    class: 'tour-eiffel',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Can only be built if surrounded by structures on all sides.'
  },
  [Building.BOIS_VINCENNES]: {
    name: Building.BOIS_VINCENNES,
    label: 'Bois de Vincennes',
    shortLabel: 'B.Vinc',
    class: 'bois-vincennes',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 2 VPs for each adjacent unclaimed resource tile at end of game.'
  },
  [Building.CATHEDRAL]: {
    name: Building.CATHEDRAL,
    label: 'Cathedral',
    shortLabel: 'Cath.',
    class: 'cathedral',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Cannot be built adjacent to friendly structures. You cannot build any structures adjacent to this.'
  },
  [Building.DOCKS]: {
    name: Building.DOCKS,
    label: 'Docks',
    class: 'docks',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 1 VP for each adjacent water tile.'
  },
  [Building.GUILD_HALL]: {
    name: Building.GUILD_HALL,
    label: 'Guild Hall',
    shortLabel: 'G. Hall',
    class: 'guild-hall',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Choose a resource type. Worth 1 VP for each adjacent.'
  },
  [Building.LE_HAVRE]: {
    name: Building.LE_HAVRE,
    label: 'Le Havre',
    shortLabel: 'Havre',
    class: 'le-havre',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 2 VPs for each adjacent water tile.'
  },
  [Building.MARINA]: {
    name: Building.MARINA,
    label: 'Marina',
    class: 'marina',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'All three hexes must be adjacent to the same water tile. Cannot be built adjacent to another marina.'
  },
  [Building.MUSEE_LOUVRE]: {
    name: Building.MUSEE_LOUVRE,
    label: 'Musée du Louvre',
    shortLabel: 'Louvre',
    class: 'musee-louvre',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 5 VPs for each structure category you don\'t build this game.'
  },
  [Building.MUSEE_DORSAY]: {
    name: Building.MUSEE_DORSAY,
    label: 'Musée d\'Orsay',
    shortLabel: 'M. Orsay',
    class: 'musee-dorsay',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'All adjacent resource hexes are worth double.'
  },
  [Building.WATERWORKS]: {
    name: Building.WATERWORKS,
    label: 'Waterworks',
    shortLabel: 'WW',
    class: 'waterworks',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Must be built adjacent to water. Worth 1 VP for each contiguous friendly structure.'
  },
  [Building.OPERA_GARNIER]: {
    name: Building.OPERA_GARNIER,
    label: 'Opéra Garnier',
    shortLabel: 'Opéra',
    class: 'opera-garnier',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Whenever a player collects resources from an adjacent district, that player collects an additional resource of that type.'
  },
  [Building.GRAND_CANAL]: {
    name: Building.GRAND_CANAL,
    label: 'Grand Canal',
    shortLabel: 'G. Canal',
    class: 'grand-canal',
    type: ProjectTypes[ProjectType.CULTURAL],
    description: 'Worth 2 VPs for each built over water hex. Must be built over at least one friendly and one water hex.'
  }
}
