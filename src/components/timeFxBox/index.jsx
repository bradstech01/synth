import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';
import { delay, reverb, chorus, tremolo } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function TimeFxBox(props) {
    return (
        <div className="timeFx">
            <div className="delay">
                <div className="settingsHdr">delay</div>
                <div className="showAsRows">
                    <Setting definition={delay.settings.delayTime} label="time" css='gc1 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={delay.settings.feedback} label="repeat" css='gc2e gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="reverb">
                <div className="settingsHdr">reverb</div>
                <div className="showAsRows">
                    <Setting definition={reverb.settings.wet} label="mix" css='gc1 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={reverb.settings.decay} label="decay" css='gc2 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="chorus">
                <div className="settingsHdr">chorus</div>
                <div className="showAsRows">
                    <Setting definition={chorus.settings.frequency} label="freq" css='gc1 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={chorus.settings.depth} label="depth" css='gc2 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="tremolo">
                <div className="settingsHdr">tremolo</div>
                <div className="showAsRows">
                    <Setting definition={tremolo.settings.frequency} label="freq" css='gc1 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={tremolo.settings.depth} label="depth" css='gc2 gr1' synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
        </div>
    );
}
TimeFxBox.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};