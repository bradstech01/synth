import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import sequencerReducer from "../features/sequencer/sequencerSlice";
import synthSettingsReducer from "../features/synthSettings/synthSettingsSlice";
import keyboardReducer from '../features/keyboard/keyboardSlice';
import visualizerReducer from '../features/visualizer/visualizerSlice';

export default configureStore({
    reducer: {
        app: appReducer,
        sequencer: sequencerReducer,
        synthSettings: synthSettingsReducer,
        keyboard: keyboardReducer,
        visualizer: visualizerReducer
    }
});
