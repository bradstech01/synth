import React, { useEffect } from "react";
import { oscillator } from '../../scripts/settingsDefinitions.js';
import { useSelector, useDispatch } from 'react-redux';
import { usePrevious } from '../../scripts/hooks.js';
import { setSynthSetting } from './audioSettingsSlice';

function OscillatorBox() {
    const dispatch = useDispatch();
    const settings = useSelector(state => state.audioSettings.synthSettings);

    const parameter = oscillator.settings.type;
    const val = settings[parameter.settingGrp][parameter.settingName];
    const prevVal = usePrevious(val);

    useEffect(() => {
        if (prevVal && val !== prevVal) {
            dispatch(setSynthSetting(parameter, val));
        }
    }, [parameter, val]);

    const renderOscillatorTypes = (optionArray) => {
        return (
            <ul className="oscButtons">
                {optionArray.map((option) => {
                    return (
                        <li key={option} className={'osc ' + option}>
                            <label className='radioContainer'>
                                <input
                                    key={option}
                                    type="radio"
                                    name={parameter.settingName}
                                    section={parameter.settingGrp}
                                    value={option}
                                    checked={val === option}
                                    onChange={(e) => { dispatch(setSynthSetting(parameter, e.target.value)); }}
                                />
                                <span>{option}</span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="oscillatorSelection">
            <h1>oscillator</h1>
            {renderOscillatorTypes([
                'sine',
                'sawtooth',
                'square',
                'triangle',
            ])}
        </div>
    );
}

export default React.memo(OscillatorBox);
