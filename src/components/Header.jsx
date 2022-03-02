import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.css'

export default function Header(props) {
  return (
    <Container className='head mw-100 p-0'>
      <Navbar
        bg='dark'
        variant='dark'
        className='mw-100 d-flex justify-content-between'
        fixed='top'
      >
        <LinkContainer to='/'>
          <Navbar.Brand className='m-0 px-4 mx-3 fs-1 rounded-pill fitness-title'>
            Fitness Tracker
          </Navbar.Brand>
        </LinkContainer>
        <Nav className='me-3 fs-4'>
          {/* later change to NavLink for react-router-dom 
              may have to download react-router-bootstrap
              to make this nav set up a bit cleaner
            */}
          <LinkContainer to='/'>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          <Nav.Link>Routines</Nav.Link>
          <Nav.Link>Activities</Nav.Link>
          {/*when Logged in the log in tab turns into My Routines */}
          <Nav.Link>Profile</Nav.Link>
          {/* <Nav.Link>Log in</Nav.Link> */}
        </Nav>
      </Navbar>
    </Container>
  )
}
