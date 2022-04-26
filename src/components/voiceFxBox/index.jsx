import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';
import { stereoWidener, eq, distortion } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function VoiceFxBox(props) {
    return (
        <div className="voiceFx">
            <div className="width">
                <div className="settingsHdr">width</div>
                <div className="showAsRows">
                    <Setting definition={stereoWidener.settings.width} label="stereo amt" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="eq">
                <div className="settingsHdr">equalizer</div>
                <div className="showAsRows">
                    <Setting definition={eq.settings.low} label="low" css=' gc1 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={eq.settings.mid} label="mid" css=' gc2 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={eq.settings.high} label="high" css=' gc3 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="distortion">
                <div className="settingsHdr">distortion</div>
                <div className="showAsRows">
                    <Setting definition={distortion.settings.distortion} label="amount" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
        </div>
    );
}

VoiceFxBox.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
