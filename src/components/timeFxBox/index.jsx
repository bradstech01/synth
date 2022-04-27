import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';
import { delay, reverb, chorus, tremolo } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function TimeFxBox(props) {
    return (
        <React.Fragment>
            <div className="delay">
                <h2>delay</h2>
                <div className="showAsRows">
                    <Setting definition={delay.settings.delayTime} label="time" synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={delay.settings.feedback} label="rpt" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="reverb">
                <h2>reverb</h2>
                <div className="showAsRows">
                    <Setting definition={reverb.settings.decay} label="time" synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={reverb.settings.wet} label="mix" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="chorus">
                <h2>chorus</h2>
                <div className="showAsRows">
                    <Setting definition={chorus.settings.frequency} label="freq" synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={chorus.settings.depth} label="amt" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="tremolo">
                <h2>tremolo</h2>
                <div className="showAsRows">
                    <Setting definition={tremolo.settings.frequency} label="freq" synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting definition={tremolo.settings.depth} label="amt" synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
        </React.Fragment>
    );
}
TimeFxBox.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};