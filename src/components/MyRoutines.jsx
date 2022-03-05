import { useState, useEffect } from 'react'
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
        <RoutineCards routines={myRoutines} />
      ) : (
        <h1>You have yet to create a routine</h1>
      )}
    </div>
  )
}
