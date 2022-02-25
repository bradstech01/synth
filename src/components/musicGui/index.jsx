import React, { Component } from 'react';
import {Keyboard} from '../keyboard';
import * as Tone from 'tone';

export class MusicGui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      octave: 4,
      note: '',
      frequency: 0,
    };
  }

  render() {
    return (
      <div>
        <Keyboard
          triggerNote={this.props.triggerNote}
          releaseNote={this.props.releaseNote}
        />
      </div>
    );
  }
}
