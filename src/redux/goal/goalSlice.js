import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getidToken, getrefreshToken } from "../../utils/jwtToken";
import api from "../../utils/api";

const initialState = {
    goalsLoading: false,
    goals: [],
    goalsError: null,

    createGoalsSuccess: false,
    createGoalsLoading: false,
    createGoalsError: null,

    deleteGoalsSuccess: false,
    deleteGoalsLoading: false,
    deleteGoalsError: null,
    
};

// export const fetchGoals = createAsyncThunk( // Code without the refreshToken 
//     'goals/fetchGoals',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axios.get(`${api}/getGoals`, {
//                 headers: {
//                     Authorization: `Bearer ${getidToken()}`,
//                 },
//             });
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

export const fetchGoals = createAsyncThunk(
    'goals/fetchGoals',
    async (_, { rejectWithValue, dispatch }) => {
        try {
            let idToken = localStorage.getItem('idToken'); // Get the idToken from localStorage
            const response = await axios.get(`${api}/getGoals`, {
                headers: {
                    Authorization: `Bearer ${idToken}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                // Token is expired, try refreshing it
                try {
                    await dispatch(refreshToken()); // Refresh the token
                    let newIdToken = localStorage.getItem('idToken'); // Get the new idToken
                    const response = await axios.get(`${api}/getGoals`, { // Retry the request with the new token
                        headers: {
                            Authorization: `Bearer ${newIdToken}`,
                        },
                    });
                    return response.data;
                } catch (refreshError) {
                    return rejectWithValue(refreshError.response?.data || refreshError.message);
                }
            } else {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    }
);


export const createGoals = createAsyncThunk(
    'goals/createGoals',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${api}/createGoal`,
                data, // values from the createGoal form
             {
                headers: {
                    Authorization: `Bearer ${getidToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                // Token is expired, try refreshing it
                try {
                    await dispatch(refreshToken()); // Refresh the token
                    let newIdToken = localStorage.getItem('idToken'); // Get the new idToken
                    const response = await axios.get(`${api}/createGoals`, { // Retry the request with the new token
                        headers: {
                            Authorization: `Bearer ${newIdToken}`,
                        },
                    });
                    return response.data;
                } catch (refreshError) {
                    return rejectWithValue(refreshError.response?.data || refreshError.message);
                }
            } else {
                return rejectWithValue(error.response?.data || error.message);
            }
        }
    }
);

export const deleteGoals = createAsyncThunk(
    'goals/deleteGoals',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${api}/deleteGoal`,
                data, 
             {
                headers: {
                    Authorization: `Bearer ${getidToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                // Token is expired, try refreshing it
                try {
                    await dispatch(refreshToken()); // Refresh the token
                    let newIdToken = localStorage.getItem('idToken'); // Get the new idToken
                    const response = await axios.get(`${api}/deleteGoals`, { // Retry the request with the new token
                        headers: {
                            Authorization: `Bearer ${newIdToken}`,
                        },
                    });
                    return response.data;
                } catch (refreshError) {
                    return rejectWithValue(refreshError.response?.data || refreshError.message);
                }
            } else {
                return rejectWithValue(error.response?.data || error.message);
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

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`${api}/refreshToken`, { refreshtoken: refreshToken });

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








const goalSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {},
    extraReducers: {
        //fetch goals
        [fetchGoals.pending]: (state) => {
            state.goalsLoading = true;
            state.goalsError = null;
        },
        [fetchGoals.fulfilled]: (state, { payload }) => { //goals fetched successfully
            state.goalsLoading = false;
            state.goals = payload;
        },
        [fetchGoals.rejected]: (state, { payload }) => {
            state.goalsLoading = false;
            state.goalsError = payload;
        },

         //create Goals
         [createGoals.pending]: (state) => {
            state.createGoalsLoading= true
            state.createGoalsError = null
        },
        [createGoals.fulfilled]: (state , { payload }) => { // goals created successfully
            state.createGoalsLoading= false
            state.createGoalsSuccess= payload
        },
        [createGoals.rejected]: (state, { payload }) => {
            state.createGoalsLoading= false
            state.createGoalsSuccess = false
            state.createGoalsError= payload
        },

         //delete Goals
        [deleteGoals.pending]: (state) => {
            state.deleteGoalsLoading= true
            state.deleteGoalsError = null
        },
        [deleteGoals.fulfilled]: (state , { payload }) => { // goals deleted successfully
            state.deleteGoalsLoading= false
            state.deleteGoalsSuccess= payload
        },
        [deleteGoals.rejected]: (state, { payload }) => {
            state.deleteGoalsLoading= false
            state.deleteGoalsSuccess = false
            state.deleteGoalsError= payload
        },
    },
});

export default goalSlice.reducer;
