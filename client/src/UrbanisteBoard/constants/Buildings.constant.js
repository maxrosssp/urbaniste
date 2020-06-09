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
    type: ProjectTypes[ProjectType.AQUATIC]
  },
  [Building.CANAL]: {
    name: Building.CANAL,
    label: 'Canal',
    class: 'canal',
    type: ProjectTypes[ProjectType.AQUATIC]
  },
  [Building.FERRY]: {
    name: Building.FERRY,
    label: 'Ferry',
    class: 'ferry',
    type: ProjectTypes[ProjectType.AQUATIC]
  },
  [Building.LIGHTHOUSE]: {
    name: Building.LIGHTHOUSE,
    label: 'Lighthouse',
    class: 'lighthouse',
    type: ProjectTypes[ProjectType.AQUATIC]
  },
  [Building.LOCK]: {
    name: Building.LOCK,
    label: 'Lock',
    class: 'lock',
    type: ProjectTypes[ProjectType.AQUATIC]
  },
  [Building.BOULEVARD]: {
    name: Building.BOULEVARD,
    label: 'Boulevard',
    class: 'boulevard',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE]
  },
  [Building.PLAZA]: {
    name: Building.PLAZA,
    label: 'Plaza',
    class: 'plaza',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE]
  },
  [Building.PRISON]: {
    name: Building.PRISON,
    label: 'Prison',
    class: 'prison',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE]
  },
  [Building.TRAMWAY]: {
    name: Building.TRAMWAY,
    label: 'Tramway',
    class: 'tramway',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE]
  },
  [Building.TUNNEL]: {
    name: Building.TUNNEL,
    label: 'Tunnel',
    class: 'tunnel',
    type: ProjectTypes[ProjectType.INFRASTRUCTURE]
  },
  [Building.TENEMENT]: {
    name: Building.TENEMENT,
    label: 'Tenement',
    class: 'tenement',
    type: ProjectTypes[ProjectType.COMMERCIAL]
  },
  [Building.BAZAAR]: {
    name: Building.BAZAAR,
    label: 'Bazaar',
    class: 'bazaar',
    type: ProjectTypes[ProjectType.COMMERCIAL]
  },
  [Building.REFINERY]: {
    name: Building.REFINERY,
    label: 'Refinery',
    class: 'refinery',
    type: ProjectTypes[ProjectType.COMMERCIAL]
  },
  [Building.CASINO]: {
    name: Building.CASINO,
    label: 'Casino',
    class: 'casino',
    type: ProjectTypes[ProjectType.COMMERCIAL]
  },
  [Building.WATCHTOWER]: {
    name: Building.WATCHTOWER,
    label: 'Watchtower',
    class: 'watchtower',
    type: ProjectTypes[ProjectType.COMMERCIAL]
  },
  [Building.LOAN_OFFICE]: {
    name: Building.LOAN_OFFICE,
    label: 'Loan Office',
    class: 'loan-office',
    type: ProjectTypes[ProjectType.COMMERCIAL]
  },
  [Building.TAXHOUSE]: {
    name: Building.TAXHOUSE,
    label: 'Taxhouse',
    class: 'taxhouse',
    type: ProjectTypes[ProjectType.CIVIC]
  },
  [Building.CEMETARY]: {
    name: Building.CEMETARY,
    label: 'Cemetary',
    class: 'cemetary',
    type: ProjectTypes[ProjectType.CIVIC]
  },
  [Building.SHIPYARD]: {
    name: Building.SHIPYARD,
    label: 'Shipyard',
    class: 'shipyard',
    type: ProjectTypes[ProjectType.CIVIC]
  },
  [Building.SEWERS]: {
    name: Building.SEWERS,
    label: 'Sewers',
    class: 'sewers',
    type: ProjectTypes[ProjectType.CIVIC]
  },
  [Building.MONUMENT]: {
    name: Building.MONUMENT,
    label: 'Monument',
    class: 'monument',
    type: ProjectTypes[ProjectType.CIVIC]
  },
  [Building.HOUSING_UNIT]: {
    name: Building.HOUSING_UNIT,
    label: 'Housing Unit',
    class: 'housing-unit',
    type: ProjectTypes[ProjectType.DEFAULT]
  },
  [Building.PLACE_CHARLES_DE_GAULLE]: {
    name: Building.PLACE_CHARLES_DE_GAULLE,
    label: 'Place Charles de Gaulle',
    class: 'charles-de-gaulle',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.PARC_DE_BUTTES_CHAUMONT]: {
    name: Building.PARC_DE_BUTTES_CHAUMONT,
    label: 'Parc de Buttes Chaumont',
    class: 'buttes-chaumont',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.RUE_DE_RIVOLI]: {
    name: Building.RUE_DE_RIVOLI,
    label: 'Rue de Rivoli',
    class: 'rue-rivoli',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.CITY_HALL]: {
    name: Building.CITY_HALL,
    label: 'City Hall',
    class: 'city-hall',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.EMBASSY]: {
    name: Building.EMBASSY,
    label: 'Embassy',
    class: 'embassy',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.TOUR_EIFFEL]: {
    name: Building.TOUR_EIFFEL,
    label: 'Tour Eiffel',
    class: 'tour-eiffel',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.BOIS_VINCENNES]: {
    name: Building.BOIS_VINCENNES,
    label: 'Bois de Vincennes',
    class: 'bois-vincennes',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.CATHEDRAL]: {
    name: Building.CATHEDRAL,
    label: 'Cathedral',
    class: 'cathedral',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.DOCKS]: {
    name: Building.DOCKS,
    label: 'Docks',
    class: 'docks',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.GUILD_HALL]: {
    name: Building.GUILD_HALL,
    label: 'Guild Hall',
    class: 'guild-hall',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.LE_HAVRE]: {
    name: Building.LE_HAVRE,
    label: 'Le Havre',
    class: 'le-havre',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.MARINA]: {
    name: Building.MARINA,
    label: 'Marina',
    class: 'marina',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.MUSEE_LOUVRE]: {
    name: Building.MUSEE_LOUVRE,
    label: 'Musée du Louvre',
    class: 'musee-louvre',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.MUSEE_DORSAY]: {
    name: Building.MUSEE_DORSAY,
    label: 'Musée d\'Orsay',
    class: 'musee-dorsay',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.WATERWORKS]: {
    name: Building.WATERWORKS,
    label: 'Waterworks',
    class: 'waterworks',
    type: ProjectTypes[ProjectType.CULTURAL]
  },
  [Building.OPERA_GARNIER]: {
    name: Building.OPERA_GARNIER,
    label: 'Opéra Garnier',
    class: 'opera-garnier',
    type: ProjectTypes[ProjectType.CULTURAL]
  }
}