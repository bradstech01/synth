import React, { Component } from 'react';
import * as Tone from 'tone';

export class SettingsGui extends Component {
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
        Settings will go here (cutoff, ADSR, etc)
      </div>
    );
  }
}
