import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Popover from 'react-bootstrap/Popover'
import { createRoutines, fetchRoutines } from '../api'
import { Container, OverlayTrigger } from 'react-bootstrap'

export default function CreateRoutine({ token, setRoutines, routines }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [errMessage, setErrMessage] = useState({})
  const [errShow, setErrShow] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    try {
      e.preventDefault()
      const routineObj = { name, goal, isPublic }
      await createRoutines(token, routineObj)
      const updatedRoutine = await fetchRoutines()
      setRoutines(updatedRoutine)
      navigate('/routines')
    } catch (err) {
      setErrMessage(err)
      setErrShow(true)
    }
  }
  // routineNameError
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
    <div className='w-75'>
      <Form
        onSubmit={(e) => submitHandler(e)}
        className='d-flex flex-column gap-3 p-3'
      >
        <Form.Group>
          <Form.Label>Routine Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Example: Chest Day, Leg Routine, Daily Bike Routine. . .'
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Routine's Goal</Form.Label>
          <Form.Control
            type='text'
            placeholder='Example: To workout those glamour muscles!'
            onChange={(e) => setGoal(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type='switch'
            label='Make Routine Public'
            onChange={(e) => {
              setIsPublic(isPublic ? false : true)
            }}
          />
        </Form.Group>
        <Container className='d-flex gap-5 justify-content-center'>
          <OverlayTrigger
            show={errShow}
            overlay={popover}
            placement='bottom'
          >
            <Button
              variant='success'
              type='submit'
              className='w-25 align-self-center'
            >
              Submit
            </Button>
          </OverlayTrigger>
          <Button
            variant='danger'
            className='w-25 align-self-center'
            onClick={() => navigate('/routines')}
          >
            Cancel
          </Button>
        </Container>
      </Form>
    </div>
  )
}
