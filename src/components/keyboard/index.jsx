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
      isMouseDown: false,
      isKeyDown: false,
    };
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
    if (!this.state.isKeyDown) this.setState({ isKeyDown: true });

    if (keyMap(e.key)) this.addToCurrentlyPlaying(keyMap(e.key));
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    if (keyMap(e.key)) this.removeFromCurrentlyPlaying(keyMap(e.key));

    if (this.state.currentlyPlaying.length === 0)
      this.setState({ isKeyDown: false });
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
    e.stopPropagation();
    if (e.type === 'mousedown') this.setState({ isMouseDown: true });
    else this.setState({ isMouseDown: false });

    if (!this.state.isKeyDown && this.state.isMouseDown) {
      document.removeEventListener('keydown', this.handleKeyPress);
      document.removeEventListener('keyup', this.handleKeyRelease);
    }
    if (!this.state.isMouseDown) {
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  };

  renderPianoKey(note, octave, octaveShift, triggerKey) {
    return (
      <PianoKey
        note={note + (octave + octaveShift)}
        isKeyDown={this.state.isKeyDown}
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
      <div
        className="keyboard"
        role="button"
        onMouseDown={this.setMouseFlag}
        onMouseUp={this.setMouseFlag}
      >
        {this.renderPianoKey('C', 3, 0, 'q')}
        {this.renderPianoKey('C#', 3, 0, '2')}
        {this.renderPianoKey('D', 3, 0, 'w')}
        {this.renderPianoKey('D#', 3, 0, '3')}
        {this.renderPianoKey('E', 3, 0, 'e')}
        {this.renderPianoKey('F', 3, 0, 'r')}
        {this.renderPianoKey('F#', 3, 0, '5')}
        {this.renderPianoKey('G', 3, 0, 't')}
        {this.renderPianoKey('G#', 3, 0, '6')}
        {this.renderPianoKey('A', 3, 0, 'y')}
        {this.renderPianoKey('A#', 3, 0, '7')}
        {this.renderPianoKey('B', 3, 0, 'u')}
        {this.renderPianoKey('C', 4, 0, 'z')}
        {this.renderPianoKey('C#', 4, 0, 's')}
        {this.renderPianoKey('D', 4, 0, 'x')}
        {this.renderPianoKey('D#', 4, 0, 'd')}
        {this.renderPianoKey('E', 4, 0, 'c')}
        {this.renderPianoKey('F', 4, 0, 'v')}
        {this.renderPianoKey('F#', 4, 0, 'g')}
        {this.renderPianoKey('G', 4, 0, 'b')}
        {this.renderPianoKey('G#', 4, 0, 'h')}
        {this.renderPianoKey('A', 4, 0, 'n')}
        {this.renderPianoKey('A#', 4, 0, 'j')}
        {this.renderPianoKey('B', 4, 0, 'm')}
        {this.renderPianoKey('C', 5, 0, ',')}
      </div>
    );
  }
}
