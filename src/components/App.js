import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './Header'
import Routines from './Routines'
import CreateRoutine from './CreateRoutine'
import { fetchRoutines, getUser } from '../api'

function App() {
  const [user, setUser] = useState({})
  const [routines, setRoutines] = useState([])
  // const [activites, setActivities] = useState([])
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoutines().then((allRoutines) => setRoutines(allRoutines))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    userHandler(token)
  }, [token])

  const userHandler = async (token) => {
    if (token) {
      const user = await getUser(token)
      setUser(user)
    }
  }

  return (
    <div className='App'>
      <Header token={token} />
      <div className='content-container d-flex justify-content-center'>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/routines' element={<Routines routines={routines} />} />
          <Route path='/routines/create-routine' element={<CreateRoutine />} />
          <Route path='/activities' element={<h1>Activities</h1>} />
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='/myRoutines' element={<h1>MyRoutines</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
