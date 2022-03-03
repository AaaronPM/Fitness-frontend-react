import axios from 'axios'
const BASE_URL = 'https://polar-brook-78087.herokuapp.com/api'
//enf
//edf
export const fetchRoutines = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/routines`)
    console.log('Routines data :>> ', data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export const login = async (loginObj) => {
  try {
    const {
      data: { token },
    } = await axios.post(`${BASE_URL}/users/login`, loginObj)
    window.localStorage.setItem('token', token)
    return token
  } catch (error) {
    console.error(error)
  }
}

export const getUser = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const createRoutines = async (token, routineObj) => {
  const { data } = await axios.post(`${BASE_URL}/routines`, routineObj, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}

export const fetchActivities = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/activities`)
    console.log('Activities data :>> ', data)
    return data
  } catch (err) {
    console.error(err)
  }
}
