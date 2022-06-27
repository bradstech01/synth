import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    particlesOn: true,
};

const systemSettingsSlice = createSlice({
    name: "systemSettings",
    initialState,
    reducers: {
        toggleParticles(state) {
            state.particlesOn = !state.particlesOn;
        }
    }
});

export const { toggleParticles } = systemSettingsSlice.actions;

export default systemSettingsSlice.reducer;
