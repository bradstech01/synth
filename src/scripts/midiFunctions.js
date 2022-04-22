import { midiMap } from './inputMaps.js';

export const onMIDISuccess = (midiAccess) => {
    // when we get a succesful response, run this code
    console.log('MIDI Access Successful', midiAccess);
    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = this.getMIDIMessage;
    }
};

export const onMIDIFailure = (e) => {
    // when we get a failed response, run this code
    console.log(
        "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
        e
    );
};


export const getMIDIMessage = (midiMessage) => {
    const dataArray = midiMessage.data;
    const command = dataArray[0];
    const note = midiMap(dataArray[1]);
    const velocity = (dataArray[2] / 200);
    if (command === 144) {
        this.addToCurrentlyPlaying(note, velocity);
    } else if (command === 128) {
        this.removeFromCurrentlyPlaying(note);
    }
};

export const setUpMIDI = () => {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
        navigator
            .requestMIDIAccess({
                sysex: false, // this defaults to 'false' and we won't be covering sysex in this article.
            })
            .then(onMIDISuccess, onMIDIFailure);
    } else {
        console.log('No MIDI support in your browser.');
    }
}