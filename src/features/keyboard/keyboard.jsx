import React from 'react';
import PianoKey from './pianoKey';
import { useDispatch, useSelector } from 'react-redux';
import { setMouseFlag } from './keyboardSlice';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
export function Keyboard() {
  const dispatch = useDispatch();
  const octaveShift = useSelector(state => state.keyboard.octaveShift);


  //Handles 'musical' key presses & releases. 
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
    <div className="keyboard" role="button" onMouseDown={() => { dispatch(setMouseFlag('down')); }}>
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
