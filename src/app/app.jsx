import '../css/index.scss';
import * as Tone from 'tone';
import * as definitions from '../scripts/settingsDefinitions';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { usePrevious } from '../scripts/hooks';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particleOptions } from '../assets/particles';

import MusicGui from './musicGui';
import OscillatorSettings from '../features/synthSettings/oscillatorSettings';
import FxSettings from '../features/synthSettings/fxSettings';
import NavBar from './nav';
import { synth } from '../scripts/synthAPI.js';

import { keyMap, midiMap } from '../scripts/inputMaps.js';
import * as midiFunctions from '../scripts/midiFunctions.js';
import { handleChange, handleFxChange, getDefaults, loadSettings } from '../features/synthSettings/settingsAPI.js';
import { triggerNote, triggerRelease } from '../scripts/synthAPI.js';
import { initTransport, setStepsInternal, getSteps, getNumSteps } from '../features/sequencer/sequencerAPI';
import { startedTone } from './appSlice';
import { addToCurrentlyPlaying, removeFromCurrentlyPlaying } from '../features/keyboard/keyboardSlice';


function App() {
  const hasToneStarted = useSelector(state => state.app.hasToneStarted);
  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);
  const [activeView, setActiveView] = useState('keyboard');
  const [octaveShift, setOctaveShift] = useState(0);
  const [settings, setSynthSettingsState] = useState(getDefaults());
  const [bpm, setBpm] = useState(20);
  const [sequencerBeat, setSequencerBeat] = useState(0);
  const [sequencerStarted, setSequencerStarted] = useState(false);
  const [sequencerRecording, setSequencerRecording] = useState(false);
  const [sequencerSteps, setSequencerSteps] = useState(getSteps());
  const [sequencerNumSteps, setSequencerNumSteps] = useState(getNumSteps());
  const dispatch = useDispatch();


  const setBpmFromChild = useCallback((data) => {
    setBpm(data);
  }, [setBpm]);

  const setSequencerStartedCb = useCallback((data) => {
    setSequencerStarted(data);
  }, [setSequencerStarted]);

  const setSequencerRecordingCb = useCallback((data) => {
    setSequencerRecording(data);
  }, [setSequencerRecording]);

  const setSequencerStepsCb = useCallback((data) => {
    setStepsInternal(data);
    setSequencerSteps(data);
  }, [setSequencerSteps]);

  const setSequencerBeatCb = useCallback((data) => {
    setSequencerBeat(data);
  }, [setSequencerBeat]);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  //never needs to re-render
  const particlesMemo = useRef(<Particles init={particlesInit} options={particleOptions} />);

  //Refs
  const isKeyDown = useRef(false);
  const currentlyPlayingRef = useRef();
  currentlyPlayingRef.current = currentlyPlaying;
  const prevPlaying = usePrevious(currentlyPlaying);
  const isMounted = useRef(false);
  const isMouseDownRef = useRef(false);

  //This function is a "wrapper" around the settings API.
  //The callback function is expected to enact the change in Tone.js settings, while this function sets the corresponding React state. 
  const updateSettingState = useCallback((prevState, value, internalValue, definition, type, cb) => {
    let setting = definition.settingGrp;
    let name = definition.settingName;
    let newSettings = prevState;
    let settingsObjectName = (type === 'synth') ? 'synthSettings' : 'fxSettings';
    newSettings[settingsObjectName][setting][name] = value;
    if (type === 'effect' && newSettings[settingsObjectName].flags[setting].off !== true) cb(internalValue, setting, name, type);
    localStorage.setItem('settings', JSON.stringify(newSettings));
    setSynthSettingsState(newSettings);
  }, [settings]);

  //Specific handlers based on setting being updated
  const synthUpdater = useCallback((prevState, value, internalValue, definition, type) => {
    updateSettingState(prevState, value, internalValue, definition, type, handleChange);
  }, [updateSettingState]);

  const fxUpdater = useCallback((prevState, value, internalValue, definition, type) => {
    updateSettingState(prevState, value, internalValue, definition, type, handleFxChange);
  }, [updateSettingState]);

  //Handles 'musical' key presses. 
  //Sets "isKeyDown" flag to disable musical mouse input. 
  const handleKeyPress = useCallback(e => {
    if (keyMap(e.key)) dispatch(addToCurrentlyPlaying({ note: keyMap(e.key), velocity: .5 }));
  }, []);

  //Handles 'musical' key releases. 
  //Sets "isKeyDown" flag to enable musical mouse input.
  const handleKeyRelease = useCallback(e => {
    if (keyMap(e.key)) dispatch(removeFromCurrentlyPlaying(keyMap(e.key)));

  }, []);

  //Mousedown handler for piano keys. 
  //Passed as callback to individual piano key components. 
  //Does nothing if a musical key is being pressed.
  const handleMouseDown = useCallback(note => {
    if (isKeyDown.current) return;
    dispatch(addToCurrentlyPlaying({ note: note, velocity: .5 }));
  }, [isKeyDown]);

  //Mouseup handler for piano keys.
  //Passed as callback to individual piano key components. 
  //Does nothing if a musical key is being pressed. 
  const handleMouseUp = useCallback(note => {
    if (isKeyDown.current) return;
    dispatch(removeFromCurrentlyPlaying(note));
  }, [isKeyDown]);

  //Mousedown/mouseup handler for keyboard.
  //Passed as callback to keyboard component. 
  //Helps track whether mouse is being used in musical context in order to enable and disable keydown/keyup event listeners as appropriate.
  const setMouseFlag = useCallback(e => {
    e.stopPropagation();
    if (e.type === 'mousedown') isMouseDownRef.current = true;
    else isMouseDownRef.current = false;

    if (!isKeyDown.current && isMouseDownRef.current) {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyRelease);
    }
    if (!isMouseDownRef.current) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
    }
  }, [handleKeyPress, handleKeyRelease]);

  //MIDI message handler. 
  //Tracks all types of MIDI messages and triggers appropriate action. 
  const getMIDIMessage = useCallback((midiMessage) => {
    const dataArray = midiMessage.data;
    const command = dataArray[0];
    const note = midiMap(dataArray[1]);
    const velocity = (dataArray[2] / 200);
    if (command === 144) dispatch(addToCurrentlyPlaying(note, velocity));
    else if (command === 128) dispatch(removeFromCurrentlyPlaying(note));
  }, []);

  //Tone engine starter. 
  //WebAudio API doesn't work if there isn't a triggering user input, so on the first user action this makes sure that 
  const startTone = useCallback(async (e) => {
    if (!hasToneStarted) {
      await Tone.start();
      dispatch(startedTone());
      midiFunctions.setUpMIDI(getMIDIMessage);

      let cachedSettings = loadSettings();
      if (cachedSettings) {
        synth.set({ ...cachedSettings.synthSettings });
        setSynthSettingsState({
          synthSettings: {
            ...settings.synthSettings, ...cachedSettings.synthSettings
          }, fxSettings: {
            ...settings.fxSettings, ...cachedSettings.fxSettings
          }
        });
        if (cachedSettings.fxSettings) {
          for (const effect in cachedSettings.fxSettings) {
            if (effect === 'flags') continue;
            for (const setting in cachedSettings.fxSettings[effect]) {
              fxUpdater({ ...settings }, cachedSettings.fxSettings[effect][setting], cachedSettings.fxSettings[effect][setting], definitions[effect].settings[setting], definitions[effect].type);
            }
          };
        }
      }

      document.removeEventListener('keydown', startTone);
      document.removeEventListener('mousedown', startTone);
      document.addEventListener('mousedown', setMouseFlag);
      document.addEventListener('mouseup', setMouseFlag);
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
    }
  }, [getMIDIMessage, handleKeyPress, handleKeyRelease, hasToneStarted, setMouseFlag]);

  //Use effect for on mount only
  useEffect(() => {
    if (isMounted.current) return;

    initTransport(setSequencerBeat);

    document.addEventListener('keydown', startTone);
    document.addEventListener('mousedown', startTone);
    document.addEventListener('keydown', e => {
      if (e.key === '.') {
        let cachedSettings = loadSettings();
        if (cachedSettings) {
          synth.set({ ...cachedSettings.synthSettings });
          setSynthSettingsState({
            synthSettings: {
              ...settings.synthSettings, ...cachedSettings.synthSettings
            }, fxSettings: {
              ...settings.fxSettings, ...cachedSettings.fxSettings
            }
          });
        }
      }
      else if (e.key === '=') {
        localStorage.clear();
        console.log(synth.get());
        console.log(settings);
      }
    });
  }, [startTone, settings]);

  //Use effect for triggering notes on note updates
  useEffect(() => {
    console.log('fx use');
    console.log(currentlyPlaying);

    if (!isMounted.current) isMounted.current = true;
    else {
      for (let noteVelocityPair of currentlyPlaying) {
        const { note, velocity } = noteVelocityPair;
        const noteWasAdded = !prevPlaying.find(pair => pair.note === note);
        console.log('was note added? hmm', noteWasAdded);
        if (noteWasAdded) triggerNote(note, velocity);
      }
      for (let noteVelocityPair of prevPlaying) {
        const { note, velocity } = noteVelocityPair;
        const noteWasRemoved = !currentlyPlaying.find(pair => pair.note === noteVelocityPair.note);
        console.log('was note removed? hmm', noteWasRemoved);
        if (noteWasRemoved) triggerRelease(note);
      }
    }

    if (currentlyPlaying.length === 0) isKeyDown.current = false;
    else isKeyDown.current = true;
  }, [currentlyPlaying, prevPlaying, settings.synthSettings.misc.velocity]);

  //rendering methods
  const renderBody = () => {
    if (activeView === 'keyboard') {
      return (
        <MusicGui
          isMouseDown={isMouseDownRef.current}
          currentlyPlaying={currentlyPlaying}
          prevPlaying={prevPlaying}
          setMouseFlag={setMouseFlag}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          bpm={bpm}
          setBpm={setBpmFromChild}
          sequencerSteps={sequencerSteps}
          sequencerRecording={sequencerRecording}
          sequencerStarted={sequencerStarted}
          currentBeat={sequencerBeat}
          setSequencerSteps={setSequencerStepsCb}
          setSequencerStarted={setSequencerStartedCb}
          setSequencerRecording={setSequencerRecordingCb}
          setSequencerBeat={setSequencerBeatCb}
          octaveShift={octaveShift}
        />
      );
    }
    else if (activeView === 'oscillator') {
      return (
        <div className='oscSettings'>
          <OscillatorSettings
            settings={settings}
            handleChange={synthUpdater} />
          <FxSettings
            settings={settings}
            handleFxChange={fxUpdater} />
        </div>
      );
    }
    else if (activeView === 'system') {
      return (
        <div className='systemSettings'>
        </div>
      );
    }
  };

  const renderSplash = () => {
    return (
      <div className="splash">
        <h2>press any button to begin...</h2>
      </div>
    );
  };

  const renderApp = () => {
    return (
      <>
        <NavBar onChange={setActiveView} />
        <div className="wrapper">
          {renderBody()}
        </div>
      </>
    );
  };


  return (
    <>
      {particlesMemo.current}
      {hasToneStarted ? renderApp() : renderSplash()};
    </>
  );
}

export default App;
