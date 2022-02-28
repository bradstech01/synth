import React, { Component } from 'react';
import {PianoKey} from '../pianoKey';
import * as Tone from 'tone';

export class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.data = {
      octave: 4,
    };
  }

  render() {
    return (
      <div>
        <div className='keyContainer'>
          <div className='keyWhiteContainer'>
            <PianoKey note={'C4'} synth={this.propssynth} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'Q'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'D4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'W'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'E4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'E'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'F4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'R'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'G4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'T'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'A4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'Y'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'B4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'U'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'C5'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'I'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
          </div>
          <div className='keyBlackContainer'>
            <PianoKey note={'C#4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'2'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'D#4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'3'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <div className='keyHidden keyBlack'/>
            <PianoKey note={'F#4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'5'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'G#4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'6'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <PianoKey note={'A#4'} keyMap={this.props.keyMap} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'7'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease}/>
            <div className='keyHidden keyBlack'/>
          </div>
        </div>
      </div>
    );
  }
}
