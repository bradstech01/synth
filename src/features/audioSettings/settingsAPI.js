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
    let fxOptions = {};
    fxOptions[name] = value;
    fx[setting].set(fxOptions);
};

//creates initial instance of each effect w/ default values
export function initEffects() {
    for (const def in definitions) {
        console.log(definitions[def]);
        if (definitions[def].type !== 'effect') continue;
        let newEffect;
        switch (def) {
            case 'delay':
                newEffect = new Tone.FeedbackDelay({ wet: 0 }).toDestination();
                break;
            case 'reverb':
                newEffect = new Tone.Reverb({ wet: 1 }).toDestination();
                break;
            case 'chorus':
                newEffect = new Tone.Chorus({ wet: 0 }).toDestination().start();
                break;
            case 'tremolo':
                newEffect = new Tone.Tremolo({ wet: 0 }).toDestination().start();
                break;
            case 'eq':
                newEffect = new Tone.EQ3({ wet: 0 }).toDestination();
                break;
            case 'distortion':
                newEffect = new Tone.Distortion({ wet: 0 }).toDestination();
                break;
            case 'stereoWidener':
                newEffect = new Tone.StereoWidener({ wet: 0 }).toDestination();
                break;
            default:
                break;
        }
        if (!newEffect) continue;
        fx[def] = newEffect;
        synth.connect(newEffect).toDestination();
    }
}

//Returns whether parameter is "effect", "synth", etc - all are handled differently 
//(e.g.fx need to have a new audio node chained, synth we just change the synth object, etc)
export function getParameterType(parameter) {
    return definitions[parameter.settingGrp].type;
}

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

export function getSynthDefaults() {
    const synthSettings = {};
    for (const definition in definitions) {
        if (definitions[definition].type === 'synth') {
            synthSettings[definition] = {};
            for (const setting in definitions[definition].settings) {
                synthSettings[definition][setting] = definitions[definition].settings[setting].default;
            }
        }
    }

    return synthSettings;
};

export function getFxDefaults() {
    const fxSettings = {
        flags: {}
    };
    for (const definition in definitions) {
        if (definitions[definition].type === 'effect') {
            fxSettings[definition] = {};
            fxSettings.flags[definition] = { on: false };
            for (const setting in definitions[definition].settings) {
                fxSettings[definition][setting] = definitions[definition].settings[setting].default;
            }
        }
    }

    return fxSettings;
};

export function loadSettings() {
    const savedSettingsString = localStorage.getItem('settings');
    return savedSettingsString ? JSON.parse(savedSettingsString) : null;
}


initEffects();
