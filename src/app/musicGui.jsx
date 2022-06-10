import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from '../features/keyboard/keyboard';
import Sequencer from '../features/sequencer/sequencer';
import { Visualizer } from '../features/visualizer/visualizer';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
function MusicGui(props) {
    return (
        <div className='musicGui'>
            <div className="keyboardWrapper">
                <div className='visualizerContainer'>
                    <Visualizer />
                </div>
                <Keyboard
                    isMouseDown={props.isMouseDown}
                    currentlyPlaying={props.currentlyPlaying}
                    octaveShift={0}
                    setMouseFlag={props.setMouseFlag}
                    onMouseDown={props.onMouseDown}
                    onMouseUp={props.onMouseUp}
                />
            </div>
            <Sequencer
                bpm={props.bpm}
                setBpm={props.setBpm}
                sequencerSteps={props.sequencerSteps}
                sequencerRecording={props.sequencerRecording}
                sequencerStarted={props.sequencerStarted}
                currentBeat={props.currentBeat}
                setSequencerSteps={props.setSequencerSteps}
                setSequencerStarted={props.setSequencerStarted}
                setSequencerRecording={props.setSequencerRecording}
                setSequencerBeat={props.setSequencerBeat}
                currentlyPlaying={props.currentlyPlaying}
                prevPlaying={props.prevPlaying}
            />
        </div>
    );
}

MusicGui.propTypes = {
    setMouseFlag: PropTypes.func.isRequired,
    isMouseDown: PropTypes.bool.isRequired,
    currentlyPlaying: PropTypes.array.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
    octaveShift: PropTypes.number.isRequired,
};

export default React.memo(MusicGui);
