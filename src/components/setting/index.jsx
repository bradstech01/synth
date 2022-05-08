import React from 'react';
import PropTypes from 'prop-types';

export function Setting(props) {
    return (
        <div className={'setting ' + (props.css ? props.css : '')}>
            <label className="settingLbl textCenter" >{props.label}</label>
            <div className="sliderWrapper">
                <input
                    className="innerSetting slider"
                    type="range"
                    min={props.definition.min}
                    max={props.definition.max}
                    value={props.synthSettings[props.definition.settingGrp][props.definition.settingName]}
                    step={props.definition.step}
                    onChange={(e) => {
                        props.onChange(e.target.value, props.definition.valueScaler ? props.definition.valueScaler(e.target.value) : e.target.value, props.definition.settingGrp, props.definition.settingName);
                    }
                    }
                />
            </div>
            <span className="textCenter">
                {props.synthSettings[props.definition.settingGrp][props.definition.settingName]}
            </span>
        </div>
    );
}
Setting.propTypes = {
    definition: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};