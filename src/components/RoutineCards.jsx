import Card from 'react-bootstrap/Card'

export default function RoutineCards({ routines }) {
  return (
    <>
      {routines &&
        routines.map((routine, idx) => {
          console.log('routine -->', routine)
          return (
            <Card
              key={routine.id}
              style={{ width: '18em' }}
              className='d-flex flex-column'
            >
              <Card.Header>{routine.name}</Card.Header>
              <Card.Body>
                <Card.Title>Creator: {routine.creatorName}</Card.Title>
                <Card.Text className='p-0 m-0'>Goal:</Card.Text>
                <Card.Text>{routine.goal}</Card.Text>
                <Card.Text className='p-0 m-0'>Related Activities:</Card.Text>
                {routine.activities.length > 0 ? (
                  routine.activities.map((activity) => {
                    return (
                      <div key={activity.id} className='ps-3'>
                        <ul className='list-unstyled p-0 m-0'>
                          <li>{activity.name}</li>
                        </ul>
                      </div>
                    )
                  })
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
