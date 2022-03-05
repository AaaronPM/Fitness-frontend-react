import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ActivityCards from './ActivityCards'
import { deleteRoutine, fetchRoutines } from '../api'

export default function SingleRoutineCard({
  token,
  routines,
  setRoutines,
  user,
}) {
  const [routine, setRoutine] = useState({})
  const { routineId } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const [currentRoutine] = routines.filter(
      (routine) => routine.id === +routineId
    )
    setRoutine(currentRoutine)
  }, [routines, user, routineId])

  const deleteHandler = async () => {
    try {
      await deleteRoutine(token, routineId)
      const updateRoutines = await fetchRoutines()
      setRoutines(updateRoutines)
      navigate('/myRoutines')
    } catch (err) {
      console.error(`routine couldn't be deleted`, err)
    }
  }

  return (
    <>
      <Card className='d-flex flex-column w-75'>
        <Card.Header className='fs-1'>{routine.name}</Card.Header>
        <Card.Body>
          <Card.Title className='p-0 m-0 fw-bold'>Goal:</Card.Title>
          <Card.Text className='text-center fs-5'>{routine.goal}</Card.Text>
          <Card.Text className='fst-italic'>
            Routine Creator: {routine.creatorName}
          </Card.Text>
          <Button>Edit</Button>
          <Button onClick={deleteHandler}>Delete</Button>
          <Card.Text className='p-0 m-0 mb-2 fs-5 fw-bold'>
            Activities:
          </Card.Text>
          {routine?.activities?.length > 0 ? (
            <div className='d-flex gap-2 justify-content-center'>
              <ActivityCards
                activities={routine.activities}
                routineId={routine.id}
                pathname={pathname}
              />
            </div>
          ) : (
            <div>
              <span className='ps-3'>No activites linked to this routine</span>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  )
}
