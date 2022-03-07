import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import Container from 'react-bootstrap/Container'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { createRoutineActivity, fetchRoutines } from '../api'

export default function AddActivityModal({
  show,
  onHide,
  token,
  activities,
  routineId,
  setRoutines,
}) {
  const [count, setCount] = useState('')
  const [duration, setDuration] = useState('')
  const [errMessage, setErrMessage] = useState({})
  const [errShow, setErrShow] = useState(false)
  const [activityId, setActivityId] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    const newRoutineActivity = { count, duration, activityId }
    try {
      await createRoutineActivity(token, routineId, newRoutineActivity)
      const updatedRoutines = await fetchRoutines()
      setRoutines(updatedRoutines)
      onHide()
      setCount('')
      setDuration('')
    } catch (err) {
      setErrMessage(err)
      setErrShow(true)
      console.error(err)
    }
  }

  const closeModal = () => {
    onHide()
    setCount('')
    setErrShow(false)
    setErrMessage('')
    setDuration('')
  }

  const countHandler = (e) => {
    const regx = /[0-9\b\W]+$/

    if (e === '' || regx.test(e)) {
      setCount(e)
    }
  }

  const durationHandler = (e) => {
    const regx = /[0-9\b\W]+$/

    if (e === '' || regx.test(e)) {
      setDuration(e)
    }
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
          {<h1>hello</h1>}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className='d-flex flex-column gap-3 p-3'
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group>
            <Form.Label>Add Activity Count</Form.Label>
            <Form.Control
              placeholder='Enter number of reps'
              value={count}
              onChange={(e) => countHandler(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Add Activity Duration</Form.Label>
            <Form.Control
              placeholder='Enter number of Seconds'
              value={duration}
              onChange={(e) => durationHandler(e.target.value)}
            />
          </Form.Group>
          <Form.Select onChange={(e) => setActivityId(e.target.value)}>
            <option>Activities</option>
            {activities.map((activity) => {
              return (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              )
            })}
          </Form.Select>
          <Container className='d-flex justify-content-end gap-2 w-100'>
            <OverlayTrigger show={errShow} overlay={popover} placement='bottom'>
              <Button variant='success' type='submit'>
                Submit
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
