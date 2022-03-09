import React, { Component } from 'react';
import {PianoKey} from '../pianoKey';

export class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false
    }
    document.addEventListener('mousedown',this.setMouseFlag)
    document.addEventListener('mouseup',this.setMouseFlag)
    document.addEventListener('mouseleave',this.setMouseFlag)
  }

  setMouseFlag = e => {
    if (e.type === 'mousedown') {
      this.setState({
        isMouseDown: true
      });
    }
    else {
      this.setState({
        isMouseDown: false
      });    
    }
  }

  render() {
    return (
      <div>
        <div className='keyContainer'>
          <div className='keyWhiteContainer'>
            <PianoKey note={'C4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('C4')} triggerKey={'Q'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'D4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('D4')} triggerKey={'W'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'E4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('E4')} triggerKey={'E'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'F4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('F4')} triggerKey={'R'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'G4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('G4')} triggerKey={'T'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'A4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('A4')} triggerKey={'Y'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'B4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('B4')} triggerKey={'U'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'C5'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('C5')} triggerKey={'I'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
          </div>
          <div className='keyBlackContainer'>
            <PianoKey note={'C#4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('C#4')} triggerKey={'2'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'D#4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('D#4')} triggerKey={'3'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <div className='keyHidden keyBlack'/>
            <PianoKey note={'F#4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('F#4')} triggerKey={'5'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'G#4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('G#4')} triggerKey={'6'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'A#4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('A#4')} triggerKey={'7'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <div className='keyHidden keyBlack'/>
          </div>
        </div>
      </div>
    );
  }
}
