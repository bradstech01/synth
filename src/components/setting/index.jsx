import React from 'react';
import PropTypes from 'prop-types';

export function Setting(props) {
    return (
        <div className={'setting ' + props.css ? props.css : ''}>
            <label className="textCenter" >{props.label}</label>
            <div className="sliderWrapper">
                <input
                    className="innerSetting slider"
                    type="range"
                    min={props.min}
                    max={props.max}
                    value={props.synthSettings[props.settingGrp][props.settingName]}
                    step={props.step}
                    onChange={(e) => { props.onChange(e.target.value, props.settingGrp, props.settingName) }}
                />
            </div>
            <span className="textCenter">
                {props.synthSettings[props.settingGrp][props.settingName]}
            </span>
        </div>
    );
}
