import React from 'react';
import PropTypes from 'prop-types';
import { OscillatorBox } from '../oscillatorBox';
import { LpfEnvBox } from '../lpfEnvBox';
import { AmpEnvBox } from '../ampEnvBox';

export function OscillatorSettings(props) {
    return (
        <React.Fragment>
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
        </React.Fragment>
    );
}

OscillatorSettings.propTypes = {
    synthSettings: PropTypes.object.isRequired,
};