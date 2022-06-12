import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import sequencerReducer from "../features/sequencer/sequencerSlice";
import audioSettingsReducer from "../features/audioSettings/audioSettingsSlice";
import keyboardReducer from '../features/keyboard/keyboardSlice';
import visualizerReducer from '../features/visualizer/visualizerSlice';

export default configureStore({
    reducer: {
        app: appReducer,
        sequencer: sequencerReducer,
        audioSettings: audioSettingsReducer,
        keyboard: keyboardReducer,
        visualizer: visualizerReducer
    }
});
