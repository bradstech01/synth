import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../scripts/hooks';

import { setBpm } from '../../app/appSlice.js';
import { updateRecFlag, updateSequencerSteps, updateSequencerBeat, updateStartFlag, updateSingleStep } from './sequencerSlice.js';

import * as Tone from 'tone';
import SequencerStep from './sequencerStep.jsx';
import { synth } from '../../scripts/synthAPI.js';
import { startSequence, stopSequence } from './sequencerAPI.js';

function Sequencer() {
  const steps = useSelector(state => state.sequencer.steps);
  const beat = useSelector(state => state.sequencer.beat);
  const isRecording = useSelector(state => state.sequencer.isRecording);
  const isStarted = useSelector(state => state.sequencer.isStarted);
  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);
  const prevPlaying = usePrevious(currentlyPlaying);
  let numSteps = 64;

  const dispatch = useDispatch();
  const bpm = useSelector(state => state.app.bpm);
  const curBpm = useRef(bpm);
  curBpm.current = bpm;

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


  let intervalId = useRef(undefined);

  const bpmUpHandler = e => {
    if (e.type === 'mousedown') {
      if (!intervalId.current) {
        dispatch(setBpm(curBpm.current + 1));

        let count = 0;

        intervalId.current = setInterval(() => {
          dispatch(setBpm(curBpm.current + 1));
          count += 1;
          if (count > 4) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            intervalId.current = setInterval(() => {
              dispatch(setBpm(curBpm.current + 1));
            }, 20);
          }
        }, 100);

      }
    }
    else {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  const bpmDownHandler = e => {
    if (e.type === 'mousedown') {
      if (!intervalId.current) {
        dispatch(setBpm(curBpm.current - 1));

        let count = 0;

        intervalId.current = setInterval(() => {
          dispatch(setBpm(curBpm.current - 1));
          count += 1;
          if (count > 4) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            intervalId.current = setInterval(() => {
              dispatch(setBpm(curBpm.current - 1));
            }, 20);
          }
        }, 100);

      }
    }
    else {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

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
  }, [currentlyPlaying, prevPlaying, isRecording, numSteps, steps]);

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
          <div className="bpmUp" onMouseDown={bpmUpHandler} onMouseUp={bpmUpHandler} onMouseOut={bpmUpHandler} />
          <div className="bpmDown" onMouseDown={bpmDownHandler} onMouseUp={bpmDownHandler} onMouseOut={bpmDownHandler} />
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
        {steps.map((step) => <SequencerStep key={step.beat} step={step} />)}
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