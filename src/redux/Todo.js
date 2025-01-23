import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const responce = await fetch("https://678a3b38dd587da7ac294985.mockapi.io/crud");
    return responce.json()
})

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        isLoading: false,
        data: [],
        isError: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.isLoading = true;
            })

            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })

            .addCase(fetchTodos.rejected, (state, action) => {
                console.log("error", action.payload);
                state.isError = true;
            })
    }
})

export default todoSlice.reducer