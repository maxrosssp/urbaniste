import React from 'react';
import classNames from 'classnames';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import Buildings from '../../constants/Buildings.constant';
import Resources from '../../constants/Resources.constant';
import { getProjectConfig } from '../../../../../urbaniste/shop/projects';
import ProjectShape from './ProjectShape';

const popovers = Object.values(Buildings).reduce((projectPopovers, { name }) => {
  const { cost, victoryPoints } = getProjectConfig(name);
  return {
    ...projectPopovers,
    [name]: (
      <Popover className={classNames('project-info', Buildings[name].class)} id="project-info-popover">
        <Popover.Title as="h3">{Buildings[name].label + (Buildings[name].shortLabel ? ' (' + Buildings[name].shortLabel + ')' : '')}</Popover.Title>

        <Popover.Content>
          <div>Victory Points: {typeof victoryPoints === 'function' ? 'Variable' : victoryPoints}</div>
          <div>Cost: {typeof cost === 'function' ? 'Variable' : Object.keys(cost).map(type => Resources[type].shortName + ' = ' + cost[type]).join(', ')}</div>
          <br />
          <p>{Buildings[name].description}</p>

          <ProjectShape name={name} />
        </Popover.Content>
      </Popover>
    )
  };
}, {});

function ProjectInfoIcon({
  name,
  placement
}) {
  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <OverlayTrigger
        placement={placement || 'right'}
        overlay={popovers[name]}
      >
        <AiOutlineQuestionCircle />
      </OverlayTrigger>
    </IconContext.Provider>
  );
}

export default ProjectInfoIcon;
