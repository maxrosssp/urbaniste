import { Building, ProjectType } from '../../../../urbaniste/constants';
import ProjectTypes from './ProjectTypes.constant';

export default {
  [Building.BRIDGE]: {
    name: Building.BRIDGE,
    label: 'Bridge',
    class: 'bridge',
    type: ProjectTypes[ProjectType.AQUATIC]
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
  [Building.BOULEVARD]: {
    name: Building.BOULEVARD,
    label: 'Boulevard',
    class: 'boulevard',
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
  }
}