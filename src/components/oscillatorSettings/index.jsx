import React from 'react';
import PropTypes from 'prop-types';
import OscillatorBox from '../oscillatorBox';
import LpfEnvBox from '../lpfEnvBox';
import AmpEnvBox from '../ampEnvBox';

function OscillatorSettings(props) {
    return (
        <>
            <OscillatorBox
                synthSettings={props.synthSettings}
                onChange={props.handleChange}
            />
            <LpfEnvBox
                synthSettings={props.synthSettings}
                onChange={props.handleChange}
            />
            <AmpEnvBox
                synthSettings={props.synthSettings}
                onChange={props.handleChange}
            />
        </>
    );
}

OscillatorSettings.propTypes = {
    synthSettings: PropTypes.object.isRequired,
};

export default React.memo(OscillatorSettings);
