import React from 'react';
import PropTypes from 'prop-types';

export function SequencerStep(props) {
  const setSelfAsActive = (e) => {
    props.beatActivator((props.step.beat - 1) % 8);
  };

  return (
    <div
      onMouseDown={setSelfAsActive}
      key={props.step.beat}
      className={
        'step gc' +
        props.step.beat +
        (props.step.beat % 8 === (props.beat + 1) % 8 ? ' activeStep' : '')
      }
    >
      {props.step.beat}
      <div className={'gr2 stepInput'} beat={props.step.beat}>
        {props.steps[props.step.beat - 1].note}
      </div>
    </div>
  );
}

SequencerStep.propTypes = {
  step: PropTypes.object.isRequired,
  steps: PropTypes.array.isRequired,
  beat: PropTypes.number.isRequired,
};
