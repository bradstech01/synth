import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function AmpEnvBox(props) {
    return (
        <div className="ampEnv">
            <div className="settingsHdr">amp env</div>
            <div className="ampSettings">
                <Setting label="attack" settingGrp="envelope" settingName="attack" min={0} max={4} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="decay" settingGrp="envelope" settingName="decay" min={0} max={4} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="sustain" settingGrp="envelope" settingName="sustain" min={0} max={1} step={.1} synthSettings={props.synthSettings} onChange={props.onChange} />
                <Setting label="release" settingGrp="envelope" settingName="release" min={0} max={11} step={.5} synthSettings={props.synthSettings} onChange={props.onChange} />
            </div>
        </div>
    );
}
