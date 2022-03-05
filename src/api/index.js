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

export const loginUser = async (loginObj) => {
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

export const registerUser = async (registerObj) => {
  try {
    await axios.post(`${BASE_URL}/users/register`, registerObj)
  } catch (err) {
    console.error(err)
  }
}

export const deleteRoutine = async (token, id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/routines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log('res :>> ', res)
  } catch (error) {
    console.error(error)
  }
}

export const deleteRoutineActivity = async (token, routineActivityId) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      }
    )
    console.log('res :>> ', res)
  } catch (error) {
    console.error(error)
  }
}

export const editRoutineActivity = async (
  token,
  routineActivityId,
  { count, duration }
) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/rountine_activities/${routineActivityId}`,
      { count, duration },
      {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      }
    )
    console.log('res :>> ', res)
  } catch (error) {
    console.error(error)
  }
}
