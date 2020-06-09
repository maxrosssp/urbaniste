import React from 'react';
import classNames from 'classnames';
import { Hexagon, Text, HexGrid, Layout } from 'react-hexgrid';
import { getProjectShapeDisplay } from '../../../../../../urbaniste/shop/selectors';
import './ProjectShape.scss';

function ProjectShape({
  projectName
}) {
  return (
    <div className="project-shape">
      <HexGrid width={'100%'} height={'100%'} viewBox="-30 -30 60 60">
        <Layout flat={false} size={{ x: 6.5, y: 6.5 }} spacing={1.025}>
          {getProjectShapeDisplay(projectName).map(tile => (
            <Hexagon
              key={tile.position.row + '' + tile.position.col}
              className={classNames({ ...tile.properties })}
              r={tile.position.row}
              q={tile.position.col}
              s={0 - tile.position.row - tile.position.col}
            >
              {tile.properties.enemy && <Text>X</Text>}
              {tile.properties.unclaimed && <Text>/</Text>}
              {tile.properties.water && <Text>water</Text>}
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
}

export default ProjectShape;
