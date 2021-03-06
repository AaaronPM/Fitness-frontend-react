import { useState, useEffect, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { createRoutines, fetchRoutines } from '../api'
import ErrPopover from './ErrPopover'

export default function CreateRoutine({ token, setRoutines, routines }) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [errMessage, setErrMessage] = useState({})
  const [errShow, setErrShow] = useState(false)
  const navigate = useNavigate()
  const ref = createRef()

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

  useEffect(() => {
    const timerId = setInterval(() => {
      setErrShow(false)
    }, 5000)

    return () => clearInterval(timerId)
  })

  return (
    <div className='w-75 mt-3'>
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
        <Form.Group className='d-flex gap-5 justify-content-center'>
          <OverlayTrigger
            show={errShow}
            overlay={<ErrPopover ref={ref} errmessage={errMessage} />}
            placement='bottom'
          >
            <Button variant='success' type='submit' className='w-25'>
              Submit
            </Button>
          </OverlayTrigger>
          <Button
            variant='danger'
            className='w-25'
            onClick={() => navigate('/routines')}
          >
            Cancel
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
