import React from 'react'


import { Folder } from '../../assets/icons'
import './Goals.scss'

export const Goals = ({name, goals, timeStamp}) => {
  return (
    <div className='goals'>
        <div className='goal-icon'>
            <Folder/>
        </div>
        <p className='name'>{name}</p>
        <p className='goals'>{goals}</p>
        <p className='time'>{timeStamp}</p>
    </div>
  )
}
