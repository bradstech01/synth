import React, { useEffect } from 'react';
import PianoKey from './pianoKey';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../scripts/hooks';
import { setMouseFlag, addToCurrentlyPlaying, removeFromCurrentlyPlaying } from './keyboardSlice';

import { keyMap } from '../../scripts/inputMaps.js';
import { triggerNote, triggerRelease } from '../../scripts/synthAPI';


/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
export function Keyboard() {
  const dispatch = useDispatch();
  const octaveShift = useSelector(state => state.keyboard.octaveShift);
  const isAnyMusicKeyDown = useSelector(state => state.keyboard.isAnyMusicKeyDown);
  const isMouseActive = useSelector(state => state.keyboard.isMouseActive);
  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);

  const prevPlaying = usePrevious(currentlyPlaying);

  //Handles 'musical' key presses & releases. 
  const handleKeyPress = e => { if (keyMap(e.key)) dispatch(addToCurrentlyPlaying({ note: keyMap(e.key), velocity: .5, source: 'keyboard' })); };
  const handleKeyRelease = e => { if (keyMap(e.key)) dispatch(removeFromCurrentlyPlaying({ note: keyMap(e.key), source: 'keyboard' })); };

  useEffect(() => {
    if (!isAnyMusicKeyDown && isMouseActive) {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);
    }
    else if (!isMouseActive) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
    }
  }, [isAnyMusicKeyDown, isMouseActive]);

  //Use effect for triggering notes on note updates
  useEffect(() => {
    for (let noteVelocityPair of currentlyPlaying) {
      const { note, velocity } = noteVelocityPair;
      const noteWasAdded = !prevPlaying || !prevPlaying.find(pair => pair.note === note);
      if (noteWasAdded) triggerNote(note, velocity);
    }
    if (prevPlaying) {
      for (let noteVelocityPair of prevPlaying) {
        const { note, velocity } = noteVelocityPair;
        const noteWasRemoved = !currentlyPlaying.find(pair => pair.note === noteVelocityPair.note);
        if (noteWasRemoved) triggerRelease(note);
      }
    }

  }, [currentlyPlaying]);

  const renderPianoKey = (note, octave, triggerKey, hiddenOnMobile) => {
    return (
      <PianoKey
        note={note + (octave)}
        triggerKey={triggerKey}
        hiddenOnMobile={hiddenOnMobile}
      />
    );
  };

  return (
    <div
      className="keyboard"
      role="button"
      onMouseDown={() => { dispatch(setMouseFlag('down')); }}
      onMouseUp={() => { dispatch(setMouseFlag('up')); }}
    >
      {renderPianoKey('C', 3 + octaveShift, 'q')}
      {renderPianoKey('C#', 3 + octaveShift, '2')}
      {renderPianoKey('D', 3 + octaveShift, 'w')}
      {renderPianoKey('D#', 3 + octaveShift, '3')}
      {renderPianoKey('E', 3 + octaveShift, 'e')}
      {renderPianoKey('F', 3 + octaveShift, 'r')}
      {renderPianoKey('F#', 3 + octaveShift, '5')}
      {renderPianoKey('G', 3 + octaveShift, 't')}
      {renderPianoKey('G#', 3 + octaveShift, '6')}
      {renderPianoKey('A', 3 + octaveShift, 'y')}
      {renderPianoKey('A#', 3 + octaveShift, '7')}
      {renderPianoKey('B', 3 + octaveShift, 'u')}
      {renderPianoKey('C', 4 + octaveShift, 'z')}
      {renderPianoKey('C#', 4 + octaveShift, 's', true)}
      {renderPianoKey('D', 4 + octaveShift, 'x', true)}
      {renderPianoKey('D#', 4 + octaveShift, 'd', true)}
      {renderPianoKey('E', 4 + octaveShift, 'c', true)}
      {renderPianoKey('F', 4 + octaveShift, 'v', true)}
      {renderPianoKey('F#', 4 + octaveShift, 'g', true)}
      {renderPianoKey('G', 4 + octaveShift, 'b', true)}
      {renderPianoKey('G#', 4 + octaveShift, 'h', true)}
      {renderPianoKey('A', 4 + octaveShift, 'n', true)}
      {renderPianoKey('A#', 4 + octaveShift, 'j', true)}
      {renderPianoKey('B', 4 + octaveShift, 'm', true)}
      {renderPianoKey('C', 5 + octaveShift, ',', true)}
    </div>
  );
}

/*
Keyboard.propTypes = {
};
*/

export default React.memo(Keyboard);
