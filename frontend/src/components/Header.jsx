import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import {searchGoals} from '../features/goals/goalSlice'
import styled from 'styled-components'
import {Drawer,Button, Input} from 'antd'
import { useState } from 'react'
import { MenuOutlined,FormOutlined,PushpinOutlined,BellOutlined,DeleteOutlined} from '@ant-design/icons'
import debounce from 'lodash.debounce'

const {Search} = Input

function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector((state) => state.auth)

  const onLogout = () => {
      dispatch(logout())
      dispatch(reset())
      navigate('/')
  }

  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  const updateSearch = e => {
    const val = e.target.value
    dispatch(searchGoals({searchVal: val}))
  }

  const debouncedOnchange = debounce(updateSearch,250)

  return (
    <header className='header'>
        {user && <Button onClick={showDrawer} style={{position:'absolute', left: '0'}}>
        <MenuOutlined />
        </Button>}
        <StyledDrawer
            title={user && (<li style={{listStyle: 'none'}}>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt/> 로그아웃
                </button>
        </li>)}
            placement='left'
            closable={false}
            onClose={onClose}
            visible={visible}
            maskStyle={{backgroundColor:'transparent'}}
            >
            <MenuItem><Link to='/'><FormOutlined />메모</Link></MenuItem>
            <MenuItem><Link to='/pinned'><PushpinOutlined />중요</Link></MenuItem>
            <MenuItem><Link to='/trash'><DeleteOutlined />휴지통</Link></MenuItem>
        </StyledDrawer>
        <Link to= '/' style={{color:'black', fontSize:'1.5rem', marginLeft: '60px'}}>KeepInMind</Link>
        {user ? <Search
            placeholder="메모 찾기.."
            allowClear
            size="large"
            style={{width:'20rem'}}
            onChange={debouncedOnchange}/> : null}
        {!user &&
        <ul>
            <li>
                <Link to='/login'style={{color:'black', fontSize:'1.2rem'}}>
                    <FaSignInAlt/> 로그인
                </Link>
            </li>
            <li>
                <Link to='/register' style={{color:'black', fontSize:'1.2rem'}}>
                    <FaUser/> 회원가입
                </Link>
            </li>
        </ul>}
    </header>
  )
}

const StyledDrawer = styled(Drawer)`
-webkit-box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24); 
box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24);
`
const MenuItem = styled.p`
font-size: 1.5rem;
border-radius: 5px;
padding: 2px;
 :hover {
    background-color:#74b9ff;
 }
cursor: pointer;
    a {
        text-decoration:none;
        color:black;
    }
`


export default Header