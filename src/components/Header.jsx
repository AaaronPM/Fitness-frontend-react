import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import LinkContainer from 'react-router-bootstrap/LinkContainer'
import { useNavigate } from 'react-router-dom'

export default function Header({ token, setToken, setUser }) {
  const navigate = useNavigate()
  return (
    <Container className='mw-100 p-0 pt-sm-3'>
      <Navbar
        bg='dark'
        variant='dark'
        id='lg-nav'
        className='mw-100 d-sm-flex justify-content-between flex-sm-column d-none flex-md-row'
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
      <Navbar bg='dark' variant='dark' id='xs-nav' expand={false}>
        <Container fluid>
          <Navbar.Brand className='m-0 px-4 mx-3 fs-1'>
            Fitness Tracker
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='offcanvasNavbar' />
          <Navbar.Offcanvas
            id='offcanvasNavbar'
            aria-labelledby='offcanvasNavbarLabel'
            placement='top'
            className='bg-dark text-light'
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id='offcanvasNavbarLabel'>
                Fitness Tracker
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className='justify-content-end flex-grow-1 pe-3'>
                <LinkContainer to='/'>
                  <Button variant='outline-secondary' className='btn-block'>
                    Home
                  </Button>
                </LinkContainer>
                <LinkContainer to='routines'>
                  <Button variant='outline-secondary' className='btn-block'>
                    Routines
                  </Button>
                </LinkContainer>
                <LinkContainer to='activities'>
                  <Button variant='outline-secondary' className='btn-block'>
                    Activities
                  </Button>
                </LinkContainer>
                {token ? (
                  <LinkContainer to='myRoutines'>
                    <Button variant='outline-secondary' className='btn-block'>
                      My Routines
                    </Button>
                  </LinkContainer>
                ) : (
                  <LinkContainer to='login'>
                    <Button variant='outline-secondary' className='btn-block'>
                      Login
                    </Button>
                  </LinkContainer>
                )}
                {token ? (
                  <Button
                    id='btn-logout'
                    variant='danger'
                    className='mt-2'
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
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Container>
  )
}
