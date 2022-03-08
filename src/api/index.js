import axios from 'axios'
const BASE_URL = 'https://polar-brook-78087.herokuapp.com/api'
//enf
//edf
export const fetchRoutines = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/routines`)
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
  } catch ({ response }) {
    throw response.data
  }
}

export const getUser = async (token) => {
  const { data } = await axios.get(`${BASE_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return data
}

export const createRoutines = async (token, routineObj) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/routines`, routineObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return data
  } catch ({ response }) {
    console.error(response.data)
    throw response.data
  }
}

export const fetchActivities = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/activities`)
    return data
  } catch (err) {
    console.error(err)
  }
}

export const registerUser = async (registerObj) => {
  try {
    await axios.post(`${BASE_URL}/users/register`, registerObj)
  } catch ({ response }) {
    throw response.data
  }
}

export const deleteRoutine = async (token, id) => {
  try {
    await axios.delete(`${BASE_URL}/routines/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteRoutineActivity = async (token, routineActivityId) => {
  try {
    await axios.delete(`${BASE_URL}/routine_activities/${routineActivityId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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
    await axios.patch(
      `${BASE_URL}/routine_activities/${routineActivityId}`,
      { count, duration },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch ({ response }) {
    console.error(response.data)
    throw response.data
  }
}

export const editRoutine = async (token, id, routineObj) => {
  try {
    await axios.patch(`${BASE_URL}/routines/${id}`, routineObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch ({ response }) {
    console.error(response.data)
    if (response.data.name === 'error') {
      throw {
        name: 'Routine Name Exists',
        message: 'Routine with this name already Exists',
      }
    }
    throw response.data
  }
}

export const createActivity = async (token, activityObj) => {
  try {
    await axios.post(`${BASE_URL}/activities`, activityObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch ({ response }) {
    if (response) {
      throw response.data
    }
  }
}

export const createRoutineActivity = async (
  token,
  routineId,
  { activityId, count, duration }
) => {
  try {
    await axios.post(
      `${BASE_URL}/routines/${routineId}/activities`,
      { activityId, count, duration },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
  } catch ({ response }) {
    console.error(response.data)
    throw response.data
  }
}
