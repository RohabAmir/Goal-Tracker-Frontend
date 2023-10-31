import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getidToken } from "../../utils/jwtToken";
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

export const fetchGoals = createAsyncThunk(
    'goals/fetchGoals',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${api}/getGoals`, {
                headers: {
                    Authorization: `Bearer ${getidToken()}`,
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
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
            return rejectWithValue(error.response?.data || error.message);
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
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

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
