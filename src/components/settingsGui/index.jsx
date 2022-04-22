import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { OscillatorBox } from '../oscillatorBox';
import { Setting } from '../setting';
import { LpfEnvBox } from '../lpfEnvBox';
import { AmpEnvBox } from '../ampEnvBox';
import { TimeFxBox } from '../timeFxBox';
import { VoiceFxBox } from '../voiceFxBox';
import { handleChange, handleFxChange, getDefaults } from '../../scripts/settingsAPI.js';

export class SettingsGui extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = handleChange.bind(this);
    this.handleFxChange = handleFxChange.bind(this);
    this.getDefaults = getDefaults.bind(this);

    let synthSettings = this.getDefaults();

    this.state = {
      synthSettings: synthSettings,
    };

    this.fx = {
      stereoWidener: undefined,
      eq: undefined,
      distortion: undefined,
      compressor: undefined,
      reverb: undefined,
      delay: undefined,
      tremolo: undefined,
      chorus: undefined,
      LFO1: undefined,
      LFO2: undefined,
    };
  }

  static propTypes = {
    synth: PropTypes.object.isRequired,
    reverb: PropTypes.object,
  };

  render() {
    return (
      <React.Fragment>
        <div className="settingsGuiLeft settingsGui">
          <OscillatorBox
            synthSettings={this.state.synthSettings}
            onChange={this.handleChange}
          />
          <AmpEnvBox
            synthSettings={this.state.synthSettings}
            onChange={this.handleChange} />
          <LpfEnvBox
            synthSettings={this.state.synthSettings}
            onChange={this.handleChange} />
        </div>
        <div className="settingsGuiMid settingsGui">
          <VoiceFxBox
            synthSettings={this.state.synthSettings}
            onChange={this.handleFxChange} />
        </div>
        <div className="settingsGuiRight settingsGui">
          <TimeFxBox
            synthSettings={this.state.synthSettings}
            onChange={this.handleFxChange} />
        </div>
      </React.Fragment >
    );
  }
}
