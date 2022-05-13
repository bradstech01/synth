export const oscillator = {
    settings: {
        type: {
            default: 'sawtooth',
            settingGrp: 'oscillator',
            settingName: 'type',
        }
    }
};

export const envelope = {
    settings: {
        attack: {
            default: 0,
            min: 0,
            max: 5,
            step: .01,
            settingGrp: 'envelope',
            settingName: 'attack',
        },
        decay: {
            default: 0,
            min: 0,
            max: 5,
            step: .01,
            settingGrp: 'envelope',
            settingName: 'decay',
        },
        sustain: {
            default: 1,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'envelope',
            settingName: 'sustain',
        },
        release: {
            default: 0,
            min: 0,
            max: 5,
            step: .01,
            settingGrp: 'envelope',
            settingName: 'release',
        },
    }
};

export const filterEnvelope = {
    settings: {
        octaves: {
            default: 50,
            min: 0,
            max: 100,
            step: .01,
            settingGrp: 'filterEnvelope',
            settingName: 'octaves',
            valueScaler: val => {
                return (2 * val / 12.5);
            },
        },
        baseFrequency: {
            default: 0,
            min: 0,
            max: 100,
            step: .01,
            settingGrp: 'filterEnvelope',
            settingName: 'baseFrequency',
            valueScaler: val => {
                return ((100 * val ^ 2));
            },
        },
        attack: {
            default: 0,
            min: 0,
            max: 100,
            step: .01,
            settingGrp: 'filterEnvelope',
            settingName: 'attack',
            valueScaler: val => {
                return (((val) ^ 2) / 25);
            },
        },
        decay: {
            default: 0,
            min: 0,
            max: 100,
            step: .01,
            settingGrp: 'filterEnvelope',
            settingName: 'decay',
            valueScaler: val => {
                return (((val) ^ 2) / 25);
            },
        },
        sustain: {
            default: 0,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'filterEnvelope',
            settingName: 'sustain',
        },
        release: {
            default: 0,
            min: 0,
            max: 5,
            step: .01,
            settingGrp: 'filterEnvelope',
            settingName: 'release',
        },
    }
};

export const stereoWidener = {
    settings: {
        width: {
            default: 0,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'stereoWidener',
            settingName: 'width',
        }
    }
};

export const distortion = {
    settings: {
        distortion: {
            default: 0,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'distortion',
            settingName: 'distortion',
        }
    }
};

export const eq = {
    settings: {
        low: {
            default: 0,
            min: -5,
            max: 5,
            step: .01,
            settingGrp: 'eq',
            settingName: 'low',
        },
        mid: {
            default: 0,
            min: -5,
            max: 5,
            step: .01,
            settingGrp: 'eq',
            settingName: 'mid',
        },
        high: {
            default: 0,
            min: -5,
            max: 5,
            step: .01,
            settingGrp: 'eq',
            settingName: 'high',
        },
    }

};

export const reverb = {
    settings: {
        wet: {
            default: 1,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'reverb',
            settingName: 'wet'
        },
        preDelay: {
            default: .01,
            min: 0,
            max: 10,
            step: .01,
            settingGrp: 'reverb',
            settingName: 'preDelay'
        },
        decay: {
            default: 1.5,
            min: 0,
            max: 10,
            step: .01,
            settingGrp: 'reverb',
            settingName: 'decay'
        }
    }
};

export const delay = {
    settings: {
        delayTime: {
            default: 0,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'delay',
            settingName: 'delayTime'
        },
        feedback: {
            default: .01,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'delay',
            settingName: 'feedback'
        },
        wet: {
            default: .5,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'delay',
            settingName: 'wet'
        }
    }
};

export const tremolo = {
    settings: {
        frequency: {
            default: 0,
            min: 0,
            max: 10,
            step: .01,
            settingGrp: 'tremolo',
            settingName: 'frequency',
        },
        depth: {
            default: 0,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'tremolo',
            settingName: 'depth'
        }
    }
};

export const chorus = {
    settings: {
        frequency: {
            default: 0,
            min: 0,
            max: 10,
            step: .01,
            settingGrp: 'chorus',
            settingName: 'frequency',
        },
        depth: {
            default: 0,
            min: 0,
            max: 1,
            step: .01,
            settingGrp: 'chorus',
            settingName: 'depth'
        }
    }
};

export const misc = {
    settings: {}
};