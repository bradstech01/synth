import { synth } from '../../scripts/synthAPI.js';
import * as Tone from 'tone';

let steps = [];
let numSteps = 64;

for (let i = 0; i < numSteps; i++) {
    steps[i] = {
        beat: i,
        note: '',
    };
}

let beat = 0;
let currentNote = steps[beat].note;

export const getSteps = () => { return steps; };

export const getNumSteps = () => { return numSteps; };

export function getBeat() { return beat; }
export function setBeatInternal(val) { beat = val; }

export const setStepsInternal = newSteps => steps = newSteps;

export const setSingleStepInternal = step => {
    const newSteps = [...steps];
    newSteps[step.beat] = step;
    steps = newSteps;
};
export function initTransport(setBeatState) {
    Tone.Transport.scheduleRepeat((time) => {
        // reminder to use the callback time to schedule events
        if (currentNote !== '') currentNote = '';

        if (
            steps[beat].note !== '' &&
            steps[beat].note !== 'rest'
        ) {
            synth.triggerAttackRelease(
                steps[beat].note, '8n',
                time,
                0.3
            );

            currentNote = steps[beat].note;
        }
        if (steps[(beat + 1) % numSteps].note === '') {
            setBeatState(0);
            currentNote = steps[0].note;
        }
        else {
            setBeatState((beat + 1) % numSteps);
        };
    }, '8n');
};

export const startSequence = () => Tone.Transport.start();

export const stopSequence = () => Tone.Transport.stop();

