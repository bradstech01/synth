import '../../css/index.scss';
import * as Tone from 'tone';
import { useEffect, useState, useRef, useCallback } from 'react';
import { usePrevious } from '../../scripts/hooks';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { particleOptions } from '../../assets/particles';

import MusicGui from '../musicGui';
import OscillatorSettings from '../oscillatorSettings';
import FxSettings from '../fxSettings';
import NavBar from '../navBar';

import { keyMap, midiMap } from '../../scripts/inputMaps.js';
import * as midiFunctions from '../../scripts/midiFunctions.js';
import { handleChange, handleFxChange, getDefaults, loadSettings } from '../../scripts/settingsAPI.js';
import { triggerNote, triggerRelease } from '../../scripts/synthAPI.js';


function Synth() {
  const [hasToneStarted, setToneStartedFlag] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState([]);
  const [activeView, setActiveView] = useState('keyboard');
  const [octaveShift, setOctaveShift] = useState(0);
  const [synthSettings, setSynthSettings] = useState(getDefaults());

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  //this only needs to render once, so we memo it
  const particlesMemo = useRef(<Particles init={particlesInit} options={particleOptions} />);



  //Refs
  const isKeyDown = useRef(false);
  const currentlyPlayingRef = useRef();
  currentlyPlayingRef.current = currentlyPlaying;
  const prevPlaying = usePrevious(currentlyPlaying);
  const isMounted = useRef(false);
  const noteVelocityDataRef = useRef({});
  const isMouseDownRef = useRef(false);

  //This function is a "wrapper" around the settings API.
  //The callback function is expected to enact the change in Tone.js settings, while this function sets the corresponding React state. 
  const updateSettingState = (value, internalValue, setting, name, cb) => {
    let newSettings = { ...synthSettings };
    newSettings[setting][name] = value;
    if (newSettings[setting].off !== true) cb(internalValue, setting, name);
    setSynthSettings(newSettings);
  };

  const addToCurrentlyPlaying = useCallback((note, velocity) => {
    if (!currentlyPlayingRef.current.includes(note)) {
      let newPlaying = [...currentlyPlayingRef.current];
      newPlaying.push(note);
      noteVelocityDataRef.current[note] = velocity ? velocity : synthSettings.misc.defaultVelocity;
      setCurrentlyPlaying(newPlaying);
    }
  }, [synthSettings.misc.defaultVelocity]);

  const removeFromCurrentlyPlaying = useCallback((note) => {
    if (currentlyPlayingRef.current.includes(note)) {
      let currentlyPlayingCopy = [...currentlyPlayingRef.current];
      let newPlaying = currentlyPlayingCopy.filter((value) => {
        if (value === note) delete noteVelocityDataRef.current[note];
        return value !== note;
      });
      setCurrentlyPlaying(newPlaying);
      return newPlaying.length;
    }
  }, []);

  const handleKeyPress = useCallback(e => {
    if (keyMap(e.key)) {
      if (!isKeyDown.current) isKeyDown.current = true;
      addToCurrentlyPlaying(keyMap(e.key));
    }
  }, [isKeyDown, addToCurrentlyPlaying]);

  const handleKeyRelease = useCallback(e => {
    if (keyMap(e.key)) {
      let numberNotes = removeFromCurrentlyPlaying(keyMap(e.key));
      if (numberNotes === 0) {
        isKeyDown.current = false;
      }
    }
  }, [removeFromCurrentlyPlaying]);

  const handleMouseDown = useCallback(note => {
    if (isKeyDown.current) return;
    addToCurrentlyPlaying(note);
  }, [addToCurrentlyPlaying, isKeyDown]);

  const handleMouseUp = useCallback(note => {
    if (isKeyDown.current) return;
    removeFromCurrentlyPlaying(note);
  }, [removeFromCurrentlyPlaying, isKeyDown]);


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

  const getMIDIMessage = useCallback((midiMessage) => {
    const dataArray = midiMessage.data;
    const command = dataArray[0];
    const note = midiMap(dataArray[1]);
    const velocity = (dataArray[2] / 200);
    if (command === 144) addToCurrentlyPlaying(note, velocity);
    else if (command === 128) removeFromCurrentlyPlaying(note);
  }, [addToCurrentlyPlaying, removeFromCurrentlyPlaying]);

  const startTone = useCallback(async (e) => {
    if (!hasToneStarted) {
      await Tone.start();
      setToneStartedFlag(true);
      midiFunctions.setUpMIDI(getMIDIMessage);

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
    document.addEventListener('keydown', startTone);
    document.addEventListener('mousedown', startTone);
    document.addEventListener('keydown', e => {
      if (e.key === '.') {
        console.log(currentlyPlayingRef.current);
        let cachedSettings = loadSettings();
        if (cachedSettings) {
          let newSynthSettings = { ...synthSettings, ...cachedSettings };
          setSynthSettings(newSynthSettings);
        }
      }
      else if (e.key === '=') {
        localStorage.clear();
        localStorage.setItem('synthSettings', JSON.stringify(synthSettings));
      }
    });
  }, [startTone, synthSettings]);

  //Use effect for triggering notes on note updates
  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;
    else {
      for (let note of currentlyPlaying) {
        if (!prevPlaying.includes(note)) triggerNote(note, noteVelocityDataRef.current[note]);
      }
      for (let note of prevPlaying) {
        if (!currentlyPlaying.includes(note)) triggerRelease(note);
      }
    }
  }, [currentlyPlaying, prevPlaying]);

  //rendering methods
  const renderBody = () => {
    if (activeView === 'keyboard') {
      return (
        <MusicGui
          isMouseDown={isMouseDownRef.current}
          currentlyPlaying={currentlyPlaying}
          setMouseFlag={setMouseFlag}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          octaveShift={0}
        />
      );
    }
    else if (activeView === 'oscillator') {
      return (
        <div className='oscSettings'>
          <OscillatorSettings
            synthSettings={synthSettings}
            handleChange={(value, internalValue, setting, name) => {
              updateSettingState(value, internalValue, setting, name, handleChange);
            }} />
          <FxSettings
            synthSettings={synthSettings}
            handleFxChange={(value, internalValue, setting, name) => { updateSettingState(value, internalValue, setting, name, handleFxChange); }} />
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


  if (hasToneStarted) {
    return (
      <>
        {particlesMemo.current}
        {renderApp()};
      </>
    );
  }
  else {
    return (
      <>
        {renderSplash()}
      </>
    );
  }
}

function app() {
  return <Synth />;
}

export default app;
