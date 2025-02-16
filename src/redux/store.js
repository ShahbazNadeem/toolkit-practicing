import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice"
import userDetailReducer from "./userDetailSlice";
import todoSliceReduser from "./Todo"
import authReducer from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        todo: todoSliceReduser,
        userDetail: userDetailReducer,
        todos: todoReducer,
    }
})