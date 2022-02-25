import React, { Component } from 'react';
import {PianoKey} from '../pianoKey';
import * as Tone from 'tone';

export class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octave: 4,
    };
  }

  render() {
    return (
      <div>
        <div className='keyContainer'>
          <div className='keyWhiteContainer'>
            <PianoKey note={'C'} triggerKey={'Q'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'D'} triggerKey={'W'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'E'} triggerKey={'E'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'F'} triggerKey={'R'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'G'} triggerKey={'T'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'A'} triggerKey={'Y'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'B'} triggerKey={'U'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'C+'} triggerKey={'I'} octave={this.state.octave+1} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
          </div>
          <div className='keyBlackContainer'>
            <PianoKey note={'C#'} triggerKey={'2'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'D#'} triggerKey={'3'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <div className='keyHidden keyBlack'/>
            <PianoKey note={'F#'} triggerKey={'5'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'G#'} triggerKey={'6'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <PianoKey note={'A#'} triggerKey={'7'} octave={this.state.octave} triggerNote={this.props.triggerNote} releaseNote={this.props.releaseNote}/>
            <div className='keyHidden keyBlack'/>
          </div>
        </div>
      </div>
    );
  }
}
