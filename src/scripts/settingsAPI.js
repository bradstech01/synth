import { synth } from '../components/synth';
import * as Tone from 'tone';

export function handleChange(value, section, name) {
    console.log(this);
    const newSetting = {};
    newSetting[section] = {};
    newSetting[section][name] = value;
    synth.set(newSetting);

    const returnState = { ...this.state.synthSettings };
    returnState[section][name] = value;

    this.setState(returnState);
};

export function handleFxChange(value, setting, name) {
    if (!this.fx[setting]) {
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
        this.fx[setting] = newEffect;
        target.connect(newEffect).toDestination();
    }
    let returnState = { ...this.state };

    returnState.synthSettings[setting][name] = value;
    let fxOptions = {};
    fxOptions[name] = value;
    this.fx[setting].set(fxOptions);

    this.setState(returnState);
};

export function getDefaults() {
    const synthSettings = synth.get();
    const returnSettings = {
        oscillator: {
            type: synthSettings.oscillator.type,
        },
        envelope: {
            attack: synthSettings.envelope.attack,
            decay: synthSettings.envelope.decay,
            sustain: synthSettings.envelope.sustain,
            release: synthSettings.envelope.release,
        },
        filterEnvelope: {
            octaves: synthSettings.filterEnvelope.octaves,
            baseFrequency: synthSettings.filterEnvelope.baseFrequency,
            attack: synthSettings.filterEnvelope.attack,
            decay: synthSettings.filterEnvelope.decay,
            sustain: synthSettings.filterEnvelope.sustain,
            release: synthSettings.filterEnvelope.release,
        },
        stereoWidener: {
            width: 0,
        },
        distortion: {
            distortion: 0,
        },
        eq: {
            low: 0,
            mid: 0,
            high: 0,
        },
        reverb: {
            wet: 1,
            preDelay: 0.01,
            decay: 1.5,
        },
        delay: {
            delayTime: 0.25,
            feedback: 0,
        },
        tremolo: {
            frequency: 10,
            depth: 0.5,
        },
        chorus: {
            frequency: 1.5,
            depth: 0.7,
        },
    };
    return returnSettings;
};