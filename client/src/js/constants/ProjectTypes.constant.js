import { ProjectType } from '../../../../urbaniste/constants';

export default {
  [ProjectType.AQUATIC]: {
    name: ProjectType.AQUATIC,
    class: 'aquatic',
    label: 'Aquatic'
  },
  [ProjectType.CIVIC]: {
    name: ProjectType.CIVIC,
    class: 'civic',
    label: 'Civic'
  },
  [ProjectType.COMMERCIAL]: {
    name: ProjectType.COMMERCIAL,
    class: 'commercial',
    label: 'Commercial'
  },
  [ProjectType.CULTURAL]: {
    name: ProjectType.CULTURAL,
    class: 'cultural',
    label: 'Cultural'
  },
  [ProjectType.DEFAULT]: {
    name: ProjectType.DEFAULT,
    class: 'default',
    label: 'Default'
  },
  [ProjectType.INFRASTRUCTURE]: {
    name: ProjectType.INFRASTRUCTURE,
    class: 'infrastructure',
    label: 'Infrastructure'
  }
};