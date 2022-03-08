import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function Login({ setToken }) {
  return (
    <div className='d-flex p-4 gap-4 align-items-center rounded shadow-sm mt-5'>
      <LoginForm setToken={setToken} />
      <div className='vr'></div>
      <RegisterForm setToken={setToken} />
    </div>
  )
}
