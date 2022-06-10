import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    hasToneStarted: false
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        startedTone(state, action) {
            state.hasToneStarted = true;
        }
    }
});

export const { startedTone } = appSlice.actions;

export default appSlice.reducer;
