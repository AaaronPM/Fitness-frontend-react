import Card from 'react-bootstrap/Card'
import ActivityCards from './ActivityCards'

export default function RoutineCards({ routines }) {
  return (
    <>
      {routines &&
        routines.map((routine, idx) => {
          console.log('routine -->', routine)
          return (
            <Card key={routine.id} className='d-flex flex-column'>
              <Card.Header className='fs-1'>{routine.name}</Card.Header>
              <Card.Body>
                <Card.Title className='fs-5'>
                  Creator: {routine.creatorName}
                </Card.Title>
                <Card.Text className='p-0 m-0 fw-bold'>Goal:</Card.Text>
                <Card.Text>{routine.goal}</Card.Text>
                <Card.Text className='p-0 m-0 mb-2'>Activities:</Card.Text>
                {routine.activities.length > 0 ? (
                  <div className='d-flex gap-2 justify-content-center'>
                    <ActivityCards activities={routine.activities} />
                  </div>
                ) : (
                  <div>
                    <span className='ps-3'>
                      No activites linked to this routine
                    </span>
                  </div>
                )}
              </Card.Body>
            </Card>
          )
        })}
    </>
  )
}
