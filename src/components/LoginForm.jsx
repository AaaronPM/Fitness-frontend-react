import { useState, useEffect, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ErrPopover from './ErrPopover'
import { loginUser } from '../api'

export default function LoginForm({ setToken }) {
  const [login, setLogin] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const [errMessage, setErrMessage] = useState({})
  const [showErr, setShowErr] = useState(false)
  const navigate = useNavigate()
  const ref = createRef()

  const loginHandler = async (e) => {
    try {
      e.preventDefault()
      const loginObj = { username: login, password: logPassword }
      const token = await loginUser(loginObj)
      setToken(token)
      navigate('/')
    } catch (err) {
      setErrMessage(err)
      setShowErr(true)
      console.error(err)
    }
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setShowErr(false)
    }, 5000)

    return () => clearInterval(timerId)
  })

  return (
    <Form
      onSubmit={(e) => loginHandler(e)}
      className='py-4 d-flex gap-3 flex-column'
    >
      <h1>Sign in</h1>
      <FloatingLabel controlId='floatingSignInInput' label='Username'>
        <Form.Control
          onChange={(e) => setLogin(e.target.value)}
          type='text'
          placeholder='username'
        />
      </FloatingLabel>
      <FloatingLabel controlId='floatingSignInPassword' label='Password'>
        <Form.Control
          onChange={(e) => setLogPassword(e.target.value)}
          type='password'
          placeholder='password'
        />
      </FloatingLabel>
      <OverlayTrigger
        show={showErr}
        overlay={<ErrPopover ref={ref} errmessage={errMessage} />}
        placement='left'
      >
        <Button type='submit' id='btn-login'>
          Login
        </Button>
      </OverlayTrigger>
    </Form>
  )
}
