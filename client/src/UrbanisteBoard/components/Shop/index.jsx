import React from 'react';
import classNames from 'classnames';
import { Table, OverlayTrigger, Popover } from 'react-bootstrap';
import { IconContext } from "react-icons";
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Resource } from '../../../../../urbaniste/constants';
import Resources from '../../constants/Resources.constant';
import ProjectTypes from '../../constants/ProjectTypes.constant';
import Buildings from '../../constants/Buildings.constant';
import ProjectShape from './ProjectShape';
import './Shop.scss';

function Shop({
  projects,
  onProjectSelect,
  selectedProjectName,
  isBuildStage
}) {
  const onRowClick = (projectName) => isBuildStage && onProjectSelect(projectName === selectedProjectName ? null : projectName);
  const popovers = projects.reduce((projectPopovers, project) => ({ ...projectPopovers, [project.name]: (
    <Popover className={classNames('project-info', Buildings[project.name].class)} id="project-info-popover">
      <Popover.Title as="h3">{Buildings[project.name].label + (Buildings[project.name].shortLabel ? ' (' + Buildings[project.name].shortLabel + ')' : '')}</Popover.Title>

      <Popover.Content>
        <p>{Buildings[project.name].description}</p>

        <ProjectShape projectName={project.name} />
      </Popover.Content>
    </Popover>
  )}), {});

  return (
    <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}>
      <Table className="shop" striped borderless hover responsive size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th className="text-center">{Resources[Resource.BUILDING_MATERIAL].shortName}</th>
            <th className="text-center">{Resources[Resource.COIN].shortName}</th>
            <th className="text-center">{Resources[Resource.LABOR].shortName}</th>
            <th className="text-center">{Resources[Resource.ANY].shortName}</th>
            <th className="text-center">Avail.</th>
            <th className="text-center">VP</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.name} onClick={() => onRowClick(project.name)}>
              <td className={classNames({ 'can-build': isBuildStage && project.canBuild, selected: selectedProjectName === project.name })}>
                {Buildings[project.name].label}
                <OverlayTrigger placement="right" overlay={popovers[project.name]}>
                  <AiOutlineQuestionCircle />
                </OverlayTrigger>
              </td>
              <td className={ProjectTypes[project.type].class}>{ProjectTypes[project.type].label}</td>
              <td className={`${Resources[Resource.BUILDING_MATERIAL].class} text-center`}>{project[Resource.BUILDING_MATERIAL] || 0}</td>
              <td className={`${Resources[Resource.COIN].class} text-center`}>{project[Resource.COIN] || 0}</td>
              <td className={`${Resources[Resource.LABOR].class} text-center`}>{project[Resource.LABOR] || 0}</td>
              <td className={`${Resources[Resource.ANY].class} text-center`}>{project[Resource.ANY] || 0}</td>
              <td className="text-center">{project.available}</td>
              <td className="text-center">{project.vp}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </IconContext.Provider>
  );
}

export default Shop;