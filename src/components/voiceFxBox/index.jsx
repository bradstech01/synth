import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';
import { stereoWidener, eq, distortion } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function VoiceFxBox(props) {
    return (
        <React.Fragment>
            <div className="stereo">
                <h2>width</h2>
                <div className="settingContainer">
                    <Setting definition={stereoWidener.settings.width} label="amt" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="eq">
                <h2>equalizer</h2>
                <div className="settingContainer">
                    <Setting definition={eq.settings.low} label="low" synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={eq.settings.mid} label="mid" synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={eq.settings.high} label="high" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="distortion">
                <h2>distortion</h2>
                <div className="settingContainer">
                    <Setting definition={distortion.settings.distortion} label="amt" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
        </React.Fragment>
    );
}

VoiceFxBox.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
