import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function LpfEnvBox(props) {
    return (
        <div className="lpfEnv settingBox">
            <div className="settingsHdr">filter env</div>
            <div className="settingGrp lpfSettings">
                <Setting label="cutoff" settingGrp="filterEnvelope" settingName="baseFrequency" css="lpFreq" min={0} max={500} step={1} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="env amt" settingGrp="filterEnvelope" settingName="octaves" css="freq" min={0} max={16} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="attack" settingGrp="filterEnvelope" settingName="attack" css="lpA" min={0} max={4} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="decay" settingGrp="filterEnvelope" settingName="decay" css="lpD" min={0} max={4} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="sustain" settingGrp="filterEnvelope" settingName="sustain" css="lpS" min={0} max={1} step={.1} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="release" settingGrp="filterEnvelope" settingName="release" css="lpR" min={0} max={11} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
            </div>
        </div>
    );
}
