import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteGoals, fetchGoals } from '../../redux/goal/goalSlice'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


import { Folder } from '../../assets/icons'
import './Goals.scss'
import { getLocalId } from '../../utils/jwtToken'
import { DeleteModal } from '../Modal/DeleteModal/DeleteModal'


export const Goals = ({id, goalName, goals, timeStamp}) => {
  
  const[ delGoalModal, setDelGoalModal ] = useState(false);


  return (
    <>
      { delGoalModal && <DeleteModal setDelModal={setDelGoalModal} id = {id}/>}
      <div className='goals'>
        <div className='goal-icon'>
            <Folder/>
        </div>
        <p className='name'>{goalName}</p>
        {/* <p className='goals'>{goals}</p> */}
        <p className='time'>{timeStamp}</p>
        <div className='icon-container'>
          <FontAwesomeIcon icon={faTrash}  style={{color:"#6161fc"}} onClick={()=> setDelGoalModal(true)}/>
        </div>

    </div>
    </>

  )
}
