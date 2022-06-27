import React from "react";
import Setting from './setting';

import { delay, reverb, chorus, tremolo } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function TimeFxBox() {
    return (
        <>
            <div className="delay">
                <h2>delay</h2>
                <div className="showAsRows">
                    <Setting parameter={delay.settings.wet} type={delay.type} label="mix" />
                    <Setting parameter={delay.settings.delayTime} type={delay.type} label="time" />
                    <Setting parameter={delay.settings.feedback} type={delay.type} label="rpt" />
                </div>
            </div>
            <div className="reverb">
                <h2>reverb</h2>
                <div className="showAsRows">
                    <Setting parameter={reverb.settings.wet} type={reverb.type} label="mix" />
                    <Setting parameter={reverb.settings.decay} type={reverb.type} label="time" />
                </div>
            </div>
            <div className="chorus">
                <h2>chorus</h2>
                <div className="showAsRows">
                    <Setting parameter={chorus.settings.wet} type={chorus.type} label="mix" />
                    <Setting parameter={chorus.settings.frequency} type={chorus.type} label="freq" />
                    <Setting parameter={chorus.settings.depth} type={chorus.type} label="amt" />
                </div>
            </div>
            <div className="tremolo">
                <h2>tremolo</h2>
                <div className="showAsRows">
                    <Setting parameter={tremolo.settings.wet} type={tremolo.type} label="mix" />
                    <Setting parameter={tremolo.settings.frequency} type={tremolo.type} label="freq" />
                    <Setting parameter={tremolo.settings.depth} type={tremolo.type} label="amt" />
                </div>
            </div>
        </>
    );
}

export default React.memo(TimeFxBox);