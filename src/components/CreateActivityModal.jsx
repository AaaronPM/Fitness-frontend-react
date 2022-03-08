import { useState, useEffect, createRef } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { createActivity, fetchActivities } from '../api'
import ErrPopover from './ErrPopover'

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
  const ref = createRef()

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
              overlay={<ErrPopover ref={ref} errmessage={errMessage} />}
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
