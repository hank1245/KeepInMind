import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import GoalForm from '../components/GoalForm'
import Spinner from '../components/Spinner'
import {getGoals, reset} from '../features/goals/goalSlice'
import GoalItem  from '../components/GoalItem'

function Trash() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const {user} = useSelector((state) => state.auth)
    const { goals, isLoading, isError, message }  = useSelector((state) => state.goals)
    const filteredGoals = goals.filter(goal => goal.isTrash)
    const changedGoals = filteredGoals.map((goal) => {
        if(goal.isTrash) {
            return {...goal,isTrash: false}
        }
    })
    console.log(filteredGoals)
  
    useEffect(() => {
      if(isError) {
        console.log(message)
      }
      if(!user) {
        navigate('/login')
      }
  
      dispatch(getGoals())
  
      return () => {
        dispatch(reset())
      }
    },[user,navigate,isError,message,dispatch])
  
    if(isLoading) {
      return <Spinner/>
    }
  
    return (
     <>
      <GoalForm/>
      <section className='content'>
        {changedGoals.length > 0 ? (
          <div className='goals'>
            {changedGoals && changedGoals.map((goal) => (
              <GoalItem key ={goal._id} goal = {goal}/>
            ))}
          </div>
        ) : (<h2 style={{marginTop: '10%'}}> 생성된 메모가 없습니다 </h2>)}
      </section>
     </>
    )
  }
  
  export default Trash