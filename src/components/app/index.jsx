import './style.css';
import * as Tone from 'tone';
import React, { Component } from 'react';
import store from './store';
import { Provider } from 'react-redux';
import {Visualizer} from '../visualizer';
import {MusicGui} from '../musicGui';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setUpMIDI();

    this.isPlaying = false;

    this.startTone = this.startTone.bind(this);
  }

  async startTone(e) {
    if (!this.state.hasToneStarted){
      await Tone.start();
      console.log('Tone engine started!');

      const limiter = new Tone.Limiter(-5).toDestination();
      const synth = new Tone.PolySynth({
        oscillator: {
          type: 'sawtooth'
        },
      });
      synth.connect(limiter);

      this.synth = synth;
      this.synth.toDestination();

      this.setState({
        hasToneStarted: true,
        frequency: 0,
      });
    }
    else {
      document.removeEventListener('keydown', this.startTone);
      document.removeEventListener('onclick', this.startTone);
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.startTone);
    document.addEventListener('onclick', this.startTone);
  }

  updateFrequency = (frequencyData) => {
    this.setState({frequency: this.synth.toFrequency(frequencyData)});
  }

  setUpMIDI() {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
      }).then(onMIDISuccess, onMIDIFailure);
    } else {
      console.log("No MIDI support in your browser. (As of EOY 2020, only Chrome has support enabled by default)");
    }

    // midi functions
    function onMIDISuccess(midiAccess) {
      // when we get a succesful response, run this code
      console.log('MIDI Access Object', midiAccess);
    }

    function onMIDIFailure(e) {
        // when we get a failed response, run this code
        console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
    }
  }

  triggerNote = (note) => {
    if (!this.isPlaying) {
      console.log('trigger time: ');
      console.log(Tone.now());

      this.synth.triggerAttack(note, '+.01');

      console.log(this.synth);
      console.log(this.synth.state);
      this.updateFrequency(note);
      this.setState({
        octave: this.state.octave,
        classList: this.state.classList + ' keyPressed',
        note: this.state.note,
      });

      this.isPlaying = true;
    }
  }

  releaseNote = (note) => {
    console.log('Hmm....');
    console.log(this.isPlaying);
    if (this.isPlaying) {
      console.log('yahoo!');
      this.synth.triggerRelease(note, '+.02');
      this.updateFrequency(0);
      this.setState({
        octave: this.state.octave,
        classList: this.state.classList.replace(' keyPressed',''),
        note: this.state.note,
      });

      this.isPlaying = false;
    }
  }

  //Only renders music GUI once the synth engine has actually loaded
  renderMusicGui() {
    if (this.sound && this.state.hasToneStarted) {
      return (
        <div className='musicGui'>
          <MusicGui
            triggerNote={this.triggerNote}
            releaseNote={this.releaseNote}
            background='#12f'
          />
        </div>
      );
    }
    else {
      return null;
    }
  }

  //Only renders visualizer once the synth engine has actually loaded
  renderVisualizer() {
    if (this.sound && this.state.hasToneStarted) {
      return (
        <div className='visualizer'>
          <Visualizer
            sound={this.sound}
            frequency={this.state.frequency}
            background='#0cf'
            play={true}
          />
        </div>
      );
    }
    else {
      return (
        <div className='splash'>
          <p>Press any button...</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderMusicGui()}
      </div>
    );
  }
}

function app() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default app;
