import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoutineCards from './RoutineCards'

export default function MyRoutines({ routines, user }) {
  const [myRoutines, setMyRoutines] = useState([])

  console.log('myRoutines :>> ', myRoutines)
  useEffect(() => {
    const filteredRoutines = routines.filter(
      (routine) => routine.creatorId === user.id
    )
    setMyRoutines(filteredRoutines)
  }, [routines, user])

  return (
    <div>
      {myRoutines[0] ? (
        myRoutines.map((routine) => {
          return (
            <Link
              to={`${routine.id}`}
              key={routine.id}
              className='text-decoration-none text-black'
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
