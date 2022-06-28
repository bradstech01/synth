import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevious } from '../../scripts/hooks';

import { updateSequencerBeat, updateSingleStep } from './sequencerSlice.js';

import SequencerStep from './sequencerStep.jsx';
import SequencerControls from './sequencerControls';

function Sequencer() {
  const steps = useSelector(state => state.sequencer.steps);
  const beat = useSelector(state => state.sequencer.beat);
  const isRecording = useSelector(state => state.sequencer.isRecording);
  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);
  const prevPlaying = usePrevious(currentlyPlaying);
  let numSteps = 64;

  const dispatch = useDispatch();
  const bpm = useSelector(state => state.app.bpm);
  const curBpm = useRef(bpm);
  curBpm.current = bpm;

  const isMounted = useRef(false);
  const currentStepNotes = useRef([]);

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

  const renderSequence = (steps) => {
    return (
      <div className="steps">
        {steps.map((step) => <SequencerStep key={step.beat} step={step} />)}
      </div>
    );
  };

  return (
    <div className='sequencer'>
      <SequencerControls />
      {renderSequence(steps)}
    </div>
  );
}

export default Sequencer;