import '../../css/index.scss';
import * as Tone from 'tone';
import React from 'react';
import { Visualizer } from '../visualizer';
import { Keyboard } from '../keyboard';
import { OscillatorSettings } from '../oscillatorSettings';
import { FxSettings } from '../fxSettings';
import { Sequencer } from '../sequencer';
import { NavBar } from '../navBar';

import { keyMap } from '../../scripts/inputMaps.js';
import * as midiFunctions from '../../scripts/midiFunctions.js';
import { handleChange, handleFxChange, getDefaults } from '../../scripts/settingsAPI.js';
import { synth, triggerNote, triggerRelease } from '../../scripts/synthAPI.js';


class Synth extends React.Component {
  constructor(props) {
    super(props);

    let synthSettings = getDefaults();

    this.state = {
      hasToneStarted: false,
      currentlyPlaying: [],
      isKeyDown: false,
      activeView: 'keyboard',
      synthSettings: synthSettings,
    };

    this.isMouseDown = false;
    this.noteVelocityData = {};

    this.startTone = this.startTone.bind(this);
    this.handleChange = handleChange.bind(this);
    this.handleFxChange = handleFxChange.bind(this);
    this.triggerNote = triggerNote.bind(this);
    this.triggerRelease = triggerRelease.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.startTone);
    document.addEventListener('mousedown', this.startTone);
  }

  componentDidUpdate(prevProps, prevState) {
    for (let note of this.state.currentlyPlaying) {
      if (!prevState.currentlyPlaying.includes(note)) this.triggerNote(note, this.noteVelocityData[note]);
    }
    for (let note of prevState.currentlyPlaying) {
      if (!this.state.currentlyPlaying.includes(note)) this.triggerRelease(note);
    }
  }

  //This function is a "wrapper" around the settings API.
  //The callback function is expected to enact the change in Tone.js settings, while this function sets the corresponding React state. 
  updateSettingState = (value, setting, name, cb) => {
    let synthSettings = { ...this.state.synthSettings };
    synthSettings[setting][name] = value;
    cb(value, setting, name);
    this.setState(synthSettings);
  };

  async startTone(e) {
    if (!this.state.hasToneStarted) {
      await Tone.start();
      this.setState({
        hasToneStarted: true,
      });
      midiFunctions.setUpMIDI();

      document.removeEventListener('keydown', this.startTone);
      document.removeEventListener('mousedown', this.startTone);
      document.addEventListener('mousedown', this.setMouseFlag);
      document.addEventListener('mouseup', this.setMouseFlag);
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  }

  handleKeyPress = (e) => {
    if (!this.state.isKeyDown) this.setState({ isKeyDown: true });
    if (keyMap(e.key)) this.addToCurrentlyPlaying(keyMap(e.key));
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    if (keyMap(e.key)) this.removeFromCurrentlyPlaying(keyMap(e.key));
    if (this.state.currentlyPlaying.length === 0)
      this.setState({ isKeyDown: false });
  };

  addToCurrentlyPlaying = (note, velocity) => {
    if (!this.state.currentlyPlaying.includes(note)) {
      let newPlaying = [...this.state.currentlyPlaying];
      newPlaying.push(note);
      this.noteVelocityData[note] = velocity ? velocity : this.state.synthSettings.misc.defaultVelocity;
      this.setState({
        currentlyPlaying: newPlaying,
      });
    }
  };

  removeFromCurrentlyPlaying = (note) => {
    if (this.state.currentlyPlaying.includes(note)) {
      let currentlyPlaying = [...this.state.currentlyPlaying];
      let newPlaying = currentlyPlaying.filter((value) => {
        if (value === note) delete this.noteVelocityData[note];
        return value !== note;
      });
      this.setState({
        currentlyPlaying: newPlaying,
      });
    }
  };

  setMouseFlag = (e) => {
    e.stopPropagation();
    if (e.type === 'mousedown') this.isMouseDown = true;
    else this.isMouseDown = false;

    if (!this.state.isKeyDown && this.isMouseDown) {
      document.removeEventListener('keydown', this.handleKeyPress);
      document.removeEventListener('keyup', this.handleKeyRelease);
    }
    if (!this.isMouseDown) {
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  };

  setActiveView = value => {
    this.setState({ activeView: value });
  };

  //rendering methods
  renderSettings() {
    return (
      <React.Fragment>
        <div className={(this.state.activeView === 'oscillator') ? 'oscSettings' : 'hidden'}>
          <OscillatorSettings
            synthSettings={this.state.synthSettings}
            handleChange={(value, setting, name) => { this.updateSettingState(value, setting, name, this.handleChange); }} />
        </div>
        <div className={(this.state.activeView === 'fx') ? 'fxSettings' : 'hidden'}>
          <FxSettings
            synthSettings={this.state.synthSettings}
            handleFxChange={(value, setting, name) => { this.updateSettingState(value, setting, name, this.handleFxChange); }} />
        </div>
      </React.Fragment>
    );
  }

  renderKeyboard() {
    return (
      <div className='keyboard'>
        <Keyboard
          isKeyDown={this.state.isKeyDown}
          isMouseDown={this.isMouseDown}
          currentlyPlaying={this.state.currentlyPlaying}
          setMouseFlag={this.setMouseFlag}
          onMouseDown={this.addToCurrentlyPlaying}
          onMouseUp={this.removeFromCurrentlyPlaying}
        />
      </div>
    );
  }

  renderVisualizer() {
    return (
      <div className='visualizerContainer'>
        <div className="visualizer">
          <Visualizer />
        </div>
      </div>
    );
  }

  renderMusicGui() {
    return (
      <div className={(this.state.activeView === 'keyboard') ? 'keyboardWrapper' : 'hidden'}>
        {this.renderVisualizer()}
        {this.renderKeyboard()}
      </div>
    );
  }

  renderSequencer() {
    return (
      <div className={(this.state.activeView === 'sequence') ? 'sequencer' : 'hidden'}>
        <Sequencer
          currentlyPlaying={this.state.currentlyPlaying}
        />
      </div>
    );
  }

  render() {
    if (this.state.hasToneStarted) {
      return (
        <div className='app'>
          <NavBar onChange={this.setActiveView} />
          <div className="wrapper">
            {this.renderMusicGui()}
            {this.renderSettings()}
            {this.renderSequencer()}
          </div>
        </div>
      );
    }
    else {
      return (
        <div className="splash">
          <h2>press any button to begin...</h2>
        </div>
      );
    }
  }
}

function app() {
  return <Synth />;
}

export default app;
