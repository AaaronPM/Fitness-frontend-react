import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Popover from 'react-bootstrap/Popover'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { editRoutineActivity, fetchRoutines } from '../api'

export default function EditRoutineActivityModal({
  show,
  onHide,
  activity,
  token,
  setRoutines,
}) {
  const [count, setCount] = useState(activity.count)
  const [duration, setDuration] = useState(activity.duration)
  const [errMessage, setErrMessage] = useState({})
  const [errShow, setErrShow] = useState(false)

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

  const closeModal = () => {
    onHide()
    setCount(activity.count)
    setDuration(activity.duration)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const updateRoutActObj = { count, duration }
    try {
      await editRoutineActivity(token, activity.id, updateRoutActObj)
      const updateRoutines = await fetchRoutines()
      setRoutines(updateRoutines)
      onHide()
      setCount(count)
      setDuration(duration)
    } catch (err) {
      setErrMessage(err)
      setErrShow(true)
    }
  }

  const popover = (
    <Popover
      id='popover-basic'
      className='d-flex flex-column text-center bg-danger'
    >
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
          {activity.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          className='d-flex flex-column gap-3 p-3'
          onSubmit={(e) => submitHandler(e)}
        >
          <Form.Group>
            <Form.Label>Count</Form.Label>
            <Form.Control
              placeholder='Enter Number of Reps'
              value={count}
              onChange={(e) => countHandler(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration</Form.Label>
            <Form.Control
              placeholder='Enter Number of Seconds'
              value={duration}
              onChange={(e) => durationHandler(e.target.value)}
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
