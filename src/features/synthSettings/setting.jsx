import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { usePrevious } from '../../scripts/hooks';

function Setting(props) {
    let type = props.type;
    let settings;
    (type === 'synth') ? settings = props.settings.synthSettings : settings = props.settings.fxSettings;
    let val = settings[props.definition.settingGrp][props.definition.settingName];
    const prevVal = usePrevious(val);
    let definition = props.definition;
    let onChange = props.onChange;

    useEffect(() => {
        if (val !== prevVal) onChange({ ...props.settings }, val, definition.valueScaler ? definition.valueScaler(val) : val, definition, type);
    }, [val, definition, onChange, settings, props.settings, type]);

    //

    return (
        <div className={'setting'}>
            <label className="settingLbl textCenter" >{props.label}</label>
            <div className="sliderWrapper">
                <input
                    className="innerSetting slider"
                    type="range"
                    min={definition.min}
                    max={definition.max}
                    value={settings[definition.settingGrp][definition.settingName]}
                    step={definition.step}
                    onChange={(e) => {
                        onChange({ ...props.settings }, e.target.value, definition.valueScaler ? definition.valueScaler(e.target.value) : e.target.value, definition, type);
                    }
                    }
                />
            </div>
            <span className="textCenter">
                {settings[definition.settingGrp][definition.settingName]}
            </span>
        </div >
    );
}

Setting.propTypes = {
    settings: PropTypes.object.isRequired,
    definition: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default React.memo(Setting);