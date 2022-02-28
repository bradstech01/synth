import './style.css';
import * as Tone from 'tone';
import React, { Component } from 'react';
import {Visualizer} from '../visualizer';
import {MusicGui} from '../musicGui';
import {SettingsGui} from '../settingsGui';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasToneStarted: false,
      currentlyPlaying: []
    };

    this.keyMap = {
      q: 'C4',
      2: 'C#4',
      w: 'D4',
      3: 'D#4',
      e: 'E4',
      r: 'F4',
      5: 'F#4',
      t: 'G4',
      6: 'G#4',
      y: 'A4',
      7: 'A#4',
      u: 'B4',
      i: 'C5'
    };

    console.log('Set up currently playing; ');
    console.log(this.state.currentlyPlaying);
    this.setUpMIDI();

    this.startTone = this.startTone.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  async startTone(e) {
    if (!this.state.hasToneStarted){
      await Tone.start();
      console.log('Tone engine started!');

      const synth = new Tone.PolySynth({
        oscillator: {
          type: 'sawtooth'
        },
      });

      this.synth = synth;
      this.synth.toDestination();



      this.setState({
        hasToneStarted: true,
      });
    }
    else {
      //remove key listeners to start Tone, add key listeners to handle notes
      document.removeEventListener('keydown', this.startTone);
      document.removeEventListener('onclick', this.startTone);
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  }

  componentDidMount() {
    //key listeners to start things; audio API doesn't work until user has pressed at least one button
    document.addEventListener('keydown', this.startTone);
    document.addEventListener('onclick', this.startTone);
  }

  //handles the key press within app; does not get passed around
  handleKeyPress(e) {
    if(this.keyMap[e.key]) {
      if (!this.state.currentlyPlaying.includes(this.keyMap[e.key])) {
        console.log('pressed key');
        console.log(this.keyMap[e.key]);
        let newPlaying = this.state.currentlyPlaying;
        newPlaying.push(this.keyMap[e.key]);
        this.setState({
          currentlyPlaying: newPlaying
        })
        console.log(this.state.currentlyPlaying);
      }
    }
  }

  //handles the key release within app; does not get passed around
  handleKeyRelease(e) {
    if(this.keyMap[e.key]) {
      if (this.state.currentlyPlaying.includes(this.keyMap[e.key])) {
        let newPlaying = this.state.currentlyPlaying.filter((value) => {
          return value !== this.keyMap[e.key];
        });
        this.setState({
          currentlyPlaying: newPlaying
        })
      }
    }
  }

  //callback passed to piano keys to trigger attack. arrow function to maintain "this"
  triggerNote = (note) => {
    console.log('Note triggered!');
    console.log(note);
    this.synth.triggerAttack(note,Tone.now());
  }
  //callback passed to piano keys to trigger release. arrow function to maintain "this"
  triggerRelease = (note) => {
    console.log('Note released!');
    this.synth.triggerRelease(note,Tone.now());
  }

  setUpMIDI() {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
      navigator.requestMIDIAccess({
        sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
      }).then(onMIDISuccess, onMIDIFailure);
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
        console.log('No access to MIDI devices or your browser doesn\'t support WebMIDI API. Please use WebMIDIAPIShim ' + e);
    }
  }

  renderSettingsGui() {
    if (this.state.hasToneStarted) {
      return (
        <div className='settingsGui'>
          <SettingsGui />
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

  //Only renders music GUI once the synth engine has actually loaded
  renderMusicGui() {
    if (this.state.hasToneStarted) {
      return (
        <div className='musicGui'>
          <MusicGui
            currentlyPlaying={this.state.currentlyPlaying}
            triggerNote={this.triggerNote}
            triggerRelease={this.triggerRelease}
            synth={this.synth}
            keyMap={this.keyMap}
            background='#12f'
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
        {this.renderSettingsGui()}
        {this.renderMusicGui()}
      </div>
    );
  }
}

function app() {
  return (
      <App />
  );
}

export default app;
