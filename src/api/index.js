import axios from "axios";
const BASE_URL = "https://polar-brook-78087.herokuapp.com/api"
//enf
//edf
export const fetchRoutines  = async() => {
  try {
    const {data} = await axios.get(`${BASE_URL}/routines`)
    console.log('data :>> ', data);
    return data
  } catch (error) {
    console.error(error)
    
  }
  
  
};

// export const functionName = (params) => {
  
// };

/*
const [logintext, setLogintext] = useState('')
const [password, setPassword] = useState('')

const loginhandler = () => {
  loginObj= { loginText, password}
  const {token} = await login(loginObj)
  setLogintext('')
  setpassword('')
  navigate('/')

}

onChange={e => setLogintext(e.target.value)}
onClick={loginHandler}

*/

export const login = async(loginObj) => {
  try {
    const {data: {token}} = await axios.post(`${BASE_URL}/users/login`,loginObj)
    window.localStorage.setItem('token', token)
    return token
  } catch (error) {
    console.error(error)
  }
  
};

export const getUser = async (token) => {
  const {data} = await axios.get(`${BASE_URL}/users/me`,{ headers: {Authorization: `Bearer ${token}`}}) 
  return data
};

