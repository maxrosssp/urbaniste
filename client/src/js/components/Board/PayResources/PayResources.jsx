import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  Form,
  InputGroup,
  Row,
  Col,
  Button
} from 'react-bootstrap';
import './PayResources.scss';
import {
  Resource
} from '../../../../../../urbaniste/constants';
import Resources from '../../../constants/Resources.constant';

function PayResources({
  resources,
  cost,
  onDismiss,
  onClose
}) {
  const refs = {
    [Resource.BUILDING_MATERIAL]: useRef(null),
    [Resource.COIN]: useRef(null),
    [Resource.LABOR]: useRef(null)
  };
  const buildCost = {
    [Resource.BUILDING_MATERIAL]: cost[Resource.BUILDING_MATERIAL] || 0,
    [Resource.COIN]: cost[Resource.COIN] || 0,
    [Resource.LABOR]: cost[Resource.LABOR] || 0,
    [Resource.ANY]: cost[Resource.ANY] || 0
  };
  const [pay, setPay] = useState({
    [Resource.BUILDING_MATERIAL]: buildCost[Resource.BUILDING_MATERIAL],
    [Resource.COIN]: buildCost[Resource.COIN],
    [Resource.LABOR]: buildCost[Resource.LABOR]
  });
  const [max, setMax] = useState(0);
  const [isValidPayment, setIsValidPayment] = useState(false);

  const getCostTotal = () => buildCost[Resource.BUILDING_MATERIAL] + buildCost[Resource.COIN] + buildCost[Resource.LABOR] + buildCost[Resource.ANY];
  const getPayTotal = () => pay[Resource.BUILDING_MATERIAL] + pay[Resource.COIN] + pay[Resource.LABOR];
  const checkValidPayment = () => (
    getCostTotal() === getPayTotal() &&
    buildCost[Resource.BUILDING_MATERIAL] <= pay[Resource.BUILDING_MATERIAL] &&
    buildCost[Resource.COIN] <= pay[Resource.COIN] &&
    buildCost[Resource.LABOR] <= pay[Resource.LABOR]
  );

  useEffect(() => {
    setMax(getCostTotal() - getPayTotal());
    setIsValidPayment(checkValidPayment());
  }, [pay]);

  const ResourceInput = (type) => (
    <Form.Group as={Row} controlId={type}>
      <Form.Label column sm="4">{Resources[type].label}</Form.Label>
      <Col sm="8">
        <InputGroup>
          <Form.Control
            ref={refs[type]}
            type="number"
            min={buildCost[type]}
            max={Math.min(max + pay[type], resources[type])}
            value={pay[type]}
            onChange={e => setPay({ ...pay, [type]: parseInt(e.target.value) })}
            onClick={() => refs[type].current.select()}
          />

          <InputGroup.Append>
            <Button
              disabled={pay[type] >= Math.min(max + pay[type], resources[type])}
              variant="outline-secondary"
              onClick={() => setPay({ ...pay, [type]: pay[type] + 1 })}
            >
              +
            </Button>

            <Button
              disabled={pay[type] <= buildCost[type]}
              variant="outline-secondary"
              onClick={() => setPay({ ...pay, [type]: pay[type] - 1 })}
            >
              -
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Col>
    </Form.Group>
  );

  return (
    <Modal show={true} onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Pay Resources</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {ResourceInput(Resource.BUILDING_MATERIAL)}

          {ResourceInput(Resource.COIN)}

          {ResourceInput(Resource.LABOR)}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onDismiss}>Cancel</Button>
        <Button disabled={!isValidPayment} variant="primary" onClick={() => onClose(pay)}>Pay</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PayResources;
