import Button from 'react-bootstrap/Button'
import LinkContainer from 'react-router-bootstrap/LinkContainer'

const RNGColor = () => {
  let RNG = Math.ceil(Math.random() * 5)
  console.log('RNG', RNG)
  const colorPairs = {
    1: 'text-primary',
    2: 'text-success',
    3: 'text-danger',
    4: 'text-warning',
    5: 'text-info',
  }
  return `${colorPairs[RNG]}`
}

export default function Home({ user }) {
  return (
    <div>
      {!user.id ? (
        <div className='bg-light text-secondary p-5 rounded-lg m-3 shadow-lg'>
          <h1 className='display-4'>Welcome to Fitness Tracker!</h1>
          <p className='lead'>
            A simple application to share and find great work out routines!
          </p>
          <hr className='my-4' />
          <p>Register or Login to start sharing your great WORKOUTS!</p>
          <LinkContainer to='/login'>
            <Button variant='outline-success' className='btn-lg'>
              Login / Register
            </Button>
          </LinkContainer>
        </div>
      ) : (
        <div className='bg-light text-secondary p-5 rounded m-3 shadow-lg'>
          <h1 className='display-4 mb-5 text-decoration-underline'>
            Welcome back,
            <span className={`${RNGColor()} fw-bolder`}>{user.username}</span>!
          </h1>
          <p className='lead'>Go Checkout all the great Routines!!!</p>
          <LinkContainer to='/routines'>
            <Button variant='outline-secondary' className='btn-lg btn-block'>
              Routines
            </Button>
          </LinkContainer>
          <hr className='my-4' />
          <p>Register or Login to start sharing your great WORKOUTS!</p>
          <LinkContainer to='/myRoutines'>
            <Button variant='outline-primary' className='btn-lg btn-block'>
              My Routines!!
            </Button>
          </LinkContainer>
        </div>
      )}
    </div>
  )
}
