import {useDispatch} from 'react-redux'
import {deleteGoal, updateGoal} from '../features/goals/goalSlice'
import {Card, Modal, Tooltip,Dropdown, Menu, Space} from 'antd'
import styled from 'styled-components'
import { EditOutlined, PushpinOutlined, SettingOutlined, PushpinFilled,DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react'
import { Input } from 'antd'
import { useRef } from 'react';
const { TextArea } = Input;

function GoalItem({goal}) {
  const dispatch = useDispatch()
  const [isShown, setIsShown] = useState(false)
  const [isModalActive, setIsModalActive] = useState(false)
  const [isPinned, setIsPinned] = useState(false)
  const [titleText, setTitleText] = useState(goal.text)
  const [contentText, setContentText] = useState(goal.content)
  const textRef = useRef()
  const contentRef = useRef()

  const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: (
          <div><DeleteOutlined /> 휴지통으로 이동</div>
        ),
        danger: true
      }
    ]}
  />
)

  const onClick = () => {
    setIsModalActive(true)
  }

  const handleOk = () => {
    const text = textRef.current.input.value
    const content = contentRef.current.resizableTextArea.props.value
    dispatch(updateGoal({_id:goal._id,text,content}))
    setIsModalActive(false)
  };

  const handleCancel = () => {
    setIsModalActive(false)
  };

  const onTextChange = (e) => {
    setTitleText(e.target.value)
  }
  const onContentChange = (e) => {
    setContentText(e.target.value)
  }

  
  return (
    <>
    {!isModalActive && 
    <StyledCard hoverable title={`${goal.text}`}
      extra={<StyledButton onClick={() => dispatch(deleteGoal(goal._id))}>X</StyledButton>}
      onMouseEnter = {() => setIsShown(true)}
      onMouseLeave = {() => setIsShown(false)}
      className='goal'
      onClick={onClick}>
        <p>{goal.content}</p>
        {isShown ?  
        <Actions>
          <Tooltip placement="bottomLeft" title='내용 수정'>
            <EditOutlined style={{fontSize: '20px'}}/>
          </Tooltip>
          <Space direction="vertical" onClick={(event) => {
                event.stopPropagation()
              }}>
            <Space wrap>
              <Dropdown overlay={menu} placement="bottomLeft" trigger={['click']}>
                <SettingOutlined style={{fontSize: '20px'}}/>
              </Dropdown>
            </Space>
          </Space>
          <Tooltip placement="bottomLeft" title='고정'  onClick={(event) => {
                event.stopPropagation()
                setIsPinned(!isPinned)
              }}>
            {isPinned ? <PushpinFilled style={{fontSize: '20px'}}/> : <PushpinOutlined style={{fontSize: '20px'}}/>}
          </Tooltip>
        </Actions> : null}
    </StyledCard>}
      <Modal title={<Input style={{width:'90%'}} value={titleText} ref={textRef} onChange={onTextChange}/>} visible={isModalActive} onOk={handleOk} onCancel={handleCancel} centered={true}>
        <TextArea value={contentText} rows={5} ref={contentRef} onChange={onContentChange}/>
      </Modal>
    </>
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
border-radius: 7px;
overflow: hidden;
max-height: max-content;
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