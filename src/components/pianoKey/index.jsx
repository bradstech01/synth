import React from 'react';
import PropTypes from 'prop-types';

/**
 * Piano key element, which notably holds event listeners for mouse/touch input for each individual key.
 * Renders based on whether the note is currently being played.
 * Note that the export is memoized, as every render should be linked to exactly ONE note trigger or release
 * TODO: Try to hack through issues with touch support
 */
function PianoKeyInner(props) {
  React.useEffect(() => {
    if (props.currentlyPlaying) props.triggerNote(props.note);
    else props.triggerRelease(props.note);
  });

  const sendMouseDown = (e) => {
    e.preventDefault();
    if (e.type === 'mouseover') {
      if (props.isMouseDown) props.onMouseDown(props.note);
    } else props.onMouseDown(props.note);
  };

  const sendMouseUp = (e) => {
    e.preventDefault();
    props.onMouseUp(props.note);
  };

  const mapNoteToClass = (note) => {
    const mapNote = note.slice(0, 1);
    switch (mapNote) {
      case 'A':
      case 'B':
      case 'D':
      case 'E':
      case 'G':
        return ' '.concat(mapNote.toLowerCase());
      default:
        return '';
    }
  };

  return (
    <div
      role="button"
      className={
        'pianoKey ' +
        (props.note.length < 3
          ? 'keyWhite' + mapNoteToClass(props.note)
          : 'keyBlack') +
        (props.currentlyPlaying ? ' keyPressed' : '')
      }
      onMouseDown={sendMouseDown}
      onMouseUp={sendMouseUp}
      onMouseOver={sendMouseDown}
      onMouseOut={sendMouseUp}
      onTouchStart={sendMouseDown}
      onTouchEnd={sendMouseUp}
      onTouchMove={sendMouseDown}
      onTouchCancel={sendMouseUp}
    >
      <div role="button" className={'keyText'}>
        {props.triggerKey}
      </div>
    </div>
  );
}

PianoKeyInner.propTypes = {
  note: PropTypes.string.isRequired,
  isMouseDown: PropTypes.bool.isRequired,
  currentlyPlaying: PropTypes.bool.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  onMouseUp: PropTypes.func.isRequired,
  triggerNote: PropTypes.func.isRequired,
  triggerRelease: PropTypes.func.isRequired,
};

export const PianoKey = React.memo(PianoKeyInner);
