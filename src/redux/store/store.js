import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../auth/authSlice'
import goalsReducer from '../goal/goalSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalsReducer
    }
})
export default store;
