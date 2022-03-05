import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header({ token, setToken, setUser }) {
  const navigate = useNavigate()
  return (
    <Container className='head mw-100 p-0'>
      <Navbar
        bg='dark'
        variant='dark'
        className='mw-100 d-flex justify-content-between flex-sm-column flex-md-row'
        fixed='top'
      >
        <Navbar.Brand className='m-0 px-4 mx-3 fs-1 rounded-pill'>
          Fitness Tracker
        </Navbar.Brand>
        <Nav className='me-3 fs-4 align-items-center'>
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
    </Container>
  )
}
