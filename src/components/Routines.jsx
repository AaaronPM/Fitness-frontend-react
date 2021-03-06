import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import RoutineCards from './RoutineCards'
import LoadingCards from './LoadingCards'

export default function Routines({ routines, token }) {
  const navigate = useNavigate()

  if (!routines) return <LoadingCards />

  return (
    <div className='d-flex gap-3 flex-column w-75 mt-3'>
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
