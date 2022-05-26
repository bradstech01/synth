import React from 'react';
import PropTypes from 'prop-types';
import { OscillatorBox } from '../oscillatorBox';
import { LpfEnvBox } from '../lpfEnvBox';
import { AmpEnvBox } from '../ampEnvBox';

export function OscillatorSettingsInner(props) {
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

OscillatorSettingsInner.propTypes = {
    synthSettings: PropTypes.object.isRequired,
};

export const OscillatorSettings = React.memo(OscillatorSettingsInner);
