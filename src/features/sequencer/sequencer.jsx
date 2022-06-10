import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import SequencerStep from './sequencerStep.jsx';
import { synth } from '../../scripts/synthAPI.js';
import { startSequence, stopSequence } from './sequencerAPI.js';

function Sequencer(props) {
  //reference to state setter from top-level
  let steps = props.sequencerSteps;
  let isRecording = props.sequencerRecording;
  let isStarted = props.sequencerStarted;
  let numSteps = 64;

  const isMounted = useRef(false);
  const currentStepNotes = useRef(null);
  const currentNote = useRef(null);
  const currentBeatRef = useRef(0);
  currentBeatRef.current = props.currentBeat;

  const handleSeqStart = (e) => {
    if (isStarted) {
      stopSequence();
      currentNote.current = '';
      props.setSequencerStarted(false);
      props.setSequencerBeat(0);
      synth.triggerRelease(currentNote.current, Tone.now());
    } else {
      if (isRecording) disableRecording();
      props.setSequencerStarted(true);
      props.setSequencerBeat(0);
      startSequence();
    }
  };

  const handleSeqRecord = (e) => {
    if (isStarted) {
      stopSequence();
      props.setSequencerStarted(false);
    }
    props.setSequencerBeat(0);
    if (!isRecording) enableRecording();
    else disableRecording();
  };

  const enableRecording = () => {
    props.setSequencerRecording(true);
    currentStepNotes.current = [];
  };

  const disableRecording = () => {
    props.setSequencerRecording(false);
    currentStepNotes.current = null;
  };

  const raiseBpm = (e) => {
    props.setBpm(props.bpm + 1);
    Tone.Transport.bpm.value = props.bpm;
  };

  const lowerBpm = (e) => {
    props.setBpm(props.bpm - 1);
    Tone.Transport.bpm.value = props.bpm;
  };

  const addRest = (e) => {
    if (isRecording) {
      steps[currentBeatRef.current].note = 'rest';
      props.setSequencerBeat((currentBeatRef.current + 1) % numSteps);
    }
  };

  const clearEntry = (e) => {
    if (isRecording) {
      steps[currentBeatRef.current].note = '';
      props.setSequencerBeat((currentBeatRef.current + 1) % numSteps);
    }
  };

  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;
    else {
      const addToSequence = (note) => {
        if ((currentStepNotes) && (!currentStepNotes.current.includes(note))) {
          currentStepNotes.current.push(note);
          let newSteps = [...steps];
          newSteps[currentBeatRef.current].note = currentStepNotes.current;
          props.setSequencerSteps(newSteps);
        }
      };

      const advanceSequence = () => {
        currentStepNotes.current = [];
        props.setSequencerBeat((currentBeatRef.current + 1) % numSteps);
      };

      if (isRecording) {
        if (props.prevPlaying !== props.currentlyPlaying) {
          if (props.currentlyPlaying.length === 0) {
            advanceSequence();
          }
          else {
            props.currentlyPlaying.forEach((note) => {
              addToSequence(note);
            });
          }
        }
      }
    }
  }, [props.currentlyPlaying, props.prevPlaying, isRecording, numSteps, props, steps]);

  const renderControls = () => {
    return (
      <div className='centerX'>
        <div className="seqControls">
          <div
            className="seqStart"
            role="button"
            onMouseDown={handleSeqStart}
          ></div>
          <div
            className="seqRecord"
            role="button"
            onMouseDown={handleSeqRecord}
          ></div>
          <div className="bpmBox">
            <div className='centerY'>
              <div className="bpmDisplayBox">
                <div className="bpmDisplay">
                  <span>{props.bpm}</span>
                </div>
              </div>
            </div>
            <div className="bpmButtons">
              <div className="bpmUp" onMouseDown={raiseBpm} />
              <div className="bpmDown" onMouseDown={lowerBpm} />
            </div>
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
      </div>
    );
  };

  const renderSequence = (steps) => {
    return (
      <div className='centerX'>
        <div className="stepsContainer">
          <div className="steps">
            {steps.map((step) => {
              return (
                <SequencerStep
                  key={step.beat}
                  step={step}
                  steps={steps}
                  beat={props.currentBeat}
                  updateActiveBeat={props.setSequencerBeat}
                />
              );
            })}
          </div>
        </div>
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

Sequencer.propTypes = {
  currentlyPlaying: PropTypes.array.isRequired,
};

export default Sequencer;