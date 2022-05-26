import React from "react";
import PropTypes from "prop-types";
import { oscillator } from '../../scripts/settingsDefinitions.js';


export function OscillatorBoxInner(props) {
    const renderOscillatorTypes = (subProp, settingName, optionArray) => {
        return (
            <div className="oscButtons">
                {optionArray.map((option) => {
                    return (
                        <div key={option} className={'osc ' + option}>
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
                                    onChange={(e) => { props.onChange(e.target.value, e.target.value, oscillator.settings.waveshape.settingGrp, oscillator.settings.waveshape.settingName); }}
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
            <h1>oscillator</h1>
            {renderOscillatorTypes('oscillator', 'type', [
                'sine',
                'sawtooth',
                'square',
                'triangle',
            ])}
        </div>
    );
}

OscillatorBoxInner.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export const OscillatorBox = React.memo(OscillatorBoxInner);
