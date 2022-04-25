import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';
import { envelope } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function AmpEnvBox(props) {
    return (
        <div className="ampEnv">
            <div className="settingsHdr">amp env</div>
            <div className="ampSettings">
                <Setting definition={envelope.settings.attack} label="attack" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={envelope.settings.decay} label="decay" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={envelope.settings.sustain} label="sustain" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={envelope.settings.release} label="release" synthSettings={props.synthSettings} onChange={props.onChange} />
            </div>
        </div>
    );
}
