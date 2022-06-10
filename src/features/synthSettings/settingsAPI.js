import { synth } from '../../scripts/synthAPI.js';
import * as Tone from 'tone';
import * as definitions from '../../scripts/settingsDefinitions.js';

const fx = {
    stereoWidener: undefined,
    eq: undefined,
    distortion: undefined,
    compressor: undefined,
    reverb: undefined,
    delay: undefined,
    tremolo: undefined,
    chorus: undefined,
    LFO1: undefined,
    LFO2: undefined,
};

export function handleChange(value, section, name) {
    const newSetting = {};
    newSetting[section] = {};
    newSetting[section][name] = value;
    synth.set(newSetting);
};

export function handleFxChange(value, setting, name) {
    if (!fx[setting]) {
        let newEffect;
        let target;
        switch (setting) {
            case 'delay':
                newEffect = new Tone.FeedbackDelay().toDestination();
                target = synth;
                break;
            case 'reverb':
                newEffect = new Tone.Reverb().toDestination();
                target = synth;
                break;
            case 'chorus':
                newEffect = new Tone.Chorus().toDestination().start();
                target = synth;
                break;
            case 'tremolo':
                newEffect = new Tone.Tremolo().toDestination().start();
                target = synth;
                break;
            case 'eq':
                newEffect = new Tone.EQ3().toDestination();
                target = synth;
                break;
            case 'distortion':
                newEffect = new Tone.Distortion().toDestination();
                target = synth;
                break;
            case 'stereoWidener':
                newEffect = new Tone.StereoWidener().toDestination();
                target = synth;
                break;
            default:
                break;
        }
        fx[setting] = newEffect;
        target.connect(newEffect).toDestination();
    }
    let fxOptions = {};
    fxOptions[name] = value;
    fx[setting].set(fxOptions);
};

export function getDefaults() {
    let synthSettings = {};
    let fxSettings = {
        flags: {}
    };
    for (const definition in definitions) {
        if (definitions[definition].type === 'effect') {
            fxSettings[definition] = {};
            fxSettings.flags[definition] = { on: false };
        }
        else {
            synthSettings[definition] = {};
        }
        for (const setting in definitions[definition].settings) {
            if (definitions[definition].type === 'effect') fxSettings[definition][setting] = definitions[definition].settings[setting].default;
            else synthSettings[definition][setting] = definitions[definition].settings[setting].default;
        }
    }

    let returnSettings = { synthSettings: synthSettings, fxSettings: fxSettings };

    return returnSettings;
};

export function loadSettings() {
    const savedSettingsString = localStorage.getItem('settings');
    return savedSettingsString ? JSON.parse(savedSettingsString) : null;
}