import React from 'react';
import classNames from 'classnames';
import { Hexagon, Text, HexGrid, Layout } from 'react-hexgrid';
import { getProjectShapeDisplay } from '../../../../../../urbaniste/shop/selectors';
import './ProjectShape.scss';

function ProjectShape({
  name
}) {
  return (
    <div className="project-shape">
      <HexGrid width={'100%'} height={'100%'} viewBox="-30 -30 60 60">
        <Layout flat={false} size={{ x: 6.5, y: 6.5 }} spacing={1.025}>
          {getProjectShapeDisplay(name).map(tile => (
            <Hexagon
              key={tile.position.row + '' + tile.position.col}
              className={classNames({ ...tile.properties })}
              r={tile.position.row}
              q={tile.position.col}
              s={0 - tile.position.row - tile.position.col}
            >
              {tile.properties.friendly && (
                <svg className="player-marker mine" viewBox="1 1 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1" cy="1" r="4" />
                </svg>
              )}
              {tile.properties.enemy && (
                <svg className="player-marker enemy" viewBox="1 1 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="1" cy="1" r="4" />
                </svg>
              )}
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
}

export default ProjectShape;
