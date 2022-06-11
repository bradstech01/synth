import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as Tone from 'tone';

const initialState = {
    hasToneStarted: false,
    bpm: 120,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        startedTone(state, action) { state.hasToneStarted = true; },
        setBpm(state, action) {
            state.bpm = action.payload;
            Tone.Transport.bpm.value = action.payload;
        },
    }
});

export const { startedTone, setBpm } = appSlice.actions;

export default appSlice.reducer;
