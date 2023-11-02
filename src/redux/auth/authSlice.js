import { createSlice } from "@reduxjs/toolkit";
import { refreshAccessToken, registerUser, userLogin } from "./authActions";
import { getidToken,deleteJWTToken } from "../../utils/jwtToken";

const initialState = {
  loginLoading: false,
  loginSuccess: "",
  loginError: null,

  registerLoading: false,
  registerSuccess: false,
  registerError: null,

  idToken: getidToken(), //for storing the JWT and returning it after successful authentication or an error message
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogout: (state) => { //logout user state 
      state.loginSuccess = "";
      deleteJWTToken();
    },
  },
  extraReducers: {
    //register  user
    [registerUser.pending]: (state) => {
      state.registerLoading = true;
      state.registerErrror = null;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.registerLoading = false;
      state.registerSuccess = true; // registration successful
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.registerLoading = false;
      state.registerError = payload;
    },

    //login  user
    [userLogin.pending]: (state) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      // login successful
      state.loginLoading = false;
      state.loginSuccess = payload;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loginLoading = false;
      state.loginSuccess = false;
      state.loginError = payload;
    },

    // //for unauthorization status
    // [refreshAccessToken.fulfilled] : (state, {payload}) =>{
    //     state.idToken = payload; //update the idToken in the state
    //     state.loginSuccess = true; //Mark the login as successful
    //     state.loginLoading = false;
    // },
    // [refreshAccessToken.rejected] : (state, {payload}) =>{
    //      // Handle token refresh failure here if needed
    //     // You can set state properties to indicate a failed refresh and handle it accordingly
    //     state.loginSuccess = false;
    //     state.loginLoading = false;
    // }
  },
});

export const { userLogout } = authSlice.actions;
export default authSlice.reducer;
