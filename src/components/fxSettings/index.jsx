import React from 'react';
import PropTypes from 'prop-types';
import TimeFxBox from '../timeFxBox';
import VoiceFxBox from '../voiceFxBox';

function FxSettings(props) {
    return (
        <>
            <VoiceFxBox
                synthSettings={props.synthSettings}
                onChange={props.handleFxChange} />
            <TimeFxBox
                synthSettings={props.synthSettings}
                onChange={props.handleFxChange} />
        </>
    );
}

FxSettings.propTypes = {
    synthSettings: PropTypes.object.isRequired,
    handleFxChange: PropTypes.func.isRequired,
};

export default React.memo(FxSettings);
