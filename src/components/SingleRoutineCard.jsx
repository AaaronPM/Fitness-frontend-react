import { useState, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { deleteRoutine, fetchRoutines } from '../api'
import ActivityCards from './ActivityCards'
import EditRoutineModal from './EditRoutineModal'
import AddActivityModal from './AddActivityModal'

export default function SingleRoutineCard({
  token,
  routines,
  setRoutines,
  user,
  activities,
}) {
  const [routine, setRoutine] = useState({})
  const [modalShow, setModalShow] = useState(false)
  const { routineId } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [activityModalShow, setActivityModalShow] = useState(false)

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

  if (!routine) return <h1>...Loading</h1>

  return (
    <>
      <Card className='d-flex flex-column w-75 shadow mt-3 '>
        <Card.Header className='fs-1'>{routine.name}</Card.Header>
        <Card.Body>
          <Card.Title className='p-0 m-0 fw-bold'>Goal:</Card.Title>
          <Card.Text className='text-center fs-5'>{routine.goal}</Card.Text>
          <Card.Text className='fst-italic'>
            Routine Creator: {routine.creatorName}
          </Card.Text>
          <Container className='d-flex gap-3'>
            <Button onClick={() => setModalShow(true)}>Edit</Button>
            <Button variant='danger' onClick={deleteHandler}>
              Delete
            </Button>
          </Container>
          <Card.Text className='p-0 m-0 mb-2 fs-5 fw-bold'>
            Activities:
          </Card.Text>
          {routine?.activities?.length > 0 ? (
            <div className='d-flex gap-2 justify-content-center flex-wrap'>
              <ActivityCards
                activities={routine.activities}
                routineId={routine.id}
                pathname={pathname}
                token={token}
                setRoutines={setRoutines}
              />
            </div>
          ) : (
            <div>
              <span className='ps-3'>No activites linked to this routine</span>
            </div>
          )}
        </Card.Body>
      </Card>
      <EditRoutineModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        routine={routine}
        setRoutines={setRoutines}
        token={token}
      />
      <Button
        className='mt-3 w-50'
        onClick={() => {
          setActivityModalShow(true)
        }}
      >
        Add an Activity To Your Routine
      </Button>
      <AddActivityModal
        token={token}
        setRoutines={setRoutines}
        routineId={routine.id}
        activities={activities}
        show={activityModalShow}
        onHide={() => {
          setActivityModalShow(false)
        }}
      />
    </>
  )
}
