import Card from 'react-bootstrap/Card'
import ActivityCards from './ActivityCards'

export default function RoutineCards({ routines }) {
  return (
    <>
      {routines &&
        routines.map((routine) => {
          return (
            <Card key={routine.id} className='d-flex flex-column'>
              <Card.Header className='fs-1'>{routine.name}</Card.Header>
              <Card.Body>
                <Card.Title className='p-0 m-0 fw-bold'>Goal:</Card.Title>
                <Card.Text className='text-center fs-5'>
                  {routine.goal}
                </Card.Text>
                <Card.Text className='fst-italic'>
                  Routine Creator: {routine.creatorName}
                </Card.Text>
                <Card.Text className='p-0 m-0 mb-2 fs-5 fw-bold'>
                  Activities:
                </Card.Text>
                {routine?.activities?.length > 0 ? (
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
