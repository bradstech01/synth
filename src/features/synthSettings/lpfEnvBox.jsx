import React from "react";
import PropTypes from "prop-types";
import Setting from './setting';

import { filterEnvelope } from '../../scripts/settingsDefinitions.js';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

function LpfEnvBox(props) {
    return (
        <div className="lpfEnv">
            <h2>filter env</h2>
            <div className="settingContainer">
                <Setting definition={filterEnvelope.settings.baseFrequency} type={filterEnvelope.type} label="cutoff" css="lpFreq" settings={props.settings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.octaves} type={filterEnvelope.type} label="env amt" css="freq" settings={props.settings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.attack} type={filterEnvelope.type} label="attack" css="lpA" settings={props.settings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.decay} type={filterEnvelope.type} label="decay" css="lpD" settings={props.settings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.sustain} type={filterEnvelope.type} label="sustain" css="lpS" settings={props.settings} onChange={props.onChange} />
                <Setting definition={filterEnvelope.settings.release} type={filterEnvelope.type} label="release" css="lpR" settings={props.settings} onChange={props.onChange} />
            </div>
        </div>
    );
}

LpfEnvBox.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(LpfEnvBox);
