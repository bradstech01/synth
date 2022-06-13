import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateSequencerBeat } from './sequencerSlice';

function SequencerStep(props) {
  const dispatch = useDispatch();

  const steps = useSelector(state => state.sequencer.steps);
  const activeBeat = useSelector(state => state.sequencer.beat);

  return (
    <div onMouseDown={() => { dispatch(updateSequencerBeat(((props.step.beat) % steps.length))); }}
      className={'step' + (props.step.beat % steps.length === (activeBeat) % steps.length ? ' activeStep' : '')}>
      <div className='stepNoteDisplay'>
        {props.step.note}
      </div>
    </div>
  );
}

SequencerStep.propTypes = {
  step: PropTypes.object.isRequired,
};

export default React.memo(SequencerStep);