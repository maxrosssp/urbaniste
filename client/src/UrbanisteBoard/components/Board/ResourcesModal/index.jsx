import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Form,
  InputGroup,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import {
  Resource
} from '../../../../../../urbaniste/constants';
import {
  getResourceSelectionValues,
  selectionsAreEqual
} from '../../../../../../urbaniste/utils';
import Resources from '../../../constants/Resources.constant';
import './ResourcesModal.scss';

function ResourcesModal({
  title,
  buttonText,
  resources,
  validSelections,
  canCancel,
  onDismiss,
  onClose
}) {
  const headerAttr = canCancel ? { closeButton: true } : {};
  const refs = {
    [Resource.BUILDING_MATERIAL]: useRef(null),
    [Resource.COIN]: useRef(null),
    [Resource.LABOR]: useRef(null)
  };
  const [max, setMax] = useState({});
  const [min, setMin] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [canAdd, setCanAdd] = useState({});
  const [canSubtract, setCanSubtract] = useState({});
  const [selectedResources, setSelectedResources] = useState({
    [Resource.BUILDING_MATERIAL]: 0,
    [Resource.COIN]: 0,
    [Resource.LABOR]: 0
  });

  useEffect(() => {
    const values = getResourceSelectionValues(validSelections, resources, selectedResources);
    setCanAdd(values.canAdd);
    setCanSubtract(values.canSubtract);
    setIsValid(values.isValid);
    setMax(values.max);
    setMin(values.min);
    if (!values.isValid && selectionsAreEqual(values.max, values.min)) {
      setSelectedResources(values.min);
    }
  }, [selectedResources]);

  const ResourceInput = (type) => (
    <Form.Group as={Row} controlId={type}>
      <Form.Label column sm="4">{Resources[type].label}</Form.Label>
      <Col sm="8">
        <InputGroup>
          <Form.Control
            ref={refs[type]}
            type="number"
            min={min[type] || 0}
            max={max[type] || 0}
            value={selectedResources[type]}
            onChange={e => setSelectedResources({ ...selectedResources, [type]: parseInt(e.target.value) })}
            onClick={() => refs[type].current.select()}
          />

          <InputGroup.Append>
            <Button
              disabled={!canAdd[type]}
              variant="outline-secondary"
              onClick={() => setSelectedResources({ ...selectedResources, [type]: selectedResources[type] + 1 })}
            >
              +
            </Button>

            <Button
              disabled={!canSubtract[type]}
              variant="outline-secondary"
              onClick={() => setSelectedResources({ ...selectedResources, [type]: selectedResources[type] - 1 })}
            >
              -
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Form.Group>
  );

  return (
    <Modal show={true} onHide={onDismiss} backdrop={canCancel || 'static'}>
      <Modal.Header { ...headerAttr }>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {ResourceInput(Resource.BUILDING_MATERIAL)}

          {ResourceInput(Resource.COIN)}

          {ResourceInput(Resource.LABOR)}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        {canCancel && <Button variant="secondary" onClick={onDismiss}>Cancel</Button>}
        <Button disabled={!isValid} variant="primary" onClick={() => onClose(selectedResources)}>{buttonText}</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResourcesModal;
