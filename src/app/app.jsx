import '../css/index.scss';
import * as Tone from 'tone';
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particleOptions } from '../assets/particles';

import Keyboard from '../features/keyboard/keyboard';
import Sequencer from '../features/sequencer/sequencer';
import { Visualizer } from '../features/visualizer/visualizer';
import OscillatorBox from '../features/audioSettings/oscillatorBox';
import LpfEnvBox from '../features/audioSettings/lpfEnvBox';
import AmpEnvBox from '../features/audioSettings/ampEnvBox';
import TimeFxBox from '../features/audioSettings/timeFxBox';
import VoiceFxBox from '../features/audioSettings/voiceFxBox';


import NavBar from './nav';
import { synth, triggerNote, triggerRelease } from '../scripts/synthAPI.js';

import { keyMap, midiMap } from '../scripts/inputMaps.js';
import * as midiFunctions from '../scripts/midiFunctions.js';
import { getDefaults, loadSettings } from '../features/audioSettings/settingsAPI.js';
import { initTransport } from '../features/sequencer/sequencerAPI';
import { usePrevious } from '../scripts/hooks.js';

import { startedTone } from './appSlice';
import { addToCurrentlyPlaying, removeFromCurrentlyPlaying, setMouseFlag } from '../features/keyboard/keyboardSlice';
import { updateSequencerBeat } from '../features/sequencer/sequencerSlice';
import GuiSettings from '../features/systemSettings/guiSettings';


function App() {
  const dispatch = useDispatch();

  const hasToneStarted = useSelector(state => state.app.hasToneStarted);
  const particlesOn = useSelector(state => state.systemSettings.particlesOn);

  const currentlyPlaying = useSelector(state => state.keyboard.currentlyPlaying);
  const currentlyPlayingRef = useRef([...currentlyPlaying]);
  currentlyPlayingRef.current = currentlyPlaying;

  const [activeView, setActiveView] = useState('keyboard');
  const [settings, setSynthSettingsState] = useState(getDefaults());

  const particlesInit = async main => await loadFull(main);

  //never needs to re-render
  const particlesMemo = useRef(<Particles init={particlesInit} options={particleOptions} />);

  //Refs
  const isMounted = useRef(false);

  //MIDI message handler. 
  //Tracks all types of MIDI messages and triggers appropriate action. 
  const getMIDIMessage = midiMessage => {
    const command = midiMessage.data[0];
    const note = midiMap(midiMessage.data[1]);
    const velocity = (midiMessage.data[2] / 200);
    if (command === 144) dispatch(addToCurrentlyPlaying({ note: note, velocity: velocity, source: "midi" }));
    else if (command === 128) dispatch(removeFromCurrentlyPlaying({ note: note, source: "midi" }));
  };


  const applyCachedSettings = () => {
    return;
    /*let cachedSettings = loadSettings();

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
    }*/
  };

  //Tone engine starter. 
  //WebAudio API doesn't work if there isn't a triggering user input, so on the first user action this makes sure that 
  const startTone = async () => {
    const handleKeyPress = e => { if (keyMap(e.key.toLowerCase()) && !currentlyPlayingRef.current.find(pair => pair.note === keyMap(e.key.toLowerCase()))) dispatch(addToCurrentlyPlaying({ note: keyMap(e.key.toLowerCase()), velocity: .5, source: 'keyboard' })); };
    const handleKeyRelease = e => { if (keyMap(e.key.toLowerCase()) && !currentlyPlaying.find(pair => pair.note === keyMap(e.key.toLowerCase()))) dispatch(removeFromCurrentlyPlaying({ note: keyMap(e.key.toLowerCase()), source: 'keyboard' })); };

    if (!hasToneStarted) {
      await Tone.start();
      dispatch(startedTone());
      midiFunctions.setUpMIDI(getMIDIMessage);

      applyCachedSettings();

      document.removeEventListener('keydown', startTone);
      document.removeEventListener('mousedown', startTone);
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
      document.addEventListener('mouseup', () => { dispatch(setMouseFlag('up')); });
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
          console.log('viewing cache');
          console.log(cachedSettings);
          synth.set({ ...cachedSettings.synthSettings });
          /*setSynthSettingsState({
            synthSettings: { ...settings.synthSettings, ...cachedSettings.synthSettings },
            fxSettings: { ...settings.fxSettings, ...cachedSettings.fxSettings }
          });*/
        }
        else console.log('No cache found');
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
        <div className='musicGui'>
          <div className="keyboardWrapper">
            <div className='visualizerContainer'>
              <Visualizer />
            </div>
            <Keyboard />
          </div>
          <Sequencer />
        </div>
      );
    }
    else if (activeView === 'oscillator') {
      return (
        <div className='oscSettings'>
          {<OscillatorBox />}
          <LpfEnvBox />
          <AmpEnvBox />
          <VoiceFxBox />
          <TimeFxBox />
        </div>
      );
    }
    else if (activeView === 'system') {
      return (
        <div className='systemSettings'>
          <GuiSettings />
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
      {particlesOn ? particlesMemo.current : undefined}
      {hasToneStarted ? renderApp() : renderSplash()};
    </>
  );
}

export default App;
