import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import { useNavigate } from 'react-router-dom'

export default function HeaderDefault({ token, setToken, setUser }) {
  const navigate = useNavigate()
  return (
    <Navbar
      bg='dark'
      variant='dark'
      id='lg-nav'
      className='mw-100 d-sm-flex justify-content-between flex-md-row flex-sm-column'
      fixed='top'
    >
      <LinkContainer to='/'>
        <Navbar.Brand className='m-0 px-4 mx-3 fs-1'>
          Fitness Tracker
        </Navbar.Brand>
      </LinkContainer>
      <Nav className='me-3 fs-4 align-items-center flex-column flex-sm-row'>
        <LinkContainer to='/'>
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to='routines'>
          <Nav.Link>Routines</Nav.Link>
        </LinkContainer>
        <LinkContainer to='activities'>
          <Nav.Link>Activities</Nav.Link>
        </LinkContainer>
        {token ? (
          <LinkContainer to='myRoutines'>
            <Nav.Link className='text-center'>My Routines</Nav.Link>
          </LinkContainer>
        ) : (
          <LinkContainer to='login'>
            <Nav.Link>Login</Nav.Link>
          </LinkContainer>
        )}
        {token ? (
          <Button
            id='btn-logout'
            variant='danger'
            onClick={() => {
              localStorage.removeItem('token')
              setToken('')
              setUser({})
              navigate('/')
            }}
          >
            LogOut
          </Button>
        ) : null}
      </Nav>
    </Navbar>
  )
}
