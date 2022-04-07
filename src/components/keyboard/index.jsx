import React from 'react';
import PropTypes from 'prop-types';
import { PianoKey } from '../pianoKey';
import keyMap from '../../scripts/keyMap.js';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
export class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyPlaying: [],
    };
    this.isMouseDown = false;
  }

  static propTypes = {
    role: PropTypes.string,
    triggerNote: PropTypes.func.isRequired,
    triggerRelease: PropTypes.func.isRequired,
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.setMouseFlag);
    document.addEventListener('mouseup', this.setMouseFlag);
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyRelease);
  }

  handleKeyPress = (e) => {
    if (keyMap(e.key)) {
      this.addToCurrentlyPlaying(keyMap(e.key));
    }
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    if (keyMap(e.key)) {
      this.removeFromCurrentlyPlaying(keyMap(e.key));
    }
  };

  addToCurrentlyPlaying = (note) => {
    if (!this.state.currentlyPlaying.includes(note)) {
      let newPlaying = [...this.state.currentlyPlaying];
      newPlaying.push(note);
      this.setState({
        currentlyPlaying: newPlaying,
      });
    }
  };

  removeFromCurrentlyPlaying = (note) => {
    if (this.state.currentlyPlaying.includes(note)) {
      let currentlyPlaying = [...this.state.currentlyPlaying];
      let newPlaying = currentlyPlaying.filter((value) => {
        return value !== note;
      });
      this.setState({
        currentlyPlaying: newPlaying,
      });
    }
  };

  setMouseFlag = (e) => {
    if (e.type === 'mousedown') {
      this.isMouseDown = true;
    } else {
      this.isMouseDown = false;
    }
  };

  renderPianoKey(note, octave, octaveShift, triggerKey) {
    return (
      <PianoKey
        note={note + (octave + octaveShift)}
        isMouseDown={this.isMouseDown}
        currentlyPlaying={this.state.currentlyPlaying.includes(
          note + (octave + octaveShift)
        )}
        triggerKey={triggerKey}
        triggerNote={this.props.triggerNote}
        triggerRelease={this.props.triggerRelease}
        onMouseDown={this.addToCurrentlyPlaying}
        onMouseUp={this.removeFromCurrentlyPlaying}
      />
    );
  }

  render() {
    return (
      <div className="keyboard" role="button">
        {this.renderPianoKey('C', 3, 0, 'Q')}
        {this.renderPianoKey('C#', 3, 0, '2')}
        {this.renderPianoKey('D', 3, 0, 'W')}
        {this.renderPianoKey('D#', 3, 0, '3')}
        {this.renderPianoKey('E', 3, 0, 'E')}
        {this.renderPianoKey('F', 3, 0, 'R')}
        {this.renderPianoKey('F#', 3, 0, '5')}
        {this.renderPianoKey('G', 3, 0, 'T')}
        {this.renderPianoKey('G#', 3, 0, '6')}
        {this.renderPianoKey('A', 3, 0, 'Y')}
        {this.renderPianoKey('A#', 3, 0, '7')}
        {this.renderPianoKey('B', 3, 0, 'U')}
        {this.renderPianoKey('C', 4, 0, 'I')}
      </div>
    );
  }
}
