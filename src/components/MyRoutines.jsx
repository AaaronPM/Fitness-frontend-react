import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoutineCards from './RoutineCards'

export default function MyRoutines({ routines, user }) {
  const [myRoutines, setMyRoutines] = useState([])

  useEffect(() => {
    const filteredRoutines = routines.filter(
      (routine) => routine.creatorId === user.id
    )
    setMyRoutines(filteredRoutines)
  }, [routines, user])

  return (
    <div className='d-flex flex-column align-items-center w-100 gap-3'>
      {myRoutines[0] ? (
        myRoutines.map((routine) => {
          return (
            <Link
              to={`${routine.id}`}
              key={routine.id}
              className='text-decoration-none text-black w-50'
            >
              <RoutineCards routine={routine} />
            </Link>
          )
        })
      ) : (
        <h1>You have yet to create a routine</h1>
      )}
    </div>
  )
}
