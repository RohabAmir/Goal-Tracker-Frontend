import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { registerUser } from '../../redux/auth/authActions'
import image  from '../../assets/images/susan-wilkinson-9IAVdOvyUMU-unsplash.jpg'
import{
   PasswordHide,
   PasswordVisible
} from '../../assets/icons'

import './Registration.scss'



export const RegistrationScreen = () => {

    const[passwordHidden, setPasswordHidden] = useState({
        one: true,
        two: true
    });
    const { register, handleSubmit } = useForm();
    const { registerSuccess } = useSelector( (state)=> state.auth );

    const dispatch = useDispatch()
    const submitForm = (data) => {
        dispatch(registerUser(data))
    }

    const navigate = useNavigate();

    useEffect(() =>{
        // redirect the user to the login page if registration was successfull
        if( registerSuccess ) navigate ( '/login' )
    },[navigate, registerSuccess])
    

  return (
    <div className='registrationScreen'>
      <div className='registrationScreen__content'>
                <form onSubmit={handleSubmit(submitForm)}>
                    <h1>Get Started Now!</h1>
                    <label>
                        <span>Name</span>
                        <input 
                            type='text'  placeholder='Enter your name'
                            {...register('name')}
                            required
                        />
                    </label>
                    <label>
                        <span>Email Address</span>
                        <input 
                            type='email'  placeholder='Enter your email'
                            {...register('email')}
                            required
                        />
                    </label>
                    <label>
                        <span>
                            Password
                            <span
                                onClick={()=>{
                                    setPasswordHidden({
                                        one: !passwordHidden.one,
                                        two: passwordHidden.two
                                    })
                                }}
                            >
                                {passwordHidden.one ? <PasswordHide/> : <PasswordVisible/>}
                            </span>
                        </span>
                        <input 
                            type={passwordHidden.one ? "password" : "text"}  placeholder='Enter your password'
                            {...register('password')}
                            required 
                        />
                    </label>
                    <label style={{display: 'flex', flexDirection: 'row'}}>
                        <input type='checkbox' /> 
                        <span>I agree to the&nbsp; 
                        <span style={{textDecoration:'underline'}}>terms & policy</span>
                        </span>
                    </label>
                    <button type="submit">Signup</button>
                </form>
            </div>
            <div className='registrationScreen__imgContainer'>
                <img src={ image } alt='imageSide'/>
            </div>

    </div>
  )
}
