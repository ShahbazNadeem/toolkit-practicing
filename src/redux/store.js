import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice"
import userDetailReducer from "./userDetailSlice";
import todoSliceReduser from "./Todo"

export const store = configureStore({
    reducer: {
        todo: todoSliceReduser,
        userDetail: userDetailReducer,
        todos: todoReducer,
    }
})