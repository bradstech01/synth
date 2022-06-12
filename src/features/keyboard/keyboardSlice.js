import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentlyPlaying: [],
    isAnyMusicKeyDown: false,
    octaveShift: 0,
};

const keyboardSlice = createSlice({
    name: "keyboard",
    initialState,
    reducers: {
        addToCurrentlyPlaying(state, action) {
            const { note, velocity, source } = action.payload;
            const noteInList = state.currentlyPlaying.find(noteVelocityPair => noteVelocityPair.note === note);
            if (!noteInList) state.currentlyPlaying.push({ note: note, velocity: velocity });
            if (source === 'keyboard') state.isAnyMusicKeyDown = true;
        },
        removeFromCurrentlyPlaying(state, action) {
            const { note, source } = action.payload;
            const noteInList = state.currentlyPlaying.find(noteVelocityPair => noteVelocityPair.note === note);
            if (noteInList) state.currentlyPlaying = state.currentlyPlaying.filter((noteVelocityPair) => noteVelocityPair.note !== note);
            if (source === 'keyboard' && state.currentlyPlaying.length === 0) state.isAnyMusicKeyDown = false;
        },
        setMouseFlag(state, action) {
            if (!state.isAnyMusicKeyDown && action.payload === 'down') state.isMouseActive = true;
            else if (!state.isAnyMusicKeyDown && action.payload === 'up') state.isMouseActive = false;
        },
        modifyOctaveShift(state, action) { state.octaveShift += action.payload; }
    }
});

export const { addToCurrentlyPlaying, removeFromCurrentlyPlaying, setMouseFlag } = keyboardSlice.actions;

export default keyboardSlice.reducer;
