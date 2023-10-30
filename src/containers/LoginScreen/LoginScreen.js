import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import ErrorMesssage from "../../components/ErrorMesssage/ErrorMesssage";
import { userLogin } from "../../redux/auth/authActions";
import{
  PasswordHide,
  PasswordVisible
} from '../../assets/icons'

import "./LoginScreen.scss";




export const LoginScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[passwordHidden, setPasswordHidden] = useState({
    one: true,
    two: true
});
  const { register, handleSubmit } = useForm();
  const { loginSuccess, loginError } = useSelector((state) => state.auth)

 
  const submitForm = (data) => { 
    dispatch(userLogin(data))
    // .then(()=> {
    //   navigate('/dashboard');
    // }).catch((err) => {
    //   console.log(err);
    // })
  }



  useEffect(() =>{
    // redirect the user to the Dashboard page if user loggedIn
    if( loginSuccess ) navigate ( '/dashboard' )
  },[navigate, loginSuccess])
  
  
  return (
    <div className="loginScreen">
      <div className="loginScreen__content">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1>Login</h1>
          <label>
            <span>Email Address</span>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
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
              type={passwordHidden.one ? "password" : "text"}
              placeholder="Enter your password"
              {...register("password")}
              required
            />
          </label>
          {loginError && <ErrorMesssage message={loginError} />}
          <button type="submit">Login</button>
          <div className="register">
            <span className="text">Not have an account?&nbsp; </span>
            <Link to="/signup" style={{ color: "#6161fc", textDecoration: "underline", cursor: 'pointer' }}>
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
