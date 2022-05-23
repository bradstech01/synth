import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import { SequencerStep } from '../sequencerStep/index.jsx';
import { synth } from '../../scripts/synthAPI.js';

export class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    let steps = [];
    this.steps = steps;
    this.numSteps = 64;

    this.state = {
      bpm: 120,
      started: false,
      recording: false,
      beat: 0,
    };

    for (let i = 0; i < this.numSteps; i++) {
      steps[i] = {
        beat: i + 1,
        note: '',
      };
    }

    this.currentNote = '';
  }

  static propTypes = {
    currentlyPlaying: PropTypes.array.isRequired,
  };

  componentDidMount() {
    Tone.Transport.scheduleRepeat((time) => {
      // reminder to use the callback time to schedule events
      if (
        this.currentNote !== '' &&
        this.steps[this.state.beat].note !== 'hold'
      ) {
        //synth.triggerRelease(this.currentNote, time);
        this.currentNote = '';
      }
      if (
        this.steps[this.state.beat].note !== '' &&
        this.steps[this.state.beat].note !== 'rest' &&
        this.steps[this.state.beat].note !== 'hold'
      ) {
        synth.triggerAttackRelease(
          this.steps[this.state.beat].note, '8n',
          time,
          0.3
        );
        this.currentNote = this.steps[this.state.beat].note;
      }
      this.updateActiveBeat((this.state.beat + 1) % this.numSteps);
      if (this.steps[this.state.beat].note === '') {
        this.updateActiveBeat(0);
        this.currentNote = this.steps[0].note;
      }
    }, '8n');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.recording) {
      if (prevProps.currentlyPlaying !== this.props.currentlyPlaying) {
        if (this.props.currentlyPlaying.length === 0) {
          this.advanceSequence();
        }
        else {
          this.props.currentlyPlaying.forEach((note) => {
            this.addToSequence(note);
          });
        }
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.recording) {
      if ((nextProps.currentlyPlaying !== this.props.currentlyPlaying) || (nextState.beat !== this.state.beat)) {
        return true;
      }
      return false;
    }
    else {
      return true;
    }
  }

  handleSeqStart = (e) => {
    if (this.state.started) {
      Tone.Transport.stop();
      this.setState({ started: false, beat: 0 });
      synth.triggerRelease(this.currentNote, Tone.now());
      this.currentNote = '';
    } else {
      if (this.state.recording) this.disableRecording();

      this.setState({ started: false, beat: 0 });
      Tone.Transport.start();
      this.setState({ started: true });
    }
  };

  handleSeqRecord = (e) => {
    this.setState({ started: false, beat: 0 });
    if (this.state.started) {
      Tone.Transport.stop();
    }
    if (!this.state.recording) {
      this.enableRecording();
    } else {
      this.disableRecording();
    }
  };

  enableRecording = () => {
    this.setState({ recording: true });
    this.currentStepNotes = [];
  };

  disableRecording = () => {
    this.setState({ recording: false });
    this.currentStepNotes = null;
  };

  addToSequence = (note) => {
    if (!this.currentStepNotes.includes(note)) {
      this.currentStepNotes.push(note);
      this.steps[this.state.beat].note = this.currentStepNotes;
    }
  };

  advanceSequence = () => {
    this.currentStepNotes = [];
    this.updateActiveBeat((this.state.beat + 1) % this.numSteps);
  };

  handleNoteUpdate = (e) => {
    e.stopPropagation();
    let val = e.target.value;
    if (
      /['A','B','C','D','E','F','G']{1}#{0,1}[1-9]{1}/.exec(val) ||
      val === ''
    ) {
      this.steps[parseInt(e.target.attributes.beat.value) - 1].note = val;
    }
  };

  updateActiveBeat = (newBeat) => {
    this.setState({ beat: newBeat });
  };

  raiseBpm = (e) => {
    const newBpm = this.state.bpm + 1;
    this.setState({ bpm: newBpm });
    Tone.Transport.bpm.value = this.state.bpm;
  };

  lowerBpm = (e) => {
    const newBpm = this.state.bpm - 1;
    this.setState({ bpm: newBpm });
    Tone.Transport.bpm.value = this.state.bpm;
  };

  addRest = (e) => {
    if (this.state.recording) {
      this.steps[this.state.beat].note = 'rest';
      this.updateActiveBeat((this.state.beat + 1) % this.numSteps);
    }
  };

  addHold = (e) => {
    if (this.state.recording) {
      this.steps[this.state.beat].note = 'hold';
      this.updateActiveBeat((this.state.beat + 1) % this.numSteps);
    }
  };

  clearEntry = (e) => {
    if (this.state.recording) {
      this.steps[this.state.beat].note = '';
      this.updateActiveBeat((this.state.beat + 1) % this.numSteps);
    }
  };

  renderControls = () => {
    return (
      <div className='centerX'>
        <div className="seqControls">
          <div
            className="seqStart"
            role="button"
            onMouseDown={this.handleSeqStart}
          ></div>
          <div
            className="seqRecord"
            role="button"
            onMouseDown={this.handleSeqRecord}
          ></div>
          <div className="bpmBox">
            <div className='centerY'>
              <div className="bpmDisplayBox">
                <div className="bpmDisplay">
                  <span>{this.state.bpm}</span>
                </div>
              </div>
            </div>
            <div className="bpmButtons">
              <div className="bpmUp" onMouseDown={this.raiseBpm} />
              <div className="bpmDown" onMouseDown={this.lowerBpm} />
            </div>
          </div>
          <div className="seqCommands centerY">
            <div className="rest" onMouseDown={this.addRest}>
              <span>REST</span>
            </div>
            {/*<div className="hold" onMouseDown={this.addHold}>
              <span>hold</span>
            </div>*/}
            <div className="clear" onMouseDown={this.clearEntry}>
              <span>CLEAR</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderSequence = (steps) => {
    return (
      <div className='centerX'>
        <div className="stepsContainer">
          <div className="steps">
            {steps.map((step) => {
              return (
                <SequencerStep
                  key={step.beat}
                  step={step}
                  steps={this.steps}
                  beat={this.state.beat}
                  updateActiveBeat={this.updateActiveBeat}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className='sequencer'>
        {this.renderControls()}
        {this.renderSequence(this.steps)}
      </div>
    );
  }
}
