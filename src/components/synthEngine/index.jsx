/*
import './css/App.css';
import * as Tone from 'tone';
import React, { Component } from 'react';
import {Sound} from 'pts';

export class SynthEngine extends React.Component {
  constructor(props) {
    super(props);

    this.synth = new Tone.MonoSynth({
      oscillator: {
          type: 'sine'
        },
      });
    // play using tone.js instead of Pts
    this.synth.toDestination();

    // create Pts Sound instance
    this.sound = Sound.from( this.synth, this.synth.context );
    this.sound.analyze(4096, -300, 0 ,0);
    this.state.frequency = 0;

    this.setUpMIDI();

    this.isPlaying = false;

    //bind functions to avoid 'this' issues
    this.startTone = this.startTone.bind(this);
    this.updateFrequency = this.updateFrequency.bind(this);
  }

  async startTone(e) {
    if (!this.hasToneStarted){
      await Tone.start();
      console.log('Tone engine started!');
      this.hasToneStarted = true;
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.startTone);
    document.addEventListener('onclick', this.startTone);
    this.props.onSynthLoad({
      sound: this.sound,
      frequency: this.state.frequency,
    });
  }

  componentShouldUpdate() {
    return false;
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

  triggerNote(note) {
    if (!this.isPlaying) {
      console.log('time: ');
      console.log(Tone.now());

      this.synth.triggerAttack(note, '4n', Tone.now());
      this.props.updateFrequencyCallback(this.props.synth.toFrequency(this.state.note.replace('+','') + this.state.octave));
      this.setState({
        octave: this.state.octave,
        classList: this.state.classList + ' keyPressed',
        note: this.state.note,
      })
      this.isPlaying = true;
    }
  }

  releaseNote(note) {
    if (this.isPlaying) {
      this.props.synth.triggerRelease();
      this.props.updateFrequencyCallback(0);
      this.setState({
        octave: this.state.octave,
        classList: this.state.classList.replace(' keyPressed',''),
        note: this.state.note,
      });
      this.isPlaying = false;
    }
  }

  updateFrequency(frequencyData) {
    this.setState({frequency: frequencyData});
  }

  render() {
    return (null);
  }
}
*/
