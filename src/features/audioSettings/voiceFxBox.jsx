import React from "react";
import Setting from './setting';

import { stereoWidener, eq, distortion } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function VoiceFxBox() {
    return (
        <>
            <div className="stereo">
                <h2>width</h2>
                <div className="settingContainer">
                    <Setting parameter={stereoWidener.settings.wet} type={stereoWidener.type} label="mix" />
                    <Setting parameter={stereoWidener.settings.width} type={stereoWidener.type} label="amt" />
                </div>
            </div>
            <div className="eq">
                <h2>equalizer</h2>
                <div className="settingContainer">
                    <Setting parameter={eq.settings.wet} type={eq.type} label="mix" />
                    <Setting parameter={eq.settings.low} type={eq.type} label="low" />
                    <Setting parameter={eq.settings.mid} type={eq.type} label="mid" />
                    <Setting parameter={eq.settings.high} type={eq.type} label="high" />
                </div>
            </div>
            <div className="distortion">
                <h2>distortion</h2>
                <div className="settingContainer">
                    <Setting parameter={distortion.settings.wet} type={distortion.type} label="mix" />
                    <Setting parameter={distortion.settings.distortion} type={distortion.type} label="amt" />
                </div>
            </div>
        </>
    );
}

export default React.memo(VoiceFxBox);
