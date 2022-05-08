import React from 'react';
import PropTypes from 'prop-types';
import { OscillatorBox } from '../oscillatorBox';
import { LpfEnvBox } from '../lpfEnvBox';
import { AmpEnvBox } from '../ampEnvBox';

export class OscillatorSettings extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        synthSettings: PropTypes.object.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                <OscillatorBox
                    synthSettings={this.props.synthSettings}
                    onChange={this.props.handleChange}
                />
                <LpfEnvBox
                    synthSettings={this.props.synthSettings}
                    onChange={this.props.handleChange}
                />
                <AmpEnvBox
                    synthSettings={this.props.synthSettings}
                    onChange={this.props.handleChange}
                />
            </React.Fragment>
        );
    }
}
