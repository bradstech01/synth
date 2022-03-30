import React from 'react';
import PropTypes from 'prop-types';
import * as Tone from 'tone';
import keyMap from '../../scripts/keyMap.js';


export class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    let steps = [];

    for (let i = 0; i < 8; i++) {
      steps[i] = {
        beat: i+1,
        note: 'C4',
      }
    }

    this.state = {
      bpm: 120,
      steps: steps,
      started: false,
      recording: false,
      beat: 0
    };
  }

  static propTypes = {
    synth: PropTypes.object.isRequired,
    currentlyPlaying: PropTypes.array.isRequired
  }

  componentDidMount() {
    Tone.Transport.scheduleRepeat((time) => {
      // use the callback time to schedule events
      if(this.state.steps[this.state.beat].note !== '') {
        this.props.synth.triggerAttackRelease(this.state.steps[this.state.beat].note, '8n', time);
      }
      this.setState({beat: ((this.state.beat + 1) % 8)});
    }, '8n');
  }
  
  handleSeqStart = e => {
    if (this.state.started) {
      Tone.Transport.stop();
      this.setState({started: false, beat: 0});
    }
    else {
      this.setState({started: false, beat: 0});
      Tone.Transport.start();
      this.setState({started: true});
    }
  }

  handleSeqRecord = e => {
    this.setState({started: false, beat: 0});
    if (this.state.started) {
      Tone.Transport.stop();
    }
    if (!this.state.recording) {
      console.log('Recording enabled');
      this.setState({recording: true});
      document.addEventListener('keydown', this.addToSequence);
      document.addEventListener('keyup', this.advanceSequence);
      this.currentStepNotes = [];
    }
    else {
      console.log('Recording disabled');
      this.setState({recording: false});
      document.removeEventListener('keydown', this.addToSequence);
      document.removeEventListener('keyup', this.advanceSequence);
      this.currentStepNotes = null;
    }
  }

  addToSequence = e => {
    let note = keyMap(e.key);
    if (!this.currentStepNotes.includes(note)) {
      this.currentStepNotes.push(note);
      let newState = this.state;
      newState.steps[this.state.beat].note = this.currentStepNotes;
      this.setState(newState);
    }
  }

  advanceSequence = e => {
    let note = keyMap(e.key);
    this.currentStepNotes = this.currentStepNotes.filter((value) => {
      return value !== note;
    });
    if (this.currentStepNotes.length === 0) {
      this.setState({beat: ((this.state.beat + 1) % 8)});
    }
  }

  handleNoteUpdate = e => {
    let val = e.target.value;
    if ((/['A','B','C','D','E','F','G']{1}#{0,1}[1-9]{1}/.exec(val)) || val === '') {
      let newState = this.state;
      newState.steps[parseInt(e.target.attributes.beat.value) - 1].note = val;
      this.setState(newState);
    } 
  }

  handleBpmChange = e => {
    let val = e.target.value;
    if (/[0-9]{1,}\.{0,1}[0-9]{1,}/.exec(e.target.value)){
      Tone.Transport.bpm.value = parseFloat(val);
      this.setState({bpm: parseFloat(val)});
    }
  }

  renderControls = () => {
    return (
      <div className='seqControls grid'>
        <div className='seqStart gr1 gc1 gridItem' role='button' onMouseDown={this.handleSeqStart}></div>
        <div className='seqRecord gr1 gc2 gridItem' role='button' onMouseDown={this.handleSeqRecord}></div>
        <input className='bpmControl gr1 gc3 gridItem'
          type='text' 
          defaultValue={this.state.bpm}
          onChange={this.handleBpmChange}
        />
      </div>
    );
  }

  renderSteps = steps => {
    return (
      <div className='steps grid'>
        {steps.map(step => {
          return (
            <div key={step.beat} className={'step gc' + step.beat + ((step.beat % 8 === (this.state.beat+1) % 8) ? ' activeStep' : '')}>
              {step.beat}
              <input className={'gr2 stepInput'} type='text' beat={step.beat} onChange={this.handleNoteUpdate} value={this.state.steps[step.beat-1].note}/>
            </div>
            )
        })}
      </div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this.renderControls()}
        {this.renderSteps(this.state.steps)}
      </React.Fragment>
    );
  }
}
