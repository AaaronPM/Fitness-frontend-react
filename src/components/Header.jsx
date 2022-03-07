import Container from 'react-bootstrap/Container'
import HeaderDefault from './HeaderDefault'
import HeaderMobile from './HeaderMobile'

export default function Header({ token, setToken, setUser }) {
  return (
    <Container className='mw-100 p-0 pt-sm-3'>
      <HeaderDefault token={token} setToken={setToken} setUser={setUser} />
      <HeaderMobile token={token} setToken={setToken} setUser={setUser} />
    </Container>
  )
}
