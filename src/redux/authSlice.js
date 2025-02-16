import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async Thunk for login
export const loginUser = createAsyncThunk("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await fetch("https://678a3b38dd587da7ac294985.mockapi.io/crud");
        const data = await response.json();

        const user = data.find((u) => u.email === email && u.password === password);
        if (!user) return rejectWithValue("Invalid email or password");

        const userData = { name: user.name, email: user.email, role: user.role };
        localStorage.setItem("user", JSON.stringify(userData));

        return userData;
    } catch {
        return rejectWithValue("Failed to connect to the server");
    }
});

// Initial state
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

// Create Slice
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user = payload;
            })
            .addCase(loginUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

// Export Actions & Reducer
export const { logout } = authSlice.actions;
export default authSlice.reducer;
