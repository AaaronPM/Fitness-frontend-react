import Button from 'react-bootstrap/Button'
import LinkContainer from 'react-router-bootstrap/LinkContainer'

const RNGColor = () => {
  let RNG = Math.ceil(Math.random() * 5)
  const colorPairs = {
    1: 'primary',
    2: 'success',
    3: 'danger',
    4: 'warning',
    5: 'info',
  }
  return `${colorPairs[RNG]}`
}

export default function Home({ user }) {
  return (
    <div className='d-flex justify-content-center mt-5 align-items-center'>
      {!user.id ? (
        <div className='bg-light text-secondary p-5 rounded-lg shadow-lg'>
          <h1 className='display-4'>Welcome to Fitness Tracker!</h1>
          <p className='lead'>
            A simple application to share and find great work out routines!
          </p>
          <hr className='my-4' />
          <p>Register or Login to start sharing your great WORKOUTS!</p>
          <LinkContainer to='/login'>
            <Button variant={`${RNGColor()}`} className='btn-lg'>
              Login / Register
            </Button>
          </LinkContainer>
        </div>
      ) : (
        <div className='bg-light text-secondary p-5 rounded mt-5 shadow-lg'>
          <h1 className='display-4 mb-5 text-decoration-underline'>
            Welcome back,
            <span className={`text-${RNGColor()} fw-bolder`}>
              {user.username}
            </span>
            !
          </h1>
          <p className='lead'>Go Checkout all the great Routines!!!</p>
          <LinkContainer to='/routines'>
            <Button
              variant={`outline-${RNGColor()}`}
              className={`btn-lg btn-block`}
            >
              Routines
            </Button>
          </LinkContainer>
          <hr className='my-4' />
          <p>Register or Login to start sharing your great WORKOUTS!</p>
          <LinkContainer to='/myRoutines'>
            <Button
              variant={`outline-${RNGColor()}`}
              className='btn-lg btn-block'
            >
              My Routines!!
            </Button>
          </LinkContainer>
        </div>
      )}
    </div>
  )
}
