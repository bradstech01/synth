import React from 'react';
import PropTypes from 'prop-types';
import { TimeFxBox } from '../timeFxBox';
import { VoiceFxBox } from '../voiceFxBox';

export function FxSettings(props) {
    return (
        <React.Fragment>
            <VoiceFxBox
                synthSettings={props.synthSettings}
                onChange={props.handleFxChange} />
            <TimeFxBox
                synthSettings={props.synthSettings}
                onChange={props.handleFxChange} />
        </React.Fragment >
    );
}

FxSettings.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    handleFxChange: PropTypes.func.isRequired,
};
