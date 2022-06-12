import * as Tone from 'tone';

async function startTone() {
    await Tone.start();
};

startTone();
export const audioCtx = Tone.getContext();
export const synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();

//callback passed to piano keys to trigger attack
export function triggerNote(note, velocity) {
    synth.triggerAttack(note, Tone.now(), velocity ? velocity : undefined);
};

//callback passed to piano keys to trigger release
export function triggerRelease(note) {
    synth.triggerRelease(note, Tone.now());
};

synth.set({
    maxPolyphony: 128,
    filter: {
        frequency: 20,
        rolloff: -24,
    },
    filterEnvelope: {
        baseFrequency: 20,
        attack: 0,
        decay: 5,
        sustain: 0,
        release: 1,
        octaves: 5.5,
        attackCurve: 'linear',
        delayCurve: 'linear',
    },
});

Tone.Destination.volume.value = -30;

document.body.addEventListener('keydown', (e) => {
    if (e.key === 'p') {
        console.log(synth.get());
        console.log(audioCtx.isOffline);
    }
});