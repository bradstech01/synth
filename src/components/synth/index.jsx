import './style.scss';
import * as Tone from 'tone';
import React from 'react';
import { Visualizer } from '../visualizer';
import { Keyboard } from '../keyboard';
import { SettingsGui } from '../settingsGui';
import { Sequencer } from '../sequencer';

class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToneStarted: false,
    };

    this.setUpMIDI();
    const synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
    Tone.Destination.volume.value = -18;
    const audioCtx = Tone.getContext();

    this.synth = synth;

    this.synth.set({
      filter: {
        frequency: 0,
        rolloff: -48,
      },
      filterEnvelope: {
        baseFrequency: 20,
        attack: 1,
        decay: 2,
        sustain: 0,
        release: 1,
        octaves: 6,
        attackCurve: 'exponential',
      },
    });
    this.audioCtx = audioCtx;

    this.startTone = this.startTone.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.startTone);
    document.addEventListener('mousedown', this.startTone);
  }

  async startTone(e) {
    if (!this.state.hasToneStarted) {
      await Tone.start();
      this.setState({
        hasToneStarted: true,
      });
      this.context = Tone.context;
      document.removeEventListener('keydown', this.startTone);
      document.removeEventListener('mousedown', this.startTone);
    }
  }

  //callback passed to piano keys to trigger attack. arrow function to maintain "this"
  triggerNote = (note) => {
    this.synth.triggerAttack(note, Tone.now(), 0.3);
  };

  //callback passed to piano keys to trigger release. arrow function to maintain "this"
  triggerRelease = (note) => {
    this.synth.triggerRelease(note, Tone.now());
  };

  setUpMIDI() {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess({
          sysex: false, // this defaults to 'false' and we won't be covering sysex in this article.
        })
        .then(onMIDISuccess, onMIDIFailure);
    } else {
      console.log('No MIDI support in your browser.');
    }

    // midi functions
    function onMIDISuccess(midiAccess) {
      // when we get a succesful response, run this code
      console.log('MIDI Access Object', midiAccess);
    }

    function onMIDIFailure(e) {
      // when we get a failed response, run this code
      console.log(
        "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
          e
      );
    }
  }

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
        <div className="sequencer">
          <Sequencer
            currentlyPlaying={this.state.currentlyPlaying}
            synth={this.synth}
          />
        </div>
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
