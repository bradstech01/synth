import React from 'react';
import PropTypes from 'prop-types';

function SequencerStep(props) {
  const setSelfAsActive = (e) => {
    props.updateActiveBeat((props.step.beat - 1) % props.steps.length);
  };

  return (
    <div
      onMouseDown={setSelfAsActive}
      key={props.step.beat}
      className={
        'step' +
        (props.step.beat % props.steps.length ===
          (props.beat + 1) % props.steps.length
          ? ' activeStep'
          : '')
      }
    >
      <div className={'stepNoteDisplay'} beat={props.step.beat}>
        {props.steps[props.step.beat - 1].note}
      </div>
    </div>
  );
}

SequencerStep.propTypes = {
  step: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  beat: PropTypes.number.isRequired,
  updateActiveBeat: PropTypes.func.isRequired,
};

export default React.memo(SequencerStep);