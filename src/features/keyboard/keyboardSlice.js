import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { startSequence } from '../sequencer/sequencerAPI';

const initialState = {
    currentlyPlaying: []
};

const keyboardSlice = createSlice({
    name: "keyboard",
    initialState,
    reducers: {
        addToCurrentlyPlaying(state, action) {
            const { note, velocity } = action.payload;
            const noteInList = state.currentlyPlaying.find(noteVelocityPair => noteVelocityPair.note === note);
            if (!noteInList) state.currentlyPlaying.push({ note: note, velocity: velocity });
        },
        removeFromCurrentlyPlaying(state, action) {
            const note = action.payload;
            const noteInList = state.currentlyPlaying.find(noteVelocityPair => noteVelocityPair.note === note);
            if (noteInList) state.currentlyPlaying = state.currentlyPlaying.filter((noteVelocityPair) => noteVelocityPair.note !== note);
        }
    }
});

export const { addToCurrentlyPlaying, removeFromCurrentlyPlaying } = keyboardSlice.actions;

export default keyboardSlice.reducer;
