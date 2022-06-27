import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { addToCurrentlyPlaying, removeFromCurrentlyPlaying } from './keyboardSlice';

/**
 * Piano key element, which notably holds event listeners for mouse/touch input for each individual key.
 * Renders based on whether the note is currently being played.
 * Note that the export is memoized, as every render should be linked to exactly ONE note trigger or release
 * TODO: Try to hack through issues with touch support
 */
function PianoKey(props) {
  const dispatch = useDispatch();

  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);
  const isPlaying = currentlyPlaying.find(pair => props.note === pair.note);
  const isAnyMusicKeyDown = useSelector(state => state.keyboard.isAnyMusicKeyDown);
  const isMouseActive = useSelector(state => state.keyboard.isMouseActive);

  const sendMouseDown = (e) => {
    if (isAnyMusicKeyDown) return;
    else dispatch(addToCurrentlyPlaying({ note: props.note, velocity: .5, source: 'mouse' }));
  };

  const sendMouseUp = (e) => {
    e.preventDefault();
    dispatch(removeFromCurrentlyPlaying({ note: props.note, velocity: .5, source: 'mouse' }));
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
        (isPlaying ? ' keyPressed' : '') +
        (props.hiddenOnMobile ? ' hiddenOnMobile' : '')
      }
      onMouseDown={(sendMouseDown)}
      onMouseUp={sendMouseUp}
      onMouseOver={e => { if (isMouseActive) sendMouseDown(e); }}
      onMouseOut={sendMouseUp}
      onTouchStart={sendMouseDown}
      onTouchEnd={sendMouseUp}
      onTouchMove={sendMouseDown}
      onTouchCancel={sendMouseUp}
    >
      <div role="button" className="keyText">
        {props.triggerKey}
      </div>
    </div>
  );
}

PianoKey.propTypes = {
  note: PropTypes.string.isRequired,
  hiddenOnMobile: PropTypes.bool,
};

export default PianoKey;
