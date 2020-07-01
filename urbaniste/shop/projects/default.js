import {
  Shape,
  Resource,
  Building,
  ProjectType
} from '../../constants.js';

const projects = {
  [Building.HOUSING_UNIT]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.ANY]: 3 },
    available: 10,
    victoryPoints: 1
  }
};

export default Object.keys(projects).map(name => ({ name, type: ProjectType.DEFAULT, ...projects[name] }));
