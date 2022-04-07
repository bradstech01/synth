import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import keyMap from '../../scripts/keyMap.js';
import { SequencerStep } from '../sequencerStep/index.jsx';

export class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    let steps = [];

    for (let i = 0; i < 8; i++) {
      steps[i] = {
        beat: i + 1,
        note: 'rest',
      };
    }

    this.state = {
      bpm: 120,
      steps: steps,
      started: false,
      recording: false,
      beat: 0,
    };

    this.currentNote = '';
  }

  static propTypes = {
    synth: PropTypes.object.isRequired,
  };

  componentDidMount() {
    Tone.Transport.scheduleRepeat((time) => {
      // use the callback time to schedule events
      if (
        this.currentNote !== '' &&
        this.state.steps[this.state.beat].note !== 'hold'
      ) {
        this.props.synth.triggerRelease(this.currentNote, time);
        this.currentNote = '';
      }
      if (
        this.state.steps[this.state.beat].note !== 'rest' &&
        this.state.steps[this.state.beat].note !== 'hold'
      ) {
        this.props.synth.triggerAttack(
          this.state.steps[this.state.beat].note,
          time,
          0.3
        );
        this.currentNote = this.state.steps[this.state.beat].note;
      }
      this.setState({ beat: (this.state.beat + 1) % 8 });
    }, '8n');
  }

  handleSeqStart = (e) => {
    if (this.state.started) {
      Tone.Transport.stop();
      this.setState({ started: false, beat: 0 });
      this.props.synth.triggerRelease(this.currentNote, Tone.now());
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
    document.addEventListener('keydown', this.addToSequence);
    document.addEventListener('keyup', this.advanceSequence);
    this.currentStepNotes = [];
  };

  disableRecording = () => {
    this.setState({ recording: false });
    document.removeEventListener('keydown', this.addToSequence);
    document.removeEventListener('keyup', this.advanceSequence);
    this.currentStepNotes = null;
  };

  addToSequence = (e) => {
    let note = keyMap(e.key);
    if (!this.currentStepNotes.includes(note)) {
      this.currentStepNotes.push(note);
      let newState = this.state;
      newState.steps[this.state.beat].note = this.currentStepNotes;
      this.setState(newState);
    }
  };

  advanceSequence = (e) => {
    let note = keyMap(e.key);
    this.currentStepNotes = this.currentStepNotes.filter((value) => {
      return value !== note;
    });
    if (this.currentStepNotes.length === 0) {
      this.setState({ beat: (this.state.beat + 1) % 8 });
    }
  };

  handleNoteUpdate = (e) => {
    e.stopPropagation();
    let val = e.target.value;
    if (
      /['A','B','C','D','E','F','G']{1}#{0,1}[1-9]{1}/.exec(val) ||
      val === ''
    ) {
      let steps = Object.assign({}, this.state.steps);
      steps[parseInt(e.target.attributes.beat.value) - 1].note = val;
      this.setState({ steps: steps });
    }
  };

  updateActiveBeat = (beat) => {
    this.setState({ beat: beat });
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
      let newState = Object.assign({}, this.state);
      newState.steps[this.state.beat].note = 'rest';
      newState.beat = (this.state.beat + 1) % 8;
      this.setState(newState);
    }
  };

  addHold = (e) => {
    if (this.state.recording) {
      let newState = this.state;
      newState.steps[this.state.beat].note = 'hold';
      newState.beat = (this.state.beat + 1) % 8;
      this.setState(newState);
    }
  };

  renderControls = () => {
    return (
      <div className="seqControls grid gridCenter">
        <div
          className="seqStart gr1 gc1 gridItem"
          role="button"
          onMouseDown={this.handleSeqStart}
        ></div>
        <div
          className="seqRecord gr1 gc2 gridItem"
          role="button"
          onMouseDown={this.handleSeqRecord}
        ></div>
        <div className="bpmDisplay gr1 gc3 gridItem">{this.state.bpm}</div>
        <div className="bpmButtons grid gr1 gc4">
          <div className="bpmUp gr1 gc1 marg5" onMouseDown={this.raiseBpm} />
          <div className="bpmDown gr2 gc1 marg5" onMouseDown={this.lowerBpm} />
        </div>
        <div className="grid gr1 gc5">
          <div className="rest gr1 gc1" onMouseDown={this.addRest}>
            rest
          </div>
          <div className="hold gr2 gc1" onMouseDown={this.addHold}>
            hold
          </div>
        </div>
      </div>
    );
  };

  renderSequence = (steps) => {
    return (
      <div className="steps grid gridCenter">
        {steps.map((step) => {
          return (
            <SequencerStep
              key={step.beat}
              step={step}
              steps={this.state.steps}
              beat={this.state.beat}
              beatActivator={this.updateActiveBeat}
            />
          );
        })}
      </div>
    );
  };

  renderStep = (step) => {};

  render() {
    return (
      <React.Fragment>
        {this.renderControls()}
        {this.renderSequence(this.state.steps)}
      </React.Fragment>
    );
  }
}
