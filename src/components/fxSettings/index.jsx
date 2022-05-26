import React from 'react';
import PropTypes from 'prop-types';
import { TimeFxBox } from '../timeFxBox';
import { VoiceFxBox } from '../voiceFxBox';

function FxSettingsInner(props) {
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

FxSettingsInner.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    handleFxChange: PropTypes.func.isRequired,
};

export const FxSettings = React.memo(FxSettingsInner);
