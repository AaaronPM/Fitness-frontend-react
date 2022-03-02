import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Header from './Header'
import { fetchRoutines, getUser, login } from '../api'

function App() {
  const [user, setUser] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [routines, setRoutines] = useState([])
  const [activites, setActivities] = useState([])
  const [token, setToken] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])

  useEffect(() => {
    userHandler(token)
  }, [token])


  const userHandler = async (token) => {
    if(token) {
      const user = await getUser(token)
      setUserInfo(user)
    }
  }

  const loginObj = {username: 'albert', password: 'bertie99'}

  return (
    <div className='App'>
      <Header userInfo={userInfo} />
      <div className='content-container d-flex justify-content-center'>
      <button onClick={e=>{
        login(loginObj)
        }}>Login Albert</button>
      <button onClick={e=>{
        window.localStorage.removeItem('token')
        setUserInfo({})
        setToken('')
      }}>removeItem</button>
        <Routes>
          <Route path='/' element={<h1>Home</h1>} />
          <Route path='/routines' element={<h1>Routines</h1>} />
          <Route path='/activities' element={<h1>Activities</h1>} />
          <Route path='/login' element={<h1>Login</h1>} />
          <Route path='/myRoutines' element={<h1>MyRoutines</h1>} />
        </Routes>
      </div>
    </div>
  )
}



export default App
