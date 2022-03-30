import './style.scss';
import * as Tone from 'tone';
import React from 'react';
import {Visualizer} from '../visualizer';
import {MusicGui} from '../musicGui';
import {SettingsGui} from '../settingsGui';
import {Sequencer} from '../sequencer';
import keyMap from '../../scripts/keyMap.js';

  /**
   * Root of the app. Contains a visualizer, a music GUI (keyboard & related controls), and a settings GUI to control the synth.
   */

class Synth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToneStarted: false,
      currentlyPlaying: []
    };

    this.setUpMIDI();
    const reverb = new Tone.Reverb(1).toDestination();
    const synth = new Tone.PolySynth(Tone.MonoSynth).connect(reverb).toDestination();
    Tone.Destination.volume.value = -10

    const audioCtx = Tone.getContext();

    this.synth = synth;

    this.synth.set({
      filter: {
        frequency: 0
      },
      filterEnvelope: {
        attack: 0,
        decay: 2,
        sustain: 0,
        release: 1
      }
    });
    this.audioCtx = audioCtx;

    this.startTone = this.startTone.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown',this.startTone);
    document.addEventListener('mousedown',this.startTone);
  }

  async startTone(e) {
    if (!this.state.hasToneStarted){
      await Tone.start();
      this.setState({
        hasToneStarted: true,
      });
      this.context = Tone.context;
      document.removeEventListener('keydown',this.startTone);
      document.removeEventListener('mousedown',this.startTone);
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  }

  //Event handler functions
  //handles the key press within app; does not get passed around
  handleKeyPress = (e) => {
    if(keyMap(e.key)) {
      this.addToCurrentlyPlaying(keyMap(e.key));
    }
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    if(keyMap(e.key)) {
      this.removeFromCurrentlyPlaying(keyMap(e.key));
    }
  };

  addToCurrentlyPlaying = (note) => {
    if (!this.state.currentlyPlaying.includes(note)) {
      let newPlaying = this.state.currentlyPlaying;
      newPlaying.push(note);
      this.setState({
        currentlyPlaying: newPlaying
      })
    }
  };

  removeFromCurrentlyPlaying = (note) => {
    if (this.state.currentlyPlaying.includes(note)) {
      let newPlaying = this.state.currentlyPlaying.filter((value) => {
        return value !== note;
      });
      this.setState({
        currentlyPlaying: newPlaying
      })
    }
  }
  
  //callback passed to piano keys to trigger attack. arrow function to maintain "this"
  triggerNote = (note) => {
      this.synth.triggerAttack(note,Tone.now());
  }

  //callback passed to piano keys to trigger release. arrow function to maintain "this"
  triggerRelease = (note) => {
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

  //rendering methods
  renderSettingsGui() {
    if (this.state.hasToneStarted) {
      return (
        <div className='settingsGui'>
          <SettingsGui 
          synth={this.synth}/>
        </div>
      ); 
    }
  }

  renderMusicGui() {
    if (this.state.hasToneStarted) {
      return (
        <div className='musicGui'>
          <MusicGui
            currentlyPlaying={this.state.currentlyPlaying}
            triggerNote={this.triggerNote}
            triggerRelease={this.triggerRelease}
            onMouseDown={this.addToCurrentlyPlaying}
            onMouseUp={this.removeFromCurrentlyPlaying}
          />
        </div>
      );
    }
    else {
      return (
        <div className='splash'>
          <h1>a synth</h1>
          <h2>press any button to begin...</h2>
        </div>      
      )
    }
  }

  renderVisualizer() {
    if (this.state.hasToneStarted) {
      return (
        <div className='visualizer'>
          <Visualizer
            audioCtx = {this.audioCtx}
            synth = {this.synth}
          />
        </div>
      );
    }
  }

  renderSequencer() {
    if (this.state.hasToneStarted) {
      return (
        <div className='sequencer'>
          <Sequencer
            currentlyPlaying={this.state.currentlyPlaying}
            synth = {this.synth}
          />
        </div>
      );
    }
  }

  render() {
    return (
      <div className='wrapper'>
        {this.renderVisualizer()}
        {this.renderSequencer()}
        {this.renderSettingsGui()}
        {this.renderMusicGui()}
      </div>
    );
  }
}

function app() {
  return (
      <Synth />
  );
}

export default app;