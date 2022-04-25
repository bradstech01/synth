import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { TimeFxBox } from '../timeFxBox';
import { VoiceFxBox } from '../voiceFxBox';
import { handleFxChange } from '../../scripts/settingsAPI.js';

export class FxSettings extends React.Component {
    constructor(props) {
        super(props);
        this.handleFxChange = handleFxChange.bind(this);
    }

    static propTypes = {
        synthSettings: PropTypes.object.isRequired,
    };

    render() {
        return (
            <React.Fragment>
                <VoiceFxBox
                    synthSettings={this.props.synthSettings}
                    onChange={this.props.handleFxChange} />
                <TimeFxBox
                    synthSettings={this.props.synthSettings}
                    onChange={this.props.handleFxChange} />
            </React.Fragment >
        );
    }
}