import { Resource } from '../../../../urbaniste/constants';

export default {
  [Resource.BUILDING_MATERIAL]: {
    name: Resource.BUILDING_MATERIAL,
    class: 'building-material',
    label: 'Building Material',
    shortName: 'BM'
  },
  [Resource.COIN]: {
    name: Resource.COIN,
    class: 'coin',
    label: 'Coin',
    shortName: 'Coin'
  },
  [Resource.LABOR]: {
    name: Resource.LABOR,
    class: 'labor',
    label: 'Labor',
    shortName: 'Labor'
  },
  [Resource.WATER]: {
    name: Resource.WATER,
    class: 'water',
    label: 'Water',
    shortName: 'Water'
  },
  [Resource.ANY]: {
    name: Resource.ANY,
    class: 'any',
    label: '?',
    shortName: '?'
  }
};