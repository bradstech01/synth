import React, { Component } from 'react';
import {Keyboard} from '../keyboard';
import * as Tone from 'tone';

export class MusicGui extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Keyboard
        currentlyPlaying={this.props.currentlyPlaying}
        synth={this.props.synth}
        triggerNote={this.props.triggerNote}
        triggerRelease={this.props.triggerRelease}
        keyMap={this.props.keyMap}
      />
    );
  }
}
