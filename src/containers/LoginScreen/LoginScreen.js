import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userLogin } from "../../redux/auth/authActions";
import image from "../../assets/images/sidepic3.jpg";
import{
  PasswordHide,
  PasswordVisible
} from '../../assets/icons'

import "./LoginScreen.scss";




export const LoginScreen = () => {

  const[passwordHidden, setPasswordHidden] = useState({
    one: true,
    two: true
});
  const { register, handleSubmit } = useForm();
  const { loginSuccess } = useSelector((state) => state.auth)

  const dispatch = useDispatch();
  const submitForm = (data) => {
    dispatch(userLogin(data));
  }

  const navigate = useNavigate();

  useEffect(() =>{
    // redirect the user to the Dashboard page if user loggedIn
    if( loginSuccess ) navigate ( '/dashboard' )
  },[navigate, loginSuccess])
  
  
  return (
    <div className="loginScreen">
      <div className="loginScreen__content">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1>Welcome to Nodes</h1>
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
          <label style={{ display: "flex", flexDirection: "row" }}>
            <input type="checkbox" />
            <span>
              I agree to the&nbsp;
              <span style={{ textDecoration: "underline" }}>
                terms & policy
              </span>
            </span>
          </label>
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="loginScreen__imgContainer">
        <img src={image} alt="imageSide" />
      </div>
    </div>
  );
};
