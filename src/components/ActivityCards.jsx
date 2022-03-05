import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { deleteRoutineActivity, fetchRoutines } from '../api'

export default function ActivityCards({
  activities,
  routineId,
  pathname,
  token,
  setRoutines,
}) {
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
            className='d-flex justify-content-center flex-column gap-1'
          >
            <Card style={{ width: '14rem' }}>
              <Card.Header className='fw-bold mw-100'>
                {activity.name}
              </Card.Header>
              <Card.Body>
                <Card.Text className='p-0 m-1 fw-bold'>Description:</Card.Text>
                <Card.Text className='p-0 mb-0 px-4 text-center'>
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
              <div className='d-flex w-100 gap-2'>
                <Button className='w-50'>Edit</Button>
                <Button
                  className='w-50'
                  onClick={() => deleteRoutineActivityHandler(activity.id)}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </div>
        )
      })}
    </>
  )
}
