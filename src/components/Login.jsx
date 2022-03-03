import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { loginUser } from '../api'

export default function Login({ setToken }) {
  const [login, setLogin] = useState('')
  const [logPassword, setLogPassword] = useState('')
  const [register, setRegister] = useState('')
  const [regPassword, setRegPassword] = useState('')
  const navigate = useNavigate()

  console.log('login :>> ', login)
  console.log('logPassword :>> ', logPassword)
  console.log('register :>> ', register)
  console.log('regPassword :>> ', regPassword)

  const loginHandler = async (e) => {
    try {
      e.preventDefault()
      const loginObj = { username: login, password: logPassword }
      const token = await loginUser(loginObj)
      console.log(token)
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
      //register api call
      const token = await loginUser(registerObj)
      setToken(token)
      navigate('/')
    } catch (err) {
      console.log(`login failed`, err)
    }
  }

  return (
    <div className='d-flex gap-4'>
      <Form
        onSubmit={(e) => loginHandler(e)}
        className='border-end border-secondary pe-4 d-flex gap-3 flex-column'
      >
        <h1>Sign in</h1>
        <Form.Group>
          <Form.Text>Username</Form.Text>
          <Form.Control
            onChange={(e) => setLogin(e.target.value)}
            type='text'
            placeholder='username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Text>Password</Form.Text>
          <Form.Control
            onChange={(e) => setLogPassword(e.target.value)}
            type='password'
            placeholder='password'
          />
        </Form.Group>
        <Button type='submit'>Login</Button>
      </Form>
      <Form
        onSubmit={(e) => registerHandler(e)}
        className='ms-0 d-flex gap-3 flex-column'
      >
        <h1>Register</h1>
        <Form.Group>
          <Form.Text>Username</Form.Text>
          <Form.Control
            onChange={(e) => setRegister(e.target.value)}
            type='text'
            placeholder='username'
          />
        </Form.Group>
        <Form.Group>
          <Form.Text>Password</Form.Text>
          <Form.Control
            onChange={(e) => setRegPassword(e.target.value)}
            type='password'
            placeholder='password'
          />
        </Form.Group>
        <Button type='submit'>Register</Button>
      </Form>
    </div>
  )
}
