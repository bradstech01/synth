import logo from '../../logo.svg';
import './style.css';
import * as Tone from 'tone';
import React, { Component } from 'react';

export class PianoKey extends Component {
  constructor(props) {
    super(props);
    this.classList = 'pianoKey ' + (this.props.note.length < 3 ? 'keyWhite' : 'keyBlack');
    this.sendMouseDown = this.sendMouseDown.bind(this);
    this.sendMouseUp = this.sendMouseUp.bind(this);
  }

  sendMouseDown() {
    this.props.onMouseDown(this.props.note);
  }

  sendMouseUp() {
    this.props.onMouseUp(this.props.note);
  }

  componentDidUpdate() {
    if (this.props.currentlyPlaying.includes(this.props.note)) {
      this.props.triggerNote(this.props.note);
    }
    else if (!this.props.currentlyPlaying.includes(this.props.note)) {
      this.props.triggerRelease(this.props.note);
    }
  }

  render() {
    return (
      <div>
        <div className={this.classList + (this.props.currentlyPlaying.includes(this.props.note) ? ' keyPressed' : '')} onMouseDown={this.sendMouseDown} onMouseUp={this.sendMouseUp}>
          <p className={'keyText'}>
            {this.props.triggerKey}
          </p>
        </div>
      </div>
    );
  }
}
