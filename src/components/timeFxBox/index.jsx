import React from "react";
import PropTypes from "prop-types";
import { Setting } from '../setting';

//lpf = low pass filter
//box that contains settings for low pass filter & ADSR envelope

export function TimeFxBox(props) {
    return (
        <div className="timeFx">
            <div className="delay">
                <div className="settingsHdr">delay</div>
                <div className="settingGrp">
                    <Setting label="time" settingGrp="delay" settingName="delayTime" css='gc1 gr1' min={0} max={1} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting label="repeat" settingGrp="delay" settingName="feedback" css='gc2e gr1' min={0} max={1} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="reverb">
                <div className="settingsHdr">reverb</div>
                <div className="settingGrp">
                    <Setting label="mix" settingGrp="reverb" settingName="wet" css='gc1 gr1' min={0} max={1} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting label="decay" settingGrp="reverb" settingName="decay" css='gc2 gr1' min={0} max={10} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="chorus">
                <div className="settingsHdr">chorus</div>
                <div className="settingGrp">
                    <Setting label="freq" settingGrp="chorus" settingName="frequency" css='gc1 gr1' min={0} max={10} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting label="depth" settingGrp="chorus" settingName="depth" css='gc2 gr1' min={0} max={10} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
            <div className="tremolo">
                <div className="settingsHdr">tremolo</div>
                <div className="settingGrp">
                    <Setting label="freq" settingGrp="tremolo" settingName="frequency" css='gc1 gr1' min={0} max={10} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                    <Setting label="depth" settingGrp="tremolo" settingName="depth" css='gc2 gr1' min={0} max={10} step={0.01} synthSettings={props.synthSettings} onChange={props.onChange} />
                </div>
            </div>
        </div>
    );
}