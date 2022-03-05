import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import { loginUser, registerUser } from '../api'

export default function Login({ setToken }) {
  const [login, setLogin] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const [register, setRegister] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const navigate = useNavigate()

  const loginHandler = async (e) => {
    try {
      e.preventDefault()
      const loginObj = { username: login, password: logPassword }
      const token = await loginUser(loginObj)
      setToken(token)
      navigate('/')
    } catch (err) {
      console.error(`login failed`, err)
    }
  }

  const registerHandler = async (e) => {
    try {
      e.preventDefault()
      const registerObj = { username: register, password: regPassword }
      await registerUser(registerObj)
      const token = await loginUser(registerObj)
      setToken(token)
      navigate('/')
    } catch (err) {
      console.log(`login failed: `, err)
    }
  }

  return (
    <div className='d-flex gap-4 align-items-center'>
      <Form
        onSubmit={(e) => loginHandler(e)}
        className='border-end border-secondary pe-4 py-4 d-flex gap-3 flex-column'
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
        <Button type='submit' id='btn-login'>
          Login
        </Button>
      </Form>
      <Form
        onSubmit={(e) => registerHandler(e)}
        className='ms-0 d-flex gap-3 flex-column'
      >
        <h1>Register</h1>
        <FloatingLabel controlId='floatingRegisterInput' label='Username'>
          <Form.Control
            onChange={(e) => setRegister(e.target.value)}
            type='text'
            placeholder='username'
          />
        </FloatingLabel>
        <FloatingLabel controlId='floatingRegisterPassword' label='Password'>
          <Form.Control
            onChange={(e) => setRegPassword(e.target.value)}
            type='password'
            placeholder='password'
          />
        </FloatingLabel>
        <Button type='submit' id='btn-register'>
          Register
        </Button>
      </Form>
    </div>
  )
}
