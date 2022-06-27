import {useDispatch} from 'react-redux'
import {deleteGoal} from '../features/goals/goalSlice'
import {Card} from 'antd'
import styled from 'styled-components'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useState } from 'react';

function GoalItem({goal}) {
  const dispatch = useDispatch()
  const [isShown, setIsShown] = useState(false)

  const onClick = () => {

  }
  
  return (
    <StyledCard hoverable title="제목 넣기" 
    extra={<StyledButton onClick={() => dispatch(deleteGoal(goal._id))}>X</StyledButton>}
    onMouseEnter = {() => setIsShown(true)}
    onMouseLeave = {() => setIsShown(false)}
    onClick={onClick}>
      <div>
        {new Date(goal.createdAt).toLocaleString('ko-KR')}
      </div>
      <p>{goal.text}</p>
      {isShown ?  <Actions>
        <EditOutlined style={{fontSize: '20px'}}/>
        <SettingOutlined style={{fontSize: '20px'}}/>
        <EllipsisOutlined style={{fontSize: '20px'}}/>
      </Actions> : null}
    </StyledCard>
  )
}

const StyledButton = styled.button`
position: absolute;
top: 14px;
right: 15px;
cursor: pointer;
border: none;
background: none;
`

const StyledCard = styled(Card)`
width: 300px;
padding-bottom: 30px;
background-color:#F1F3F4;
`
const Actions = styled.div`
position: absolute;
width: 100%;
left:0;
bottom:0;
height: 40px;
display: flex;
padding-top: 8px;
justify-content: space-around;
background-color: white;
`


export default GoalItem