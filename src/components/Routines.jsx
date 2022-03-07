import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import RoutineCards from './RoutineCards'
import React from 'react'

export default function Routines({ routines, token }) {
  const navigate = useNavigate()
  if (!routines) return <h1>Loading</h1>

  return (
    <div className='d-flex gap-3 flex-column w-75'>
      {!token ? null : (
        <Button
          variant='primary'
          className='w-50 align-self-center'
          onClick={() => navigate('create-routine')}
        >
          Create New Routine
        </Button>
      )}
      {routines &&
        routines.map((routine) => {
          return (
            <React.Fragment key={routine.id}>
              <RoutineCards routine={routine} />
            </React.Fragment>
          )
        })}
    </div>
  )
}
