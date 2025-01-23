import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a user
export const createUser = createAsyncThunk(
  "userDetail/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch("https://678a3b38dd587da7ac294985.mockapi.io/crud", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const showUser = createAsyncThunk(
  "userDetail/showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://678a3b38dd587da7ac294985.mockapi.io/crud");

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// delete Action
export const deleteUser = createAsyncThunk(
  "userDetail/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://678a3b38dd587da7ac294985.mockapi.io/crud/${id}`,
        { method: "DELETE" }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// update Action
export const updateUser = createAsyncThunk(
  "userDetail/updateUser",
  async (data, { rejectWithValue }) => {
    // console.log("updated data",data)
    try {
      const response = await fetch(`https://678a3b38dd587da7ac294985.mockapi.io/crud/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData:[],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle createUser cases
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle showUser cases
      .addCase(showUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle delete cases
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);

      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle Update cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.map((ele) =>
          ele.id === action.payload.id ? action.payload : ele
        );
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default userDetail.reducer;
export const {searchUser} =  userDetail.actions