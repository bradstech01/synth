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

import { midiMap } from '../scripts/inputMaps.js';
import * as midiFunctions from '../scripts/midiFunctions.js';
import { handleChange, handleFxChange, getDefaults, loadSettings } from '../features/synthSettings/settingsAPI.js';
import { initTransport } from '../features/sequencer/sequencerAPI';
import { startedTone } from './appSlice';
import { addToCurrentlyPlaying, removeFromCurrentlyPlaying } from '../features/keyboard/keyboardSlice';
import { updateSequencerBeat } from '../features/sequencer/sequencerSlice';


function App() {
  const dispatch = useDispatch();

  const hasToneStarted = useSelector(state => state.app.hasToneStarted);

  const [activeView, setActiveView] = useState('keyboard');
  const [settings, setSynthSettingsState] = useState(getDefaults());

  const particlesInit = async main => await loadFull(main);

  //never needs to re-render
  const particlesMemo = useRef(<Particles init={particlesInit} options={particleOptions} />);

  //Refs
  const isMounted = useRef(false);

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



  //MIDI message handler. 
  //Tracks all types of MIDI messages and triggers appropriate action. 
  const getMIDIMessage = useCallback((midiMessage) => {
    const dataArray = midiMessage.data;
    const command = dataArray[0];
    const note = midiMap(dataArray[1]);
    const velocity = (dataArray[2] / 200);
    if (command === 144) dispatch(addToCurrentlyPlaying({ note: note, velocity: velocity, source: "midi" }));
    else if (command === 128) dispatch(removeFromCurrentlyPlaying({ note: note, source: "midi" }));
  }, []);

  //Tone engine starter. 
  //WebAudio API doesn't work if there isn't a triggering user input, so on the first user action this makes sure that 
  const startTone = async (e) => {
    if (!hasToneStarted) {
      await Tone.start();
      dispatch(startedTone());
      midiFunctions.setUpMIDI(getMIDIMessage);

      let cachedSettings = loadSettings();
      if (cachedSettings) {
        synth.set({ ...cachedSettings.synthSettings });
        setSynthSettingsState({
          synthSettings: { ...settings.synthSettings, ...cachedSettings.synthSettings },
          fxSettings: { ...settings.fxSettings, ...cachedSettings.fxSettings }
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
    }
  };

  //Use effect for on mount only
  useEffect(() => {
    if (isMounted.current) return;
    else isMounted.current = true;

    initTransport((newBeat) => { dispatch(updateSequencerBeat(newBeat)); });

    document.addEventListener('keydown', startTone);
    document.addEventListener('mousedown', startTone);
    document.addEventListener('keydown', e => {
      if (e.key === '.') {
        let cachedSettings = loadSettings();
        if (cachedSettings) {
          synth.set({ ...cachedSettings.synthSettings });
          setSynthSettingsState({
            synthSettings: { ...settings.synthSettings, ...cachedSettings.synthSettings },
            fxSettings: { ...settings.fxSettings, ...cachedSettings.fxSettings }
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

  //rendering methods
  const renderBody = () => {
    if (activeView === 'keyboard') {
      return (
        <MusicGui />
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
