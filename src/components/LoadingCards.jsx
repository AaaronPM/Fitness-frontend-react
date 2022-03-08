import Card from 'react-bootstrap/Card'
import Placeholder from 'react-bootstrap/Placeholder'
import Spinner from 'react-bootstrap/Spinner'

export default function LoadingCards() {
  return (
    <Card className='d-flex flex-column w-50'>
      <Spinner animation='border align-self-center p-4 m-5' />
      <Placeholder as={Card.Title} className='fs-1' animation='glow' />
      <Card.Body>
        <Placeholder as={Card.Title} animation='glow'>
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation='glow'>
          <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
          <Placeholder xs={6} /> <Placeholder xs={8} />
        </Placeholder>
        <Placeholder.Button variant='primary' xs={6} />
      </Card.Body>
    </Card>
  )
}
