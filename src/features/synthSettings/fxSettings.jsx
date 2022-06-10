import React from 'react';
import PropTypes from 'prop-types';
import TimeFxBox from './timeFxBox';
import VoiceFxBox from './voiceFxBox';

function FxSettings(props) {
    return (
        <>
            <VoiceFxBox
                settings={props.settings}
                onChange={props.handleFxChange} />
            <TimeFxBox
                settings={props.settings}
                onChange={props.handleFxChange} />
        </>
    );
}

FxSettings.propTypes = {
    settings: PropTypes.object.isRequired,
    handleFxChange: PropTypes.func.isRequired,
};

export default React.memo(FxSettings);
