import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../scripts/hooks';

import { setBpm } from '../../app/appSlice.js';
import { updateRecFlag, updateSequencerSteps, updateSequencerBeat, updateStartFlag, updateSingleStep } from './sequencerSlice.js';

import * as Tone from 'tone';
import SequencerStep from './sequencerStep.jsx';
import { synth } from '../../scripts/synthAPI.js';
import { setBeatInternal, startSequence, stopSequence } from './sequencerAPI.js';

function Sequencer(props) {
  //reference to state setter from top-level
  const steps = useSelector(state => state.sequencer.steps);
  const beat = useSelector(state => state.sequencer.beat);
  const isRecording = useSelector(state => state.sequencer.isRecording);
  const isStarted = useSelector(state => state.sequencer.isStarted);
  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);
  const prevPlaying = usePrevious(currentlyPlaying);
  let numSteps = 64;

  const dispatch = useDispatch();
  const bpm = useSelector(state => state.app.bpm);

  const isMounted = useRef(false);
  const currentStepNotes = useRef([]);
  const currentNote = useRef(null);

  const handleSeqStart = (e) => {
    if (isStarted) {
      stopSequence();
      currentNote.current = '';
      dispatch(updateStartFlag(false));
      dispatch(updateSequencerBeat(0));
      synth.triggerRelease(currentNote.current, Tone.now());
    } else {
      if (isRecording) disableRecording();
      dispatch(updateStartFlag(true));
      dispatch(updateSequencerBeat(0));
      startSequence();
    }
  };

  const handleSeqRecord = (e) => {
    if (isStarted) {
      stopSequence();
      dispatch(updateStartFlag(false));
    }
    dispatch(updateSequencerBeat(0));
    if (!isRecording) enableRecording();
    else disableRecording();
  };

  const enableRecording = () => {
    dispatch(updateRecFlag(true));
    currentStepNotes.current = [];
  };

  const disableRecording = () => {
    dispatch(updateRecFlag(false));
    currentStepNotes.current = [];
  };

  const raiseBpm = () => dispatch(setBpm(bpm + 1));
  const lowerBpm = () => dispatch(setBpm(bpm - 1));

  const addRest = (e) => {
    if (isRecording) {
      dispatch(updateSingleStep({ beat: beat, note: 'rest' }));
      dispatch(updateSequencerBeat((beat + 1) % numSteps));
    }
  };

  const clearEntry = (e) => {
    if (isRecording) {
      dispatch(updateSingleStep({ beat: beat, note: '' }));
      dispatch(updateSequencerBeat((beat + 1) % numSteps));
    }
  };

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;
    else {
      const addToSequence = (note) => {
        if ((currentStepNotes) && (!currentStepNotes.current.includes(note))) {
          const newStepNotes = [...currentStepNotes.current];
          newStepNotes.push(note);
          currentStepNotes.current = newStepNotes;
          dispatch(updateSingleStep({ beat: beat, note: currentStepNotes.current }));
        }
      };

      const advanceSequence = () => {
        currentStepNotes.current = [];
        dispatch(updateSequencerBeat((beat + 1) % numSteps));
      };

      if (isRecording && prevPlaying !== currentlyPlaying) {
        if (currentlyPlaying.length === 0) {
          advanceSequence();
        }
        else {
          currentlyPlaying.forEach(pair => {
            const { note } = pair;
            addToSequence(note);
          });
        }

      }
    }
  }, [currentlyPlaying, prevPlaying, isRecording, numSteps, props, steps]);

  const renderControls = () => {
    return (
      <div className="seqControls">
        <div
          className="seqStart"
          role="button"
          onMouseDown={handleSeqStart} />
        <div
          className="seqRecord"
          role="button"
          onMouseDown={handleSeqRecord} />
        <div className="bpm">
          <span>{bpm}</span>
        </div>
        <div className="bpmButtons">
          <div className="bpmUp" onMouseDown={raiseBpm} />
          <div className="bpmDown" onMouseDown={lowerBpm} />
        </div>
        <div className="seqCommands centerY">
          <div className="rest" onMouseDown={addRest}>
            <span>REST</span>
          </div>
          <div className="clear" onMouseDown={clearEntry}>
            <span>CLEAR</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSequence = (steps) => {
    return (
      <div className="steps">
        {steps.map((step) => <SequencerStep step={step} />)}
      </div>
    );
  };

  return (
    <div className='sequencer'>
      {renderControls()}
      {renderSequence(steps)}
    </div>
  );
}


export default Sequencer;