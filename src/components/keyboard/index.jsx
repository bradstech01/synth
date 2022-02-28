import React, { Component } from 'react';
import {PianoKey} from '../pianoKey';
import * as Tone from 'tone';

export class Keyboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className='keyContainer'>
          <div className='keyWhiteContainer'>
            <PianoKey note={'C4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'Q'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'D4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'W'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'E4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'E'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'F4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'R'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'G4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'T'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'A4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'Y'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'B4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'U'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'C5'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'I'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
          </div>
          <div className='keyBlackContainer'>
            <PianoKey note={'C#4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'2'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'D#4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'3'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <div className='keyHidden keyBlack'/>
            <PianoKey note={'F#4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'5'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'G#4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'6'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'A#4'} currentlyPlaying={this.props.currentlyPlaying} triggerKey={'7'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <div className='keyHidden keyBlack'/>
          </div>
        </div>
      </div>
    );
  }
}
