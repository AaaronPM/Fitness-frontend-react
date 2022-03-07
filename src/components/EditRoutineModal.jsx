import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { editRoutine, fetchRoutines } from '../api'

export default function EditRoutineModal({
  show,
  onHide,
  routine: { name: routineName, goal: routineGoal, id },
  setRoutines,
  token,
}) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [errMessage, setErrMessage] = useState('')
  const [errShow, setErrShow] = useState('')

  useEffect(() => {
    setGoal(routineGoal)
    setName(routineName)
  }, [routineGoal, routineName])

  const submitHandler = async (e) => {
    e.preventDefault()
    const updateRoutineObj = { name, goal }
    try {
      await editRoutine(token, id, updateRoutineObj)
      const updateRoutines = await fetchRoutines()
      setRoutines(updateRoutines)
      onHide()
      setName(name)
      setGoal(goal)
    } catch (err) {
      setErrMessage(err)
      setErrShow(true)
      console.error(err)
    }
  }

  const closeModal = () => {
    onHide()
    setName(routineName)
    setGoal(routineGoal)
    setErrShow(false)
    setErrMessage('')
  }

  const popover = (
    <Popover id='popover-basic' className='bg-danger'>
      <Popover.Header as='h3' className='bg-danger text-light'>
        {errMessage.name}
      </Popover.Header>
      <Popover.Body className='text-light'>{errMessage.message}</Popover.Body>
    </Popover>
  )

  useEffect(() => {
    const timerId = setInterval(() => {
      setErrShow(false)
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
          {routineName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className='d-flex flex-column gap-3 p-3'
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group>
            <Form.Label>Update Routine's Name</Form.Label>
            <Form.Control
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Update Routine's Goal</Form.Label>
            <Form.Control
              type='text'
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </Form.Group>
          <Container className='d-flex justify-content-end gap-2 w-100'>
            <OverlayTrigger show={errShow} overlay={popover} placement='bottom'>
              <Button variant='success' type='submit'>
                Update
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
