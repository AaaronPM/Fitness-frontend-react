import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export default function CreateRoutine(params) {
  const [routineName, setRoutineName] = useState('')
  const [routineGoal, setRoutineGoal] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    const routineObj = { routineName, routineGoal, isPublic }
    // await api postRoutine function
    navigate('/routines')
  }

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
            onChange={(e) => setRoutineName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Routine's Goal</Form.Label>
          <Form.Control
            type='text'
            placeholder='Example: To workout those glamour muscles!'
            onChange={(e) => setRoutineGoal(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='d-flex gap-3'>
          <Form.Check
            type='switch'
            label='Make Routine Public'
            onChange={(e) => {
              setIsPublic(isPublic ? false : true)
            }}
          />
        </Form.Group>
        <Button
          variant='success'
          type='submit'
          className='w-50 align-self-center'
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}
