import React from 'react';
import classNames from 'classnames';
import { Hexagon, Text } from 'react-hexgrid';
import Resources from '../../../constants/Resources.constant';
import Buildings from '../../../constants/Buildings.constant';
import './Tile.scss';

function Tile({
  tile,
  playerId,
  onHover,
  highlighted,
  onKeyDown,
  onTileClick
}) {
  const { position, resource, owner, building } = tile;
  const { row, col } = position;
  const project = Buildings[building] || {};
  const projectType = project.type || {};

  return (
    <Hexagon
      className={classNames({
        [Resources[resource].class]: true,
        highlighted: highlighted,
        building: building,
        [project.class]: building,
        [projectType.class]: building,
        mine: owner === playerId,
        enemy: owner !== playerId
      })}
      r={row}
      q={col}
      s={0 - row - col}
      onClick={() => onTileClick(position)}
      onMouseEnter={() => onHover(position)}
      onKeyDown={onKeyDown}
    >
      {owner && <Text>{owner === playerId ? 'Mine' : 'Enemy'}</Text>}
    </Hexagon>
  );
}

export default Tile;