import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { editRoutineActivity, fetchRoutines } from '../api'
import { Container } from 'react-bootstrap'

export default function EditRoutineActivityModal({
  show,
  onHide,
  activity,
  token,
  setRoutines,
}) {
  const [count, setCount] = useState(activity.count)
  const [duration, setDuration] = useState(activity.duration)

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
      console.log('something happened')
      console.error(err)
    }
  }

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
              value={count}
              onChange={(e) => countHandler(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Duration</Form.Label>
            <Form.Control
              value={duration}
              onChange={(e) => durationHandler(e.target.value)}
            />
          </Form.Group>
          <Container className='d-flex justify-content-end gap-2 w-100'>
            <Button variant='success' type='submit'>
              Update
            </Button>
            <Button variant='danger' onClick={closeModal}>
              Close
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  )
}
