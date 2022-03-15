import React from 'react';
import PropTypes from 'prop-types';
import {Keyboard} from '../keyboard';

/**
 * GUI for manipulation of musical output. Contains keyboard & relevant settings to drive keyboard controls. 
 * TODO: Add octave shift buttons + shortcuts and event listeners to manipulate via keys. 
 * TODO: Add mod wheel & pitch shift, with ability to map audio params to mod wheel. 
 * TODO: Add arpeggiator controls to easily create sequences. 
 */

export class MusicGui extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static propTypes = {
    currentlyPlaying: PropTypes.array.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    triggerNote: PropTypes.func.isRequired,
    triggerRelease: PropTypes.func.isRequired,
  }

  render() {
    return (
      <Keyboard role='button'
        currentlyPlaying={this.props.currentlyPlaying}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        triggerNote={this.props.triggerNote}
        triggerRelease={this.props.triggerRelease}
      />
    );
  }
}
