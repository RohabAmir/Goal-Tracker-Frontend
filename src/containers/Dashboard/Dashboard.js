import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Moment } from 'moment'
import {  useNavigate } from 'react-router-dom'
import { Goals } from '../../components/Goals/Goals'
import api from '../../utils/api'
import { 
  FolderOpen, 
  Home, 
  Logout,
  Setting,
  List
   } from '../../assets/icons'
import { getidToken, getrefreshToken, getLocalId } from '../../utils/jwtToken'
import './Dashboard.scss'

export const Dashboard = () => {
const navigate = useNavigate()
const [goals, setGoals] = useState([]);

  useEffect(()=>{
          axios.get(
            `${api}/getGoals`,
          {
              headers:{
                    "Authorization": `Bearer ${getidToken()}`
              },
          })

            .then((response) => {
              setGoals(response.data)
              console.log("Goals fetched Successfully", response.data);
            })
            .catch((error)=>{
            console.log('error sending request', error);
            });
      },[])
      
      // console.log('goals>>>>>>>', goals);

  const formatTimestamp = (timestamp) => {
    // Use moment to format the timestamp
    return moment.unix(timestamp).fromNow();
  };
  const GoalsFetched = goals.map((goal) => {
    return(
      <Goals 
      name={goal.goalName?.name}
      // goals={goal.goalName?.goals} // currently is empty
      timeStamp={formatTimestamp(goal.goalName?.createdAt?._seconds)} 
      />
    );
}) 

const handleLogout = () =>{
  navigate('/login'); //redirecting 
  localStorage.clear(getidToken, getrefreshToken(),getLocalId); //clearing the tokens stored in local storage
}
  return (
    <div className='dashboard'>
        <div className='dashboard__leftNavigation'>
            <p className='dashboard__leftNavigation--logo'>N<span>odes</span></p>
            <div className='dashboard__leftNavigation--nav'>
                <a href='#' className='link active'>
                    <Home/>
                </a>
                <a href='#' className='link'>
                    <List/>
                </a>
                <a href='#' className='link'>
                    <FolderOpen/>
                </a>
                <a href='#' className='link'>
                    <Setting/>
                </a>
            </div>
            <div onClick={handleLogout} className='link log'>
              <Logout/>
            </div>

        </div>
        <div className='dashboard__content'>
          <div className='row'>
            <h3>Our Goals</h3>
            <a href='#' className='btn'>View All</a>
          </div>
          <div className='goal-list'>
            {GoalsFetched}
          </div>

        </div>
    </div>
  )
}