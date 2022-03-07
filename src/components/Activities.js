import { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CreateActivityModal from './CreateActivityModal'
import LoadingCards from './LoadingCards'

export default function Activities({ activities, user, setActivities, token }) {
  const [showModal, setShowModal] = useState(false)

  if (!activities) return <LoadingCards />

  return (
    <div className='d-flex flex-column justify-content-center gap-3 mb-4 w-75'>
      {!user.id ? null : (
        <Button
          className='w-50 align-self-center'
          onClick={() => setShowModal(true)}
        >
          Create New Activity
        </Button>
      )}
      <div className='d-flex flex-wrap justify-content-center gap-3'>
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
      <CreateActivityModal
        show={showModal}
        onHide={() => setShowModal(false)}
        token={token}
        setActivities={setActivities}
      />
    </div>
  )
}
