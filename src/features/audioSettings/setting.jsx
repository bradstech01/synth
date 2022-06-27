import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../../scripts/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { setSynthSetting, setFxSetting } from './audioSettingsSlice';

function Setting(props) {
    const dispatch = useDispatch();
    let type = props.type;
    const settingsState = useSelector(state => state.audioSettings);
    let settings;
    (type === 'synth') ? settings = settingsState.synthSettings : settings = settingsState.fxSettings;
    let val = settings[props.parameter.settingGrp][props.parameter.settingName];
    const prevVal = usePrevious(val);
    let parameter = props.parameter;

    useEffect(() => {
        if (prevVal && val !== prevVal) {
            (type === 'synth') ?
                dispatch(setSynthSetting(parameter, val)) :
                dispatch(setFxSetting(parameter, val));
        }
    }, [val, parameter, type]);

    return (
        <div className={'setting'}>
            <label className="settingLbl textCenter" >{props.label}</label>
            <div className="sliderWrapper">
                <input
                    className="innerSetting slider"
                    type="range"
                    min={parameter.min}
                    max={parameter.max}
                    value={settings[parameter.settingGrp][parameter.settingName]}
                    step={parameter.step}
                    onChange={(e) => {
                        (type === 'synth') ?
                            dispatch(setSynthSetting(parameter, e.target.value)) :
                            dispatch(setFxSetting(parameter, e.target.value));
                    }}
                />
            </div>
            <span className="textCenter">
                {settings[parameter.settingGrp][parameter.settingName]}
            </span>
        </div >
    );
}

Setting.propTypes = {
    parameter: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired
};

export default React.memo(Setting);