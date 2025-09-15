import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../auth/authS.js'

export const store = configureStore({
    reducer: {
        auth: authReducer
    },
})