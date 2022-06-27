import React from "react";
import Setting from './setting';
import { envelope } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function AmpEnvBox() {
    return (
        <div className="ampEnv">
            <h2>amp env</h2>
            <div className="settingContainer">
                <Setting parameter={envelope.settings.attack} type={envelope.type} label="attack" />
                <Setting parameter={envelope.settings.decay} type={envelope.type} label="decay" />
                <Setting parameter={envelope.settings.sustain} type={envelope.type} label="sustain" />
                <Setting parameter={envelope.settings.release} type={envelope.type} label="release" />
            </div>
        </div>
    );
}

export default React.memo(AmpEnvBox);