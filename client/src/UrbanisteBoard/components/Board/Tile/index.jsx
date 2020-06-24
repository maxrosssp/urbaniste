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

  const onDragEnd = (_, __, success) => {
    if (!drag || !canDrag() || !success) {
      return;
    }
  };

  const onDropTile = (_, source, target) => {
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
      onDragEnd={onDragEnd}
      onDrop={onDropTile}
      onDragOver={onDragOver}
    >
      {owner && (
        <svg viewBox="1 1 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="1" cy="1" r="2" />
        </svg>
      )}
      {building && <Text>{project.shortLabel || project.label}</Text>}
    </Hexagon>
  );
}

export default Tile;