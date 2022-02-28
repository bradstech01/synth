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
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        triggerNote={this.props.triggerNote}
        triggerRelease={this.props.triggerRelease}
      />
    );
  }
}
