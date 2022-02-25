import logo from '../../logo.svg';
import './style.css';
import * as Tone from 'tone';
import React, { Component } from 'react';

export class PianoKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      octave: props.octave,
      classList: 'pianoKey ' + (props.note.replace('+','').length < 2 ? 'keyWhite' : 'keyBlack'),
      note: this.props.note,
    };

    this.isPlaying = false;

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyRelease = this.handleKeyRelease.bind(this);
  }

  handleKeyPress = (e) => {
    let keyMap = {
      81: 'C',
      50: 'C#',
      87: 'D',
      51: 'D#',
      69: 'E',
      82: 'F',
      53: 'F#',
      84: 'G',
      54: 'G#',
      89: 'A',
      55: 'A#',
      85: 'B',
      73: 'C+'
    };

    if (keyMap[e.keyCode] === this.state.note) {
      this.props.triggerNote(this.state.note.replace('+','') + this.state.octave);
      this.setState({
        ...this.state,
        isPlaying: true,
      });

      if(!this.state.classList.includes('keyPressed')) {
        this.setState({
          ...this.state,
          classList: this.state.classList + ' keyPressed',
        });
      }
    }
  }

  handleKeyRelease = (e) => {
    let keyMap = {
      81: 'C',
      50: 'C#',
      87: 'D',
      51: 'D#',
      69: 'E',
      82: 'F',
      53: 'F#',
      84: 'G',
      54: 'G#',
      89: 'A',
      55: 'A#',
      85: 'B',
      73: 'C+'
    };

    if (keyMap[e.keyCode] === this.state.note) {
      this.props.releaseNote(this.state.note.replace('+','') + this.state.octave);
      this.setState({
        ...this.state,
        isPlaying: false,
      });
      if(this.state.classList.includes('keyPressed')) {
        this.setState({
          classList: this.state.classList.replace(' keyPressed',''),
        });
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    document.addEventListener('keyup', this.handleKeyRelease);
  }

  render() {
    return (
      <div>
        <div className={this.state.classList}
          onMouseDown={(e) => {this.props.triggerNote(e)}}
          onMouseUp={(e) => {this.props.releaseNote(e)}}
        >
          <p className={'keyText'}>
            {this.props.triggerKey}
          </p>
        </div>
      </div>
    );
  }
}
