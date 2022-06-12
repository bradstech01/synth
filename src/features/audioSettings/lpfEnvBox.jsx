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
                <Setting parameter={filterEnvelope.settings.baseFrequency} type={filterEnvelope.type} label="cutoff" css="lpFreq" />
                <Setting parameter={filterEnvelope.settings.octaves} type={filterEnvelope.type} label="env amt" css="freq" />
                <Setting parameter={filterEnvelope.settings.attack} type={filterEnvelope.type} label="attack" css="lpA" />
                <Setting parameter={filterEnvelope.settings.decay} type={filterEnvelope.type} label="decay" css="lpD" />
                <Setting parameter={filterEnvelope.settings.sustain} type={filterEnvelope.type} label="sustain" css="lpS" />
                <Setting parameter={filterEnvelope.settings.release} type={filterEnvelope.type} label="release" css="lpR" />
            </div>
        </div>
    );
}

export default React.memo(LpfEnvBox);
