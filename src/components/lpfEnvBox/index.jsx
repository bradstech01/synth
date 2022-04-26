import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';
import { filterEnvelope } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function LpfEnvBox(props) {
    return (
        <div className="lpfEnv">
            <h1>filter env</h1>
            <div className="lpfSettings">
                <Setting definition={filterEnvelope.settings.cutoff} label="cutoff" css="lpFreq" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.octaves} label="env amt" css="freq" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.attack} label="attack" css="lpA" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.decay} label="decay" css="lpD" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.sustain} label="sustain" css="lpS" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.release} label="release" css="lpR" synthSettings={props.synthSettings} onChange={props.onChange} />
            </div>
        </div>
    );
}

LpfEnvBox.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};
