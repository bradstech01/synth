import React, { Component } from 'react';
import {PianoKey} from '../pianoKey';

export class Keyboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false
    };
  }

  componentDidMount() {
    document.addEventListener('mousedown',this.setMouseFlag);
    document.addEventListener('mouseup',this.setMouseFlag);
    document.addEventListener('mouseleave',this.setMouseFlag);
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
            <PianoKey note={'C3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('C3')} triggerKey={'Q'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'D3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('D3')} triggerKey={'W'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'E3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('E3')} triggerKey={'E'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'F3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('F3')} triggerKey={'R'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'G3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('G3')} triggerKey={'T'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'A3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('A3')} triggerKey={'Y'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'B3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('B3')} triggerKey={'U'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'C4'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('C4')} triggerKey={'I'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
          </div>
          <div className='keyBlackContainer'>
            <PianoKey note={'C#3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('C#3')} triggerKey={'2'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'D#3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('D#3')} triggerKey={'3'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <div className='keyHidden keyBlack'/>
            <PianoKey note={'F#3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('F#3')} triggerKey={'5'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'G#3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('G#3')} triggerKey={'6'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <PianoKey note={'A#3'} isMouseDown={this.state.isMouseDown} currentlyPlaying={this.props.currentlyPlaying.includes('A#3')} triggerKey={'7'} triggerNote={this.props.triggerNote} triggerRelease={this.props.triggerRelease} onMouseDown={this.props.onMouseDown} onMouseUp={this.props.onMouseUp}/>
            <div className='keyHidden keyBlack'/>
          </div>
        </div>
      </div>
    );
  }
}
