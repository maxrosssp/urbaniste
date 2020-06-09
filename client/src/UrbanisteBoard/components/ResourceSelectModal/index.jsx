import React from 'react';
import {
  Modal,
  Button
} from 'react-bootstrap';
import {
  Resource
} from '../../../../../urbaniste/constants';
import Resources from '../../constants/Resources.constant';
import './ResourceSelectModal.scss';

function ResourceSelectModal({
  moves,
  title,
  description,
  canCancel,
  onDismiss,
  onClose
}) {
  const headerAttr = canCancel ? { closeButton: true } : {};

  return (
    <Modal show={true} onHide={onDismiss} backdrop={canCancel || 'static'}>
      <Modal.Header { ...headerAttr }>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {description && (
          <p>{description.map(line => <>{line}<br/></>)}</p>
        )}
        
        <div class="resource-button">
          <Button variant="primary" onClick={() => onClose(moves, Resource.BUILDING_MATERIAL)}>
            {Resources[Resource.BUILDING_MATERIAL].label}
          </Button>
        </div>

        <div class="resource-button">
          <Button variant="primary" onClick={() => onClose(moves, Resource.COIN)}>
            {Resources[Resource.COIN].label}
          </Button>
        </div>

        <div class="resource-button">
          <Button variant="primary" onClick={() => onClose(moves, Resource.LABOR)}>
            {Resources[Resource.LABOR].label}
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {canCancel && <Button variant="secondary" onClick={onDismiss}>Cancel</Button>}
      </Modal.Footer>
    </Modal>
  );
}

export default ResourceSelectModal;
