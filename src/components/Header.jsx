import { Container, Navbar, Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import './Header.css'

export default function Header(props) {
  return (
    <Container className='head mw-100 p-0'>
      <Navbar
        bg='dark'
        variant='dark'
        className='mw-100 d-flex justify-content-between'
      >
        <Navbar.Brand className='m-0 mx-3 fs-1'>Fitness Tracker</Navbar.Brand>
        <Nav className='me-3 fs-4'>
          <Nav.Link>Routines</Nav.Link>
          <Nav.Link>Activities</Nav.Link>
          <Nav.Link>Log In</Nav.Link>
        </Nav>
      </Navbar>
    </Container>
  )
}
