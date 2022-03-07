import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'

export default function Header({ token, setToken, setUser }) {
  const navigate = useNavigate()
  return (
    <Container className='head mw-100 p-0 '>
      <Navbar
        bg='dark'
        variant='dark'
        className='mw-100 d-flex justify-content-between flex-sm-column flex-column flex-md-row'
        fixed='top'
      >
        <LinkContainer to='/'>
          <Navbar.Brand className='m-0 px-4 mx-3 fs-1'>
            Fitness Tracker
          </Navbar.Brand>
        </LinkContainer>
        <Nav className='me-3 fs-4 align-items-center flex-column flex-sm-row'>
          <NavLink
            to='/'
            className={(isActive) =>
              'nav-link' + (!isActive ? ' unselected' : '')
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/routines'
            className={(isActive) =>
              'nav-link' + (!isActive ? ' unselected' : '')
            }
          >
            Routines
          </NavLink>
          <NavLink
            to='/activities'
            className={(isActive) =>
              'nav-link' + (!isActive ? ' unselected' : '')
            }
          >
            Activities
          </NavLink>
          {token ? (
            <NavLink
              to='/myRoutines'
              className={(isActive) =>
                'nav-link text-center' + (!isActive ? ' unselected' : '')
              }
            >
              My Routines
            </NavLink>
          ) : (
            <NavLink
              to='/login'
              className={(isActive) =>
                'nav-link' + (!isActive ? ' unselected' : '')
              }
            >
              Login
            </NavLink>
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
    </Container>
  )
}
