import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDefaults, getFxDefaults, getSynthDefaults, handleFxChange, handleChange } from './settingsAPI';
import * as definitions from '../../scripts/settingsDefinitions.js';

const initialState = {
    synthSettings: getSynthDefaults(),
    fxSettings: getFxDefaults()
};

const audioSettingsSlice = createSlice({
    name: "audioSettings",
    initialState,
    reducers: {
        setAudioSettings(state, action) {
            state = action.payload;
        },
        setSynthSetting: {
            prepare(parameter, val) {
                const setting = parameter.settingGrp;
                const name = parameter.settingName;
                const internalValue = parameter.valueScaler ? parameter.valueScaler(val) : val;
                handleChange(internalValue, setting, name);
                return {
                    payload: {
                        setting: setting,
                        name: name,
                        val: val
                    }
                };
            },
            reducer(state, action) {
                const setting = action.payload.setting;
                const name = action.payload.name;
                const val = action.payload.val;
                /*
                needs thunk
                localStorage.setItem('settings', JSON.stringify(newSettings));
                */
                if (!(state.synthSettings)[setting]) state.synthSettings[setting] = {};
                state.synthSettings[setting][name] = val;
            }
        },
        setFxSetting: {
            prepare(parameter, val) {
                const setting = parameter.settingGrp;
                const name = parameter.settingName;
                const internalValue = parameter.valueScaler ? parameter.valueScaler(val) : val;
                handleFxChange(internalValue, setting, name);
                return {
                    payload: {
                        setting: setting,
                        name: name,
                        val: val
                    }
                };
            },
            reducer(state, action) {
                const setting = action.payload.setting;
                const name = action.payload.name;
                const val = action.payload.val;
                /*
                needs thunk
                localStorage.setItem('settings', JSON.stringify(newSettings));
                */
                if (!(state.fxSettings)[setting]) state.fxSettings[setting] = {};
                state.fxSettings[setting][name] = val;
            }
        }
    }
});

export const { setAudioSettings, setSynthSetting, setFxSetting } = audioSettingsSlice.actions;

export default audioSettingsSlice.reducer;
