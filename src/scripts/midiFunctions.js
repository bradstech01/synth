export function onMIDISuccess(midiAccess, messageHandler) {
    // when we get a succesful response, run this code
    console.log('MIDI Access Successful', midiAccess);
    for (const input of midiAccess.inputs.values()) {
        input.onmidimessage = messageHandler;
    }
};

export function onMIDIFailure(e) {
    // when we get a failed response, run this code
    console.log(
        "No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " +
        e
    );
};

export function setUpMIDI(messageHandler) {
    // request MIDI access
    if (navigator.requestMIDIAccess) {
        navigator
            .requestMIDIAccess({
                sysex: false, // this defaults to 'false' and we won't be covering sysex in this article.
            })
            .then((midiAccess) => { onMIDISuccess(midiAccess, messageHandler); }, onMIDIFailure);
    } else {
        console.log('No MIDI support in your browser.');
    }
};