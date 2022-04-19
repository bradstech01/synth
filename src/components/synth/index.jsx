import './style.scss';
import * as Tone from 'tone';
import React from 'react';
import { Visualizer } from '../visualizer';
import { Keyboard } from '../keyboard';
import { SettingsGui } from '../settingsGui';
import { Sequencer } from '../sequencer';
import keyMap from '../../scripts/keyMap.js';
import midiMap from '../../scripts/midiMap.js';

class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToneStarted: false,
      currentlyPlaying: [],
      defaultVelocity: .5,
      isMouseDown: false,
      isKeyDown: false,
    };

    this.noteVelocityData = {};

    const synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
    Tone.Destination.volume.value = -12;
    const audioCtx = Tone.getContext();

    this.synth = synth;

    this.synth.set({
      maxPolyphony: 128,
      filter: {
        frequency: 20,
        rolloff: -24,
      },
      filterEnvelope: {
        baseFrequency: 20,
        attack: 0,
        decay: 5,
        sustain: 0,
        release: 1,
        octaves: 5.5,
        attackCurve: 'linear',
        delayCurve: 'linear',
      },
    });
    this.audioCtx = audioCtx;

    this.startTone = this.startTone.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.startTone);
    document.addEventListener('mousedown', this.startTone);
  }

  componentDidUpdate(prevProps, prevState) {
    for (let note of this.state.currentlyPlaying) {
      if (!prevState.currentlyPlaying.includes(note)) this.triggerNote(note, this.noteVelocityData[note]);
    }
    for (let note of prevState.currentlyPlaying) {
      if (!this.state.currentlyPlaying.includes(note)) this.triggerRelease(note);
    }
  }

  async startTone(e) {
    if (!this.state.hasToneStarted) {
      await Tone.start();
      this.setState({
        hasToneStarted: true,
      });
      this.context = Tone.context;
      this.setUpMIDI();

      document.removeEventListener('keydown', this.startTone);
      document.removeEventListener('mousedown', this.startTone);
      document.addEventListener('mousedown', this.setMouseFlag);
      document.addEventListener('mouseup', this.setMouseFlag);
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  }

  //callback passed to piano keys to trigger attack. arrow function to maintain "this"
  triggerNote = (note, velocity) => {
    this.synth.triggerAttack(note, Tone.now(), velocity ? velocity : this.state.defaultVelocity);
  };

  //callback passed to piano keys to trigger release. arrow function to maintain "this"
  triggerRelease = (note) => {
    this.synth.triggerRelease(note, Tone.now());
  };

  handleKeyPress = (e) => {
    if (!this.state.isKeyDown) this.setState({ isKeyDown: true });

    if (keyMap(e.key)) this.addToCurrentlyPlaying(keyMap(e.key));
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    if (keyMap(e.key)) this.removeFromCurrentlyPlaying(keyMap(e.key));

    if (this.state.currentlyPlaying.length === 0)
      this.setState({ isKeyDown: false });
  };

  addToCurrentlyPlaying = (note, velocity) => {
    if (!this.state.currentlyPlaying.includes(note)) {
      let newPlaying = [...this.state.currentlyPlaying];
      newPlaying.push(note);
      this.noteVelocityData[note] = velocity ? velocity : this.state.defaultVelocity;
      this.setState({
        currentlyPlaying: newPlaying,
      });
    }
  };

  removeFromCurrentlyPlaying = (note) => {
    if (this.state.currentlyPlaying.includes(note)) {
      let currentlyPlaying = [...this.state.currentlyPlaying];
      let newPlaying = currentlyPlaying.filter((value) => {
        if (value === note) delete this.noteVelocityData[note];
        return value !== note;
      });
      this.setState({
        currentlyPlaying: newPlaying,
      });
    }
  };

  setMouseFlag = (e) => {
    e.stopPropagation();
    if (e.type === 'mousedown') this.setState({ isMouseDown: true });
    else this.setState({ isMouseDown: false });

    if (!this.state.isKeyDown && this.state.isMouseDown) {
      document.removeEventListener('keydown', this.handleKeyPress);
      document.removeEventListener('keyup', this.handleKeyRelease);
    }
    if (!this.state.isMouseDown) {
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  };

  setUpMIDI() {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess({
          sysex: false, // this defaults to 'false' and we won't be covering sysex in this article.
        })
        .then(this.onMIDISuccess, this.onMIDIFailure);
    } else {
      console.log('No MIDI support in your browser.');
    }
  }

  // midi functions
  onMIDISuccess = (midiAccess) => {
    // when we get a succesful response, run this code
    console.log('MIDI Access Successful', midiAccess);
    for (var input of midiAccess.inputs.values()) {
      input.onmidimessage = this.getMIDIMessage;
    }
  };

  getMIDIMessage = (midiMessage) => {
    const dataArray = midiMessage.data;
    const command = dataArray[0];
    const note = midiMap(dataArray[1]);
    const velocity = (dataArray[2] / 200);
    if (command === 144) {
      this.addToCurrentlyPlaying(note, velocity);
    } else if (command === 128) {
      this.removeFromCurrentlyPlaying(note);
    }
  };

  onMIDIFailure = (e) => {
    // when we get a failed response, run this code
    console.log(
      "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
      e
    );
  };

  //rendering methods
  renderSettingsGui() {
    if (this.state.hasToneStarted) {
      return <SettingsGui synth={this.synth} />;
    }
  }

  renderMusicGui() {
    if (this.state.hasToneStarted) {
      return (
        <div className="musicGui">
          <Keyboard
            triggerNote={this.triggerNote}
            triggerRelease={this.triggerRelease}
            isKeyDown={this.state.isKeyDown}
            isMouseDown={this.state.isMouseDown}
            currentlyPlaying={this.state.currentlyPlaying}
            setMouseFlag={this.setMouseFlag}
            onMouseDown={this.addToCurrentlyPlaying}
            onMouseUp={this.removeFromCurrentlyPlaying}
          />
        </div>
      );
    } else {
      return (
        <div className="splash">
          <h1>a synth</h1>
          <h2>press any button to begin...</h2>
        </div>
      );
    }
  }

  renderVisualizer() {
    if (this.state.hasToneStarted) {
      return (
        <div className="visualizerContainer">
          <div className="visualizer">
            <Visualizer audioCtx={this.audioCtx} synth={this.synth} />
          </div>
        </div>
      );
    }
  }

  renderSequencer() {
    if (this.state.hasToneStarted) {
      return (
        <Sequencer
          currentlyPlaying={this.state.currentlyPlaying}
          synth={this.synth}
        />
      );
    }
  }

  render() {
    return (
      <div className="wrapper">
        {this.renderVisualizer()}
        {this.renderSettingsGui()}
        {this.renderMusicGui()}
        {this.renderSequencer()}
      </div>
    );
  }
}

function app() {
  return <Synth />;
}

export default app;
