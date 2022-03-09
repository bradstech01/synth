//import './style.css';
import React, { Component } from 'react';

export class PianoKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
    this.classList = 'pianoKey ' + (this.props.note.length < 3 ? 'keyWhite' : 'keyBlack');
    this.sendMouseDown = this.sendMouseDown.bind(this);
    this.sendMouseUp = this.sendMouseUp.bind(this);
  }

  sendMouseDown(e) {
    if (e.type !== 'mouseenter' || (e.type === 'mouseenter' && this.props.isMouseDown === true)) {
      this.props.onMouseDown(this.props.note);
    }
  }

  sendMouseUp(e) {
    this.props.onMouseUp(this.props.note);
  }



  shouldComponentUpdate(nextProps,nextState) {
    if (this.props.currentlyPlaying !== nextProps.currentlyPlaying) return true;
    else return false;
  }

  componentDidUpdate(prevProps,prevState) {
    if (this.props.currentlyPlaying) this.props.triggerNote(this.props.note);
    else this.props.triggerRelease(this.props.note);
  }

  render() {
    return (
      <div>
        <div className={this.classList + (this.props.currentlyPlaying ? ' keyPressed' : '')} 
        onMouseDown={this.sendMouseDown} onMouseUp={this.sendMouseUp} onMouseLeave={this.sendMouseUp} onMouseEnter={this.sendMouseDown}>
          <p className={'keyText'}>
            {this.props.triggerKey}
          </p>
        </div>
      </div>
    );
  }
}
