import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import EditRoutineActivityModal from './EditRoutineActivityModal'
import { deleteRoutineActivity, fetchRoutines } from '../api'

export default function ActivityCards({
  activities,
  routineId,
  pathname,
  token,
  setRoutines,
}) {
  const [showModal, setShowModal] = useState(false)

  const deleteRoutineActivityHandler = async (routineActivityId) => {
    try {
      await deleteRoutineActivity(token, routineActivityId)
      const updateRoutines = await fetchRoutines()
      setRoutines(updateRoutines)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {activities.map((activity) => {
        return (
          <div
            key={activity.id}
            className='d-flex justify-content-center flex-column border rounded p-1 shadow-sm border-light'
          >
            <Card style={{ width: '14rem' }} className='flex-fill'>
              <Card.Header className='fw-bold mw-100'>
                {activity.name}
              </Card.Header>
              <Card.Body className='d-flex flex-column justify-content-center'>
                <Card.Text className='p-0 m-1 fw-bold'>Description:</Card.Text>
                <Card.Text className='p-0 mb-0 px-1 text-center'>
                  {activity.description}
                </Card.Text>
                <Card.Text className='p-0 m-1'>
                  <span className='fw-bold'>Count:</span> {activity.count}
                </Card.Text>
                <Card.Text className='p-0 m-1'>
                  <span className='fw-bold'>Duration:</span> {activity.duration}
                </Card.Text>
              </Card.Body>
            </Card>
            {pathname === `/myRoutines/${routineId}` ? (
              <div className='d-flex w-100 gap-2 mt-2'>
                <Button className='w-50' onClick={() => setShowModal(true)}>
                  Edit
                </Button>
                <Button
                  className='w-50'
                  variant='danger'
                  onClick={() => deleteRoutineActivityHandler(activity.id)}
                >
                  Delete
                </Button>
              </div>
            ) : null}
            <EditRoutineActivityModal
              show={showModal}
              onHide={() => setShowModal(false)}
              activity={activity}
              token={token}
              setRoutines={setRoutines}
            />
          </div>
        )
      })}
    </>
  )
}
