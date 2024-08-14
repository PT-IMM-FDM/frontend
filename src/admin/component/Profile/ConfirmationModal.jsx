import React from 'react';
import { Modal, Button } from 'flowbite-react';

const ConfirmationModal = ({ show, onClose, onConfirm, message = "Are you sure you want to proceed?" }) => {
  return (
    <Modal show={show} onClose={onClose} size="md">
      <Modal.Header className="text-center">Confirm Action</Modal.Header>
      <Modal.Body>
        <div className="text-center">
          <p>{message}</p>
        </div>
      </Modal.Body>
      <Modal.Footer className="flex justify-center">
        <Button color="purple" onClick={onConfirm} className="mx-2">
          Confirm
        </Button>
        <Button color="failure" onClick={onClose} className="mx-2">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
