import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { createActivity, fetchActivities } from '../api'

export default function EditRoutineModal({
  show,
  onHide,
  setActivities,
  token,
}) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [errMessage, setErrMessage] = useState({})
  const [isError, setIsError] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newActivityObj = { name, description }
    try {
      await createActivity(token, newActivityObj)
      const updateActivities = await fetchActivities()
      setActivities(updateActivities)
      onHide()
      setName('')
      setDescription('')
      setIsError(false)
      setErrMessage('')
    } catch (err) {
      setErrMessage(err)
      setIsError(true)
      console.error(err)
    }
  }

  const closeModal = () => {
    onHide()
    setName('')
    setIsError(false)
    setErrMessage('')
    setDescription('')
  }

  const popover = (
    <Popover id='popover-basic' className='border-danger text-danger'>
      <Popover.Header
        as='h3'
        className='border-danger text-danger bg-light fw-700'
      >
        {errMessage.name}
      </Popover.Header>
      <Popover.Body className='text-danger fs-4'>
        {errMessage.message}
      </Popover.Body>
    </Popover>
  )

  useEffect(() => {
    const timerId = setInterval(() => {
      setIsError(false)
    }, 5000)

    return () => clearInterval(timerId)
  })

  return (
    <Modal
      show={show}
      onHide={onHide}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Create a New Activity
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className='d-flex flex-column gap-3 p-3'
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group>
            <Form.Label>Activity Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Activity Name'
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Activity Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Describe your activity'
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Container className='d-flex justify-content-end gap-2 w-100'>
            <OverlayTrigger
              show={isError}
              overlay={popover}
              placement='bottom-end'
            >
              <Button variant='success' type='submit'>
                Create
              </Button>
            </OverlayTrigger>
            <Button variant='danger' onClick={closeModal}>
              Close
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
