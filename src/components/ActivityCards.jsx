import Card  from 'react-bootstrap/Card'

export default function ActivityCards({ activities }) {
  return (
    <>
      {activities.map((activity) => {
        return (
          <Card key={activity.id} style={{ width: '14rem' }}>
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
        )
      })}
    </>
  )
}
