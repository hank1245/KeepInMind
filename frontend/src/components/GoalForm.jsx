import { useRef } from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux'
import styled from 'styled-components'
import {createGoal} from '../features/goals/goalSlice'
import {Button, Input} from 'antd'
const {TextArea} = Input

function GoalForm() {
  const [text,setText] = useState('')
  const [content, setContent] = useState('')  
  const [isSelected, setIsSelected] = useState(false)
  const dispatch = useDispatch()

  const onSubmit = e => {
      e.preventDefault()
      dispatch(createGoal({text,content}))
      setText('')
  }

  const onClick = (e) => {
    setIsSelected(true)
  }
  const onClose = () => {
    setIsSelected(false)
  }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                {isSelected ? 
               (<StyledDiv>
                <input style={{border:'none', outline:'none', fontSize:'1.2rem'}} type='text' placeholder='제목' value={text} onChange={(e) => setText(e.target.value)}/>
                <div style={{paddingRight:'10px'}}>
                    <StyledTextArea placeholder='메모 작성..' value={content} 
                    onChange={(e) => setContent(e.target.value)}
                    autoSize={{ minRows: 3, maxRows: 5 }}/>
                </div>
                <CloseButton onClick={onClose}>닫기</CloseButton>
               </StyledDiv>)
                :
                (<StyledInput type="text" name='text' id='text'
                   placeholder='메모 작성하기...' onClick={onClick}/>)
                    }
            </div>
            <div className="form-group">
                <button className='btn btn-block' type='submit'>
                    메모 저장하기
                </button>
            </div>
        </form>
    </section>
  )
}

const StyledInput = styled.input`
-webkit-box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24); 
box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24);
`

const StyledDiv = styled.div`
-webkit-box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24); 
box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.24);
border-radius: 10px;
padding-left: 8px;
position: relative;
`

const CloseButton = styled.div`
position: absolute; 
top:65%; 
right:1.3rem;
width: 70px;
height: 35px;
border-radius: 5px;
line-height:2.2;
border: none; 
backgroundColor: transparent;
    :hover {
        background-color: #F1F3F4
    }
cursor:pointer;
`

const StyledTextArea = styled(TextArea)`
-webkit-box-shadow: none;
-moz-box-shadow: none;
box-shadow: none;
border:none;
outline:none;
`

export default GoalForm