import React from "react";
import PropTypes from "prop-types";
import Setting from '../setting';
import { envelope } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function AmpEnvBox(props) {
    return (
        <div className="ampEnv">
            <h2>amp env</h2>
            <div className="settingContainer">
                <Setting definition={envelope.settings.attack} label="attack" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={envelope.settings.decay} label="decay" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={envelope.settings.sustain} label="sustain" synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting definition={envelope.settings.release} label="release" synthSettings={props.synthSettings} onChange={props.onChange} />
            </div>
        </div>
    );
}

AmpEnvBox.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(AmpEnvBox);