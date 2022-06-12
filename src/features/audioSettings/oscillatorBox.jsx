import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { oscillator } from '../../scripts/settingsDefinitions.js';
import { useSelector, useDispatch } from 'react-redux';
import { usePrevious } from '../../scripts/hooks.js';
import { setSynthSetting } from './audioSettingsSlice';

function OscillatorBox(props) {
    const dispatch = useDispatch();
    const type = oscillator.type;
    const settings = useSelector(state => state.audioSettings.synthSettings);


    let parameter = oscillator.settings.waveshape;
    let val = settings[parameter.settingGrp][parameter.settingName];
    const prevVal = usePrevious(val);

    useEffect(() => {
        if (prevVal && val !== prevVal) {
            dispatch(setSynthSetting(parameter, val));
        }
    }, [parameter, val]);

    const renderOscillatorTypes = (setting, name, optionArray) => {
        return (
            <div className="oscButtons">
                {optionArray.map((option) => {
                    return (
                        <div key={option} className={'osc ' + option}>
                            <label className='radioContainer'>
                                <input
                                    key={option}
                                    type="radio"
                                    name={name}
                                    section={setting}
                                    value={option}
                                    checked={settings[setting][name] === option}
                                    onChange={(e) => { dispatch(setSynthSetting(parameter, e.target.value)); }}
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

export default React.memo(OscillatorBox);
