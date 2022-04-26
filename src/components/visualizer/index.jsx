import React from "react";
import { Oscilloscope } from '../oscilloscope';
import { audioCtx, synth } from '../../scripts/synthAPI.js';

/**
 * Uses requestAnimationFrame to drive a roughly 60 FPS output.
 * Holds the audio time domain data in state, which is passed via props to a Waveform component that does the real rendering.
 * TODO: Implement a way to "isolate" waveform/snapshot a waveform
 */
export class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    const analyser = audioCtx.createAnalyser();
    synth.connect(analyser);
    analyser.fftSize = 512;
    const bufferLength = analyser.frequencyBinCount;

    this.analyser = analyser;
    this.bufferLength = bufferLength;

    const dataArray = new Uint8Array(bufferLength);
    this.state = { dataArray: dataArray };
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  updateAnimationState = () => {
    const newDataArray = new Uint8Array(this.bufferLength);
    this.analyser.getByteTimeDomainData(newDataArray);
    this.setState((prevState) => ({ dataArray: newDataArray }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  };

  render() {
    return (
      <Oscilloscope
        dataArray={this.state.dataArray}
        bufferLength={this.bufferLength}
      />
    );
  }
}