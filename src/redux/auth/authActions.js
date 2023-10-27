import axios from "axios";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setJWTToken } from "../../utils/jwtToken";
import { getrefreshToken } from "../../utils/jwtToken";
import api from "../../utils/api";



// Helper function to handle API errors
// const handleApiError = (err , rejectWithValue) => {
//     if (!err.response) {
//       throw err;
//     }
//     return rejectWithValue(err.response.data);
// };


export const registerUser = createAsyncThunk(
    'auth/signup',
    async ({ name, email, password} , { rejectWithValue }) =>{
        try {
            const reponse =  await axios.post( // making a POST request to the register route using Axios
                `${api}/register`,
                { name, email, password }, // values from the registration form
                );
            return reponse.data;
        }catch (err) {
            // console.log("err in thunk",err)
            // return custom error message from backend if present
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data);
            }
          }
    }
);

export const userLogin = createAsyncThunk(
    'auth/login',
    async ({  email, password} , { rejectWithValue }) =>{
        try {
            const response = await axios.post( // making a POST request to the login  route using Axios
                `${api}/login`,
                {  email, password }, // values from the Login form
                );
            // Store the tokens in local storage
              const { idToken, refreshToken, localId } = response.data;
            // Using the token to set in local storage
            setJWTToken(idToken, refreshToken, localId);
            return response.data;
        } catch (err) {
            // if(err.response && err.response.data === 401){
            //     // if the login request returns a 401 Unauthorized status, it likely means the idToken has expired
            //     // Attemp to refresh the token
            // const dispatch = useDispatch();

            // const refreshToken = getrefreshToken(); //getting the refreshToken from local storage
            // if(refreshToken){
            //     return new Promise( async( resolve, reject) => {
            //         try{
            //             const refreshedToken = await dispatch(refreshAccessToken(refreshToken));
            //             resolve(refreshedToken);
            //         }catch(refreshError){
            //             reject(refreshError);
            //         }
            //     });
            // }
            // } 
            // return custom error message from backend if present
            console.log("err in thunk",err)
            if(err.response && err.response.data){
                return rejectWithValue(err.response.data);
            }
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshToken',
    async(refreshToken,{rejectWithValue}) => {
        try {
            const response = await axios.post(
                `${api}/refreshToken`,
                { refreshToken } // Send the refreshToken to the server to get a new idToken

            );

            //update the idToken and refreshToken in local storage
            const { idToken, refreshToken: newRefreshToken } = response.data;     
            setJWTToken(idToken, newRefreshToken);
            
            return idToken;
        }catch(err){
            return handleApiError(err, rejectWithValue);
        }
    }
);