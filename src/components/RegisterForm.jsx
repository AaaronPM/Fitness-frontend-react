import { useState, useEffect, createRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import ErrPopover from './ErrPopover'
import { loginUser, registerUser } from '../api'

export default function RegisterForm({ setToken }) {
  const [register, setRegister] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const [errMessage, setErrMessage] = useState({})
  const [showErr, setShowErr] = useState(false)
  const navigate = useNavigate()
  const ref = createRef()

  const registerHandler = async (e) => {
    try {
      e.preventDefault()
      const registerObj = { username: register, password: regPassword }
      await registerUser(registerObj)
      const token = await loginUser(registerObj)
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
      onSubmit={(e) => registerHandler(e)}
      className='py-4 d-flex gap-3 flex-column'
    >
      <h1>Register</h1>
      <FloatingLabel controlId='floatingRegInput' label='Username'>
        <Form.Control
          onChange={(e) => setRegister(e.target.value)}
          type='text'
          placeholder='username'
        />
      </FloatingLabel>
      <FloatingLabel controlId='floatingRegPassword' label='Password'>
        <Form.Control
          onChange={(e) => setRegPassword(e.target.value)}
          type='password'
          placeholder='password'
        />
      </FloatingLabel>
      <OverlayTrigger
        show={showErr}
        overlay={<ErrPopover ref={ref} errmessage={errMessage} />}
        placement='right'
      >
        <Button type='submit' id='btn-register'>
          Register
        </Button>
      </OverlayTrigger>
    </Form>
  )
}
