import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function VoiceFxBox(props) {
    return (
        <div className="voiceFx">
            <div className="width">
                <div className="settingsHdr">width</div>
                <div className="settingGrp">
                    <Setting label="stereo amt" settingGrp="stereoWidener" settingName="width" min={0} max={1} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="eq">
                <div className="settingsHdr">equalizer</div>
                <div className="settingGrp">
                    <Setting label="low" settingGrp="eq" settingName="low" css=' gc1 gr1' min={-6} max={6} step={0.25} synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting label="mid" settingGrp="eq" settingName="mid" css=' gc2 gr1' min={-6} max={6} step={0.25} synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting label="high" settingGrp="eq" settingName="high" css=' gc3 gr1' min={-6} max={6} step={0.25} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="distortion">
                <div className="settingsHdr">distortion</div>
                <div className="settingGrp">
                    <Setting label="distortion" settingGrp="distortion" settingName="amount" min={0} max={1} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
        </div>
    );
}
