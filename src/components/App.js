import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './Header'
import Routines from './Routines'
import Login from './Login'
import Activities from './Activities'
import CreateRoutine from './CreateRoutine'
import MyRoutines from './MyRoutines'
import SingleRoutineCard from './SingleRoutineCard'
import { fetchActivities, fetchRoutines, getUser } from '../api'
import Home from './Home'

function App() {
  const [user, setUser] = useState({})
  const [routines, setRoutines] = useState([])
  const [activities, setActivities] = useState([])
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    fetchRoutines().then((allRoutines) => setRoutines(allRoutines))
    fetchActivities().then((allActivities) => setActivities(allActivities))
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
      <Header token={token} setToken={setToken} setUser={setUser} />
      <div className='content-container d-flex justify-content-center mb-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/routines'
            element={<Routines token={token} routines={routines} />}
          />
          <Route
            path='/routines/create-routine'
            element={
              <CreateRoutine
                routines={routines}
                setRoutines={setRoutines}
                token={token}
              />
            }
          />
          <Route
            path='/activities'
            element={
              <Activities
                user={user}
                token={token}
                activities={activities}
                setActivities={setActivities}
              />
            }
          />
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route
            path='/myRoutines'
            element={<MyRoutines routines={routines} user={user} />}
          />
          <Route
            path='/myRoutines/:routineId'
            element={
              <SingleRoutineCard
                token={token}
                routines={routines}
                setRoutines={setRoutines}
                user={user}
              />
            }
          />
        </Routes>
      </div>
    </div>
  )
}

export default App
