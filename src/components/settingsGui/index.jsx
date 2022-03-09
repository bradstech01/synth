import React, { Component } from 'react';
import * as Tone from 'tone';

export class SettingsGui extends Component {
  constructor(props) {
    super(props);
    let frequency = this.props.filter.get().frequency;
    this.state = {
      filterObj: {
        frequency: frequency
      },
      adsr: {
        attack: this.props.synth.options.envelope.attack,
        decay: this.props.synth.options.envelope.decay,
        sustain: this.props.synth.options.envelope.sustain,
        release: this.props.synth.options.envelope.release
      }

    };

    this.handleCutoffChange = this.handleCutoffChange.bind(this);
    this.handleEnvelopeChange = this.handleEnvelopeChange.bind(this);
  }

  handleCutoffChange(e) {
    let returnState = {...this.state};
    let newVal = e.target.value !== '' ? e.target.value : 0;
    returnState.filterObj['frequency'] = newVal;
    this.setState(returnState);
    this.props.filter.set(returnState.filterObj);
    console.log('new cutoff');
    console.log(this.props.filter.get().frequency);
    console.log(this.props.filter.get().rolloff);

  }

  handleEnvelopeChange(e) {
    let returnState = {...this.state};
    returnState.adsr[e.target.name] = e.target.value;
    this.setState(returnState);
    let returnSettings = {};
    returnSettings.envelope = returnState.adsr;
    this.props.synth.set(returnSettings);
  }

  render() {
    return (
      <div>
        <label>cutoff</label>
        <input type="range" name="cutoff"
         min="0" max="44000" value={this.state.filterObj.frequency} step="1"
         onChange={this.handleCutoffChange}/>
        <br/>
        <label>attack</label>
        <input type="range" name="attack"
         min="0" max="15" value={this.state.adsr.attack} step=".01"
         onChange={this.handleEnvelopeChange}/>
        <br/>
        <label>decay</label>
        <input type="range" name="decay"
         min="0" max="15" value={this.state.adsr.decay} step=".01"
         onChange={this.handleEnvelopeChange}/>
        <br/>
        <label>sustain</label>
        <input type="range" name="sustain" 
         min="0" max="1" value={this.state.adsr.sustain} step=".01"
         onChange={this.handleEnvelopeChange}/>
        <br/>
        <label>release</label>
        <input type="range" name="release"
         min="0" max="15" value={this.state.adsr.release} step=".01"
         onChange={this.handleEnvelopeChange}/>         
      </div>
    );
  }
}
