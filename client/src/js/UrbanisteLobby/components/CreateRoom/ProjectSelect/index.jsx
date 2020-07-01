import React, { useState, useEffect } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import Select, { components } from 'react-select';
import ProjectInfoIcon from '../../../../shared/ProjectInfoIcon';
import Buildings from '../../../../constants/Buildings.constant';
import ProjectTypes from '../../../../constants/ProjectTypes.constant';
import { projectsByType } from '../../../../../../../urbaniste/shop/projects';
import './ProjectSelect.scss';

const Option = props => {
  return (
    <components.Option {...props}>
      {props.data.label}
      <ProjectInfoIcon name={props.value} placement="left" />
    </components.Option>
  );
};

function ProjectSelect({
  projectTypeCount,
  onUpdate
}) {
  const [isProjectTypeMenuOpen, setIsProjectTypeMenuOpen] = useState({});
  const [projectTypeValues, setProjectTypeValues] = useState({});

  const isValidSelection = (values) => values && Object.keys(projectTypeCount).every(projectType => values[projectType] && (
    projectTypeCount[projectType] === 1 && !(values[projectType] instanceof Array) ||
    projectTypeCount[projectType] > 1 && projectTypeCount[projectType] === values[projectType].length
  ));

  useEffect(() => {
    const values = {};
    const projectTypeMenuOpen = {};
    Object.keys(projectTypeCount).forEach(projectType => {
      const initialValue = projectTypeValues[projectType] || (projectTypeCount[projectType] !== projectsByType[projectType].length ? [] : projectsByType[projectType].map(({ name }) => ({ value: name, label: Buildings[name].label })));
      values[projectType] = projectTypeCount[projectType] === 1 && initialValue.length === 1 ? initialValue[0] : initialValue;
      projectTypeMenuOpen[projectType] = isProjectTypeMenuOpen[projectType] || false;
    });
    setProjectTypeValues(values);
    setIsProjectTypeMenuOpen(projectTypeMenuOpen);
  }, []);

  useEffect(() => {
    onUpdate(isValidSelection(projectTypeValues) ? Object.values(projectTypeValues).reduce((selectedProjects, values) => values ? selectedProjects.concat(values) : selectedProjects, []).map(({ value }) => value) : undefined);

    Object.keys(projectTypeCount).forEach(projectType => {
      if (projectTypeValues[projectType] && projectTypeValues[projectType].length >= projectTypeCount[projectType]) {
        setIsProjectTypeMenuOpen({ ...isProjectTypeMenuOpen, [projectType]: false });
      }
    });
  }, [projectTypeValues]);

  const onSelectValue = (projectType, value) => setProjectTypeValues({ ...projectTypeValues, [projectType]: value });
  const onClickMenuOpen = (projectType) => {
    if (projectTypeCount[projectType] === 1 || projectTypeValues[projectType].length < projectTypeCount[projectType]) {
      setIsProjectTypeMenuOpen({ ...isProjectTypeMenuOpen, [projectType]: true });
    }
  };
  const onClickMenuClose = (projectType) => setIsProjectTypeMenuOpen({ ...isProjectTypeMenuOpen, [projectType]: false });

  return (
    <div className="projects-select">
      {Object.keys(projectTypeCount).map(projectType => (
        <Form.Group key={projectType} as={Row} controlId={projectType}>
          <Form.Label column sm="3">
            {ProjectTypes[projectType].label + ' (' + projectTypeCount[projectType] + ')'}
          </Form.Label>
          <Col sm="9">
            <Select
              className="project-type-select"
              closeMenuOnSelect={projectTypeCount[projectType] === 1}
              isMulti={projectTypeCount[projectType] > 1}
              isDisabled={projectTypeCount[projectType] === projectsByType[projectType].length}
              components={{ Option }}
              options={projectsByType[projectType].map(({ name }) => ({ value: name, label: Buildings[name].label }))}
              value={projectTypeValues[projectType]}
              onChange={(value, action) => onSelectValue(projectType, value, action)}
              menuIsOpen={isProjectTypeMenuOpen[projectType]}
              onMenuOpen={() => onClickMenuOpen(projectType)}
              onMenuClose={() => onClickMenuClose(projectType)}
            />
          </Col>
        </Form.Group>
      ))}
    </div>
  );
}

export default ProjectSelect;