import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {login, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [formData, setFormData] = useState({
      email: '',
      password: '',
  })

  const toastOption = {
    position:'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const {email,password} = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector(
      (state) => state.auth
    )
  useEffect( () => {
    if(isError) {
        toast.error(message)
    }
    if(isSuccess || user) {
        navigate('/')
    }
    dispatch(reset())
    },[user,isError,isSuccess,message,navigate, dispatch])
      
  const handleValidation = () => {
        const { password, email} = formData
         if (email ==="") {
          toast.error("이메일을 입력해주세요", toastOption)
          return false 
        } else if (password ==="") {
          toast.error('비밀번호를 입력해주세요', toastOption)
          return false
        }
        return true
      }

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault()
      if(handleValidation()) {
        const userData = {email,password}
        dispatch(login(userData))
      }
  }

  if(isLoading) {
      return <Spinner/>
  }
  return (
    <>
        <section className='heading'>
            <h1>
                <FaSignInAlt/> 로그인
            </h1>
            <p>KeepInMind로 일정을 관리하세요!</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input type="text" className='form-control' id='email' name='email' 
                    value={email} placeholder='Enter Your email' onChange={onChange} />
                </div>
                <div className='form-group'>
                    <input type="password" className='form-control' id='password' name='password' 
                    value={password} placeholder='Enter Your password' onChange={onChange} />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        로그인
                    </button>
                </div>
            </form>
        </section>
        <ToastContainer />
    </>
  )
}

export default Login