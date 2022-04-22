import React from "react";
import PropTypes from "prop-types";

export function OscillatorBox(props) {

    const renderSelectSetting = (subProp, settingName, optionAry) => {
        return (
            <div className="oscillatorSelect grid">
                {optionAry.map((option) => {
                    return (
                        <div key={option} className={'osc' + option}>
                            <label className='radioContainer'>
                                <input
                                    key={option}
                                    type="radio"
                                    name={settingName}
                                    section={subProp}
                                    value={option}
                                    checked={
                                        props.synthSettings[subProp][settingName] === option
                                    }
                                    onChange={(e) => { props.onChange(e.target.value, subProp, settingName) }}
                                />
                                <span>{option}</span>
                            </label>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="oscillatorSelection">
            <div className="settingsHdr">oscillator</div>
            <div className="settingGrp">
                {renderSelectSetting('oscillator', 'type', [
                    'sine',
                    'sawtooth',
                    'square',
                    'triangle',
                ])}
            </div>
        </div>
    )
}
