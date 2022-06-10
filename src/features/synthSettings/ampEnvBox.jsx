import React from "react";
import PropTypes from "prop-types";
import Setting from './setting';
import { envelope } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function AmpEnvBox(props) {
    return (
        <div className="ampEnv">
            <h2>amp env</h2>
            <div className="settingContainer">
                <Setting definition={envelope.settings.attack} type={envelope.type} label="attack" settings={props.settings} onChange={props.onChange} />
                <Setting definition={envelope.settings.decay} type={envelope.type} label="decay" settings={props.settings} onChange={props.onChange} />
                <Setting definition={envelope.settings.sustain} type={envelope.type} label="sustain" settings={props.settings} onChange={props.onChange} />
                <Setting definition={envelope.settings.release} type={envelope.type} label="release" settings={props.settings} onChange={props.onChange} />
            </div>
        </div>
    );
}

AmpEnvBox.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(AmpEnvBox);