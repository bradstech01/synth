import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { oscillator } from '../../scripts/settingsDefinitions.js';


function OscillatorBox(props) {
    let type = oscillator.type;
    let settings = props.settings.synthSettings;
    let definition = oscillator.settings.waveshape;
    let val = settings[definition.settingGrp][definition.settingName];
    let onChange = props.onChange;

    useEffect(() => {
        onChange({ ...props.settings }, val, definition.valueScaler ? definition.valueScaler(val) : val, definition, type);
    }, [val, definition, props.onChange, settings, onChange, props.settings, type]);

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
                                        props.settings.synthSettings[subProp][settingName] === option
                                    }
                                    onChange={(e) => { props.onChange({ ...props.settings }, e.target.value, e.target.value, oscillator.settings.waveshape, oscillator.type); }}
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

OscillatorBox.propTypes = {
    settings: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(OscillatorBox);
