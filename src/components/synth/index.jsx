import './style.scss';
import * as Tone from 'tone';
import React from 'react';
import {Visualizer} from '../visualizer';
import {MusicGui} from '../musicGui';
import {SettingsGui} from '../settingsGui';

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

    this.keyMap = {
      q: 'C3',
      2: 'C#3',
      w: 'D3',
      3: 'D#3',
      e: 'E3',
      r: 'F3',
      5: 'F#3',
      t: 'G3',
      6: 'G#3',
      y: 'A3',
      7: 'A#3',
      u: 'B3',
      i: 'C4'
    };

    this.setUpMIDI();
    const reverb = new Tone.Reverb(2).toDestination();
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
    if(this.keyMap[e.key]) {
      this.addToCurrentlyPlaying(this.keyMap[e.key]);
    }
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    if(this.keyMap[e.key]) {
      this.removeFromCurrentlyPlaying(this.keyMap[e.key]);
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

  //Only renders music GUI once the synth engine has actually loaded
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

  //Only renders visualizer once the synth engine has actually loaded
  //*not yet implemented*
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

  render() {
    return (
      <div className='wrapper'>
        {this.renderVisualizer()}
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
