import '../../css/index.scss';
import * as Tone from 'tone';
import React from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particleOptions } from '../../assets/particles';

import { MusicGui } from '../musicGui';
import { OscillatorSettings } from '../oscillatorSettings';
import { FxSettings } from '../fxSettings';
import { NavBar } from '../navBar';

import { keyMap, midiMap } from '../../scripts/inputMaps.js';
import * as midiFunctions from '../../scripts/midiFunctions.js';
import { handleChange, handleFxChange, getDefaults } from '../../scripts/settingsAPI.js';
import { triggerNote, triggerRelease } from '../../scripts/synthAPI.js';


class Synth extends React.Component {
  constructor(props) {
    super(props);

    let synthSettings = getDefaults();

    this.state = {
      hasToneStarted: false,
      currentlyPlaying: [],
      isKeyDown: false,
      activeView: 'KEYBOARD',
      synthSettings: synthSettings,
    };

    this.isMouseDown = false;
    this.octaveShift = 0;
    this.noteVelocityData = {};

    this.particlesInit = async (main) => {
      await loadFull(main);
    };

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
  updateSettingState = (value, internalValue, setting, name, cb) => {
    let synthSettings = { ...this.state.synthSettings };
    synthSettings[setting][name] = value;
    cb(internalValue, setting, name);
    console.log('update setting state');
    console.log(internalValue);
    console.log(value);
    this.setState(synthSettings);
  };

  async startTone(e) {
    if (!this.state.hasToneStarted) {
      await Tone.start();
      this.setState({
        hasToneStarted: true,
      });
      midiFunctions.setUpMIDI(this.getMIDIMessage);

      document.removeEventListener('keydown', this.startTone);
      document.removeEventListener('mousedown', this.startTone);
      document.addEventListener('mousedown', this.setMouseFlag);
      document.addEventListener('mouseup', this.setMouseFlag);
      document.addEventListener('keydown', this.handleKeyPress);
      document.addEventListener('keyup', this.handleKeyRelease);
    }
  }

  getMIDIMessage = midiMessage => {
    const dataArray = midiMessage.data;
    const command = dataArray[0];
    const note = midiMap(dataArray[1]);
    const velocity = (dataArray[2] / 200);
    if (command === 144) {
      this.addToCurrentlyPlaying(note, velocity);
    } else if (command === 128) {
      this.removeFromCurrentlyPlaying(note);
    }
  };

  handleKeyPress = (e) => {
    var newState = {};
    if (keyMap(e.key)) newState = this.addToCurrentlyPlaying(keyMap(e.key));
    if (!this.state.isKeyDown) newState.isKeyDown = true;
    this.setState(newState);
  };

  //handles the key release within app; does not get passed around
  handleKeyRelease = (e) => {
    var newState = {};
    if (keyMap(e.key)) newState = this.removeFromCurrentlyPlaying(keyMap(e.key));
    if (this.state.currentlyPlaying.length === 0) newState.isKeyDown = false;
    this.setState(newState);
  };

  addToCurrentlyPlaying = (note, velocity) => {
    if (!this.state.currentlyPlaying.includes(note)) {
      let newPlaying = [...this.state.currentlyPlaying];
      newPlaying.push(note);
      this.noteVelocityData[note] = velocity ? velocity : this.state.synthSettings.misc.defaultVelocity;
      return {
        currentlyPlaying: newPlaying,
      };
    }
    else return {};
  };

  removeFromCurrentlyPlaying = (note) => {
    if (this.state.currentlyPlaying.includes(note)) {
      let currentlyPlaying = [...this.state.currentlyPlaying];
      let newPlaying = currentlyPlaying.filter((value) => {
        if (value === note) delete this.noteVelocityData[note];
        return value !== note;
      });
      return {
        currentlyPlaying: newPlaying,
      };
    }
    else return {};
  };

  mouseTriggerNote = (note) => {
    var newState = this.addToCurrentlyPlaying(note);
    if (Object.keys(newState).length > 0) {
      this.setState(newState);
    }
  };

  mouseReleaseNote = (note) => {
    var newState = this.removeFromCurrentlyPlaying(note);
    if (Object.keys(newState).length > 0) {
      this.setState(newState);
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

  setOctaveShift = value => {
    this.octaveShift = value;
  };

  setActiveView = value => {
    this.setState({ activeView: value });
  };

  //rendering methods
  renderSettings() {
    return (
      <React.Fragment>
        <div className={(this.state.activeView === 'OSCILLATOR') ? 'oscSettings' : 'hidden'}>
          <OscillatorSettings
            synthSettings={this.state.synthSettings}
            handleChange={(value, internalValue, setting, name) => {
              this.updateSettingState(value, internalValue, setting, name, this.handleChange);
            }} />
        </div>
        <div className={(this.state.activeView === 'EFFECTS') ? 'fxSettings' : 'hidden'}>
          <FxSettings
            synthSettings={this.state.synthSettings}
            handleFxChange={(value, internalValue, setting, name) => { this.updateSettingState(value, internalValue, setting, name, this.handleFxChange); }} />
        </div>
      </React.Fragment>
    );
  }

  renderSplash() {
    return (
      <div className="splash">
        <h2>press any button to begin...</h2>
      </div>
    );
  }

  renderApp() {
    return (
      <React.Fragment>
        <NavBar onChange={this.setActiveView} />
        <div className="wrapper">
          <MusicGui
            activeView={this.state.activeView}
            isKeyDown={this.state.isKeyDown}
            isMouseDown={this.isMouseDown}
            currentlyPlaying={this.state.currentlyPlaying}
            setMouseFlag={this.setMouseFlag}
            onMouseDown={this.mouseTriggerNote}
            onMouseUp={this.mouseReleaseNote}
          />
          {this.renderSettings()}
        </div>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.hasToneStarted) {
      return (
        <React.Fragment>
          <Particles init={this.particlesInit} options={particleOptions} />
          {this.renderApp()};
        </React.Fragment>
      );
    }
    else {
      return (
        <React.Fragment>
          {this.renderSplash()}
        </React.Fragment>
      );
    }
  }
}

function app() {
  return <Synth />;
}

export default app;
