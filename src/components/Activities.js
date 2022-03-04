import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Activities({ activities, user }) {
  console.log('user :>> ', user)
  return (
    <div className='d-flex flex-column justify-content-center gap-3 mb-4'>
      {!user.id ? null : (
        <Button className='w-50 align-self-center'>Create New Activity</Button>
      )}
      <div className='d-flex flex-wrap justify-content-center gap-4'>
        {activities &&
          activities.map(({ id, name, description }) => {
            return (
              <Card key={id} style={{ width: '18rem' }}>
                <Card.Header>{name}</Card.Header>
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
              </Card>
            )
          })}
      </div>
    </div>
  )
}