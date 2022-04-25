import React from "react";
import PropTypes from "prop-types";

export function OscillatorBox(props) {

    const renderOscillatorTypes = (subProp, settingName, optionArray) => {
        return (
            <div className="grid">
                {optionArray.map((option) => {
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
            {renderOscillatorTypes('oscillator', 'type', [
                'sine',
                'sawtooth',
                'square',
                'triangle',
            ])}
        </div>
    )
}
