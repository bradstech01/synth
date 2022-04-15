import React from 'react';
import PropTypes from 'prop-types';
import { PianoKey } from '../pianoKey';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
export class Keyboard extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    role: PropTypes.string,
    currentlyPlaying: PropTypes.array.isRequired,
    isMouseDown: PropTypes.bool.isRequired,
    isKeyDown: PropTypes.bool.isRequired,
    triggerNote: PropTypes.func.isRequired,
    triggerRelease: PropTypes.func.isRequired,
    setMouseFlag: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
  };

  renderPianoKey(note, octave, octaveShift, triggerKey, hiddenOnMobile) {
    return (
      <PianoKey
        note={note + (octave + octaveShift)}
        isKeyDown={this.props.isKeyDown}
        currentlyPlaying={this.props.currentlyPlaying.includes(
          note + (octave + octaveShift)
        )}
        triggerKey={triggerKey}
        triggerNote={this.props.triggerNote}
        triggerRelease={this.props.triggerRelease}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        hiddenOnMobile={hiddenOnMobile}
      />
    );
  }

  render() {
    return (
      <div
        className="keyboard"
        role="button"
        onMouseDown={this.props.setMouseFlag}
        onMouseUp={this.props.setMouseFlag}
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
        {this.renderPianoKey('C#', 4, 0, 's', true)}
        {this.renderPianoKey('D', 4, 0, 'x', true)}
        {this.renderPianoKey('D#', 4, 0, 'd', true)}
        {this.renderPianoKey('E', 4, 0, 'c', true)}
        {this.renderPianoKey('F', 4, 0, 'v', true)}
        {this.renderPianoKey('F#', 4, 0, 'g', true)}
        {this.renderPianoKey('G', 4, 0, 'b', true)}
        {this.renderPianoKey('G#', 4, 0, 'h', true)}
        {this.renderPianoKey('A', 4, 0, 'n', true)}
        {this.renderPianoKey('A#', 4, 0, 'j', true)}
        {this.renderPianoKey('B', 4, 0, 'm', true)}
        {this.renderPianoKey('C', 5, 0, ',', true)}
      </div>
    );
  }
}
