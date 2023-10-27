import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import ErrorMesssage from "../../components/ErrorMesssage/ErrorMesssage";
import { registerUser } from "../../redux/auth/authActions";

import { PasswordHide, PasswordVisible } from "../../assets/icons";

import "./Registration.scss";

export const RegistrationScreen = () => {
  const [passwordHidden, setPasswordHidden] = useState({
    one: true,
    two: true,
  });
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [showCheckboxError, setShowCheckboxError] = useState(false);

  const { register, handleSubmit } = useForm();
  const { registerSuccess, registerError } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = (data) => {
    if (isCheckboxChecked) {
      setShowCheckboxError(false); // Reset the error state
      dispatch(registerUser(data));
    } else {
      setShowCheckboxError(true); // Show the error message
    }
  };

  useEffect(() => {
    console.log("error on register", registerError);
  }, [registerError]);

  useEffect(() => {
    // redirect the user to the login page if registration was successfull
    if (registerSuccess) navigate("/login");
  }, [navigate, registerSuccess]);

  const handleCheckboxChange = (event) => {
    //handle checkbox change
    setIsCheckboxChecked(event.target.checked);
    setShowCheckboxError(false); // Hide the error message when the user interacts with the checkbox
  };

  return (
    <div className="registrationScreen">
      <div className="registrationScreen__content">
        <form onSubmit={handleSubmit(submitForm)}>
          <h1>Create an account</h1>
          <label>
            <span>Name</span>
            <input
              type="text"
              placeholder="Enter your name"
              {...register("name")}
              required
            />
          </label>
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
                onClick={() => {
                  setPasswordHidden({
                    one: !passwordHidden.one,
                    two: passwordHidden.two,
                  });
                }}
              >
                {passwordHidden.one ? <PasswordHide /> : <PasswordVisible />}
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
            <input
              className="checkbox"
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
            />
            <span>
              I agree to the&nbsp;
              <span style={{ textDecoration: "underline" }}>
                terms & policy
              </span>
            </span>
          </label>
          {showCheckboxError && (
            <ErrorMesssage message=" Please check the terms and conditions form" />
          )}
          {registerError && <ErrorMesssage message={registerError} />}
          <button type="submit">Create an account</button>
          <div className="register">
            <span className="text">Already have an account?&nbsp; </span>
            <Link
              to="/login"
              style={{
                color: "#6161fc",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
