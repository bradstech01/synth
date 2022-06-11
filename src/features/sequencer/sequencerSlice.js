import { createSlice } from "@reduxjs/toolkit";
import { setStepsInternal, setBeatInternal, getSteps, setSingleStepInternal } from './sequencerAPI';

const initialState = {
    isRecording: false,
    isStarted: false,
    beat: 0,
    steps: getSteps()
};

const sequencerSlice = createSlice({
    name: "sequencer",
    initialState,
    reducers: {
        updateRecFlag(state, action) { state.isRecording = action.payload; },
        updateStartFlag(state, action) { state.isStarted = action.payload; },
        updateSequencerSteps(state, action) {
            setStepsInternal(action.payload);
            state.steps = action.payload;
        },
        updateSingleStep(state, action) {
            const { beat, note } = action.payload;
            setSingleStepInternal(action.payload);
            state.steps[beat] = action.payload;
        },
        updateSequencerBeat(state, action) {
            setBeatInternal(action.payload);
            state.beat = action.payload;
        }
    }
});

export const { updateRecFlag, updateStartFlag, updateSequencerSteps, updateSingleStep, updateSequencerBeat } = sequencerSlice.actions;

export default sequencerSlice.reducer;