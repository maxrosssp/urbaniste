import React from 'react';
import classNames from 'classnames';
import { Hexagon, Text } from 'react-hexgrid';
import Resources from '../../../constants/Resources.constant';
import Buildings from '../../../constants/Buildings.constant';
import './Tile.scss';

function Tile({
  moves,
  tile,
  playerId,
  onHover,
  highlighted,
  onKeyDown,
  onTileClick,
  drag
}) {
  const { position, resource, owner, building } = tile;
  const { row, col } = position;
  const project = Buildings[building] || {};
  const projectType = project.type || {};
  const { canDrag, canDrop, onDrop } = drag || {};

  const onDragStart = (event, source) => {
  };

  const onDragEnd = (event, source, success) => {
    if (!drag || !canDrag() || !success) {
      return;
    }
  };

  const onDropTile = (event, source, target) => {
    onDrop(moves, { ...target.data.position }, { row: source.props.r, col: source.props.q });
  }

  const onDragOver = (event, source) => {
    if (drag && canDrag() && canDrop({ row: source.props.r, col: source.props.q })) {
      event.preventDefault();
    }
  }

  return (
    <Hexagon
      className={classNames({
        [Resources[resource].class]: true,
        highlighted: highlighted,
        building: building,
        [project.class]: building,
        [projectType.class]: building,
        mine: owner === playerId,
        enemy: owner && owner !== playerId
      })}
      r={row}
      q={col}
      s={0 - row - col}
      onClick={() => onTileClick(position)}
      onMouseEnter={() => onHover(position)}
      onKeyDown={onKeyDown}
      data={tile}
      draggable={canDrag && canDrag()}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDrop={onDropTile}
      onDragOver={onDragOver}
    >
      {owner && <Text>{owner === playerId ? 'Mine' : 'Enemy'}</Text>}
    </Hexagon>
  );
}

export default Tile;