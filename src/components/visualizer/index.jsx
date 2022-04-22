import React from "react";
import PropTypes from "prop-types";
import { Oscilloscope } from '../oscilloscope';

/**
 * Uses requestAnimationFrame to drive a roughly 60 FPS output.
 * Holds the audio time domain data in state, which is passed via props to a Waveform component that does the real rendering.
 * TODO: Implement a way to "isolate" waveform/snapshot a waveform
 */
export class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    const analyser = this.props.audioCtx.createAnalyser();
    this.props.synth.connect(analyser);
    analyser.fftSize = 4096;
    const bufferLength = analyser.frequencyBinCount;

    this.analyser = analyser;
    this.bufferLength = bufferLength;

    const dataArray = new Uint8Array(bufferLength);
    this.state = { dataArray: dataArray };
  }

  static propTypes = {
    audioCtx: PropTypes.object.isRequired,
    synth: PropTypes.object.isRequired,
  };

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

