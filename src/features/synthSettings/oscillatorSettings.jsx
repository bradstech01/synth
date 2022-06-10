import React from 'react';
import PropTypes from 'prop-types';
import OscillatorBox from './oscillatorBox';
import LpfEnvBox from './lpfEnvBox';
import AmpEnvBox from './ampEnvBox';

function OscillatorSettings(props) {
    return (
        <>{/*
            <OscillatorBox
                settings={props.settings}
                onChange={props.handleChange}
            />*/}
            <LpfEnvBox
                settings={props.settings}
                onChange={props.handleChange}
            />
            <AmpEnvBox
                settings={props.settings}
                onChange={props.handleChange}
            />
        </>
    );
}

OscillatorSettings.propTypes = {
    settings: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default React.memo(OscillatorSettings);
