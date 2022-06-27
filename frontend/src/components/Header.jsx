import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import styled from 'styled-components'
import {Drawer,Button, Input} from 'antd'
import { useState } from 'react'
import { MenuOutlined} from '@ant-design/icons'
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

  const onSearch = (value) => console.log(value)


  return (
    <header className='header'>
        {user && <Button onClick={showDrawer} style={{position:'absolute', left: '0'}}>
        <MenuOutlined />
        </Button>}
        <StyledDrawer
            title="메인 메뉴"
            placement='left'
            closable={false}
            onClose={onClose}
            visible={visible}
            maskStyle={{backgroundColor:'transparent'}}
            >
            <p>메모</p>
            <p>중요</p>
            <p>알람</p>
        </StyledDrawer>
        <Link to= '/' style={{color:'black', fontSize:'1.5rem', marginLeft: '60px'}}>KeepInMind</Link>
        {user ? <Search
            placeholder="찾으시는 메모의 내용을 입력하세요"
            allowClear
            enterButton="검색"
            size="large"
            style={{width:'25rem'}}
            onSearch={onSearch}/> : null}
        <ul>
            {user ? ( <li>
                    <button className='btn' onClick={onLogout}>
                        <FaSignOutAlt/> 로그아웃
                    </button>
            </li>) : (<> 
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
            </>)}
        </ul>
    </header>
  )
}

const StyledDrawer = styled(Drawer)`
-webkit-box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24); 
box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24);
`


export default Header