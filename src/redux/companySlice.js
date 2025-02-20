import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCompanyData = createAsyncThunk(
    "company/fetchCompanyData",
    async (_, { rejectWithValue }) => {
        try {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (!storedUser?.companyId) return rejectWithValue("No company ID found");

            const response = await fetch("https://67b44113392f4aa94faa0586.mockapi.io/Navitems");
            const data = await response.json();

            const company = data.find((c) => c.companyId === storedUser.companyId);
            if (!company) return rejectWithValue("Company not found");

            return company;
        } catch (error) {
            return rejectWithValue("Failed to fetch company data");
        }
    }
);

const initialState = {
    company: null,
    loading: false,
    error: null,
};

// Create Slice
const companySlice = createSlice({
    name: "company",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanyData.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.company = payload;
            })
            .addCase(fetchCompanyData.rejected, (state, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

// Export Reducer
export default companySlice.reducer;
