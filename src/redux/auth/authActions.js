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
    async ({  email, password} , { rejectWithValue, dispatch }) =>{
        try {
            const response = await axios.post( 
                `${api}/login`,
                {  email, password }, // values from the Login form
                );
            // Store the tokens in local storage
              const { idToken, refreshToken, localId } = response.data;
            // Using the token to set in local storage
            setJWTToken(idToken, refreshToken, localId);
            return response.data;
        } catch (err) {
            if (err.response?.status === 401) {
                // Token is expired, try refreshing it
                try {
                    await dispatch(refreshToken()); // Refresh the token
                    let newIdToken = localStorage.getItem('idToken'); // Get the new idToken
                    const response = await axios.post(`${api}/login`, { // Retry the request with the new token
                        headers: {
                            Authorization: `Bearer ${newIdToken}`,
                        },
                    });
                    return response.data;
                } catch (refreshError) {
                    return rejectWithValue(refreshError.response?.data || refreshError.message);
                }
                // Regular API error response
            } else if(err.response && err.response.data){
                return rejectWithValue(err.response.data);
            }
        }
    }
);



// This function should be called right after you receive the new token
const updateToken = (newIdToken, newRefreshToken) => {
    localStorage.setItem('idToken', newIdToken);
    if (newRefreshToken) {
        localStorage.setItem('refreshToken', newRefreshToken);
    }
};

export const refreshToken = createAsyncThunk(
    'auth/refreshToken', 
    async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(
        `${api}/refreshToken`, 
        { refreshtoken: refreshToken }
    );

    // Check if the response is successful and contains the userToken object
    if (response.status === 200 && response.data && response.data.userToken) {
        const { access_token, refresh_token } = response.data.userToken;

        // Update the tokens in localStorage
        updateToken(access_token, refresh_token);
    
        return { access_token, refresh_token };
    } else {
        throw new Error('Failed to refresh token');
    }
});