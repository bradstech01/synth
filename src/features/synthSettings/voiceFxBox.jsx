import React from "react";
import PropTypes from "prop-types";
import Setting from './setting';

import { stereoWidener, eq, distortion } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function VoiceFxBox(props) {
    return (
        <>
            <div className="stereo">
                <h2>width</h2>
                <div className="settingContainer">
                    <Setting definition={stereoWidener.settings.width} type={stereoWidener.type} label="amt" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
            <div className="eq">
                <h2>equalizer</h2>
                <div className="settingContainer">
                    <Setting definition={eq.settings.low} type={eq.type} label="low" settings={props.settings} onChange={props.onChange} />
                    <Setting definition={eq.settings.mid} type={eq.type} label="mid" settings={props.settings} onChange={props.onChange} />
                    <Setting definition={eq.settings.high} type={eq.type} label="high" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
            <div className="distortion">
                <h2>distortion</h2>
                <div className="settingContainer">
                    <Setting definition={distortion.settings.distortion} type={distortion.type} label="amt" settings={props.settings} onChange={props.onChange} />
                </div>
            </div>
        </>
    );
}

VoiceFxBox.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(VoiceFxBox);
