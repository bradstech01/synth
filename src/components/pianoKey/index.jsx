import React from 'react';

/**
 * Piano key element, which notably holds event listeners for mouse/touch input for each individual key. 
 * Renders based on whether the note is currently being played.
 * TODO: Convert to functional component as it is no longer stateful
 * TODO: Try to hack through issues with touch support
 */
export class PianoKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false
    }
  }

  sendMouseDown = (e) => {
    e.preventDefault();
    if (e.type !== 'mouseenter' || (e.type === 'mouseenter' && this.props.isMouseDown === true)) {
      this.props.onMouseDown(this.props.note);
    }
  };

  sendMouseUp = (e) => {
    e.preventDefault();
    this.props.onMouseUp(this.props.note);
  };

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
      <div role='button' className={'pianoKey ' + (this.props.note.length < 3 ? 'keyWhite' : 'keyBlack') + (this.props.currentlyPlaying ? ' keyPressed' : '')} 
        onMouseDown={this.sendMouseDown} 
        onMouseUp={this.sendMouseUp} 
        onMouseLeave={this.sendMouseUp} 
        onMouseEnter={this.sendMouseDown} 
        onTouchStart={this.sendMouseDown} 
        onTouchEnd={this.sendMouseUp}
        onTouchMove={this.sendMouseDown}
        onTouchCancel={this.sendMouseUp}>
        <p role='button' className={'keyText'}>
          {this.props.triggerKey}
        </p>
      </div>
    );
  }
}
