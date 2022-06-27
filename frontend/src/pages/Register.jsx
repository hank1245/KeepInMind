import {useState, useEffect} from 'react'
import {FaUser} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import {Link} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
  })

  const {name,email,password,password2} = formData

  const toastOption = {
    position:'top-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark'
  }

  const handleValidation = () => {
    const { password, password2, name, email} = formData
    if(password !== password2 ) {
      toast.error("비밀번호와 비밀번호 확인이 다릅니다",toastOption)
      return false
    } else if (name.length < 3) {
      toast.error("이름은 3글자보다 더 길어야 합니다", toastOption )
      return false
    } else if (password.length < 6) {
      toast.error("비밀번호는 6글자보다 더 길어야 합니다", toastOption )
      return false
    } else if (email ==="") {
      toast.error("이메일을 입력해주세요", toastOption)
      return false
    }
    return true
  }

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
  

  const onChange = (e) => {
    setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
      e.preventDefault()
      if(handleValidation()) {
        const userData = {name, email, password}
        dispatch(register(userData))
      }
  }
  
  if(isLoading) {
      return <Spinner/>
  }
  return (
    <>
        <section className='heading'>
            <h1>
                <FaUser/> 회원가입
            </h1>
            <p>계정을 생성하세요!</p>
        </section>
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input type="text" className='form-control' id='name' name='name' 
                    value={name} placeholder='이름을 입력하세요' onChange={onChange} />
                </div>
                <div className='form-group'>
                    <input type="text" className='form-control' id='email' name='email' 
                    value={email} placeholder='email을 입력하세요' onChange={onChange} />
                </div>
                <div className='form-group'>
                    <input type="password" className='form-control' id='password' name='password' 
                    value={password} placeholder='비밀번호를 입력하세요' onChange={onChange} />
                </div>
                <div className='form-group'>
                    <input type="password" className='form-control' id='password2' name='password2' 
                    value={password2} placeholder='비밀번호를 다시 입력하세요' onChange={onChange} />
                </div>
                <div className='form-group'>
                    <button type='submit' className='btn btn-block'>
                        가입하기
                    </button>
                </div>
            </form>
        </section>
        <ToastContainer />
    </>
  )
}

export default Register