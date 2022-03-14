import React from 'react';
import {PianoKey} from '../pianoKey';

/**
 * Component containing the visual keyboard; the "money maker", as it were.
 * TODO: Fix current hacky CSS for the keyboard, so that it appropriately flexes and is better modularized for different viewports
 */
export class Keyboard extends React.Component {
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

  renderPianoKey(note,octave,octaveShift,triggerKey) {
    return (
      <PianoKey note={note+(octave+octaveShift)} 
      isMouseDown={this.state.isMouseDown} 
      currentlyPlaying={this.props.currentlyPlaying.includes(note+(octave+octaveShift))} 
      triggerKey={triggerKey} 
      triggerNote={this.props.triggerNote} 
      triggerRelease={this.props.triggerRelease} 
      onMouseDown={this.props.onMouseDown} 
      onMouseUp={this.props.onMouseUp}/>
    );
  }

  render() {
    return (
      <div role='button'>
        <div className='keyContainer' role='button'>
          <div className='keyWhiteContainer' role='button'>
            {this.renderPianoKey('C',3,0,'Q')}
            {this.renderPianoKey('D',3,0,'W')}
            {this.renderPianoKey('E',3,0,'E')}
            {this.renderPianoKey('F',3,0,'R')}
            {this.renderPianoKey('G',3,0,'T')}
            {this.renderPianoKey('A',3,0,'Y')}
            {this.renderPianoKey('B',3,0,'U')}
            {this.renderPianoKey('C',4,0,'I')}
          </div>
          <div className='keyBlackContainer' role='button'>
            {this.renderPianoKey('C#',3,0,'2')}
            {this.renderPianoKey('D#',3,0,'3')}
            <div className='keyHidden keyBlack' role='button'/>
            {this.renderPianoKey('F#',3,0,'5')}
            {this.renderPianoKey('G#',3,0,'6')}
            {this.renderPianoKey('A#',3,0,'7')}
            <div className='keyHidden keyBlack' role='button'/>
          </div>
        </div>
      </div>
    );
  }
}
