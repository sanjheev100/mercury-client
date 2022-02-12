import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const DeleteModal = ({ show, setShow, title, handleSubmit }) => {
  const handleClose = () => setShow(false)

  const handleConfirm = () => {
    setShow(false)
    handleSubmit(title)
  }
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete?</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Are you sure Wanna Delete ${title}?`}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='danger' onClick={handleConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteModal
