import React from 'react';
import PropTypes from 'prop-types';
import { PianoKey } from '../pianoKey';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
export function KeyboardInner(props) {
  const renderPianoKey = (note, octave, triggerKey, hiddenOnMobile) => {
    return (
      <PianoKey
        note={note + (octave + props.octaveShift)}
        isMouseDown={props.isMouseDown}
        currentlyPlaying={props.currentlyPlaying.includes(
          note + (octave + props.octaveShift)
        )}
        triggerKey={triggerKey}
        onMouseDown={props.onMouseDown}
        onMouseUp={props.onMouseUp}
        hiddenOnMobile={hiddenOnMobile}
      />
    );
  };

  return (
    <div
      className="keyboard"
      role="button"
      onMouseDown={props.setMouseFlag}
      onMouseUp={props.setMouseFlag}
    >
      {renderPianoKey('C', 3, 'q')}
      {renderPianoKey('C#', 3, '2')}
      {renderPianoKey('D', 3, 'w')}
      {renderPianoKey('D#', 3, '3')}
      {renderPianoKey('E', 3, 'e')}
      {renderPianoKey('F', 3, 'r')}
      {renderPianoKey('F#', 3, '5')}
      {renderPianoKey('G', 3, 't')}
      {renderPianoKey('G#', 3, '6')}
      {renderPianoKey('A', 3, 'y')}
      {renderPianoKey('A#', 3, '7')}
      {renderPianoKey('B', 3, 'u')}
      {renderPianoKey('C', 4, 'z')}
      {renderPianoKey('C#', 4, 's', true)}
      {renderPianoKey('D', 4, 'x', true)}
      {renderPianoKey('D#', 4, 'd', true)}
      {renderPianoKey('E', 4, 'c', true)}
      {renderPianoKey('F', 4, 'v', true)}
      {renderPianoKey('F#', 4, 'g', true)}
      {renderPianoKey('G', 4, 'b', true)}
      {renderPianoKey('G#', 4, 'h', true)}
      {renderPianoKey('A', 4, 'n', true)}
      {renderPianoKey('A#', 4, 'j', true)}
      {renderPianoKey('B', 4, 'm', true)}
      {renderPianoKey('C', 5, ',', true)}
    </div>
  );
}

KeyboardInner.propTypes = {
  setMouseFlag: PropTypes.func.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  currentlyPlaying: PropTypes.array.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  octaveShift: PropTypes.number.isRequired,
};

export const Keyboard = React.memo(KeyboardInner);
